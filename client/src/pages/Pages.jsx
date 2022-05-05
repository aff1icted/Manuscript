import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, Button, Col, Row } from "react-bootstrap";
import { Loader } from "../components/UI/Loader";
import axios from "axios";
import NavAdmin from "../components/UI/NavAdmin";
import { updatePage } from "../http/pagesApi";
import AlertMsg from "../components/modals/AlertMsg";



function Pages() {
    const [loading, setLoading] = useState(true)
    const [mainText, setMainText] = useState('')
    const [book, setBook] = useState('')
    const [author, setAuthor] = useState('')
    const [about, setAbout] = useState('')
    const [order, setOrder] = useState('')
    const [footer1, setFooter1] = useState('')
    const [footer2, setFooter2] = useState('')
    const [footer3, setFooter3] = useState('')
    const [footer4, setFooter4] = useState('')
    const [footer5, setFooter5] = useState('')
    const [footer6, setFooter6] = useState('')
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
    const [showEdit, setShowEdit] = useState(false)


    const edtPage = async () => {
        try {
            const formData = new FormData()
            formData.append('mainText', mainText)
            formData.append('book', book)
            formData.append('author', author)
            formData.append('about', about)
            formData.append('order', order)

            formData.append('footer1', footer1)
            formData.append('footer2', footer2)
            formData.append('footer3', footer3)
            formData.append('footer4', footer4)
            formData.append('footer5', footer5)
            formData.append('footer6', footer6)

            formData.append('banner1', first)
            formData.append('banner2', second)
            formData.append('banner3', third)
            formData.append('banner4', fourth)
            formData.append('banner5', fifth)

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

            updatePage(formData)
            setShowEdit(true)
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
                case 'order':
                    setOrder(obj.text)
                    break;
                case 'footer1':
                    setFooter1(obj.text)
                    break;
                case 'footer2':
                    setFooter2(obj.text)
                    break;
                case 'footer3':
                    setFooter3(obj.text)
                    break;
                case 'footer4':
                    setFooter4(obj.text)
                    break;
                case 'footer5':
                    setFooter5(obj.text)
                    break;
                case 'footer6':
                    setFooter6(obj.text)
                    break;
                case 'banner1':
                    setFirst(obj.text)
                    setFirstUrl(obj.url)
                    break;
                case 'banner2':
                    setSecond(obj.text)
                    setSecondUrl(obj.url)
                    break;
                case 'banner3':
                    setThird(obj.text)
                    setThirdUrl(obj.url)
                    break;
                case 'banner4':
                    setFourth(obj.text)
                    setFourthUrl(obj.url)
                    break;
                case 'banner5':
                    setFifth(obj.text)
                    setFifthUrl(obj.url)
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
        <div className="blocks">
            <NavAdmin />
            <div className="enter">
                <Row className="justify-content-md-center">
                    <Col md-4>
                        {/* Основная часть, здесь размещать таблицы и проч */}
                        <div className="subcolumns-left">
                            <Form>
                                {/* <Form.Label>Главная страница</Form.Label>
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
                                </Form.Group> */}
                                <Form.Label>Страница о нас</Form.Label>
                                <Form.Group className="mb-3" controlId="AuthorDescr">
                                    <Form.Control as="textarea" rows='3' placeholder="" value={about} onChange={e => setAbout(e.target.value)} />
                                </Form.Group>
                                <Form.Label>Страница заказа</Form.Label>
                                <Form.Group className="mb-3" controlId="AuthorDescr">
                                    <Form.Control as="textarea" rows='3' placeholder="" value={order} onChange={e => setOrder(e.target.value)} />
                                </Form.Group>
                                <Form.Label>Подвал</Form.Label>
                                <Form.Group className="mb-3" controlId="AuthorDescr">
                                    <Form.Control className="mb-3" placeholder="" value={footer1} onChange={e => setFooter1(e.target.value)} />
                                    <Form.Control className="mb-3" placeholder="" value={footer2} onChange={e => setFooter2(e.target.value)} />
                                    <Form.Control className="mb-3" placeholder="" value={footer3} onChange={e => setFooter3(e.target.value)} />
                                    <Form.Control className="mb-3" placeholder="" value={footer4} onChange={e => setFooter4(e.target.value)} />
                                    <Form.Control className="mb-3" placeholder="" value={footer5} onChange={e => setFooter5(e.target.value)} />
                                    <Form.Control className="mb-3" placeholder="" value={footer6} onChange={e => setFooter6(e.target.value)} />
                                </Form.Group>
                                <div style={{ fontSize: "30px" }}>
                                    <Form.Label>Редактирование баннера</Form.Label></div>
                                <Form.Label>Страница №1</Form.Label>
                                <div style={{ backgroundColor: "#cbcbcb" }}>
                                    <Form.Group className="mb-3" controlId="AuthorDescr" style={{ padding: "10px" }}>
                                        <Form.Label>Текст</Form.Label>
                                        <Form.Control className="mb-3" placeholder="" value={first} onChange={e => setFirst(e.target.value)} />
                                        <Form.Label>Изображение <span style={{color:"gray"}}>(800х300 пикселей, JPG)</span></Form.Label>
                                        <Form.Control className="mb-3" type="file" onChange={e => setFirstImg(e.target.files[0])} />
                                        <Form.Label>Ссылка</Form.Label>
                                        <Form.Control className="mb-3" placeholder="" value={firstUrl} onChange={e => setFirstUrl(e.target.value)} />
                                    </Form.Group>
                                </div>


                                <Form.Label>Страница №2</Form.Label>
                                <div style={{ backgroundColor: "#cbcbcb" }}>
                                    <Form.Group className="mb-3" controlId="AuthorDescr" style={{ padding: "10px" }}>
                                        <Form.Label>Текст</Form.Label>
                                        <Form.Control className="mb-3" placeholder="" value={second} onChange={e => setSecond(e.target.value)} />
                                        <Form.Label>Изображение <span style={{color:"gray"}}>(800х300 пикселей, JPG)</span></Form.Label>
                                        <Form.Control className="mb-3" type="file" onChange={e => setSecondImg(e.target.files[0])} />
                                        <Form.Label>Ссылка</Form.Label>
                                        <Form.Control className="mb-3" placeholder="" value={secondUrl} onChange={e => setSecondUrl(e.target.value)} />
                                    </Form.Group></div>
                                <Form.Label>Страница №3</Form.Label>
                                <div style={{ backgroundColor: "#cbcbcb" }}>
                                    <Form.Group className="mb-3" controlId="AuthorDescr" style={{ padding: "10px" }}>
                                        <Form.Label>Текст</Form.Label>
                                        <Form.Control className="mb-3" placeholder="" value={third} onChange={e => setThird(e.target.value)} />
                                        <Form.Label>Изображение <span style={{color:"gray"}}>(800х300 пикселей, JPG)</span></Form.Label>
                                        <Form.Control className="mb-3" type="file" onChange={e => setThirdImg(e.target.files[0])} />
                                        <Form.Label>Ссылка</Form.Label>
                                        <Form.Control className="mb-3" placeholder="" value={thirdUrl} onChange={e => setThirdUrl(e.target.value)} />
                                    </Form.Group></div>
                                <Form.Label>Страница №4</Form.Label>
                                <div style={{ backgroundColor: "#cbcbcb" }}>
                                    <Form.Group className="mb-3" controlId="AuthorDescr" style={{ padding: "10px" }}>
                                        <Form.Label>Текст</Form.Label>
                                        <Form.Control className="mb-3" placeholder="" value={fourth} onChange={e => setFourth(e.target.value)} />
                                        <Form.Label>Изображение <span style={{color:"gray"}}>(800х300 пикселей, JPG)</span></Form.Label>
                                        <Form.Control className="mb-3" type="file" onChange={e => setFourthImg(e.target.files[0])} />
                                        <Form.Label>Ссылка</Form.Label>
                                        <Form.Control className="mb-3" placeholder="" value={fourthUrl} onChange={e => setFourthUrl(e.target.value)} />
                                    </Form.Group></div>
                                <Form.Label>Страница №5</Form.Label>
                                <div style={{ backgroundColor: "#cbcbcb" }}>
                                    <Form.Group className="mb-3" controlId="AuthorDescr" style={{ padding: "10px" }}>
                                        <Form.Label>Текст</Form.Label>
                                        <Form.Control className="mb-3" placeholder="" value={fifth} onChange={e => setFifth(e.target.value)} />
                                        <Form.Label>Изображение <span style={{color:"gray"}}>(800х300 пикселей, JPG)</span></Form.Label>
                                        <Form.Control className="mb-3" type="file" onChange={e => setFifthImg(e.target.files[0])} />
                                        <Form.Label>Ссылка</Form.Label>
                                        <Form.Control className="mb-3" placeholder="" value={fifthUrl} onChange={e => setFifthUrl(e.target.value)} />
                                    </Form.Group></div>
                            </Form >
                            <AlertMsg show={showEdit} onHide={() => { setShowEdit(false) }} title={'Оповещение'} body={`Данные на страницах изменены`} />
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
        </div>




    )
}

export default Pages;