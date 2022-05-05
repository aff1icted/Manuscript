import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { useHistory, useParams } from "react-router-dom";
import { Form, FormGroup, Col, Row, Button } from "react-bootstrap";
import axios from 'axios'
import { Loader } from "../components/UI/Loader";
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertMsg from "../components/modals/AlertMsg";
import NavAdmin from "../components/UI/NavAdmin";
import { createTag, updateTag } from "../http/tagApi";


function AddTag() {
    const hist = useHistory()
    const LinkTagName = useParams().tagname
    const [tag, setTag] = useState('')
    const [loading, setLoading] = useState(true)
    const [titleText, setTitleText] = useState('')
    const [addVisible, setAddVisible] = useState(true)
    const [editVisible, setEditVisible] = useState(true)
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    
    const addTag = async () => {
        try {        
            createTag({ tagname: tag })
            setShowCreate(true)
        } catch (e) {
            alert(e.response.data.message)
        }
    }  


    const edtTag = async () => {
        try {
            
            const formData = new FormData()
            formData.append('tagname', tag)
            formData.append('oldtagname', LinkTagName)
            updateTag(formData)
            setShowEdit(true)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    useEffect(() => {

        if (LinkTagName == "creating") {
            setTitleText('Добавление тега/жанра')
            setAddVisible(false)
            setLoading(false)
        } else {
            setTitleText('Изменение тега/жанра')
            setTag(LinkTagName)
            setEditVisible(false)
            setLoading(false)
        }

    }, [])


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
                                <FormGroup className="mb-3" controlId="Tagname">
                                    Название тега/жанра<span style={{color:"red"}}>*</span>
                                    <Form.Control required type="text" placeholder="Название тега" value={tag} onChange={e => setTag(e.target.value)} />
                                </FormGroup>

                            </Form>
                        </div>
                    </Col>
                    <Col md-auto>

                        {/* А здесь кнопки */}
                        <div className="subcolumns-right">

                            <Button variant="secondary" hidden={addVisible} onClick={e => addTag()}>
                                Добавить
                            </Button>

                            <Button variant="secondary" hidden={editVisible} onClick={e => edtTag()} >
                                Сохранить
                            </Button>

                        </div>

                    </Col>
                </Row>

                <AlertMsg show={showCreate} onHide={() => { setShowCreate(false); hist.goBack() }} title={'Оповещение'} body={`Тег/жанр ${tag} создан`} />
                <AlertMsg show={showEdit} onHide={() => { setShowEdit(false); hist.goBack() }} title={'Оповещение'} body={`Тег/жанр ${LinkTagName} изменен`} />



            </div >
        </div>
    )
}

export default AddTag;