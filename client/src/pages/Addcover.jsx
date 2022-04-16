import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, FormGroup, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Loader } from "../components/UI/Loader";
import { useParams, useHistory } from "react-router-dom";
import AlertMsg from "../components/modals/AlertMsg";


function AddCover() {
    const hist = useHistory()    
    const [coverName, setCoverName] = useState('')
    const [loading, setLoading] = useState(true)
    const [titleText, setTitleText] = useState('')
    const [addVisible, setAddVisible] = useState(true)
    const [editVisible, setEditVisible] = useState(true)
    const LinkCover = useParams().cover
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    async function create(type) {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/cover`, type)
        return data
    }

    const addCover = async () => {
        try {
            let data;
            data = await create({ cover: coverName });
            setShowCreate(true)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    useEffect(() => {

        if (LinkCover == "creating") {
            setTitleText('Добавление переплета')
            setAddVisible(false)
            setLoading(false)
        } else {
            setTitleText('Изменение переплета')
            setCoverName(LinkCover)
            setEditVisible(false)
            setLoading(false)
        }
    }, [])


    async function update(type) {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}api/cover`, type)
        return data
    }


    const edtCover = async () => {
        try {
            let data
            const formData = new FormData()
            formData.append('cover', coverName)
            formData.append('oldcover', LinkCover)
            data = await update(formData);
            setShowEdit(true)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    
    if (loading) {
        return <Loader />
    }
    return (
        <div className="enter">
            <Row className="justify-content-md-center">
                <Col md-4>
                    {/* Основная часть, здесь размещать таблицы и проч */}
                    <div className="subcolumns-left">
                        <Form>
                            <h2>{titleText}</h2>
                            <FormGroup className="mb-3" controlId="covername">
                                Название переплета
                                <Form.Control required type="text" placeholder="Название" value={coverName} onChange={e => setCoverName(e.target.value)} />
                            </FormGroup>
                        </Form>
                    </div>
                </Col>
                <Col md-auto>
                    {/* А здесь кнопки */}
                    <div className="subcolumns-right">

                        <Button variant="secondary" hidden={addVisible} onClick={e => addCover()}>
                            Добавить
                        </Button>

                        <Button variant="secondary" hidden={editVisible} onClick={e => edtCover()} >
                            Сохранить
                        </Button>

                    </div>

                </Col>
            </Row>
            <AlertMsg show={showCreate} onHide={() => { setShowCreate(false); hist.goBack() }} title={'Оповещение'} body={`Переплет ${coverName} создан`} />
            <AlertMsg show={showEdit} onHide={() => { setShowEdit(false); hist.goBack() }} title={'Оповещение'} body={`Переплет ${LinkCover} добавлен`} />

        </div >
    )
}

export default AddCover;