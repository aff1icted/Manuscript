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
import { createAuthor, updateAuthor } from "../http/authorApi";


function AddAuthor() {
    const hist = useHistory()
    const LinkFullName = useParams().fullname
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(true)
    const [img, setImg] = useState(null)
    const [name, setName] = useState('')
    const [titleText, setTitleText] = useState('')
    const [addVisible, setAddVisible] = useState(true)
    const [editVisible, setEditVisible] = useState(true)
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')


    const addAuthor = async () => {

        try {
            if (name== '') {
                throw('Все обязательные поля должны быть заполнены')
            }
            const formData = new FormData()
            formData.append('fullname', name)
            formData.append('about', description)
            formData.append('img', img)
            createAuthor(formData)
            setShowCreate(true)
        } catch (e) {
            setError(e)
            setShowError(true)
        }
    }


    async function fetchAuthor() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/author/${LinkFullName}`)
        setName(response.data.fullname)
        setDescription(response.data.about)
        setImg(response.data.photo)
    }

    useEffect(() => {

        if (LinkFullName === "creating") {
            setTitleText('Добавление автора')
            setAddVisible(false)
            setLoading(false)
        } else {
            setTitleText('Изменение автора')
            setEditVisible(false)
            fetchAuthor().finally(() => setLoading(false))
        }

    }, [])

    const edtAuthor = async () => {
        try {
            if (name== '') {
                throw('Все обязательные поля должны быть заполнены')
            }
            const formData = new FormData()
            formData.append('fullname', name)
            formData.append('oldfullname', LinkFullName)
            formData.append('about', description)
            formData.append('img', img)

            updateAuthor(formData)
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
        <div className="col-10 mx-auto blocks">
            <NavAdmin />
            <div className="enter">

                <Row className="justify-content-md-center">
                    <Col md-4>
                        {/* Основная часть, здесь размещать таблицы и проч */}
                        <div className="subcolumns-left">
                            <Form>
                                <h2>{titleText}</h2>
                                <FormGroup className="mb-3" controlId="AuthorFullName">
                                    Полное имя<span style={{color:"red"}}>*</span>
                                    <Form.Control required type="text" placeholder="Полное имя" value={name} onChange={e => setName(e.target.value)} />
                                </FormGroup>
                                <Form.Group className="mb-3" controlId="AuthorDescr">
                                    Описание
                                    <Form.Control as="textarea" rows='3' placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="authimg" className="mb-3">
                                    <Form.Label>Фотография автора <span style={{color:"gray"}}>(Рек. размер 360х400 пикселей, JPG)</span></Form.Label>
                                    <Form.Control type="file" onChange={e => setImg(e.target.files[0])} />
                                </Form.Group>
                            </Form >
                        </div>
                    </Col>
                    <Col md-auto>
                        {/* А здесь кнопки */}
                        <div className="subcolumns-right">

                            <Button variant="secondary" hidden={addVisible} onClick={e => addAuthor()}>
                                Добавить
                            </Button>

                            <Button variant="secondary" hidden={editVisible} onClick={e => edtAuthor()} >
                                Сохранить
                            </Button>


                        </div>

                    </Col >
                </Row >
                <AlertMsg show={showCreate} onHide={() => { setShowCreate(false); hist.goBack() }} title={'Оповещение'} body={`Автор ${name} создан`} />
                <AlertMsg show={showEdit} onHide={() => { setShowEdit(false); hist.goBack() }} title={'Оповещение'} body={`Автор ${LinkFullName} изменен`} />
                <AlertMsg show={showError} onHide={() => setShowError(false)} title={'Ошибка'} body={error} />
            </div>
        </div>
    )
}

export default AddAuthor;