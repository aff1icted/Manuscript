import react, { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Loader } from "../components/UI/Loader";
import axios from "axios";
import { faArrowRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";


function Pages() {
    const [loading, setLoading] = useState(true)
    const [pages, setPages] = useState([])
    const [mainText, setMainText] = useState('')
    const [book, setBook] = useState('')
    const [author, setAuthor] = useState('')
    const [about, setAbout] = useState('')
    const [footer, setFooter] = useState('')
    const [first, setFirst] = useState('')
    const [second, setSecond] = useState('')
    const [third, setThird] = useState('')
    const [fourth, setFourth] = useState('')
    const [fifth, setFifth] = useState('')

    async function uPage(type) {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}api/page`, type)
        return data
    }

    const edtPage = async () => {
        try {
            const formData = new FormData()
            /*formData.append('mainText', mainText)
            formData.append('book', book)
            formData.append('author', author) 
            formData.append('about', about) 
            formData.append('footer', footer) 
            formData.append('first', first) 
            formData.append('second', second) 
            formData.append('third', third) 
            formData.append('fourth', fourth) 
            formData.append('fifth', fifth) 
            переделать создание данных
            */
            let data;
            data = await uPage(formData);
            alert('Сохранено')
        } catch (e) {
            alert(e.response.data.message)
        }
    }



    async function fetchPages() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/pages`)
        setPages(response.data)
    }

    useEffect(() => {
        setTimeout(() => {

            fetchPages().finally(() => setLoading(false))
            setMainText()
            setBook()
            setAuthor()
            setAbout()
            setFooter()
            setFifth()
            setSecond()
            setThird()
            setFourth()
            setFifth()//сделать присвоение
        }, 1000);
    }, [])


    if (loading) {
        return <Loader />
    }
    return (

        <div className="enter">
            < Form >
                <Form.Label>Главная страница</Form.Label>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="" value={mainText} onChange={e => setMainText(e.target.value)} />
                </Form.Group>
                <Form.Label>Страница книг</Form.Label>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="" value={book} onChange={e => setBook(e.target.value)} />
                </Form.Group>
                <Form.Label>Страница авторов</Form.Label>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="" value={author} onChange={e => setAuthor(e.target.value)} />
                </Form.Group>
                <Form.Label>Страница о нас</Form.Label>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="" value={about} onChange={e => setAbout(e.target.value)} />
                </Form.Group>
                <Form.Label>Подвал</Form.Label>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="" value={footer} onChange={e => setFooter(e.target.value)} />
                </Form.Group>
                <Form.Label>Банер1</Form.Label>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="" value={first} onChange={e => setFirst(e.target.value)} />
                </Form.Group>
                <Form.Label>Банер2</Form.Label>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="" value={second} onChange={e => setSecond(e.target.value)} />
                </Form.Group>
                <Form.Label>Банер3</Form.Label>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="" value={third} onChange={e => setThird(e.target.value)} />
                </Form.Group>
                <Form.Label>Банер4</Form.Label>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="" value={fourth} onChange={e => setFourth(e.target.value)} />
                </Form.Group>
                <Form.Label>Банер5</Form.Label>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="" value={fifth} onChange={e => setFifth(e.target.value)} />
                </Form.Group>

                <Button variant="secondary" onClick={edtPage}>
                    Сохранить
                </Button>


            </Form >
        </div>




    )
}

export default Pages;