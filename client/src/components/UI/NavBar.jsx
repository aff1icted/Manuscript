import react from "react"
import { Link } from "react-router-dom";

const NavBar = () =>{
  return (
    <div class="nav d-flex justify-content-around">
		  <ul class="menu">					
			  <li><Link to="/books">КНИГИ</Link></li>
        <li><Link to="/author">АВТОРЫ</Link></li>
        <li><Link to="/order">ЗАКАЗАТЬ</Link></li>
        <li><Link to="/about">О НАС</Link></li>
		  </ul>
	  </div>

  );
};

export default NavBar;