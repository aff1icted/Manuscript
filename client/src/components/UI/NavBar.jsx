
import { Link } from "react-router-dom";
import { ABOUT_ROUTE, AUTHOR_ROUTE, BOOKS_ROUTE, ORDER_ROUTE } from "../utils/consts";
import { Button, Form, NavDropdown, Offcanvas, FormControl } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";




const NavBar = () => {

  const tags =[
    {tagname:"tag1"}, 
    {tagname:"tag2"}, 
    {tagname:"tag3"}
  ];

  return (


    <Navbar className="d-flex justify-content-around col-12" bg="dark">
      <Container  fluid className="justify-content-around">


        
        <NavDropdown style={{ color: '#ffffff', textDecoration: 'none', fontSize: '30px' }} title={"КНИГИ"}>
        {tags.map(tag => (
          <NavDropdown.Item>{tag.tagname}</NavDropdown.Item>
          ))}
        </NavDropdown>
        <NavLink style={{ color: 'white', textDecoration: 'none', fontSize: '30px' }} to={AUTHOR_ROUTE}>АВТОРЫ</NavLink>
        <NavLink style={{ color: 'white', textDecoration: 'none', fontSize: '30px' }} to={ORDER_ROUTE}>ЗАКАЗАТЬ</NavLink>
        <NavLink style={{ color: 'white', textDecoration: 'none', fontSize: '30px' }} to={ABOUT_ROUTE}>О НАС</NavLink>

      </Container>
    </Navbar>

    /* <ul class="menu">					
        <li><Link to={BOOKS_ROUTE}>КНИГИ</Link></li>
        <li><Link to={AUTHOR_ROUTE}>АВТОРЫ</Link></li>
        <li><Link to={ORDER_ROUTE}>ЗАКАЗАТЬ</Link></li>
        <li><Link to={ABOUT_ROUTE}>О НАС</Link></li>
      </ul> */

  );
};

export default NavBar;