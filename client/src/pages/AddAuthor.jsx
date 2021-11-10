import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";


function AddAuthor() {

    return (


        <div className="enter">
            <input type="text" placeholder="имя" />
            <input type="text" placeholder="фамилия" />
            <input type="text" placeholder="отчество" />

            <textarea placeholder="описание" rows='10'></textarea>
            <button>тут было фото</button>
            <button>вхерачить</button>

        </div>
    )
}

export default AddAuthor;