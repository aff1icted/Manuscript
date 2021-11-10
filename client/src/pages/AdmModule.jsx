import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";


function AdmModule() {

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
                    <input type ="text" placeholder="ISBN"/>
                    <input type="text" placeholder="Название книги"/>
                    <div>
                    <input type ="text" name="authinp" id="authinp" placeholder="автор(ы)"/>
                    <select name="authsel" id="authsel">
                    <option value="автор1">автор1</option>
                    <option value="автор2">автор2</option>
                    <option value="автор3">автор3</option>
                    <option value="автор4">автор4</option>
                    </select>
                    <button >+</button>
                    </div>
                    <div>
                    <input type ="text" name="taginp" id="taginp" placeholder="теги"/>
                    <select name="tagsel" id="tagsel">
                    <option value="тег1">тег1</option>
                    <option value="тег2">тег2</option>
                    <option value="тег3">тег3</option>
                    <option value="тег4">тег4</option>

                    </select>
                    <button >+</button>
                    </div>

                    <div>
                    <input type ="text" name="serinp" id="serinp" placeholder="серия"/>
                    <select name="sersel" id="sersel">
                    <option value="серия1">серия1</option>
                    <option value="серия2">серия2</option>
                    <option value="серия3">серия3</option>
                    <option value="серия4">серия4</option>

                    </select>
                    <button >+</button>
                    </div>

                    
                    

                    <textarea placeholder="описание" rows='10'></textarea>

                    <button>вхерачить</button>

                    </div>

                </div>
            </div>
            )
}

            export default AdmModule;