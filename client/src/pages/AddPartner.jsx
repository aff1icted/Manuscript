import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Loader } from "../components/UI/Loader";
import { Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import AlertMsg from "../components/modals/AlertMsg";
import NavAdmin from "../components/UI/NavAdmin";
import { createPartner, updatePartner } from "../http/partnerApi";


function AddPartner() {
    const hist = useHistory()
    const LinkTitle = useParams().title
    const [loading, setLoading] = useState(true)
    const [img, setImg] = useState(null)
    const [title, setTitle] = useState('')
    const [titleText, setTitleText] = useState('')
    const [addVisible, setAddVisible] = useState(true)
    const [editVisible, setEditVisible] = useState(true)
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')

   

    const addPartner = async () => {

        try {
            if (title == '' || img === null) {
                throw('Все обязательные поля должны быть заполнены')
            }
            const formData = new FormData()
            formData.append('title', title)
            formData.append('img', img)
            createPartner(formData)
            setShowCreate(true)
        } catch (e) {
            setError(e)
            setShowError(true)
        }
    }


    async function fetchPartner() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/partner/${LinkTitle}`)
        setTitle(response.data.title)
        setImg(response.data.img)
        console.log('img', response.data.img)
    }

    useEffect(() => {

        if (LinkTitle === "creating") {
            setTitleText('Добавление партнера')
            setAddVisible(false)
            setLoading(false)
        } else {
            setTitleText('Изменение партнера')
            setEditVisible(false)
            fetchPartner().finally(() => setLoading(false))
        }

    }, [])

    const edtPartner = async () => {
        try {
            if (title == '' || img =='') {
                throw('Все обязательные поля должны быть заполнены')
            }
            const formData = new FormData()
            formData.append('title', title)
            formData.append('oldtitle', LinkTitle)
            formData.append('img', img)
            console.log('img', img)
            updatePartner(formData)
            setShowEdit(true)
        } catch (e) {
            setError(e)
            setShowError(true)
        }
    }

    if (loading) {
        return <Loader />
    }
    return (
        <div className="blocks">
            <NavAdmin />
            <div className="enter">

                <Row className="justify-content-md-center">
                    <Col md-4>
                        {/* Основная часть, здесь размещать таблицы и проч */}
                        <div className="subcolumns-left">
                            <Form>
                                <h2>{titleText}</h2>
                                <FormGroup className="mb-3" controlId="PartnerTitle">
                                    Название партнера<span style={{color:"red"}}>*</span>
                                    <Form.Control required type="text" placeholder="Полное название" value={title} onChange={e => setTitle(e.target.value)} />
                                </FormGroup>
                                <Form.Group controlId="authimg" className="mb-3">
                                    <Form.Label>Иконка партнера<span style={{color:"red"}}>*</span> <span style={{color:"gray"}}>(Рек. размер 100х100 пикселей, JPG)</span> </Form.Label>
                                    <Form.Control type="file" onChange={e => setImg(e.target.files[0])} />
                                </Form.Group>
                            </Form >
                        </div>
                    </Col>
                    <Col md-auto>
                        {/* А здесь кнопки */}
                        <div className="subcolumns-right">

                            <Button variant="secondary" hidden={addVisible} onClick={e => addPartner()}>
                                Добавить
                            </Button>

                            <Button variant="secondary" hidden={editVisible} onClick={e => edtPartner()} >
                                Сохранить
                            </Button>


                        </div>

                    </Col >
                </Row >
                <AlertMsg show={showCreate} onHide={() => { setShowCreate(false); hist.goBack() }} title={'Оповещение'} body={`Партнер ${title} создан`} />
                <AlertMsg show={showEdit} onHide={() => { setShowEdit(false); hist.goBack() }} title={'Оповещение'} body={`Партнер ${LinkTitle} изменен`} />
                <AlertMsg show={showError} onHide={() => setShowError(false)} title={'Ошибка'} body={error} />
            </div>
        </div>
    )
}

export default AddPartner;