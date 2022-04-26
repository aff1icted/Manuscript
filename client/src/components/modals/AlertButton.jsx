import { Modal, Button } from "react-bootstrap"

const AlertButton= ({ show, onHide, title, body , buttonfunc, buttontext}) =>{
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
                <Button variant="secondary" onClick={buttonfunc}>
                    {buttontext}
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AlertButton