import react, { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios"

function EditSeries() {
    const [bookSeries, setBookSeries] = useState([])
    const [series, setSeries] = useState([])
    const [seriesName, setSeriesName] = useState('')
    const [foundation, setFoundation] = useState('')
    const [loading, setLoading] = useState(true)
    const [seriesPic, setSeriesPic] = useState(null)
    

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
   

    return (
        <div className="enter">
            <Form>

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
                <Form.Group controlId="serimg" className="mb-3">
                    <Form.Label>Иллюстрация к серии</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Form.Group controlId="serdate" className="mb-3">
                    <Form.Label>Дата основания серии</Form.Label>
                    <Form.Control required type="date"/>
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