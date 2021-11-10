import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";


function AddAuthor() {

    return (
        <div>
            <div className="header">
                аккаунт
            </div>
            <div className="blocks">
                <div className="admmenu">
                <li><Link to="/admin">добавить книгу</Link></li>
                <li><Link to="/addtags">добавить тег</Link></li>
                <li><Link to="/addseries">добавить серию</Link></li>
                <li><Link to="/addauthor">добавить автора</Link></li>
                </div>
                <div className="enter">
                    <input type ="text" placeholder="имя"/>
                    <input type="text" placeholder="фамилия"/>
                    <input type="text" placeholder="отчество"/>

                    <textarea placeholder="описание" rows='10'></textarea>
                    <button>тут было фото</button>
                    <button>вхерачить</button>

                    </div>

                </div>
            </div>
            )
}

            export default AddAuthor;