import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Loader } from "../components/UI/Loader";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import BookModal from "../components/modals/BookModal";




function AdminBook() {
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState('')
    const [currentBook, SetCurrentBook] = useState('')
    const [bookModalVisible, setBookModalVisible] = useState(false)


    async function fetchbook() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book`)
        console.log('data', response.data)
        response.data.map(book => book.authors = List(book.authors))
        setBooks(response.data)
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
        fetchbook().finally(() => setLoading(false))
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

    const add = () => {
        setSelectedBook('')
        setBookModalVisible(true)
    }
    const edit = () => {
        setSelectedBook(currentBook)
        setBookModalVisible(true)
    }



    if (loading) {
        return <Loader />
    }
    return (
        <div className="enter">
            <BootstrapTable
                keyField="isbn"
                data={books}
                columns={columns}
                hover="true"
                selectRow={selectRow}
                rowEvents={rowEvents}
            />
            <Button variant="secondary" onClick={() => edit()} >
                Изменить
            </Button>
            <Button variant="secondary" onClick={() => add()} >
                Добавить
            </Button>

            <BookModal show={bookModalVisible} onHide={() => setBookModalVisible(false)} selectedBook={selectedBook} />
        </div>
    )
}

export default AdminBook;