import react, {useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from 'axios'
import { Loader } from "../components/UI/Loader";


function AddTag() {

    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [tagname, setTagname] = useState('')
    const [loading, setLoading] = useState(true)

    async function create(type) {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/tag`, type)
        return data
    }


    const addTag = async () => {
        try {
            let data;
            data = await create({ tagname: tag });
            alert("Добавленно")
            setTag('')
        } catch (e) {
            alert(e.response.data.message)
        }
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

    async function dtag() {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/tag/${tagname}`)
        return data
    }

    async function fetchtags() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/tag`)
        setTags(response.data)
    }

    useEffect(() => {
        setTimeout(() => {
            fetchtags().finally(() => setLoading(false))
        }, 1000);
    }, [])


    if (loading) {
        return <Loader />
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

                <FormGroup className="mb-3" controlId="Tagname">
                    <Form.Control required type="text" placeholder="Название тега" value={tag} onChange={e => setTag(e.target.value)} />
                </FormGroup>

                <Button variant="secondary" onClick={addTag}>
                    Добавить
                </Button>

                <Button variant="secondary" onClick={deletetag} >
                    Удалить
                </Button>

            </Form>

        </div >
    )
}

export default AddTag;