import react, { useState } from "react";
import '../styles/Admcss.css'


function addtag() {
    document.getElementById('taginp').value = document.getElementById('taginp').value + document.getElementById("tagsel").options[document.getElementById("tagsel").options.selectedIndex].value + ',';
    console.log("fdkfksd",document.getElementById("taginp"));
}
function AddBook() {

    return (
        <div>
            
            
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
                    <button onclick="addtag()">+</button>
                    </div>
                    <div>
                    <input type ="text" name="taginp" id="taginp" placeholder="теги"/>
                    <select name="tagsel" id="tagsel">
                    <option value="тег1">тег1</option>
                    <option value="тег2">тег2</option>
                    <option value="тег3">тег3</option>
                    <option value="тег4">тег4</option>

                    </select>
                    <button onclick={addtag}>+</button>
                    </div>

                    <div>
                    <input type ="text" name="serinp" id="serinp" placeholder="серия"/>
                    <select name="sersel" id="sersel">
                    <option value="серия1">серия1</option>
                    <option value="серия2">серия2</option>
                    <option value="серия3">серия3</option>
                    <option value="серия4">серия4</option>

                    </select>
                    <button onclick="addtag()">+</button>
                    </div>
            
                    <textarea placeholder="описание" rows='10'></textarea>

                    <button>вхерачить</button>

                    </div>

                </div>
            
            )
}

            export default AddBook;