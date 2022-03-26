import react, { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";

function EditCover() {

    const [covers, setCovers] = useState([])
    const [cover, setCover] = useState()
    const [loading, setLoading] = useState(true)

    async function fetchcovers() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/cover`)
        setCovers(response.data)
    }

    useEffect(() => {
        setTimeout(() => {
            
            fetchcovers().finally(() => setLoading(false))
        }, 1000);
    }, [])

    async function dcover() {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/cover/${cover}`)
        return data
    }

    const deletecover = async () => {

        try {
            let data;
            data = await dcover();
            alert("удалено")
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className="enter">
            <Form>

                <FormGroup className="mb-3" controlId="bookdate">
                    <Form.Select onChange={(e) => setCover(e.target.value)}>
                        <option selected="true" disabled="disabled">Переплет</option>
                        {covers.map(option =>
                            <option key={option.cover} value={option.cover}>
                                {option.cover}
                            </option>
                        )}
                    </Form.Select>
                </FormGroup>

                <Button variant="secondary" onClick={deletecover}>
                    Удалить
                </Button>

            </Form>

        </div >

    )
}

export default EditCover;