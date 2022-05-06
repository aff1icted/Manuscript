import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios"
import { Loader } from "../components/UI/Loader";
import { Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import AlertMsg from "../components/modals/AlertMsg";
import { createSeries, updateSeries } from "../http/seriesApi";

function AddSeries() {
    const hist = useHistory()
    const LinkSeriesName = useParams().seriesname
    const [foundation, setFoundation] = useState('')
    const [seriesPic, setSeriesPic] = useState(null)
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [titleText, setTitleText] = useState('')
    const [addVisible, setAddVisible] = useState(true)
    const [editVisible, setEditVisible] = useState(true)
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')

  

    const addSeries = async () => {
        try {
            if (name == '' || foundation === '') {
                throw('Все обязательные поля должны быть заполнены')
            }
            const formData = new FormData()
            formData.append('seriesname', name)
            formData.append('foundation', foundation)
            formData.append('seriespic', seriesPic)
            createSeries(formData)
            setShowCreate(true)
        } catch (e) {
            setError(e)
            setShowError(true)
        }
    }

    async function fetchSeries() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/series/${LinkSeriesName}`)
        setName(response.data.seriesname)
        setFoundation(response.data.foundation)
        setSeriesPic(response.data.seriespic)
    }

    useEffect(() => {
        if (LinkSeriesName == "creating") {
            setTitleText('Добавление серии')
            setAddVisible(false)
            setLoading(false)
        } else {
            setTitleText('Изменение серии')
            setEditVisible(false)
            fetchSeries().finally(() => setLoading(false))
        }

    }, [])





    const edtSeries = async () => {
        try {
            if (name == '' || foundation === '')  {
                throw('Все обязательные поля должны быть заполнены')
            }
            const formData = new FormData()
            formData.append('seriesname', name)
            formData.append('oldseriesname', LinkSeriesName)
            formData.append('foundation', foundation)
            console.log('seriespic', seriesPic)
            formData.append('seriespic', seriesPic)
            updateSeries(formData)
            setShowEdit(true)
        } catch (e) {
            setError(e)
            setShowError(true)
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
                            <Form>
                                <h2>{titleText}</h2>
                                <FormGroup className="mb-3" controlId="sername">
                                    Название<span style={{color:"red"}}>*</span>
                                    <Form.Control required type="text" placeholder="Название" value={name} onChange={e => setName(e.target.value)} />
                                </FormGroup>
                                
                                <Form.Group controlId="serdate" className="mb-3">
                                    <Form.Label>Дата основания серии<span style={{color:"red"}}>*</span></Form.Label>
                                    <Form.Control required type="date" value={foundation} onChange={e => setFoundation(e.target.value)} />
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                    <Col md-auto>
                        {/* А здесь кнопки */}
                        <div className="subcolumns-right">
                            <Button variant="secondary" hidden={addVisible} onClick={e => addSeries()}>
                                Добавить
                            </Button>

                            <Button variant="secondary" hidden={editVisible} onClick={e => edtSeries()} >
                                Сохранить
                            </Button>
                        </div>
                    </Col >
                </Row >

                <AlertMsg show={showCreate} onHide={() => { setShowCreate(false); hist.goBack() }} title={'Оповещение'} body={`Серия ${name} добавлена`} />
                <AlertMsg show={showEdit} onHide={() => { setShowEdit(false); hist.goBack() }} title={'Оповещение'} body={`Серия ${LinkSeriesName} изменена`} />
                <AlertMsg show={showError} onHide={() => setShowError(false)} title={'Ошибка'} body={error} />


            </div>
        </div>

    )
}

export default AddSeries;