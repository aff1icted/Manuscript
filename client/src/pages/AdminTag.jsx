import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Col, Row, Button, } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Loader } from "../components/UI/Loader";
import { useHistory } from "react-router-dom";
import AlertDelete from "../components/modals/AlertDelete";
import NavAdmin from "../components/UI/NavAdmin";

function AdminTag() {
    const hist = useHistory()
    const [tags, setTags] = useState([])
    const [filteredTags, setFilteredTags] = useState([])
    const [currentTag, setCurrentTag] = useState('')
    const [loading, setLoading] = useState(true)
    const [filterHide, setFilterHide] = useState(true)
    const [filterButton, setFIlterButton] = useState('Показать фильтр')
    const [nameSearch, setNameSearch] = useState('')
    const [show, setShow] = useState(false)

    async function fetchtags() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/tag`)
        setTags(response.data)
        setFilteredTags(response.data)
    }

    useEffect(() => {

        fetchtags().finally(() => setLoading(false))
    }, [])


    const columns = [
        { dataField: "tagname", text: "Название" }
    ]

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true
    };

    const rowEvents = {
        onClick: (e, row) => {
            setCurrentTag(row.tagname)
        }
    }

    function Filtr() {
        setFilteredTags(tags.filter(tag => tag.tagname.toLowerCase().includes(nameSearch.toLowerCase())))
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

    async function dtag() {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/tag/${currentTag}`)
        return data
    }

    const deletetag = async () => {
        try {

            let data = await dtag();
            fetchtags()
            Filtr()
            setCurrentTag('')

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
                            <div hidden={filterHide}>
                                <input value={nameSearch} onChange={e => setNameSearch(e.target.value)} placeholder="Поиск по названию" />
                                <Button onClick={Filtr}>Поиск</Button>
                            </div>
                            <Button onClick={FilterClic}>{filterButton}</Button>
                            <BootstrapTable
                                keyField="tagname"
                                data={filteredTags}
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
                            <Button variant="secondary" onClick={e => hist.push('/admin/tag/creating')}>
                                Добавить
                            </Button>
                            <Button variant="secondary" onClick={e => hist.push(`/admin/tag/${currentTag}`)}>
                                Изменить
                            </Button>
                            <Button variant="secondary" onClick={e => {
                                if (currentTag != '') {
                                    setShow(true)
                                }
                            }}>
                                Удалить
                            </Button>
                        </div>

                    </Col>
                </Row>
                <AlertDelete show={show} onHide={() => setShow(false)} title={'Удаление'} body={`Вы уверены, что хотите удалить тег/жанр ${currentTag}?`} del={() => { deletetag(); setShow(false) }} />


            </div>
        </div>

    )
}

export default AdminTag