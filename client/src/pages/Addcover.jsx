import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";


function AddCover() {

    return (
        <div className="tagenter">
            <input type="text" placeholder="название" />
            
            <button>добавить</button>

        </div>
    )
}

export default AddCover;