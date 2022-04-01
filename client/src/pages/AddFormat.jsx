import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Loader } from "../components/UI/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateBack } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";

function AddFormat() {

    const [name, setName] = useState('')
    const [coeff, setCoeff] = useState('')
    const [format, setFormat] = useState()
    const [formats, setFormats] = useState([])
    const [loading, setLoading] = useState(true)


    async function create(type) {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/format`, type)
        return data
    }

    const addformat = async () => {
        try {
            let data;
            data = await create({ name: name, transfercoeff: coeff });
            setName('')
            setCoeff('')
            alert("Добавленно")
        } catch (e) {
            alert(e.response.data.message)
        }
    }


    async function fetchformats() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/format`)
        setFormats(response.data)
    }

    async function dformat() {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/format/${name}`)
        return data
    }


    useEffect(() => {
        setTimeout(() => {
            fetchformats().finally(() => setLoading(false))
        }, 1000);
    }, [])

    const dataUpdate = (value) => {
        formats.map(function (obj) {
            if (obj.name == format) {
                setName(obj.name)
                if (obj.transfercoeff == null) {
                    setCoeff('')
                } else {
                    setCoeff(obj.transfercoeff)
                }

            }
        });
    }

    const deleteFormat = async () => {

        try {
            let data;
            data = await dformat();
            alert("удалено")
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    async function uformat(type) {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}api/format`, type)
        return data
    }

    const edtformat = async () => {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('transfercoeff', coeff)
            let data;
            data = await uformat(formData);
            setName('')
            setCoeff('')
            alert("Изменено")
        } catch (e) {
            alert(e.response.data.message)
        }        
    }


    if (loading) {
        return <Loader />
    }
    return (
        <div className="enter">



            <Form>

                <Row className="justify-content-md-center">
                    <Col>

                        <FormGroup className="mb-3" controlId="bookdate">

                            <Form.Select onChange={(e) => { setFormat(e.target.value) }}>
                                <option selected="true" disabled="disabled">Формат</option>
                                {formats.map(option =>
                                    <option key={option.name} value={option.name}>
                                        {option.name}
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

                <FormGroup className="mb-3" controlId="formatname">
                    <Form.Control required type="text" placeholder="Название формата" value={name} onChange={e => setName(e.target.value)} />
                </FormGroup>

                <FormGroup className="mb-3" controlId="formratio">
                    <Form.Control required type="text" placeholder="коэффициент" value={coeff} onChange={e => setCoeff(e.target.value)} />
                </FormGroup>

                <Button variant="secondary" onClick={addformat}>
                    Добавить
                </Button>

                <Button variant="secondary" onClick={edtformat}>
                    Изменить
                </Button>

                <Button variant="secondary" onClick={deleteFormat}>
                    Удалить
                </Button>
            </Form>


        </div>
    )
}

export default AddFormat;