import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, FormGroup, Col, Row, Button, } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Loader } from "../components/UI/Loader";
import { useHistory } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import AlertButton from "../components/modals/AlertButton";

function AdminPartner() {
    const hist = useHistory()
    const [partners, setPartners] = useState([])
    const [filteredPartners, setFilteredPartners] = useState([])
    const [currentPartner, setCurrentPartner] = useState('')
    const [loading, setLoading] = useState(true)
    const [filterHide, setFilterHide] = useState(true)
    const [filterButton, setFIlterButton] = useState('Показать фильтр')
    const [titleSearch, setTitleSearch] = useState('')
    const [show, setShow] = useState(false)

    async function fetchPartners() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/partner`)
        setPartners(response.data)
        setFilteredPartners(response.data)
    }

    useEffect(() => {
        fetchPartners().finally(() => setLoading(false))
    }, [])


    const columns = [
        { dataField: "title", text: "Название" }
    ]

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true
    };

    const rowEvents = {
        onClick: (e, row) => {
            setCurrentPartner(row.title)
        }
    }

    function Filtr() {

        setFilteredPartners(partners.filter(Partner => Partner.title.toLowerCase().includes(titleSearch.toLowerCase())))

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

    async function dPartner() {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/partner/${currentPartner}`)
        return data
    }

    const deletePartner = async () => {

        try {

            let data = await dPartner();
            fetchPartners()
            Filtr()
            setCurrentPartner('')

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
                                    <input size="30" value={titleSearch} onChange={e => setTitleSearch(e.target.value)} placeholder="Поиск по названию" />
                                    <Button onClick={Filtr}>Поиск</Button>
                                </div>
                            </div>
                            <Button onClick={FilterClic}>{filterButton}</Button>
                            <BootstrapTable
                                keyField="title"
                                data={filteredPartners}
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
                            <Button variant="secondary" onClick={e => hist.push('/admin/partner/creating')}>
                                Добавить
                            </Button>
                            <Button variant="secondary" onClick={e => hist.push(`/admin/partner/${currentPartner}`)}>
                                Изменить
                            </Button>
                            <Button variant="secondary" onClick={e => {
                                if (currentPartner != '') {
                                    setShow(true)
                                }
                            }}>
                                Удалить
                            </Button>
                        </div>

                    </Col>
                </Row>
                <AlertButton show={show} onHide={() => setShow(false)} title={'Удаление'} body={`Вы уверены, что хотите удалить автора ${currentPartner}?`} buttontext='Да, удалить' buttonfunc={() => { deletePartner(); setShow(false) }} />


            </div>
        </div>

    )
}

export default AdminPartner