import react, { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import { Form, FormGroup } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Loader } from "../components/UI/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateBack } from "@fortawesome/free-solid-svg-icons";


function EditAuthor() {
    const [loading, setLoading] = useState(true)
    const [author, setAuthor] = useState([])
    const [description, setDescription] = useState('')
    const [img, setImg] = useState(null)
    const [authorName, setAuthorName] = useState('')
    const [name, setName] = useState('')

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
            alert("удалено")
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
                <FormGroup className="mb-3" controlId="authname">
                    <Form.Control required type="text" placeholder="Название" value={name} onChange={e => setName(e.target.value)} />
                </FormGroup>

                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="authimg" className="mb-3">
                    <Form.Label>Фотография автора</Form.Label>
                    <Form.Control type="file" onChange={e =>setImg(e.target.files[0])} />
                </Form.Group>
                <Button variant="secondary" >
                    Изменить
                </Button>
                <Button variant="secondary" onClick={deleteauthor}>
                    Удалить
                </Button>
            </Form >
        </div>

    )

}

export default EditAuthor;