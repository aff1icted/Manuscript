import react, { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { useParams } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";
import { Form, FormGroup, Col, Row, Button } from "react-bootstrap";
import axios from 'axios'
import { Loader } from "../components/UI/Loader";
import 'bootstrap/dist/css/bootstrap.min.css';


function AddTag() {

    const LinkTagName = useParams().tagname

    const [tag, setTag] = useState('')
    const [loading, setLoading] = useState(true)
    const [titleText, setTitleText] = useState('')
    const [addVisible, setAddVisible] = useState(true)
    const [editVisible, setEditVisible] = useState(true)

    async function create(type) {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/tag`, type)
        return data
    }


    const addTag = async () => {
        try {
            let data;
            data = await create({ tagname: tag });
            alert("Добавленно")
            setTag('')
        } catch (e) {
            alert(e.response.data.message)
        }
    }



    async function update(type) {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}api/tag`, type)
        return data
    }


    const edtTag = async () => {
        try {
            let data
            const formData = new FormData()
            formData.append('tagname', tag)
            formData.append('oldtagname', LinkTagName)
            data = await update(formData);
            alert("Сохранено")
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    useEffect(() => {

        if (LinkTagName == "creating") {
            setTitleText('Добавление тега/жанра')
            setAddVisible(false)
            setLoading(false)
        } else {
            setTitleText('Изменение тега/жанра')
            setTag(LinkTagName)
            setEditVisible(false)
            setLoading(false)
        }

    }, [])


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
                            <FormGroup className="mb-3" controlId="Tagname">
                                Название тега/жанра
                                <Form.Control required type="text" placeholder="Название тега" value={tag} onChange={e => setTag(e.target.value)} />
                            </FormGroup>

                        </Form>
                    </div>
                </Col>
                <Col md-auto>

                    {/* А здесь кнопки */}
                    <div className="subcolumns-right">

                        <Button variant="secondary" hidden={addVisible} onClick={e => addTag()}>
                            Добавить
                        </Button>

                        <Button variant="secondary" hidden={editVisible} onClick={e => edtTag()} >
                            Сохранить
                        </Button>

                    </div>

                </Col>
            </Row>



        </div >
    )
}

export default AddTag;