import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";


function AddSeries() {

    return (
        <div className="enter">

            <Form>
                <FormGroup className="mb-3" controlId="sername">
                    <Form.Control required type="text" placeholder="Название серии" />
                </FormGroup>
                <Form.Group controlId="serimg" className="mb-3">
                    <Form.Label>Иллюстрация к серии</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Form.Group controlId="serdate" className="mb-3">
                <Form.Label>Дата основания серии</Form.Label>
                    <Form.Control required type="date" />
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Добавить
                </Button>
            </Form>

        </div>

    )
}

export default AddSeries;