import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'


function AddAuthor() {

    const [fullName, setFullName] = useState('')
    const [description, setDescription] = useState('')
    
    const [img, setImg] = useState(null)



    async function create(type) {
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}api/author`, type)
        return data
    }

    const addAuthor = () => {
        const formData = new FormData()
        formData.append('fullname',fullName)
        formData.append('about',description)
        formData.append('img',img)
        console.log('govno',formData)
        

        create(formData).then(data => {
            setFullName('')
            setDescription('')
            setImg(null)
            
        })
    }

    const selectFile = e =>{
        console.log(e.target.files[0])
        setImg(e.target.files[0])
        console.log('img',img)
        
        
    }

    return (


        <div className="enter">
            
            < Form >
                <Form.Group className="mb-3" controlId="AuthorFullName">
                    <Form.Control required type="text" placeholder="Полное имя" value={fullName} onChange={e=>setFullName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="AuthorDescr">
                    <Form.Control as="textarea" rows='3' placeholder="Описание" value={description} onChange={e=>setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="authimg" className="mb-3">
                    <Form.Label>Фотография автора</Form.Label>
                    <Form.Control type="file" onChange={selectFile/*e=>setImg(e.target.files[0])*/} />
                </Form.Group>
                <Button variant="secondary"  onClick={addAuthor}>
                    Добавить
                </Button>
            </Form >

        </div>
    )
}

export default AddAuthor;