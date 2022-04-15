import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, FormGroup, Col, Row, Button, } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Loader } from "../components/UI/Loader";
import { useHistory } from "react-router-dom";

function AdminAuthor() {
    const hist=useHistory()
    const [authors, setAuthors] = useState([])
    const [filteredAuthors, setFilteredAuthors] = useState([])
    const [currentAuthor, setCurrentAuthor] = useState('')
    const [loading, setLoading] = useState(true)
    const [filterHide, setFilterHide] = useState(true)
    const [filterButton, setFIlterButton] = useState('Показать фильтр')
    const [nameSearch, setNameSearch] = useState('')

    async function fetchauthors() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/author`)
        setAuthors(response.data)
        setFilteredAuthors(response.data)
    }

    useEffect(() => {
        fetchauthors().finally(() => setLoading(false))
    }, [])


    const columns = [
        { dataField: "fullname", text: "ФИО" }
    ]

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true
    };

    const rowEvents = {
        onClick: (e, row) => {
            setCurrentAuthor(row.fullname)
        }
    }

    function Filtr() {

        setFilteredAuthors(authors.filter(author => author.fullname.toLowerCase().includes(nameSearch.toLowerCase())))

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

    async function dauthor() {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/author/${currentAuthor}`)
        return data
    }

    const deleteauthor = async () => {

        try {
            let data;
            data = await dauthor();
            fetchauthors()
            Filtr()
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
                        <div hidden={filterHide}>
                            <input value={nameSearch} onChange={e => setNameSearch(e.target.value)} placeholder="Поиск по ФИО" />
                            <Button onClick={Filtr}>Поиск</Button>
                        </div>
                        <Button onClick={FilterClic}>{filterButton}</Button>
                        <BootstrapTable
                            keyField="fullname"
                            data={filteredAuthors}
                            columns={columns}
                            hover="true"
                            selectRow={selectRow}
                            rowEvents={rowEvents}
                        />


                    </div>

                </Col>

                <Col md-auto>

                    {/* А здесь кнопки */}
                    <div className="subcolumns-right">
                        <Button variant="secondary" onClick={e => hist.push('/admin/author/creating')}>
                            Добавить
                        </Button>
                        <Button variant="secondary" onClick={e => hist.push(`/admin/author/${currentAuthor}`)}>
                            Изменить
                        </Button>
                        <Button variant="secondary" onClick={e => deleteauthor()}>
                            Удалить
                        </Button>
                    </div>

                </Col>
            </Row>

        </div>

    )
}

export default AdminAuthor