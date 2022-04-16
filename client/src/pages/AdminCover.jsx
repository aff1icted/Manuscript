import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Col, Row, Button, } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Loader } from "../components/UI/Loader";
import { useHistory } from "react-router-dom";
import AlertDelete from "../components/modals/AlertDelete";

function AdminCover() {

    const hist = useHistory()
    const [covers, setCovers] = useState([])
    const [filteredCovers, setFilteredCovers] = useState([])
    const [currentCover, setCurrentCover] = useState('')
    const [loading, setLoading] = useState(true)
    const [filterHide, setFilterHide] = useState(true)
    const [filterButton, setFIlterButton] = useState('Показать фильтр')
    const [nameSearch, setNameSearch] = useState('')
    const [show, setShow] = useState(false)

    async function fetchcovers() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/cover`)
        setCovers(response.data)
        setFilteredCovers(response.data)
    }

    useEffect(() => {

        fetchcovers().finally(() => setLoading(false))
    }, [])


    const columns = [
        { dataField: "cover", text: "Название" }
    ]

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true
    };

    const rowEvents = {
        onClick: (e, row) => {
            setCurrentCover(row.cover)
        }
    }

    function Filtr() {
        setFilteredCovers(covers.filter(cover => cover.cover.toLowerCase().includes(nameSearch.toLowerCase())))
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


    async function dcover() {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/cover/${currentCover}`)
        return data
    }

    const deletecover = async () => {

        try {           
            let data = await dcover();
            fetchcovers()
            Filtr()
            setCurrentCover('')

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
                            <input value={nameSearch} onChange={e => setNameSearch(e.target.value)} placeholder="Поиск по названию" />
                            <Button onClick={Filtr}>Поиск</Button>
                        </div>
                        <Button onClick={FilterClic}>{filterButton}</Button>
                        <BootstrapTable
                            keyField="cover"
                            data={filteredCovers}
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
                        <Button variant="secondary" onClick={e => hist.push('/admin/cover/creating')}>
                            Добавить
                        </Button>
                        <Button variant="secondary" onClick={e => hist.push(`/admin/cover/${currentCover}`)}>
                            Изменить
                        </Button>
                        <Button variant="secondary" onClick={e => {
                            if (currentCover != '') {
                                setShow(true)
                            }
                        }}>
                            Удалить
                        </Button>
                    </div>

                </Col>
            </Row>
            <AlertDelete show={show} onHide={() => setShow(false)} title={'Удаление'} body={`Вы уверены, что хотите удалить переплет ${currentCover}?`} del={() => { deletecover(); setShow(false) }} />
        </div>

    )
}

export default AdminCover