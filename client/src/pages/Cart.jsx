import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { Context } from "../index";
import Footer from "../components/UI/Footer"
import { Loader } from "../components/UI/Loader"
import NavBar from "../components/UI/NavBar"
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import AlertButton from "../components/modals/AlertButton";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import AlertMsg from "../components/modals/AlertMsg";
import { useHistory } from "react-router-dom";
import { MAIN_ROUTE } from "../components/utils/consts";
import { deleteStaff } from "../http/staffApi";
import { createOrder } from "../http/orderApi";

const Cart = observer(() => {
    const hist = useHistory()
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [staff, setStaff] = useState([])
    const [show, setShow] = useState(false)
    const [buyShow, setBuyShow] = useState(false)
    const [orderShow, setOrderShow] = useState(false)
    const [id, setId] = useState()
    const [fullname, setFullname] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [sum, setSum] = useState(0)
    const [emptyCart, setEmptyCart] = useState(true)
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')


    async function fetchstaff() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/staff/${user.user.username}`)
        console.log('response', response.data.length)
        if (response.data.length > 0) {
            let s = 0
            response.data?.map(staff => s = s + (staff.book.price * staff.amount))
            setSum(s)
            setStaff(response.data)
        } else {
            setEmptyCart(false)
        }

    }

    async function deletestaff(id) {
        deleteStaff(id).then(() => fetchstaff())

    }


    const addOrder = async () => {
        try {
            if (fullname == '' || phonenumber == '') {
                throw ('Все обязательные поля должны быть заполнены')
            }
            const formData = new FormData()
            formData.append('fullname', fullname)
            formData.append('phonenumber', phonenumber)
            formData.append('userUsername', user.user.username)
            createOrder(formData)
            setOrderShow(true)
        } catch (e) {
            setError(e)
            setShowError(true)
        }
    }




    useEffect(() => {
        fetchstaff().finally(() => setLoading(false))
    }, [])

    const columns = [
        { dataField: "id", text: "id", hidden: true },
        { dataField: "book.title", text: "Название" },
        { dataField: "amount", text: "Количество, шт." },
        { dataField: "book.price", text: "Цена экземпляра, ₽" }
    ]

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true
    };

    const rowEvents = {
        onClick: (e, row) => {
            setId(row.id)
            setShow(true)
        }
    }

    if (loading) {
        <Loader />
    }
    return (
        <div>
            <div className="col-10 content">
                <NavBar />
                {emptyCart ?
                    <div className="col-5" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                        <Form>
                            <Form.Label>ФИО<span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control required type="text" value={fullname} onChange={e => setFullname(e.target.value)} />
                            <Form.Label>Телефон<span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control required type="text" value={phonenumber} onChange={e => setPhonenumber(e.target.value)} />
                        </Form>
                        <div style={{ paddingTop: "20px" }}>
                            <BootstrapTable
                                keyField="id"
                                data={staff}
                                columns={columns}
                                hover="true"
                                selectRow={selectRow}
                                rowEvents={rowEvents}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ fontSize: "20px", paddingBottom: "10px" }}>Сумма: {sum}₽</div>
                            <Button onClick={() => setBuyShow(true)}>
                                Оформить заказ
                            </Button>
                        </div>

                        <AlertButton
                            show={show}
                            onHide={() => setShow(false)}
                            title={'Корзина'}
                            body={`Вы уверены, что хотите убрать книгу из корзины?`}
                            buttontext='Да, убрать'
                            buttonfunc={() => { deletestaff(id); setShow(false) }} />
                        <AlertButton
                            show={buyShow}
                            onHide={() => setBuyShow(false)}
                            title={'Заказ'}
                            body={`Вы уверены, что хотите оформить?`}
                            buttontext='Да, оформить'
                            buttonfunc={() => { addOrder(); setBuyShow(false); }} />
                        <AlertMsg
                            title={'Заказ'}
                            body={'Заказ оформлен'}
                            show={orderShow}
                            onHide={() => { setOrderShow(false); hist.push(MAIN_ROUTE) }}

                        />

                    </div>
                    :
                    <div style={{ paddingTop: "30px", fontSize: "20px" }}>
                        Корзина пуста, добавьте что-то, чтобы оформить заказ.
                    </div>
                }
                <AlertMsg show={showError} onHide={() => setShowError(false)} title={'Ошибка'} body={error} />
            </div>
            <Footer />
        </div>

    )
})

export default Cart;