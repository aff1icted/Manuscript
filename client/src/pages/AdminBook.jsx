import { useEffect, useMemo, useState } from "react";
import '../styles/Admcss.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from "../components/UI/Loader";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import AlertButton from "../components/modals/AlertButton";
import { deleteBook } from "../http/bookApi";




function AdminBook() {
    const hist = useHistory()
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [currentBook, SetCurrentBook] = useState('')
    const [titleSearch, setTitleSearch] = useState('')
    const [isbnSearch, setIsbnSearch] = useState('')
    const [authorSearch, setAuthorSearch] = useState('')
    const [filteredBook, setFilteredBook] = useState([])
    const [authors, setAuthors] = useState([])
    const [filterHide, setFilterHide] = useState(true)
    const [filterButton, setFIlterButton] = useState('Показать фильтр')
    const [show, setShow] = useState(false)

    async function fetchAuthors() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/author`)
        setAuthors(response.data)
    }

    async function fetchbooks() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book`)
        response.data.map(book => book.authors = List(book.authors))
        setBooks(response.data)
        setFilteredBook(response.data)
    }


    function List(authors) {
        let buf = []
        authors?.map(author => buf.push(author.fullname))

        if (!authors?.length) {
            return "Авторы не указаны"
        }
        return buf.toString()
    };

    useEffect(() => {
        fetchAuthors()
        fetchbooks().finally(() => setLoading(false))
    }, [])


    const columns = [
        { dataField: "isbn", text: "ISBN" },
        { dataField: "title", text: "Название" },
        { dataField: "authors", text: "Авторы" }
    ]

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true
    };

    const rowEvents = {
        onClick: (e, row) => {
            SetCurrentBook(row.isbn)
        }
    }

    function Filtr() {
        setFilteredBook(books.filter(book => book.title.toLowerCase().includes(titleSearch.toLowerCase()) && book.isbn.toLowerCase().includes(isbnSearch.toLowerCase())
            && book.authors.toLowerCase().includes(authorSearch.toLowerCase())))
    };

    function FilterClic() {
        if (filterHide) {
            setFilterHide(false)
            setFIlterButton('Скрыть фильтр')
        } else {
            setFilterHide(true)
            setFIlterButton('Показать фильтр')
        }
    };


    const deletebook = async () => {

        try {
            deleteBook(currentBook).then(() => {
                fetchbooks()
                Filtr()
                SetCurrentBook('')
            })

        } catch (e) {
            alert(e.response.data.message)
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
                        <div className="subcolumns-left">
                            <div style={{ display: "flex", paddingBottom: "10px", alignItems: "flex-end" }} hidden={filterHide} >
                                <div style={{ paddingRight: "30px", width: "60%" }}>
                                    <div>
                                        Поиск по ISBN
                                    </div>
                                    <div>
                                        <input size="35" value={isbnSearch} onChange={e => setIsbnSearch(e.target.value)} placeholder="Поиск по ISBN" />
                                    </div>
                                    <div>
                                        Поиск по названию
                                    </div>
                                    <div>
                                        <input size="35" value={titleSearch} onChange={e => setTitleSearch(e.target.value)} placeholder="Поиск по названию" />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        Поиск по автору
                                    </div>
                                    <div style={{ paddingBottom: "10px" }}>
                                        <select onChange={(e) => setAuthorSearch(e.target.value)}>
                                            <option selected="true" value={''}>{''}</option>
                                            {authors.map(option =>
                                                <option key={option.fullname} value={option.fullname}>
                                                    {option.fullname}
                                                </option>
                                            )}
                                        </select>
                                    </div>



                                    <Button onClick={Filtr}>Поиск</Button></div>
                            </div>
                            <Button onClick={FilterClic}>{filterButton}</Button>
                            <BootstrapTable
                                keyField="isbn"
                                data={filteredBook}
                                columns={columns}
                                hover="true"
                                selectRow={selectRow}
                                rowEvents={rowEvents}
                            />
                        </div>
                    </Col>
                    <Col md-auto>
                        <div className="subcolumns-right">
                            <Button variant="secondary" onClick={e => hist.push('/admin/book/creating')}>
                                Добавить
                            </Button>
                            <Button variant="secondary" onClick={e => hist.push(`/admin/book/${currentBook}`)}>
                                Изменить
                            </Button>
                            <Button variant="secondary" onClick={e => {
                                if (currentBook != '') {
                                    setShow(true)
                                }
                            }}>
                                Удалить
                            </Button>
                        </div>
                    </Col>
                </Row>
                <AlertButton show={show} onHide={() => setShow(false)} title={'Удаление'} body={`Вы уверены, что хотите удалить книгу ${currentBook}?`} buttontext='Да, удалить' buttonfunc={() => { deletebook(); setShow(false) }} />
            </div>
        </div>
    )
}

export default AdminBook;