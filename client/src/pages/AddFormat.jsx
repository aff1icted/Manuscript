import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Loader } from "../components/UI/Loader";
import { Col, Row } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import AlertMsg from "../components/modals/AlertMsg";
import NavAdmin from "../components/UI/NavAdmin";
import { createFormat, updateFormat } from "../http/formatApi";

function AddFormat() {
    const hist = useHistory()
    const LinkFormatName = useParams().name
    const [name, setName] = useState('')
    const [coeff, setCoeff] = useState('')
    const [loading, setLoading] = useState(true)
    const [titleText, setTitleText] = useState('')
    const [addVisible, setAddVisible] = useState(true)
    const [editVisible, setEditVisible] = useState(true)
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)


    const addformat = async () => {
        try {
            createFormat({ name: name, transfercoeff: coeff })
            setShowCreate(true)
        } catch (e) {
            alert(e.response.data.message)
        }
    }


    async function fetchformat() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/format/${LinkFormatName}`)
        setName(response.data.name)
        setCoeff(response.data.transfercoeff)
    }

    useEffect(() => {

        if (LinkFormatName == "creating") {
            setTitleText('Добавление формата')
            setAddVisible(false)
            setLoading(false)
        } else {
            setTitleText('Изменение формата')
            setEditVisible(false)
            fetchformat().finally(() => setLoading(false))
        }
    }, [])

    const edtformat = async () => {
        try {
            const formData = new FormData()
            formData.append('oldname', LinkFormatName)
            formData.append('name', name)
            formData.append('transfercoeff', coeff)
            updateFormat(formData)
            setShowEdit(true)
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
                                <FormGroup className="mb-3" controlId="formatname">
                                    Название формата<span style={{color:"red"}}>*</span>
                                    <Form.Control required type="text" placeholder="Название формата" value={name} onChange={e => setName(e.target.value)} />
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="formratio">
                                    Коэффициент<span style={{color:"red"}}>*</span>
                                    <Form.Control required type="text" placeholder="коэффициент" value={coeff} onChange={e => setCoeff(e.target.value)} />
                                </FormGroup>
                            </Form>
                        </div>
                    </Col>
                    <Col md-auto>
                        {/* А здесь кнопки */}
                        <div className="subcolumns-right">

                            <Button variant="secondary" hidden={addVisible} onClick={e => addformat()}>
                                Добавить
                            </Button>

                            <Button variant="secondary" hidden={editVisible} onClick={e => edtformat()} >
                                Сохранить
                            </Button>
                        </div>
                    </Col >
                </Row >
                <AlertMsg show={showCreate} onHide={() => { setShowCreate(false); hist.goBack() }} title={'Оповещение'} body={`Формат ${name} создан`} />
                <AlertMsg show={showEdit} onHide={() => { setShowEdit(false); hist.goBack() }} title={'Оповещение'} body={`Формат ${LinkFormatName} изменен`} />


            </div >
        </div>
    )
}

export default AddFormat;