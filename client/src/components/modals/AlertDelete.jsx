import { Modal, Button } from "react-bootstrap"

const AlertDelete = ({ show, onHide, title, body , del}) =>{
    return(
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={del}>
                    Да, удалить
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AlertDelete