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
    const [mainText, setMainText] = useState('')
    const [book, setBook] = useState('')
    const [author, setAuthor] = useState('')
    const [about, setAbout] = useState('')
    const [footer, setFooter] = useState('')
    const [firstImg, setFirstImg] = useState(null)
    const [secondImg, setSecondImg] = useState(null)
    const [thirdImg, setThirdImg] = useState(null)
    const [fourthImg, setFourthImg] = useState(null)
    const [fifthImg, setFifthImg] = useState(null)
    const [firstUrl, setFirstUrl] = useState('')
    const [secondUrl, setSecondUrl] = useState('')
    const [thirdUrl, setThirdUrl] = useState('')
    const [fourthUrl, setFourthUrl] = useState('')
    const [fifthUrl, setFifthUrl] = useState('')
    const [first, setFirst] = useState('')
    const [second, setSecond] = useState('')
    const [third, setThird] = useState('')
    const [fourth, setFourth] = useState('')
    const [fifth, setFifth] = useState('')

    async function uPage(type) {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}api/pages`, type)
        return data
    }

    const edtPage = async () => {
        try {
            const formData = new FormData()
            formData.append('mainText', mainText)
            formData.append('book', book)
            formData.append('author', author)
            formData.append('about', about)
            formData.append('footer', footer)
            formData.append('first', first)
            formData.append('second', second)
            formData.append('third', third)
            formData.append('fourth', fourth)
            formData.append('fifth', fifth)

            formData.append('firstimg', firstImg)
            formData.append('secondimg', secondImg)
            formData.append('thirdimg', thirdImg)
            formData.append('fourthimg', fourthImg)
            formData.append('fifthimg', fifthImg)

            formData.append('firsturl', firstUrl)
            formData.append('secondurl', secondUrl)
            formData.append('thirdurl', thirdUrl)
            formData.append('fourthurl', fourthUrl)
            formData.append('fifthurl', fifthUrl)

            let data;
            data = await uPage(formData);
            alert('Сохранено')
        } catch (e) {
            alert(e.response.data.message)
        }
    }



    async function fetchPages() {
        let response = []
        response = await axios.get(`${process.env.REACT_APP_API_URL}api/pages`)
        dataUpdate(response.data)
    }

    const dataUpdate = (data) => {
        data?.map(function (obj) {
            switch (obj.item) {
                case 'mainText':
                    setMainText(obj.text)
                    break;
                case 'book':
                    setBook(obj.text)
                    break;
                case 'author':
                    setAuthor(obj.text)
                    break;
                case 'about':
                    setAbout(obj.text)
                    break;
                case 'footer':
                    setFooter(obj.text)
                    break;
                case 'first':
                    setFirst(obj.text)
                    setFirstUrl(obj.url)
                    break;
                case 'second':
                    setSecond(obj.text)
                    setSecondUrl(obj.url)
                    break;
                case 'third':
                    setThird(obj.text)
                    setSecondUrl(obj.url)
                    break;
                case 'fourth':
                    setFourth(obj.text)
                    setSecondUrl(obj.url)
                    break;
                case 'fifth':
                    setFifth(obj.text)
                    setSecondUrl(obj.url)
                    break;
                default:
                    break;
            }

        })
    }

    useEffect(() => {

        fetchPages().finally(() => setLoading(false))

    }, [])


    if (loading) {
        return <Loader />
    }
    return (

        <div className="enter">
            <Row className="justify-content-md-center">
                <Col md-4>
                    {/* Основная часть, здесь размещать таблицы и проч */}
                    <div className="subcolumns-left">
                        <Form>
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
                            <Form.Label>Банер</Form.Label>
                            <Form.Label>Страница1</Form.Label>
                            <Form.Group className="mb-3" controlId="AuthorDescr">
                                <Form.Control as="textarea" rows='3' placeholder="" value={first} onChange={e => setFirst(e.target.value)} />
                                <Form.Control type="file" onChange={e => setFirstImg(e.target.files[0])} />
                                <Form.Control as="textarea" rows='3' placeholder="" value={firstUrl} onChange={e => setFirstUrl(e.target.value)} />
                            </Form.Group>
                            <Form.Label>Страница2</Form.Label>
                            <Form.Group className="mb-3" controlId="AuthorDescr">
                                <Form.Control as="textarea" rows='3' placeholder="" value={second} onChange={e => setSecond(e.target.value)} />
                                <Form.Control type="file" onChange={e => setSecondImg(e.target.files[0])} />
                                <Form.Control as="textarea" rows='3' placeholder="" value={secondUrl} onChange={e => setSecondUrl(e.target.value)} />
                            </Form.Group>
                            <Form.Label>Страница3</Form.Label>
                            <Form.Group className="mb-3" controlId="AuthorDescr">
                                <Form.Control as="textarea" rows='3' placeholder="" value={third} onChange={e => setThird(e.target.value)} />
                                <Form.Control type="file" onChange={e => setThirdImg(e.target.files[0])} />
                                <Form.Control as="textarea" rows='3' placeholder="" value={thirdUrl} onChange={e => setThirdUrl(e.target.value)} />
                            </Form.Group>
                            <Form.Label>Страница4</Form.Label>
                            <Form.Group className="mb-3" controlId="AuthorDescr">
                                <Form.Control as="textarea" rows='3' placeholder="" value={fourth} onChange={e => setFourth(e.target.value)} />
                                <Form.Control type="file" onChange={e => setFourthImg(e.target.files[0])} />
                                <Form.Control as="textarea" rows='3' placeholder="" value={fourthUrl} onChange={e => setFourthUrl(e.target.value)} />
                            </Form.Group>
                            <Form.Label>Страница5</Form.Label>
                            <Form.Group className="mb-3" controlId="AuthorDescr">
                                <Form.Control as="textarea" rows='3' placeholder="" value={fifth} onChange={e => setFifth(e.target.value)} />
                                <Form.Control type="file" onChange={e => setFifthImg(e.target.files[0])} />
                                <Form.Control as="textarea" rows='3' placeholder="" value={fifthUrl} onChange={e => setFifthUrl(e.target.value)} />
                            </Form.Group>
                        </Form >
                    </div>
                </Col>
                <Col md-auto>
                    {/* А здесь кнопки */}
                    <div className="subcolumns-right">
                        <Button variant="secondary" onClick={edtPage}>
                            Сохранить
                        </Button>
                    </div>

                </Col >
            </Row >



        </div>




    )
}

export default Pages;