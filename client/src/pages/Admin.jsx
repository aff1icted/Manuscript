import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { useHistory } from 'react-router-dom';
import AlertStatus from '../components/modals/AlertStatus';
import { Loader } from '../components/UI/Loader';
import NavAdmin from '../components/UI/NavAdmin';
import { ADMIN_ROUTE } from '../components/utils/consts';
import '../styles/App.css'

function Admin() {
  const hist = useHistory()
  const [loading, setLoading] = useState(true)
  const [filterHide, setFilterHide] = useState(true)
  const [filterButton, setFIlterButton] = useState('Показать фильтр')
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [currentOrder, setCurrentOrder] = useState('')
  const [show, setShow] = useState(false)
  const [statusFiltr, setStatusFiltr] = useState('')

  async function fetchorders() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/order`)
    setOrders(response.data)
    setFilteredOrders(response.data)
  }

  useEffect(() => {
    fetchorders().finally(() => setLoading(false))
  }, [])

  const columns = [
    { dataField: "id", text: "Номер" },
    { dataField: "createdAt", text: "Дата офрмления" },
    { dataField: "status", text: "Статус" }
  ]

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    bgColor: '#00BFFF',
    hideSelectColumn: true
  };

  const rowEvents = {
    onClick: (e, row) => {
      setCurrentOrder(row.id)
    }
  }

  function Filtr() {

    setFilteredOrders(orders.filter(order => order.status.toLowerCase().includes(statusFiltr.toLowerCase())))

  };

  function FilterClic() {
    if (filterHide) {
      setFilterHide(false)
      setFIlterButton('Скрыть фильтр')
    } else {
      setFilterHide(true)
      setFIlterButton('Показать фильтр')
    }
  };

  if (loading) {
    return <Loader />
  }
  return (
    <div className="col-10 mx-auto blocks">
      <NavAdmin />
      <div className="enter"  style={{width:"100vw"}}>
        <Row className="justify-content-md-center">
          <Col md-4>
            {/* Основная часть, здесь размещать таблицы и проч */}
            <div className="subcolumns-left">
              <div style={{ paddingBottom: "10px"}} hidden={filterHide}>
                Сортировка по статусу заказа:
                <div style={{display:"flex", paddingTop: "10px"}}>
                <select onChange={(e) => setStatusFiltr(e.target.value)}>
                  <option selected="true" key={''} value={''}> {'Любой'}</option>
                  <option key={'Оформлен'} value={'Оформлен'}> {'Оформлен'}</option>
                  <option key={'Подтвержден'} value={'Подтвержден'}> {'Подтвержден'}</option>
                  <option key={'Оплечен'} value={'Оплечен'}> {'Оплечен'}</option>
                  <option key={'Отправлен'} value={'Отправлен'}> {'Отправлен'}</option>
                  <option key={'Закрыт'} value={'Закрыт'}> {'Закрыт'}</option>
                </select>
                <Button onClick={Filtr}>Поиск</Button>
                </div>
              </div>
              <Button onClick={FilterClic}>{filterButton}</Button>
              <BootstrapTable
                keyField="id"
                data={filteredOrders}
                columns={columns}
                hover="true"
                selectRow={selectRow}
                rowEvents={rowEvents}
              />
            </div>
          </Col>
          <Col md-auto>
            {/* А здесь кнопки */}
            <div className="subcolumns-right">
              <Button variant="secondary" onClick={e => hist.push(ADMIN_ROUTE + `/${currentOrder}`)}>
                Просмотреть
              </Button>
              <Button variant="secondary" onClick={() => (setShow(true))}>
                Изменить статус
              </Button>
            </div>

          </Col>
        </Row>
        <AlertStatus id={currentOrder} onHide={() => { setShow(false); fetchorders() }} show={show} />


      </div>
    </div>
  )
}

export default Admin;