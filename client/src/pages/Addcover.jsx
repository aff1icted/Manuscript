import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";


function AddCover() {

    const [cover, setCover]= useState('')

    async function create(type) {
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}api/cover`, type)
        return data
    }

    const addCover = () => {               

        create({cover:cover}).then(data => {
            setCover('')   
        })
    }

    return (
        <div className="enter">
            <Form>
                <FormGroup className="mb-3" controlId="covername">
                    <Form.Control required type="text" placeholder="Название" value={cover} onChange={e=>setCover(e.target.value)}/>
                </FormGroup>
                               
                <Button variant="secondary" onClick={addCover}>
                    Добавить
                </Button>
            </Form>

        </div>
    )
}

export default AddCover;