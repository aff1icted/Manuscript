import react from "react"
import { Link } from "react-router-dom";

const NavAdmin = () => {
    return (
        <div className="admmenu">
            <li><Link to="/admin/addbook">добавить книгу</Link></li>
            <li><Link to="/admin/addtag">добавить тег</Link></li>
            <li><Link to="/admin/addseries">добавить серию</Link></li>
            <li><Link to="/admin/addauthor">добавить автора</Link></li>
            <li><Link to="/admin/addcover">добавить переплет</Link></li>
            <li><Link to="/admin/addformat">добавить формат</Link></li>        
            <li><Link to="/admin/pages">Изменить данные на страницах</Link></li>

        </div>
    );
};

export default NavAdmin;