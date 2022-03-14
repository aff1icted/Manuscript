import react, { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import { Form, FormGroup } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

function EditAuthor() {
    const [loading, setLoading] = useState(true)
    const [author, setAuthor] = useState([])
    const [description, setDescription] = useState('')
    const [img, setImg] = useState(null)
    const [bookAuthor, setBookAuthor] = useState([])

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

    const selectFile = e => {
        console.log(e.target.files[0])
        setImg(e.target.files[0])
        console.log('img', img)

    }

    const changeAuthor = (key, value, number) => {
        setBookAuthor(bookAuthor.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    return (

        <div className="enter">
            < Form >
                <FormGroup className="mb-3" controlId="bookdate">
                    <Form.Select onChange={(e) => changeAuthor(e.target.value)}>
                        <option selected="true" disabled="disabled">Автор</option>
                        {author.map(option =>
                            <option key={option.fullname} value={option.fullname}>
                                {option.fullname}
                            </option>
                        )}
                    </Form.Select>
                </FormGroup>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="authimg" className="mb-3">
                    <Form.Label>Фотография автора</Form.Label>
                    <Form.Control type="file" onChange={selectFile} />
                </Form.Group>
                <Button variant="secondary" >
                    Изменить
                </Button>
                <Button variant="secondary" >
                   Удалить
                </Button>
            </Form >
        </div>

    )

}

export default EditAuthor;