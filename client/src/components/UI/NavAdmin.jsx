import react from "react"
import { Link } from "react-router-dom";

const NavAdmin = () => {
    return (
        <div className="admmenu">
            <li><Link to="/admin/book">Книги</Link></li>
            <li><Link to="/admin/tag">Теги/Жанры</Link></li>
            <li><Link to="/admin/series">Серии</Link></li>
            <li><Link to="/admin/author">Авторы</Link></li>
            <li><Link to="/admin/cover">Переплеты</Link></li>
            <li><Link to="/admin/format">Форматы</Link></li>        
            <li><Link to="/admin/pages">Изменить данные на страницах</Link></li>

        </div>
    );
};

export default NavAdmin;