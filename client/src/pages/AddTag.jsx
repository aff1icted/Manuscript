import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";
import NavAdmin from "../components/UI/NavAdmin";
import HeaderAdmin from "../components/UI/HeaderAdmin";


function AddTag() {

    return (
        <div className="tagenter">
            <input type="text" placeholder="название тега" />

            <button>вхерачить</button>

        </div>
    )
}

export default AddTag;