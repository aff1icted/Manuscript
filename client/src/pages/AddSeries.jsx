import react, { useState } from "react";
import '../styles/Admcss.css'
import { Link } from "react-router-dom";


function AddSeries() {

    return (
        <div className="tagenter">
            <input type="text" placeholder="название серии" />


            <button>картинка</button>
            <button>тут был календарь</button>

            <button>вхерачить</button>

        </div>

    )
}

export default AddSeries;