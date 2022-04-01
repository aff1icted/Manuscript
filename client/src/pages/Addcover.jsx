import {useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Loader } from "../components/UI/Loader";


function AddCover() {

    const [covers, setCovers] = useState([])
    const [cover, setCover] = useState('')
    const [coverName, setCoverName] = useState('')
    const [loading, setLoading] = useState(true)

    async function create(type) {
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}api/cover`, type)
        return data
    }    

    const addCover = async () => {               
        try {
            let data;
            data = await create({cover:coverName});            
            setCover('')  
            alert("Добавленно")           
        } catch (e) {
            alert(e.response.data.message)
        }         
    }  

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


    if (loading) {
        return <Loader />
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

                <FormGroup className="mb-3" controlId="covername">
                    <Form.Control required type="text" placeholder="Название" value={coverName} onChange={e=>setCoverName(e.target.value)}/>
                </FormGroup>
                               
                <Button variant="secondary" onClick={addCover}>
                    Добавить
                </Button>

                <Button variant="secondary" onClick={deletecover}>
                    Удалить
                </Button>
            </Form>

        </div>
    )
}

export default AddCover;