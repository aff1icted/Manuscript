import react, { useEffect, useState } from "react";
import Input from "../components/UI/Input";
import Select from "../components/UI/Select";
import '../styles/Admcss.css'
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {Col, Row} from "react-bootstrap";


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

    
    return (

        <div className="enter">

            <Form>

                <FormGroup className="mb-3" controlId="isbn">
                    <Form.Control required type="text" placeholder="ISBN" />
                </FormGroup>

                <FormGroup className="mb-3" controlId="bookname">
                    <Form.Control required type="text" placeholder="Название книги" />
                </FormGroup>
                <Row className="g-2">
                <Col md>
                    <FormGroup className="mb-3" controlId="authors">
                        <Form.Control type="text" placeholder="Авторы" />
                    </FormGroup>
                </Col>
                <Col md>
                    <FormGroup controlId="authselect" className="mb-3">
                        <Form.Select >
                            
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </FormGroup>
                </Col>
                <Col md>
                <Button id="authadd" variant="secondary" type="input">
                    +
                </Button>
                </Col>

                </Row>
                <Row className="g-2">
                <Col md>
                    <FormGroup className="mb-3" controlId="tags">
                        <Form.Control type="text" placeholder="Теги" />
                    </FormGroup>
                </Col>
                <Col md>
                    <FormGroup controlId="tagselect" className="mb-3">
                        <Form.Select >
                            
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </FormGroup>
                </Col>
                <Col md>
                <Button id="tagadd" variant="secondary" type="input">
                    +
                </Button>
                </Col>
                </Row>
                <Row className="g-2">
                <Col md>
                    <FormGroup className="mb-3" controlId="series">
                        <Form.Control type="text" placeholder="Серии" />
                    </FormGroup>
                </Col>
                <Col md>
                    <FormGroup controlId="serselect" className="mb-3">
                        <Form.Select >
                            
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </FormGroup>
                </Col>
                <Col md>
                <Button id="seradd" variant="secondary" type="input">
                    +
                </Button>
                </Col>
                </Row>

                <Form.Group className="mb-3" controlId="BookDescr">
                    <Form.Control required as="textarea" rows='3' placeholder="Описание" />
                </Form.Group>
                <Form.Group controlId="bookimg" className="mb-3">
                    <Form.Label>Обложка книги</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Button variant="secondary" type="submit">
                    Добавить
                </Button>

            </Form>

            {/*<input type="text" placeholder="ISBN" />
            <input type="text" placeholder="Название книги" />
            <div>


                <Input value={tags.toString()} placeholder="автор(ы)" />
                <select name="authsel" id="authsel" value={tag} onChange={e => setTag(e.target.value)} >
                    <option value="автор1">автор1</option>
                    <option value="автор2">автор2</option>
                    <option value="автор3">автор3</option>
                    <option value="автор4">автор4</option>
                </select>
                
                <button onClick={gettag} onChange>+</button>
            </div>
            <div>
                <input type="text" name="taginp" id="taginp" placeholder="теги" />
                <select name="tagsel" id="tagsel">
                    <option value="тег1" >тег1</option>
                    <option value="тег2">тег2</option>
                    <option value="тег3">тег3</option>
                    <option value="тег4">тег4</option>

                </select>
                <button onclick={addtag}>+</button>
            </div>

            <div>
                <input type="text" name="serinp" id="serinp" placeholder="серия" />
                <select name="sersel" id="sersel">
                    <option value="серия1">серия1</option>
                    <option value="серия2">серия2</option>
                    <option value="серия3">серия3</option>
                    <option value="серия4">серия4</option>

                </select>
                <button onclick="addtag()">+</button>
            </div>

            <textarea placeholder="описание" rows='10'></textarea>

            <button>вхерачить</button>*/}

        </div>



    )
}

export default AddBook;