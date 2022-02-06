import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from 'axios'


function AddTag() {

    const [tag, setTag]= useState('')

    async function create(type) {
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}api/tag`, type)
        return data
    }

    /*const addTag = async () => {          
        try {
            create({tagname:tag}).then(data => {
                setTag('')   
            })
        } catch (e) {
            alert(e.response.data.message)
        }        
    }*/
    
    const addTag = async () => {          
        try {
            let data;
            data = await create({tagname:tag});            
            setTag('')               
        } catch (e) {
            alert(e.response.data.message)
        }        
    }

    /*const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(username, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(BOOKS_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

  }*/

    return (
        <div className="enter">
            <Form>

            <FormGroup className="mb-3" controlId="Tagname">
            <Form.Control required type="text" placeholder="Название тега" value={tag} onChange={e=>setTag(e.target.value)} />
            </FormGroup>
            <Button variant="secondary"  onClick={addTag}>
                Добавить
            </Button>
            
        </Form>
            
        </div >
    )
}

export default AddTag;