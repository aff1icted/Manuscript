import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";


function AddTag() {

    return (
        <div className="enter">
            <Form>

            <FormGroup className="mb-3" controlId="Tagname">
            <Form.Control required type="text" placeholder="Название тега" />
            </FormGroup>
            <Button variant="secondary" type="submit">
                Добавить
            </Button>
            
        </Form>
            
        </div >
    )
}

export default AddTag;