import { Link } from "react-router-dom";
import { ADMIN_AUTHOR_ROUTE, ADMIN_BOOK_ROUTE, ADMIN_COVER_ROUTE, ADMIN_FORMAT_ROUTE, ADMIN_PAGE_ROUTE, ADMIN_SERIES_ROUTE, ADMIN_TAG_ROUTE } from "../utils/consts";

const NavAdmin = () => {
    return (
        <div className="admmenu">
            <li><Link to={ADMIN_BOOK_ROUTE}>Книги</Link></li>
            <li><Link to={ADMIN_TAG_ROUTE}>Теги/Жанры</Link></li>
            <li><Link to={ADMIN_SERIES_ROUTE}>Серии</Link></li>
            <li><Link to={ADMIN_AUTHOR_ROUTE}>Авторы</Link></li>
            <li><Link to={ADMIN_COVER_ROUTE}>Переплеты</Link></li>
            <li><Link to={ADMIN_FORMAT_ROUTE}>Форматы</Link></li>        
            <li><Link to={ADMIN_PAGE_ROUTE}>Изменить данные на страницах</Link></li>

        </div>
    );
};

export default NavAdmin;