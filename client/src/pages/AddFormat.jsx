import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";
import { Form, FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";

function AddFormat() {

    const [name, setName]= useState('')
    const [coeff,setCoeff]= useState('')
    

    async function create(type) {
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}api/format`, type)
        return data
    }

    /*const addformat = () => {               

        create({name:name,transfercoeff:coeff}).then(data => {
            setName('')  
            setCoeff('') 
        })
    }*/


    const addformat = async () => {          
        try {
            let data;
            data = await create({name:name,transfercoeff:coeff});            
            setName('')  
            setCoeff('')              
        } catch (e) {
            alert(e.response.data.message)
        }        
    }

    return (
        <div className="enter">
            
            <Form>
                <FormGroup className="mb-3" controlId="formatname">
                    <Form.Control required type="text" placeholder="Название формата" value={name} onChange={e=>setName(e.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-3" controlId="formratio">
                    <Form.Control required type="text" placeholder="коэффициент" value={coeff} onChange={e=>setCoeff(e.target.value)}/>
                </FormGroup>
               
                <Button variant="secondary" onClick= {addformat}>
                    Добавить
                </Button>
            </Form>
            
                        
        </div>
    )
}

export default AddFormat;