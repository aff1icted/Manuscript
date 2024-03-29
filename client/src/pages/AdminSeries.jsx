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
import { deleteSeries } from "../http/seriesApi";

function AdminSeries() {
    const hist = useHistory()
    const [series, setSeries] = useState([])
    const [filteredSeries, setFilteredSeries] = useState([])
    const [currentSeries, setCurrentSeries] = useState('')
    const [loading, setLoading] = useState(true)
    const [filterHide, setFilterHide] = useState(true)
    const [filterButton, setFIlterButton] = useState('Показать фильтр')
    const [foundationSearch, setFoundationSearch] = useState('')
    const [nameSearch, setNameSearch] = useState('')
    const [show, setShow] = useState(false)

    async function fetchSeries() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/series`)
        setSeries(response.data)
        setFilteredSeries(response.data)
    }

    useEffect(() => {

        fetchSeries().finally(() => setLoading(false))
    }, [])


    const columns = [
        { dataField: "seriesname", text: "Название" },
        { dataField: "foundation", text: "Дата основания" },
    ]

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true
    };

    const rowEvents = {
        onClick: (e, row) => {
            setCurrentSeries(row.seriesname)
        }
    }

    function Filtr() {
        if (foundationSearch == '') {
            setFilteredSeries(series.filter(series => series.seriesname.toLowerCase().includes(nameSearch.toLowerCase())))
        } else {
            setFilteredSeries(series.filter(series => series.seriesname.toLowerCase().includes(nameSearch.toLowerCase()) && series.foundation == foundationSearch))
        }

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

    const deleteseries = async () => {

        try {
            deleteSeries(currentSeries).then(() => {
                fetchSeries()
                Filtr()
                setCurrentSeries('')
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
                        {/* Основная часть, здесь размещать таблицы и проч */}
                        <div className="subcolumns-left">
                            <div style={{ paddingBottom: "10px", display: "flex", alignItems: "flex-end" }} hidden={filterHide}>
                                <div style={{ paddingRight: "30px" }}>
                                    <div>Поиск по названию:</div>
                                    <input size="30" value={nameSearch} onChange={e => setNameSearch(e.target.value)} placeholder="Поиск по названию" />
                                    {/*переделать на поле с датой*/}

                                    <div>Поиск по дате:</div>
                                    <input size="30" value={foundationSearch} onChange={e => setFoundationSearch(e.target.value)} placeholder="Поиск по дате основания" /></div>
                                <Button onClick={Filtr}>Поиск</Button>
                            </div>
                            <Button onClick={FilterClic}>{filterButton}</Button>
                            <BootstrapTable
                                keyField="seriesname"
                                data={filteredSeries}
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
                            <Button variant="secondary" onClick={e => hist.push('/admin/series/creating')}>
                                Добавить
                            </Button>
                            <Button variant="secondary" onClick={e => hist.push(`/admin/series/${currentSeries}`)}>
                                Изменить
                            </Button>
                            <Button variant="secondary" onClick={e => {
                                if (currentSeries != '') {
                                    setShow(true)
                                }
                            }}>
                                Удалить
                            </Button>
                        </div>

                    </Col>
                </Row>
                <AlertButton show={show} onHide={() => setShow(false)} title={'Удаление'} body={`Вы уверены, что хотите удалить серию ${currentSeries}?`} buttontext='Да, удалить' buttonfunc={() => { deleteseries(); setShow(false) }} />

            </div>
        </div>

    )
}

export default AdminSeries