import react, { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from 'axios'

function EditTags() {
    const [loading, setLoading] = useState(true)
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [tagname, setTagname] = useState([])

    async function fetchtags() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/tag`)
        setTags(response.data)
    }

    useEffect(() => {
        setTimeout(() => {
            fetchtags().finally(() => setLoading(false))
        }, 1000);
    }, [])

    async function dtag() {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/tag/${tagname}`)
        return data
    }

    const deletetag = async () => {

        try {
            let data;
            data = await dtag();
            alert("удалено")
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    

    return (
        <div className="enter">
            <Form>

                <FormGroup className="mb-3" controlId="bookdate">
                    <Form.Select onChange={(e) => setTagname(e.target.value)}>
                        <option selected="true" disabled="disabled">Тег</option>
                        {tags.map(option =>
                            <option key={option.tagname} value={option.tagname}>
                                {option.tagname}
                            </option>
                        )}
                    </Form.Select>
                </FormGroup>

                <Button variant="secondary" onClick={deletetag} >
                    Удалить
                </Button>

            </Form>

        </div >
    )
}

export default EditTags;