import react, { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";

function EditFormat() {
    const [name, setName] = useState('')
    const [coeff, setCoeff] = useState('')
    const [format, setFormat] = useState()
    const [formats, setFormats] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchformats() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/format`)
        setFormats(response.data)
    }

    async function fetchFormat() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/format/${name}`)
        setFormat(response.data)
    }

    useEffect(() => {
        setTimeout(() => {
            fetchformats().finally(() => setLoading(false))
        }, 1000);
    }, [])
    

    return (
        <div className="enter">
            <Form>

                <FormGroup className="mb-3" controlId="bookdate">
                    <Form.Select onChange={(e) => {setName(e.target.value)}}>
                        <option selected="true" disabled="disabled">Формат</option>
                        {formats.map(option =>
                            <option key={option.name} value={option.name}>
                                {option.name}
                            </option>
                        )}
                    </Form.Select>
                </FormGroup>

                <FormGroup className="mb-3" controlId="formratio">
                    <Form.Control required type="text" placeholder="коэффициент" value={coeff} onChange={e => setCoeff(e.target.value)} />
                </FormGroup>

                <Button variant="secondary">
                    Изменить
                </Button>

                <Button variant="secondary" >
                    Удалить
                </Button>

            </Form>

        </div >

    )
}

export default EditFormat;