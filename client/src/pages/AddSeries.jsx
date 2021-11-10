import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";


function AddSeries() {

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
                <div className="tagenter">
                    <input type ="text" placeholder="название серии"/>
                    
                    
                    <button>картинка</button>
                    <button>тут был календарь</button>

                    <button>вхерачить</button>

                    </div>

                </div>
            </div>
            )
}

            export default AddSeries;