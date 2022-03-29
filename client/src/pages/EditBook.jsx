import react, { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import Books from "./Books";
import { Loader } from "../components/UI/Loader";
import { faArrowRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";

function EditBook() {

    const [name, setName] = useState('')
    const [format, setFormat] = useState()
    const [book, setBook] = useState()
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [isbn, setIsbn] = useState('')
    const [pagenumber, setPagenumber] = useState('')
    const [edition, setEdition] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    async function fetchbook() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book`)
        setBooks(response.data)
    }

    async function dbook() {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/book/${book}`)
        return data
    }


    const deletebook = async () => {

        try {
            let data;
            data = await dbook();
            alert("удалено")
        } catch (e) {
            alert(e.response.data.message)
        }
    }


    useEffect(() => {
        setTimeout(() => {
            fetchbook().finally(() => setLoading(false))
        }, 1000);
    }, [])

    // сделать получение нехванающих данных
    const dataUpdate = (value) => {
        books.map(function (obj) {
            if (obj.title == book) {
                setName(obj.title)
                setIsbn(obj.isbn)

                if (obj.pagenumber == null) {
                    setPagenumber('')
                } else {
                    setPagenumber(obj.pagenumber)
                }
                if (obj.description == null) {
                    setDescription('')
                } else {
                    setDescription(obj.description)
                }
                if (obj.price == null) {
                    setPrice('')
                } else {
                    setPrice(obj.price)
                }
                if (obj.edition == null) {
                    setEdition('')
                } else {
                    setEdition(obj.edition)
                }



            }
        });
    }


    async function ubook(type) {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}api/book`, type)
        return data
    }

    const edtbook = async () => {
        try {
            const formData = new FormData()
            formData.append('title', name)
            formData.append('isbn', isbn)
            formData.append('pagenumber', pagenumber)
            formData.append('edition', edition)
            formData.append('price', price)
            formData.append('description', description)
            let data;
            data = await ubook(formData);
            setName('')
            setIsbn('')
            setPagenumber('')
            setEdition('')
            setPrice('')
            setDescription('')
        } catch (e) {
            alert(e.response.data.message)
        }        
    }

    if (loading) {
        return <Loader />
    }
    return (
        <div className="enter">
            <Form>

                <Row className="justify-content-md-center">
                    <Col>
                        <FormGroup className="mb-3" controlId="bookdate">
                            <Form.Select onChange={(e) => setBook(e.target.value)}>
                                <option selected="true" disabled="disabled">Книга</option>
                                {books.map(option =>
                                    <option key={option.title} value={option.title}>
                                        {option.title}
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
                <FormGroup className="mb-3" controlId="isbn">
                    <Form.Control required type="text" placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} />
                </FormGroup>

                <FormGroup className="mb-3" controlId="authname">
                    <Form.Control required type="text" placeholder="Название" value={name} onChange={e => setName(e.target.value)} />
                </FormGroup>

                <FormGroup className="mb-3" controlId="isbn">
                    <Form.Control required type="text" placeholder="Количество страниц" value={pagenumber} onChange={e => setPagenumber(e.target.value)} />
                </FormGroup>

                <FormGroup className="mb-3" controlId="isbn">
                    <Form.Control required type="text" placeholder="Тираж" value={edition} onChange={e => setEdition(e.target.value)} />
                </FormGroup>
                <FormGroup className="mb-3" controlId="isbn">
                    <Form.Control required type="text" placeholder="Цена" value={price} onChange={e => setPrice(e.target.value)} />
                </FormGroup>

                <Form.Group className="mb-3" controlId="BookDescr">
                    <Form.Control required as="textarea" rows='3' placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Group>

                <Button variant="secondary" onClick={edtbook} >
                    Обновить
                </Button>


                <Button variant="secondary" onClick={deletebook} >
                    Удалить
                </Button>

            </Form>

        </div >

    )
}

export default EditBook;