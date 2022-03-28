import react, { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateBack } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";

function EditSeries() {
    const [bookSeries, setBookSeries] = useState([])
    const [series, setSeries] = useState([])
    const [seriesName, setSeriesName] = useState('')
    const [foundation, setFoundation] = useState('')
    const [loading, setLoading] = useState(true)
    const [seriesPic, setSeriesPic] = useState(null)
    const [name, setName] = useState('')

    async function fetchSeries() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/series`)

        setSeries(response.data)
    }

    useEffect(() => {
        setTimeout(() => {
            fetchSeries().finally(() => setLoading(false))
        }, 1000);
    }, [])


    async function dseries() {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/series/${seriesName}`)
        return data
    }

    const deleteseries = async () => {

        try {
            let data;
            data = await dseries();
            alert("удалено")
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const dataUpdate = (value) => {
        series.map(function (obj) {
            if (obj.seriesname == seriesName) {
                setName(obj.seriesname)

                if (obj.foundation == null) {
                    setFoundation('')
                } else {
                    setFoundation(obj.foundation)
                }

                if (obj.photo == null) {
                    setSeriesPic('')
                } else {
                    setSeriesPic(obj.seriespic)
                }

            }
        });
    }


    return (
        <div className="enter">
            <Form>

                <Row className="justify-content-md-center">
                    <Col>
                        <FormGroup className="mb-3" controlId="bookdate">
                            <Form.Select onChange={(e) => setSeriesName(e.target.value)}>
                                <option selected="true" disabled="disabled">Серия</option>
                                {series.map(option =>
                                    <option key={option.seriesname} value={option.seriesname}>
                                        {option.seriesname}
                                    </option>
                                )}
                            </Form.Select>
                        </FormGroup>
                    </Col>
                    <Col md="auto">
                        <Button variant="secondary" onClick={dataUpdate}>
                            <FontAwesomeIcon icon={faArrowRotateBack} />
                        </Button>
                    </Col>
                </Row>

                <FormGroup className="mb-3" controlId="sername">
                    <Form.Control required type="text" placeholder="Название" value={name} onChange={e => setName(e.target.value)} />
                </FormGroup>
                <Form.Group controlId="serimg" className="mb-3">
                    <Form.Label>Иллюстрация к серии</Form.Label>
                    <Form.Control type="file" />{/*добавить отображение картинки */}
                </Form.Group>
                <Form.Group controlId="serdate" className="mb-3">
                    <Form.Label>Дата основания серии</Form.Label>
                    <Form.Control required type="date" value={foundation} />{/*добавить отображение даты */}
                </Form.Group>

                <Button variant="secondary">
                    Добавить
                </Button>

                <Button variant="secondary" onClick={deleteseries} >
                    Удалить
                </Button>

            </Form>

        </div >
    )
}

export default EditSeries;