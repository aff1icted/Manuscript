import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from 'axios'


function AddTag() {

    const [tag, setTag]= useState('')

    async function create(type) {
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}api/tag`, type)
        return data
    }

    const addTag = () => {               

        create({tagname:tag}).then(data => {
            setTag('')   
        })
    }

    return (
        <div className="enter">
            <Form>

            <FormGroup className="mb-3" controlId="Tagname">
            <Form.Control required type="text" placeholder="Название тега" value={tag} onChange={e=>setTag(e.target.value)} />
            </FormGroup>
            <Button variant="secondary"  onClick={addTag}>
                Добавить
            </Button>
            
        </Form>
            
        </div >
    )
}

export default AddTag;