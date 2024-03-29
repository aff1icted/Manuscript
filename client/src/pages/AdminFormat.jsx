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
import { deleteFormat } from "../http/formatApi";

function AdminFormat() {
    const hist = useHistory()
    const [formats, setFormats] = useState([])
    const [filteredFormats, setFilteredFormats] = useState([])
    const [currentFormat, setCurrentFormat] = useState('')
    const [loading, setLoading] = useState(true)
    const [filterHide, setFilterHide] = useState(true)
    const [filterButton, setFIlterButton] = useState('Показать фильтр')
    const [coeffSearch, setCoeffSearch] = useState('')
    const [nameSearch, setNameSearch] = useState('')
    const [show, setShow] = useState(false)

    async function fetchformats() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/format`)
        setFormats(response.data)
        setFilteredFormats(response.data)
    }

    useEffect(() => {

        fetchformats().finally(() => setLoading(false))
    }, [])


    const columns = [
        { dataField: "name", text: "Название" },
        { dataField: "transfercoeff", text: "Коэффицент" },
    ]

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true
    };

    const rowEvents = {
        onClick: (e, row) => {
            setCurrentFormat(row.name)
        }
    }

    function Filtr() {
        if (coeffSearch == '') {
            setFilteredFormats(formats.filter(format => format.name.toLowerCase().includes(nameSearch.toLowerCase())))
        } else {
            setFilteredFormats(formats.filter(format => format.name.toLowerCase().includes(nameSearch.toLowerCase()) && format.transfercoeff == coeffSearch))
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


    const deleteformat = async () => {

        try {


            deleteFormat(currentFormat).then(() => {
                fetchformats()
                Filtr()
                setCurrentFormat('')
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
                                    <div>Поиск по коэффиценту:</div>
                                    <input size="30" value={coeffSearch} onChange={e => setCoeffSearch(e.target.value)} placeholder="Поиск по коэффиценту" />
                                </div>
                                <Button onClick={Filtr}>Поиск</Button>
                            </div>
                            <Button onClick={FilterClic}>{filterButton}</Button>
                            <BootstrapTable
                                keyField="name"
                                data={filteredFormats}
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
                            <Button variant="secondary" onClick={e => hist.push('/admin/format/creating')}>
                                Добавить
                            </Button>
                            <Button variant="secondary" onClick={e => hist.push(`/admin/format/${currentFormat}`)}>
                                Изменить
                            </Button>
                            <Button variant="secondary" onClick={e => {
                                if (currentFormat != '') {
                                    setShow(true)
                                }
                            }}>
                                Удалить
                            </Button>
                        </div>

                    </Col>
                </Row>
                <AlertButton show={show} onHide={() => setShow(false)} title={'Удаление'} body={`Вы уверены, что хотите удалить формат ${currentFormat}?`} buttontext='Да, удалить' buttonfunc={() => { deleteformat(); setShow(false) }} />

            </div>
        </div>

    )
}

export default AdminFormat