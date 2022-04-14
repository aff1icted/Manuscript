import { useEffect, useMemo, useState } from "react";
import '../styles/Admcss.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from "../components/UI/Loader";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Col, Row } from "react-bootstrap";
import BookModal from "../components/modals/BookModal";




function AdminBook() {
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState('')
    const [currentBook, SetCurrentBook] = useState('')
    const [bookModalVisible, setBookModalVisible] = useState(false)
    const [titleSearch, setTitleSearch] = useState('')
    const [isbnSearch, setIsbnSearch] = useState('')
    const [authorSearch, setAuthorSearch] = useState('')
    const [filteredBook, setFilteredBook] = useState([])
    const [authors, setAuthors] = useState([])
    const [filterHide, setFilterHide] = useState(true)
    const [filterButton, setFIlterButton] = useState('Показать фильтр')

    async function fetchAuthors() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/author`)
        setAuthors(response.data)
    }


    async function fetchbook() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book`)
        console.log('data', response.data)
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
        fetchbook().finally(() => setLoading(false))
    }, [])


    const columns = [
        { dataField: "isbn", text: "ISBN" },
        { dataField: "title", text: "Название" },
        { dataField: "authors", text: "Авторы" }
    ]

    //const [value,setValue]=useState([])

    const selectRow = {
        mode: 'radio',
        /*mode: 'checkbox',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (!(value.some(item => row.isbn === item.isbn))) {
                const selectedData = {
                    isbn: row.isbn
                };
                setValue(value => [...value, selectedData]);
                console.log('value',value)
            } else {
                setValue(value.filter(item => item.isbn !== row.isbn));
                console.log('value',value)
            }
        },*/

        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true
    };

    const rowEvents = {
        onClick: (e, row) => {
            SetCurrentBook(row.isbn)
        }
    }

    const add = () => {
        setSelectedBook('')
        setBookModalVisible(true)
    }
    const edit = () => {
        setSelectedBook(currentBook)
        setBookModalVisible(true)
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


    if (loading) {
        return <Loader />
    }
    return (
        <div className="enter">

            <Row className="justify-content-md-center">
                <Col md-4>
                    <div className="subcolumns-left">
                        <div hidden={filterHide}>
                            <input value={isbnSearch} onChange={e => setIsbnSearch(e.target.value)} placeholder="Поиск по ISBN" />
                            <input value={titleSearch} onChange={e => setTitleSearch(e.target.value)} placeholder="Поиск по названию" />
                            <select onChange={(e) => setAuthorSearch(e.target.value)}>
                                <option selected="true" value={''}>{''}</option>
                                {authors.map(option =>
                                    <option key={option.fullname} value={option.fullname}>
                                        {option.fullname}
                                    </option>
                                )}
                            </select>
                            <Button onClick={Filtr}>Поиск</Button>
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
                        <Button variant="secondary" onClick={() => add()}>
                            Добавить
                        </Button>
                        <Button variant="secondary" onClick={() => edit()}>
                            Изменить
                        </Button>
                        <Button variant="secondary">
                            Сохранить
                        </Button>
                        <Button variant="secondary">
                            Удалить
                        </Button>
                    </div>
                </Col>
            </Row>

            <BookModal show={bookModalVisible} onHide={() => setBookModalVisible(false)} selectedBook={selectedBook} />
        </div>
    )
}

export default AdminBook;