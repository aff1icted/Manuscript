import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios"

function AddSeries() {
    const [seriesName, setSeriesName] = useState('')
    const [foundation, setFoundation] = useState('')
    
    const [seriesPic, setSeriesPic] = useState(null)


    async function create(type) {
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}api/series`, type)
        return data
    }

    const addSeries = () => {
        const formData = new FormData()
        formData.append('seriesname',seriesName)
        formData.append('foundation',foundation)
        formData.append('seriespic',seriesPic)        

        create(formData).then(data => {
            setSeriesName('')
            setFoundation('')
            setSeriesPic(null)
            
        })
    }

    const selectFile = e =>{        
        setSeriesPic(e.target.files[0])  
    }

    return (
        <div className="enter">

            <Form>
                <FormGroup className="mb-3" controlId="sername">
                    <Form.Control required type="text" placeholder="Название серии" value={seriesName} onChange={e=>setSeriesName(e.target.value)} />
                </FormGroup>
                <Form.Group controlId="serimg" className="mb-3">
                    <Form.Label>Иллюстрация к серии</Form.Label>
                    <Form.Control type="file"  onChange={e => setSeriesPic(e.target.files[0])}/>
                </Form.Group>
                <Form.Group controlId="serdate" className="mb-3">
                <Form.Label>Дата основания серии</Form.Label>
                    <Form.Control required type="date" onChange={e=>setFoundation(e.target.value)}/>
                </Form.Group>
                <Button variant="secondary" onClick={addSeries}>
                    Добавить
                </Button>
            </Form>

        </div>

    )
}

export default AddSeries;