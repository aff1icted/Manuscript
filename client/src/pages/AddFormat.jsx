import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";

function AddFormat() {

    return (
        <div className="enter">
            
            <Form>
                <FormGroup className="mb-3" controlId="formatname">
                    <Form.Control required type="text" placeholder="Название формата" />
                </FormGroup>
                <FormGroup className="mb-3" controlId="formratio">
                    <Form.Control required type="text" placeholder="коэффициент" />
                </FormGroup>
               
                <Button variant="secondary" type="submit">
                    Добавить
                </Button>
            </Form>
            
                        
        </div>
    )
}

export default AddFormat;