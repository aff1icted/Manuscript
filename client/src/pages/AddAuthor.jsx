import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Loader } from "../components/UI/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateBack } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";


function AddAuthor() {

    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(true)
    const [img, setImg] = useState(null)
    const [author, setAuthor] = useState([])
    const [authorName, setAuthorName] = useState('')
    const [name, setName] = useState('')



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
            setName('')
            setDescription('')
            setImg(null)
            alert('Добавленно')
        } catch (e) {
            alert(e.response.data.message)
        }
    }






    async function fetchAuthors() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/author`)
        console.log(response.data[0].fullname)
        setAuthor(response.data)
    }

    useEffect(() => {
        setTimeout(() => {

            fetchAuthors().finally(() => setLoading(false))
        }, 1000);
    }, [])



    async function dauthor() {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/author/${authorName}`)
        return data
    }

    const deleteauthor = async () => {

        try {
            let data;
            data = await dauthor();
            alert("Удалено")
        } catch (e) {
            alert(e.response.data.message)
        }
    }


    const dataUpdate = (value) => {
        author.map(function (obj) {
            if (obj.fullname == authorName) {
                setName(obj.fullname)

                if (obj.about == null) {
                    setDescription('')
                } else {
                    setDescription(obj.about)
                }

                if (obj.photo == null) {
                    setImg('')
                } else {
                    setImg(obj.photo)
                }

            }
        });
    }

    async function uauthor(type) {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}api/author`, type)
        return data
    }

    const edtAuthor = async () => {
        try {
            const formData = new FormData()
            formData.append('fullname', name)
            formData.append('about', description)
            formData.append('photo', img)
            let data;
            data = await uauthor(formData);
            setName('')
            setDescription('')
            setImg(null)
            alert('Изменено')
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    if (loading) {
        return <Loader />
    }
    return (
        <div className="enter">

            < Form >
                <Row className="justify-content-md-center">
                    <Col>
                        <FormGroup className="mb-3" controlId="bookdate">
                            <Form.Select onChange={(e) => setAuthorName(e.target.value)}>
                                <option selected="true" disabled="disabled">Автор</option>
                                {author.map(option =>
                                    <option key={option.fullname} value={option.fullname}>
                                        {option.fullname}
                                    </option>
                                )}
                            </Form.Select>
                        </FormGroup>
                    </Col>
                    <Col md="auto">
                        <Button variant="secondary" onClick={dataUpdate}>
                            <FontAwesomeIcon icon={faArrowRotateBack} />
                        </Button>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="AuthorFullName">
                    <Form.Control required type="text" placeholder="Полное имя" value={name} onChange={e => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="authimg" className="mb-3">
                    <Form.Label>Фотография автора</Form.Label>
                    <Form.Control type="file" onChange={e => setImg(e.target.files[0])} />
                </Form.Group>

                <Button variant="secondary" onClick={addAuthor}>
                    Добавить
                </Button>
                <Button variant="secondary" onClick={edtAuthor}>
                    Изменить
                </Button>
                <Button variant="secondary" onClick={deleteauthor}>
                    Удалить
                </Button>
            </Form >

        </div>
    )
}

export default AddAuthor;