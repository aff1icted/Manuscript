import { Modal, Button } from "react-bootstrap"

const AlertMsg = ({ show, onHide, title, body }) => {
    return (
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
                <Button variant="secondary" onClick={onHide}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AlertMsg