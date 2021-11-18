import react, { useEffect, useState } from "react";
import Input from "../components/UI/Input";
import Select from "../components/UI/Select";
import '../styles/Admcss.css'
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";


function addtag() {
    document.getElementById('taginp').value = document.getElementById('taginp').value + document.getElementById("tagsel").options[document.getElementById("tagsel").options.selectedIndex].value + ',';
    console.log("fdkfksd", document.getElementById("taginp"));
}
function AddBook() {
    const [tag, setTag] = useState()
    const [tags, setTags] = useState([])

    const gettag = async () => {
        let bufarr = tags
        bufarr.push(tag)
        setTags(bufarr)
        console.log(tags)
    }

    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, { title: '', number: Date.now() }])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    var array1 = ['a', 'b', 'c'];
    var technologyList = [];
    array1.forEach(function (element) {
        technologyList.push({ label: element, value: element })
    });


    return (

        <div className="enter">

            <Form>

                <FormGroup className="mb-3" controlId="isbn">
                    <Form.Control required type="text" placeholder="ISBN" />
                </FormGroup>

                <FormGroup className="mb-3" controlId="bookname">
                    <Form.Control required type="text" placeholder="Название книги" />
                </FormGroup>
                <Row className="mb-3 mx-1">


                    <Button id="authadd" variant="secondary" onClick={addInfo}>
                        Добавить авторов
                    </Button>
                    {info.map(i =>
                        <Row className="my-2" key={i.number}>
                            <Col w-400>
                                <Form.Select onChange={(e) => changeInfo('title', e.target.value, i.number)}>
                                   {technologyList}                                   
                                </Form.Select>
                            </Col>
                            <Col>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"secondary"}
                                >
                                    -
                                </Button>
                            </Col>
                        </Row>
                    )}



                </Row>
                <Row className="mb-3 mx-1">


                    <Button id="authadd" variant="secondary" onClick={addInfo}>
                        Добавить теги
                    </Button>
                    {info.map(i =>
                        <Row className="my-2" key={i.number}>
                            <Col w-400>
                                <Form.Select onChange={(e) => changeInfo('title', e.target.value, i.number)}>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"secondary"}
                                >
                                    -
                                </Button>
                            </Col>
                        </Row>
                    )}



                </Row>
                <Row className="mb-3 mx-1">


                    <Button id="authadd" variant="secondary" onClick={addInfo}>
                        Добавить серии
                    </Button>
                    {info.map(i =>
                        <Row className="my-2" key={i.number}>
                            <Col w-400>
                                <Form.Select onChange={(e) => changeInfo('title', e.target.value, i.number)}>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"secondary"}
                                >
                                    -
                                </Button>
                            </Col>
                        </Row>
                    )}



                </Row>

                <Form.Group className="mb-3" controlId="BookDescr">
                    <Form.Control required as="textarea" rows='3' placeholder="Описание" />
                </Form.Group>
                <Form.Group controlId="bookimg" className="mb-3">
                    <Form.Label>Обложка книги</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Button
                    variant={"outline-dark"}
                    onClick={addInfo}
                >
                    Добавить новое свойство
                </Button>

                {info.map(i =>
                    <Row className="mt-4" key={i.number}>
                        <Col md={4}>
                            <Form.Select onChange={(e) => changeInfo('title', e.target.value, i.number)}>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                        <Col md={4}>
                            <Button
                                onClick={() => removeInfo(i.number)}
                                variant={"outline-danger"}
                            >
                                Удалить
                            </Button>
                        </Col>
                    </Row>
                )}

                <Button variant="secondary" type="submit">
                    Добавить
                </Button>

            </Form>


        </div>



    )
}

export default AddBook;