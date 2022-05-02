import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/UI/Loader';
import NavAdmin from '../components/UI/NavAdmin';
import '../styles/App.css'

function AdminOrder() {
    const orderid = useParams().id
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState('')
    const [staff, setStaff] = useState([])
    const [sum, setSum] = useState(0)

    async function fetchorder() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/order/${ orderid }`)
        setOrder(response.data)
    }

    async function fetchstaff() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/staff`, { params: { orderid } })
        let s = 0
        response.data?.map(staff => s = s + (staff.book.price * staff.amount))
        setSum(s)

        setStaff(response.data)
    }



    useEffect(() => {
        fetchstaff()
        fetchorder().finally(() => setLoading(false))
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
            // setCurrentOrder(row.id)
        }
    }



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
                            <div>ФИО заказчика: {order.fullname}</div>
                            <div>Телефон: {order.phonenumber}</div>
                            <div>E-mail: {order.user.email}</div>
                            <div>Дата оформления: {order.createdAt}</div>
                            <BootstrapTable
                                keyField="id"
                                data={staff}
                                columns={columns}
                                hover="true"
                                selectRow={selectRow}
                                rowEvents={rowEvents}
                            />
                            Сумма:{sum}
                        </div>
                    </Col>
                    <Col md-auto>
                        {/* А здесь кнопки */}
                        {/* <div className="subcolumns-right">
              <Button variant="secondary" onClick={e => hist.push('/admin/tag/creating')}>
                Просмотреть
              </Button>
              <Button variant="secondary" onClick={e => hist.push(`/admin/tag/${currentTag}`)}>
                Изменить статус
              </Button>
            </div> */}

                    </Col>
                </Row>
                {/* <AlertButton show={show} onHide={() => setShow(false)} title={'Удаление'} body={`Вы уверены, что хотите удалить тег/жанр ${currentTag}?`} buttontext='Да, удалить' buttonfunc={() => { deletetag(); setShow(false) }} /> */}


            </div>
        </div>
    )
}

export default AdminOrder;