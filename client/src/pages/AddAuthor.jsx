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
    const [showCreate,setShowCreate]=useState(false)
    const [showEdit,setShowEdit]=useState(false)



    async function create(type) {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/author`, type)
        return data
    }


    const addAuthor = async () => {

        try {
            const formData = new FormData()
            formData.append('fullname', name)
            formData.append('about', description)
            formData.append('img', img)
            let data;
            data = await create(formData);
            setShowCreate(true)
        } catch (e) {
            alert(e.response.data.message)
        }
    }






    async function fetchAuthor() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/author/${LinkFullName}`)
        setName(response.data.fullname)
        setDescription(response.data.about)
        setImg(response.data.photo)
    }

    useEffect(() => {

        if (LinkFullName == "creating") {
            setTitleText('Добавление автора')
            setAddVisible(false)
            setLoading(false)
        } else {
            setTitleText('Изменение автора')
            setEditVisible(false)
            fetchAuthor().finally(() => setLoading(false))
        }

    }, [])






    async function uauthor(type) {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}api/author`, type)
        return data
    }

    const edtAuthor = async () => {
        try {
            const formData = new FormData()
            formData.append('fullname', name)
            formData.append('oldfullname', LinkFullName)
            formData.append('about', description)
            formData.append('img', img)
            let data;
            data = await uauthor(formData);
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
                            <FormGroup className="mb-3" controlId="AuthorFullName">
                                Полное имя
                                <Form.Control required type="text" placeholder="Полное имя" value={name} onChange={e => setName(e.target.value)} />
                            </FormGroup>
                            <Form.Group className="mb-3" controlId="AuthorDescr">
                                Описание
                                <Form.Control as="textarea" rows='3' placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="authimg" className="mb-3">
                                <Form.Label>Фотография автора</Form.Label>
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
            <AlertMsg show={showEdit} onHide={() => { setShowEdit(false); hist.goBack() }} title={'Оповещение'} body={`Автор ${LinkFullName} добавлен`} />
        </div>
    )
}

export default AddAuthor;