
import { Link } from "react-router-dom";
import { ABOUT_ROUTE, AUTHOR_ROUTE, BOOKS_ROUTE, ORDER_ROUTE } from "../utils/consts";

const NavBar = () =>{
  return (
    <div className="nav d-flex justify-content-around">
		  <ul class="menu">					
			  <li><Link to={BOOKS_ROUTE}>КНИГИ</Link></li>
        <li><Link to={AUTHOR_ROUTE}>АВТОРЫ</Link></li>
        <li><Link to={ORDER_ROUTE}>ЗАКАЗАТЬ</Link></li>
        <li><Link to={ABOUT_ROUTE}>О НАС</Link></li>
		  </ul>
	  </div>

  );
};

export default NavBar;