import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";


function AddFormat() {

    return (
        <div className="tagenter">
            <input type="text" placeholder="название формата" />
            <input type="text" placeholder="коэффициент" />

            <button>добавить</button>

        </div>
    )
}

export default AddFormat;