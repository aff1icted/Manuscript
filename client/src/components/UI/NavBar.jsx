
import { Link } from "react-router-dom";
import { ABOUT_ROUTE, AUTHOR_ROUTE, BOOKS_ROUTE, BOOKTAG_ROUTE, ORDER_ROUTE } from "../utils/consts";
import { Button, Form, NavDropdown, Offcanvas, FormControl } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import axios from "axios";




const NavBar = () => {

  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchtags() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/tag`)
    setTags(response.data)
  }


  useEffect(() => {
    fetchtags().finally(() => setLoading(false))

  }, [])

  return (


    <Navbar className="d-flex justify-content-around col-12" bg="dark">
      <Container fluid className="justify-content-around">



        <NavDropdown style={{ textDecoration: 'none', fontSize: '30px' }} title={"КНИГИ"}>
          <NavDropdown.Item href={BOOKS_ROUTE}>Все книги</NavDropdown.Item>
          {tags.map(tag => (
            <NavDropdown.Item href={BOOKTAG_ROUTE+`/${tag.tagname}`}>{tag.tagname}</NavDropdown.Item>
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