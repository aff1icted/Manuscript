import react, { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import { Form, FormGroup } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Loader } from "../components/UI/Loader";

function Template() {
    return (
        <div className="enter">
            <Row className="justify-content-md-center">
                <Col md-4>

                    {/* Основная часть, здесь размещать таблицы и проч */}
                    <div className="subcolumns-left">
                        
                        
                    </div>

                </Col>

                <Col md-auto>

                    {/* А здесь кнопки */}
                    <div className="subcolumns-right">
                        <Button variant="secondary">
                            Добавить
                        </Button>
                        <Button variant="secondary">
                            Изменить
                        </Button>
                        <Button variant="secondary">
                            Сохранить
                        </Button>
                        <Button variant="secondary">
                            Удалить
                        </Button>
                    </div>

                </Col>
            </Row>

        </div>

    )
}

export default Template