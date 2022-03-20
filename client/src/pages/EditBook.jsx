import react, { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import Books from "./Books";
import { Loader } from "../components/UI/Loader";

function EditBook(){

    const [name, setName] = useState('')
    const [format, setFormat] = useState()
    const [book, setBook] = useState()
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchbook() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book`)
        setBooks(response.data)
    }

    async function dbook() {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}api/book/${book}`)
        return data
    }


    const deletebook = async () => {

        try {
            let data;
            data = await  dbook();   
            alert("удалено") 
        } catch (e) {
            alert(e.response.data.message)
        }       
    }


    useEffect(() => {
        setTimeout(() => {
            fetchbook().finally(() => setLoading(false))
        }, 1000);
    }, [])

    if (loading) {
        return <Loader />
    }
    

    return(
        <div className="enter">
            <Form>

                <FormGroup className="mb-3" controlId="bookdate">
                    <Form.Select onChange={(e) => setBook(e.target.value)}>
                        <option selected="true" disabled="disabled">Книга</option>
                        {books.map(option =>
                            <option key={option.title} value={option.title}>
                                {option.title}
                            </option>
                        )}
                    </Form.Select>
                </FormGroup>
        

                <Button variant="secondary" onClick={deletebook} >
                    Удалить
                </Button>

            </Form>

        </div >

    )
}

export default EditBook;