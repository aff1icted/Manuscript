import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Loader } from "../components/UI/Loader";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import AlertMsg from "../components/modals/AlertMsg";
import NavAdmin from "../components/UI/NavAdmin";
import { createBook, updateBook } from "../http/bookApi";

function AddBook() {
    const hist = useHistory()
    const LinkIsbn = useParams().isbn
    const [loading, setLoading] = useState(true)
    const [tags, setTags] = useState([])
    const [series, setSeries] = useState([])
    const [authors, setAuthors] = useState([])
    const [isbn, setIsbn] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [coverart, setCoverart] = useState(null)
    const [formats, setFormats] = useState([])
    const [covers, setCovers] = useState([])
    const [format, setFormat] = useState('')
    const [cover, setCover] = useState('')
    const [publicationdate, setPublicationdate] = useState('')
    const [shortpdf, setShortpdf] = useState(null)
    const [fullpdf, setFullpdf] = useState(null)
    const [edition, setEdition] = useState('')
    const [pagenumber, setPagenumber] = useState('')
    const [price, setPrice] = useState('')
    const [titleText, setTitleText] = useState('')
    const [addVisible, setAddVisible] = useState(true)
    const [editVisible, setEditVisible] = useState(true)
    const [oldCoverart, setOldCoverart] = useState(null)
    const [oldShortpdf, setOldShortpdf] = useState(null)
    const [oldFullpdf, setOldFullpdf] = useState(null)
    const [selectedCover, setSelectedCover] = useState('Переплет')
    const [selectedFormat, setSelectedFormat] = useState('Формат')
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')

    async function fetchAuthors() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/author`)
        setAuthors(response.data)
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

    async function fetchbook() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book/${LinkIsbn}`)
        setIsbn(response.data.isbn)
        setTitle(response.data.title)
        setPublicationdate(response.data.publicationdate)
        response.data.authors?.map(author => setSelectedAuthor(selectedAuthor => [...selectedAuthor, author.fullname]))
        response.data.tags?.map(tag => setSelectedTag(selectedTag => [...selectedTag, tag.tagname]))
        response.data.series?.map(series => setSelectedSeries(selectedSeries => [...selectedSeries, series.seriesname]))
        setCover(response.data.coverCover)
        setSelectedCover(response.data.coverCover)
        setFormat(response.data.formatName)
        setSelectedFormat(response.data.formatName)
        setPagenumber(response.data.pagenumber)
        setEdition(response.data.edition)
        setPrice(response.data.price)
        setDescription(response.data.description)
        setCoverart(response.data.coverart)
        setShortpdf(response.data.shortpdf)
        setFullpdf(response.data.fullpdf)
        setOldCoverart(response.data.coverart)
        setOldFullpdf(response.data.shortpdf)
        setOldShortpdf(response.data.fullpdf)
    }

    useEffect(() => {
        if (LinkIsbn === "creating") {
            setTitleText('Добавление книги')
            setAddVisible(false)
            fetchformats()
            fetchcovers()
            fetchAuthors()
            fetchSeries()
            fetchtags().finally(() => setLoading(false))
        } else {
            setTitleText('Изменение книги')
            setEditVisible(false)
            fetchbook()
            fetchformats()
            fetchcovers()
            fetchAuthors()
            fetchSeries()
            fetchtags().finally(() => setLoading(false))
        }

    }, [])   

    const addBook = async () => {
        try {
            if (isbn == '' || title == '' || publicationdate == '' || selectedTag.length == 0 || 
            selectedAuthor.length == 0  ||  format == '' ||  cover == '' || pagenumber == '' || edition == '' || price == '' ||coverart === null) {
                throw('Все обязательные поля должны быть заполнены')
            }
            if(isNaN(pagenumber)|| isNaN(edition)|| isNaN(price) ){
                throw('Количество страниц, тираж и цена должены быть числами')
            }
            const formData = new FormData()
            formData.append('isbn', isbn)
            formData.append('title', title)
            formData.append('publicationdate', publicationdate)
            formData.append('edition', `${edition}`)
            formData.append('pagenumber', `${pagenumber}`)
            formData.append('description', description)
            formData.append('price', `${price}`)
            formData.append('tags', JSON.stringify(selectedTag))
            formData.append('authors', JSON.stringify(selectedAuthor))
            formData.append('series', JSON.stringify(selectedSeries))
            formData.append('coverart', coverart)
            formData.append('shortpdf', shortpdf)
            formData.append('fullpdf', fullpdf)
            formData.append('formatName', format)
            formData.append('coverCover', cover)          
            createBook(formData)
            setShowCreate(true)
        } catch (e) {
            setError(e)
            setShowError(true)
        }
    }

    

    const edtbook = async () => {
        try {
            if (isbn == '' || title == '' || publicationdate == '' || selectedTag.length == 0 || 
            selectedAuthor.length == 0  ||  format == '' ||  cover == '' || pagenumber == '' || edition == '' || price == '' ||coverart === null) {
                throw('Все обязательные поля должны быть заполнены')
            }
            if(isNaN(pagenumber)|| isNaN(edition)|| isNaN(price) ){
                throw('Количество страниц, тираж и цена должены быть числами')
            }
            const formData = new FormData()
            formData.append('oldisbn', LinkIsbn)
            formData.append('isbn', isbn)
            formData.append('title', title)
            formData.append('publicationdate', publicationdate)
            formData.append('edition', `${edition}`)
            formData.append('pagenumber', `${pagenumber}`)
            formData.append('description', description)
            formData.append('price', `${price}`)
            formData.append('tags', JSON.stringify(selectedTag))
            formData.append('authors', JSON.stringify(selectedAuthor))
            formData.append('series', JSON.stringify(selectedSeries))
            formData.append('oldcoverart', oldCoverart)
            formData.append('coverart', coverart)
            formData.append('oldshortpdf', oldFullpdf)
            formData.append('shortpdf', shortpdf)
            formData.append('oldfullpdf', oldShortpdf)
            formData.append('fullpdf', fullpdf)
            formData.append('formatName', format)
            formData.append('coverCover', cover)
            updateBook(formData)
            setShowEdit(true)
        } catch (e) {
            setError(e)
            setShowError(true)
        }
    }


    const [selectedAuthor, setSelectedAuthor] = useState([])

    const columnsAuthor = [
        { dataField: "fullname" }
    ]

    const selectRowAuthor = {
        mode: 'checkbox',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (!(selectedAuthor.some(item => row.fullname === item))) {
                setSelectedAuthor(selectedAuthor => [...selectedAuthor, row.fullname]);
            } else {
                setSelectedAuthor(selectedAuthor.filter(item => item !== row.fullname));
            }
        },
        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true,
        selected: selectedAuthor
    };

    const [selectedTag, setSelectedTag] = useState([])

    const columnsTag = [
        { dataField: "tagname" }
    ]

    const selectRowTag = {
        mode: 'checkbox',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (!(selectedTag.some(item => row.tagname === item))) {
                setSelectedTag(selectedTag => [...selectedTag, row.tagname]);
            } else {
                setSelectedTag(selectedTag.filter(item => item !== row.tagname));
            }
        },
        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true,
        selected: selectedTag
    };


    const [selectedSeries, setSelectedSeries] = useState([])

    const columnsSeries = [
        { dataField: "seriesname" }
    ]

    const selectRowSeries = {
        mode: 'checkbox',
        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            if (!(selectedSeries.some(item => row.seriesname === item))) {

                setSelectedSeries(selectedSeries => [...selectedSeries, row.seriesname]);
            } else {
                setSelectedSeries(selectedSeries.filter(item => item !== row.seriesname));
            }
        },
        selected: selectedSeries
    };


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
                                <FormGroup className="mb-3" controlId="isbn">
                                    ISBN<span style={{color:"red"}}>*</span>
                                    <Form.Control required type="text" placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} />
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="bookname">
                                    Название книги<span style={{color:"red"}}>*</span>
                                    <Form.Control required type="text" placeholder="Название книги" value={title} onChange={e => setTitle(e.target.value)} />
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="bookdate">
                                    <Form.Label>Дата выпуска<span style={{color:"red"}}>*</span></Form.Label>
                                    <Form.Control required type="date" value={publicationdate} onChange={e => setPublicationdate(e.target.value)} />
                                </FormGroup>
                                <Form.Label>Авторы<span style={{color:"red"}}>*</span></Form.Label>
                                <div style={{ height: "150px", overflow: "auto"}}>
                                    <BootstrapTable
                                        keyField="fullname"
                                        data={authors}
                                        columns={columnsAuthor}
                                        hover="true"
                                        selectRow={selectRowAuthor}
                                        selected={selectedAuthor}
                                    />
                                </div>
                                <Form.Label style={{paddingTop:"30px"}}>Теги/Жанры<span style={{color:"red"}}>*</span></Form.Label>
                                <div style={{ height: "150px", overflow: "auto" }}>
                                    <BootstrapTable
                                        keyField="tagname"
                                        data={tags}
                                        columns={columnsTag}
                                        hover="true"
                                        selectRow={selectRowTag}
                                        selected={selectedTag}
                                    />
                                </div>
                                <Form.Label style={{paddingTop:"30px"}}>Серии</Form.Label>
                                <div style={{ height: "150px", overflow: "auto" }}>
                                    <BootstrapTable
                                        keyField="seriesname"
                                        data={series}
                                        columns={columnsSeries}
                                        hover="true"
                                        selectRow={selectRowSeries}
                                        selected={selectedSeries}
                                    />
                                </div>

                                <FormGroup className="mb-3" controlId="bookdate">
                                    Переплет<span style={{color:"red"}}>*</span>
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
                                    Формат<span style={{color:"red"}}>*</span>
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
                                    Количество страниц<span style={{color:"red"}}>*</span>
                                    <Form.Control required type="text" placeholder="Количество страниц" value={pagenumber} onChange={e => setPagenumber(e.target.value)} />
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="isbn">
                                    Тираж<span style={{color:"red"}}>*</span>
                                    <Form.Control required type="text" placeholder="Тираж" value={edition} onChange={e => setEdition(e.target.value)} />
                                </FormGroup>
                                <FormGroup className="mb-3" controlId="isbn">
                                    Цена<span style={{color:"red"}}>*</span>
                                    <Form.Control required type="text" placeholder="Цена" value={price} onChange={e => setPrice(e.target.value)} />
                                </FormGroup>



                                <Form.Group className="mb-3" controlId="BookDescr">
                                    Описание
                                    <Form.Control required as="textarea" rows='3' placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="bookimg" className="mb-3">
                                    <Form.Label>Обложка книги<span style={{color:"red"}}>*</span> <span style={{color:"gray"}}>(Рек. размер 360х400 пикселей, JPG)</span></Form.Label>
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
                            </Form>
                        </div>
                    </Col>
                    <Col md-auto>
                        {/* А здесь кнопки */}
                        <div className="subcolumns-right">
                            <Button variant="secondary" hidden={addVisible} onClick={e => addBook()}>
                                Добавить
                            </Button>

                            <Button variant="secondary" hidden={editVisible} onClick={e => edtbook()} >
                                Сохранить
                            </Button>
                        </div>
                    </Col >
                </Row >

                <AlertMsg show={showCreate} onHide={() => { setShowCreate(false); hist.goBack() }} title={'Оповещение'} body={`Книга ${isbn} создана`} />
                <AlertMsg show={showEdit} onHide={() => { setShowEdit(false); hist.goBack() }} title={'Оповещение'} body={`Книга ${LinkIsbn} изменена`} />
                <AlertMsg show={showError} onHide={() => setShowError(false)} title={'Ошибка'} body={error} />

            </div>
        </div>



    )
}

export default AddBook;