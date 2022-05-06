import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, FormGroup, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Loader } from "../components/UI/Loader";
import { useParams, useHistory } from "react-router-dom";
import AlertMsg from "../components/modals/AlertMsg";
import NavAdmin from "../components/UI/NavAdmin";
import { createCover, updateCover } from "../http/coverApi";


function AddCover() {
    const hist = useHistory()
    const [coverName, setCoverName] = useState('')
    const [loading, setLoading] = useState(true)
    const [titleText, setTitleText] = useState('')
    const [addVisible, setAddVisible] = useState(true)
    const [editVisible, setEditVisible] = useState(true)
    const LinkCover = useParams().cover
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')


    const addCover = async () => {
        try {
            if (coverName== '') {
                throw('Все обязательные поля должны быть заполнены')
            }
            createCover({ cover: coverName })
            setShowCreate(true)
        } catch (e) {
            setError(e)
            setShowError(true)
        }
    }

    useEffect(() => {

        if (LinkCover == "creating") {
            setTitleText('Добавление переплета')
            setAddVisible(false)
            setLoading(false)
        } else {
            setTitleText('Изменение переплета')
            setCoverName(LinkCover)
            setEditVisible(false)
            setLoading(false)
        }
    }, [])

    const edtCover = async () => {
        try {
            if (coverName== '') {
                throw('Все обязательные поля должны быть заполнены')
            }
            const formData = new FormData()
            formData.append('cover', coverName)
            formData.append('oldcover', LinkCover)
            updateCover(formData)
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
                                <FormGroup className="mb-3" controlId="covername">
                                    Название переплета<span style={{color:"red"}}>*</span>
                                    <Form.Control required type="text" placeholder="Название" value={coverName} onChange={e => setCoverName(e.target.value)} />
                                </FormGroup>
                            </Form>
                        </div>
                    </Col>
                    <Col md-auto>
                        {/* А здесь кнопки */}
                        <div className="subcolumns-right">

                            <Button variant="secondary" hidden={addVisible} onClick={e => addCover()}>
                                Добавить
                            </Button>

                            <Button variant="secondary" hidden={editVisible} onClick={e => edtCover()} >
                                Сохранить
                            </Button>

                        </div>

                    </Col>
                </Row>
                <AlertMsg show={showCreate} onHide={() => { setShowCreate(false); hist.goBack() }} title={'Оповещение'} body={`Переплет ${coverName} создан`} />
                <AlertMsg show={showEdit} onHide={() => { setShowEdit(false); hist.goBack() }} title={'Оповещение'} body={`Переплет ${LinkCover} изменен`} />
                <AlertMsg show={showError} onHide={() => setShowError(false)} title={'Ошибка'} body={error} />

            </div >
        </div>
    )
}

export default AddCover;