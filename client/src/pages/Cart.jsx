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


    async function fetchstaff() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/staff/${user.user.username}`)
        console.log('response',response.data.length)
        if (response.data.length>0) {
            let s = 0
            response.data?.map(staff => s = s + (staff.book.price * staff.amount))
            setSum(s)
            setStaff(response.data)
        } else {
            setEmptyCart(false)
        }

    }

    async function deletestaff(id) {
        await axios.delete(`${process.env.REACT_APP_API_URL}api/staff/${id}`)
        fetchstaff()
    }

    async function create(type) {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/order`, type)
        return data
    }

    const addOrder = async () => {
        try {
            const formData = new FormData()
            formData.append('fullname', fullname)
            formData.append('phonenumber', phonenumber)
            formData.append('userUsername', user.user.username)
            let data;
            data = await create(formData);
            setOrderShow(true)
        } catch (e) {
            alert(e.response.data.message)
        }
    }




    useEffect(() => {
        fetchstaff().finally(() => setLoading(false))
    }, [])

    const columns = [
        { dataField: "id", text: "id" },
        { dataField: "book.title", text: "Название" },
        { dataField: "amount", text: "Количество" },
        { dataField: "book.price", text: "Цена экземпляра" }
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
            <div className="content">
                <NavBar />
                {emptyCart ?
                    <div>
                        <Form>
                            <Form.Label>ФИО</Form.Label>
                            <Form.Control required type="text" value={fullname} onChange={e => setFullname(e.target.value)} />
                            <Form.Label>Телефон</Form.Label>
                            <Form.Control required type="text" value={phonenumber} onChange={e => setPhonenumber(e.target.value)} />
                        </Form>
                        <BootstrapTable
                            keyField="id"
                            data={staff}
                            columns={columns}
                            hover="true"
                            selectRow={selectRow}
                            rowEvents={rowEvents}
                        />
                        Сумма:{sum}
                        <Button onClick={() => setBuyShow(true)}>
                            Оформить заказ
                        </Button>

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
                    <div>
                        Корзина пуста, добавьте что-то чтобы оформить заказ
                    </div>
                }

            </div>
            <Footer />
        </div>

    )
})

export default Cart;