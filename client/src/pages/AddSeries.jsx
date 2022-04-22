import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios"
import { Loader } from "../components/UI/Loader";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";

function AddSeries() {
    const LinkSeriesName = useParams().seriesname
    const [foundation, setFoundation] = useState('')
    const [seriesPic, setSeriesPic] = useState(null)
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [titleText, setTitleText] = useState('')
    const [addVisible, setAddVisible] = useState(true)
    const [editVisible, setEditVisible] = useState(true)

    async function create(type) {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/series`, type)
        return data
    }

    const addSeries = async () => {
        try {
            const formData = new FormData()
            formData.append('seriesname', name)
            formData.append('foundation', foundation)
            formData.append('seriespic', seriesPic)
            await create(formData);
        } catch (e) {
            alert(e.response.data.message)
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




    async function useries(type) {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}api/series`, type)
        return data
    }

    const edtSeries = async () => {
        try {
            const formData = new FormData()
            formData.append('seriesname', name)
            formData.append('oldseriesname', LinkSeriesName)
            formData.append('foundation', foundation)
            console.log('seriespic', seriesPic)
            formData.append('seriespic', seriesPic)
            let data;
            data = await useries(formData);
            alert("Изменено")
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
                            <Form>
                                <h2>{titleText}</h2>
                                <FormGroup className="mb-3" controlId="sername">
                                    Название
                                    <Form.Control required type="text" placeholder="Название" value={name} onChange={e => setName(e.target.value)} />
                                </FormGroup>
                                <Form.Group controlId="serimg" className="mb-3">
                                    <Form.Label>Иллюстрация к серии</Form.Label>
                                    <Form.Control type="file" filename={seriesPic} onChange={e => setSeriesPic(e.target.files[0])} />{/*сделать получение имени файла или сделать отображение изображения*/}
                                </Form.Group>
                                <Form.Group controlId="serdate" className="mb-3">
                                    <Form.Label>Дата основания серии</Form.Label>
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


            </div>
        </div>

    )
}

export default AddSeries;