import React, { useEffect, useState } from "react";
import { Modal, Button, Form, FormGroup, Col, Row } from "react-bootstrap";
import '../../styles/Admcss.css'
import { Loader } from "../UI/Loader";
import axios from "axios";
import { faArrowRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookModal = ({ show, onHide, selectedBook }) => {
    const [loading, setLoading] = useState(true)
    const [tags, setTags] = useState([])
    const [series, setSeries] = useState([])
    const [author, setAuthor] = useState([])
    const [isbn, setIsbn] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [coverart, setCoverart] = useState(null)
    const [formats, setFormats] = useState([])
    const [covers, setCovers] = useState([])
    const [format, setFormat] = useState()
    const [cover, setCover] = useState()
    const [publicationdate, setPublicationdate] = useState()
    const [shortpdf, setShortpdf] = useState()
    const [fullpdf, setFullpdf] = useState()
    const [edition, setEdition] = useState()
    const [pagenumber, setPagenumber] = useState()
    const [price, setPrice] = useState()
    //const [book, setBook] = useState()
    const [books, setBooks] = useState([])
    const [name, setName] = useState('')
    const [selectedCover, setSelectedCover] = useState('Переплет')
    const [selectedFormat, setSelectedFormat] = useState('Формат')
    const [bookAuthor, setBookAuthor] = useState([])
    const [bookTag, setBookTag] = useState([])
    const [bookSeries, setBookSeries] = useState([])
    const [heading, setHeading] = useState('Добавление книги')
    const [addButton,setAddButton] = useState(false)
    const [editButton,setEditButton] = useState(false)


    async function fetchAuthors() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/author`)

        setAuthor(response.data)
    }
    async function fetchSeries() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/series`)

        setSeries(response.data)
    }
    async function fetchtags() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/tag`)
        setTags(response.data)
    }
    async function fetchcovers() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/cover`)
        setCovers(response.data)
    }
    async function fetchformats() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/format`)
        setFormats(response.data)
    }

    useEffect(() => {

        fetchformats()
        fetchcovers()
        fetchAuthors()
        fetchSeries()
        fetchtags().finally(() => setLoading(false))

    }, [])

    const addAuthor = () => {
        setBookAuthor([...bookAuthor, { fullname: author[0].fullname, number: Date.now() }])
    }

    const removeAuthor = (number) => {
        setBookAuthor(bookAuthor.filter(i => i.number !== number))
    }
    const changeAuthor = (key, value, number) => {
        setBookAuthor(bookAuthor.map(i => i.number === number ? { ...i, [key]: value } : i))
    }
    const addTag = () => {
        setBookTag([...bookTag, { tagname: tags[0].tagname, number: Date.now() }])
    }

    const removeTag = (number) => {
        setBookTag(bookTag.filter(i => i.number !== number))
    }
    const changeTag = (key, value, number) => {
        setBookTag(bookTag.map(i => i.number === number ? { ...i, [key]: value } : i))
    }
    const addSeries = () => {
        setBookSeries([...bookSeries, { seriesname: series[0].seriesname, number: Date.now() }])
    }

    const removeSeries = (number) => {
        setBookSeries(bookSeries.filter(i => i.number !== number))
    }
    const changeSeries = (key, value, number) => {
        setBookSeries(bookSeries.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    async function create(type) {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/book`, type)
        return data
    }

    const addBook = async () => {

        try {
            const formData = new FormData()
            formData.append('isbn', isbn)
            formData.append('title', title)
            formData.append('publicationdate', publicationdate)
            formData.append('edition', `${edition}`)
            formData.append('pagenumber', `${pagenumber}`)
            formData.append('description', description)
            formData.append('price', `${price}`)
            formData.append('tags', JSON.stringify(bookTag))
            formData.append('authors', JSON.stringify(bookAuthor))
            formData.append('series', JSON.stringify(bookSeries))
            formData.append('coverart', coverart)
            formData.append('shortpdf', shortpdf)
            formData.append('fullpdf', fullpdf)
            formData.append('formatName', format)
            formData.append('coverCover', cover)
            let data;
            data = await create(formData);
            setIsbn('')
            setTitle('')
            setDescription('')
            setPagenumber('')
            setEdition('')
            setPrice('')
            setBookAuthor([])
            setBookSeries([])
            setBookTag([])
            alert("Добавленно")
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    async function fetchbook() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book`)
        setBooks(response.data)
    }

    async function dbook() {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/book/${selectedBook}`)
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

    async function dataUpdate() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book/${selectedBook}`)
        response.data?.map(function (obj) {

            if (obj.isbn == null) {
                setIsbn('')
            } else {
                setIsbn(obj.isbn)
            }
            if (obj.title == null) {
                setTitle('')
            } else {
                setTitle(obj.title)
            }

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
            if (obj.publicationdate == null) {
                setPublicationdate('')
            } else {
                setPublicationdate(obj.publicationdate)
            }

            if (obj.formatName == null) {
                setFormat('')
            } else {
                setFormat(obj.formatName)
                setSelectedFormat(obj.formatName)
            }

            if (obj.coverCover == null) {
                setCover('')
            } else {
                setCover(obj.coverCover)
                setSelectedCover(obj.coverCover)
            }
            /*сделать обновление файлов
            setShortpdf()
            setFullpdf()
            setCoverart()
            сделать отображение*/
           setBookAuthor(obj.authors)
           setBookSeries(obj.series)
           setBookTag(obj.tags)



        });
    }

    async function Clear() {
        setIsbn('')
        setTitle('')
        setPagenumber('')
        setDescription('')
        setPrice('')
        setEdition('')
        setPublicationdate('')
        setFormat('')
        setCover('')
    }

    async function ubook(type) {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}api/book`, type)
        return data
    }

    //сделать изменение всех данных
    const edtbook = async () => {
        try {
            const formData = new FormData()
            formData.append('isbn', selectedBook)//переделать
            formData.append('title', title)
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
            alert("Изменено")
        } catch (e) {
            alert(e.response.data.message)
        }
    }


    if (loading) {
        return <Loader />
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            onEnter={function () {
                if (selectedBook !== '') {
                    dataUpdate()
                    setHeading('Изменение книги')                    
                    setAddButton(true)
                    setEditButton(false)
                } else {
                    Clear()
                    setHeading('Добавление книги')
                    setAddButton(false)
                    setEditButton(true)
                }
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {heading}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <FormGroup className="mb-3" controlId="isbn">
                        <Form.Control required type="text" placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="bookname">
                        <Form.Control required type="text" placeholder="Название книги" value={title} onChange={e => setTitle(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="bookdate">
                        <Form.Label>Дата публикации</Form.Label>
                        <Form.Control required type="date" value={publicationdate} onChange={e => setPublicationdate(e.target.value)} />
                    </FormGroup>
                    <Row className="mb-3 mx-1">


                        <Button id="authadd" variant="secondary" onClick={addAuthor}>
                            Добавить авторов
                        </Button>
                        {bookAuthor.map(i =>
                            <Row className="my-2" key={i.number}>
                                <Col>
                                    <Form.Select onChange={(e) => changeAuthor('fullname', e.target.value, i.number)}>
                                    <option selected="true" disabled="disabled">{i.fullname}</option>
                                        {author.map(option =>
                                            <option key={option.fullname} value={option.fullname}>
                                                {option.fullname}
                                            </option>
                                        )}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Button
                                        onClick={() => removeAuthor(i.number)}
                                        variant={"secondary"}
                                    >
                                        -
                                    </Button>
                                </Col>
                            </Row>
                        )}



                    </Row>
                    <Row className="mb-3 mx-1">


                        <Button id="authadd" variant="secondary" onClick={addTag}>
                            Добавить теги
                        </Button>
                        {bookTag.map(i =>
                            <Row className="my-2" key={i.number}>
                                <Col>
                                    <Form.Select onChange={(e) => changeTag('tagname', e.target.value, i.number)}>
                                    <option selected="true" disabled="disabled">{i.tagname}</option>
                                        {tags.map(option =>
                                            <option key={option.tagname} value={option.tagname}>
                                                {option.tagname}
                                            </option>
                                        )}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Button
                                        onClick={() => removeTag(i.number)}
                                        variant={"secondary"}
                                    >
                                        -
                                    </Button>
                                </Col>
                            </Row>
                        )}



                    </Row>
                    <Row className="mb-3 mx-1">


                        <Button id="authadd" variant="secondary" onClick={addSeries}>
                            Добавить серии
                        </Button>
                        {bookSeries.map(i =>
                            <Row className="my-2" key={i.number}>
                                <Col>
                                    <Form.Select onChange={(e) => changeSeries('seriesname', e.target.value, i.number)}>
                                    <option selected="true" disabled="disabled">{i.seriesname}</option>
                                        {series.map(option =>
                                            <option key={option.seriesname} value={option.seriesname}>
                                                {option.seriesname}
                                            </option>
                                        )}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Button
                                        onClick={() => removeSeries(i.number)}
                                        variant={"secondary"}
                                    >
                                        -
                                    </Button>
                                </Col>
                            </Row>
                        )}



                    </Row>
                    <FormGroup className="mb-3" controlId="bookdate">
                        <Form.Select onChange={(e) => setCover(e.target.value)}>
                            <option selected="true" disabled="disabled">{selectedCover}</option>
                            {covers.map(option =>
                                <option key={option.cover} value={option.cover}>
                                    {option.cover}
                                </option>
                            )}
                        </Form.Select>
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="bookdate">
                        <Form.Select onChange={(e) => setFormat(e.target.value)}>
                            <option selected="true" disabled="disabled">{selectedFormat}</option>
                            {formats.map(option =>
                                <option key={option.name} value={option.name}>
                                    {option.name}
                                </option>
                            )}
                        </Form.Select>
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
                    <Form.Group controlId="bookimg" className="mb-3">
                        <Form.Label>Обложка книги</Form.Label>
                        <Form.Control type="file" onChange={e => setCoverart(e.target.files[0])} />
                    </Form.Group>
                    <Form.Group controlId="bookimg" className="mb-3">
                        <Form.Label>Короткий PDF</Form.Label>
                        <Form.Control type="file" onChange={e => setShortpdf(e.target.files[0])} />
                    </Form.Group>
                    <Form.Group controlId="bookimg" className="mb-3">
                        <Form.Label>Полный PDF</Form.Label>
                        <Form.Control type="file" onChange={e => setFullpdf(e.target.files[0])} />
                    </Form.Group>

                    <Button variant="secondary" onClick={addBook} hidden={addButton}>
                        Добавить
                    </Button>
                    <Button variant="secondary" onClick={edtbook} hidden={editButton}>
                        Изменить
                    </Button>
                    <Button variant="secondary" onClick={deletebook} hidden={editButton}>
                        Удалить
                    </Button>

                </Form>

            </Modal.Body>
            <Modal.Footer>                
            </Modal.Footer>
        </Modal>
    )
}

export default BookModal