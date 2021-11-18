import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function AddAuthor() {

    return (


        <div className="enter">

            < Form >
                <Form.Group className="mb-3" controlId="AuthorName">
                    <Form.Control required type="text" placeholder="Имя" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="AuthorSurname">
                    <Form.Control required type="text" placeholder="Фамилия" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="AuthorPatronymic">
                    <Form.Control type="text" placeholder="Отчество" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="Описание" />
                </Form.Group>
                <Form.Group controlId="authimg" className="mb-3">
                    <Form.Label>Фотография автора</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Добавить
                </Button>
            </Form >
            
        </div>
    )
}

export default AddAuthor;