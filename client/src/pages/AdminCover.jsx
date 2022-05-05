import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Col, Row, Button, } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Loader } from "../components/UI/Loader";
import { useHistory } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import AlertButton from "../components/modals/AlertButton";
import { deleteCover } from "../http/coverApi";

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


    const deletecover = async () => {

        try {
            deleteCover(currentCover).then(() => {
                fetchcovers()
                Filtr()
                setCurrentCover('')
            })


        } catch (e) {
            alert(e.response.data.message)
        }
    }

    if (loading) {
        return <Loader />
    }
    return (
        <div className="blocks">
            <NavAdmin />
            <div className="enter">
                <Row className="justify-content-md-center">
                    <Col md-4>
                        {/* Основная часть, здесь размещать таблицы и проч */}
                        <div className="subcolumns-left">
                            <div style={{ paddingBottom: "10px" }} hidden={filterHide}>
                                <div>Поиск по названию:</div>
                                <div style={{ display: "flex" }}>
                                    <input value={nameSearch} onChange={e => setNameSearch(e.target.value)} placeholder="Поиск по названию" />
                                    <Button onClick={Filtr}>Поиск</Button></div>
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
                <AlertButton show={show} onHide={() => setShow(false)} title={'Удаление'} body={`Вы уверены, что хотите удалить переплет ${currentCover}?`} buttontext='Да, удалить' buttonfunc={() => { deletecover(); setShow(false) }} />
            </div>
        </div>
    )
}

export default AdminCover