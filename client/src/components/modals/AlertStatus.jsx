import axios from "axios"
import { useState } from "react"
import { Modal, Button } from "react-bootstrap"

const AlertStatus = ({ show, onHide, id }) => {
    const [status,setStatus]= useState('Оформлен')

    async function ustatus(type) {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}api/order`, type)
        return data
    }

    const edtstatus= async () => {
        try {
            const formData = new FormData()
            formData.append('id', id)
            formData.append('status', status)
            let data;
            data = await ustatus(formData);
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Смена статус</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Сменить статус заказа {id} на: 
                <select onChange={(e) => setStatus(e.target.value)}>
                    <option selected="true" key={'Оформлен'} value={'Оформлен'}> {'Оформлен'}</option>
                    <option key={'Подтвержден'} value={'Подтвержден'}> {'Подтвержден'}</option>
                    <option key={'Оплечен'} value={'Оплечен'}> {'Оплечен'}</option>
                    <option key={'Отправлен'} value={'Отправлен'}> {'Отправлен'}</option>
                    <option key={'Закрыт'} value={'Закрыт'}> {'Закрыт'}</option>
                </select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{edtstatus()}}>
                    Сменить
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AlertStatus