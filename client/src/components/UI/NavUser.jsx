import React, { useContext } from 'react';
import { Context } from "../../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, USERORDER_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';
import logo from '../../static/mainlogo_white2.svg';
import signout from '../../static/sign-out.svg';
import orders from '../../static/receipt-solid.svg';
import adminpen from '../../static/pen-solid.svg';
import cart from '../../static/cart-shopping-solid.svg';
import loginkey from '../../static/key-solid.svg';

const NavUser = observer(() => {
    const { user } = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
        localStorage.setItem('token', '')
    }

    return (
        <Navbar className='navgrey col-8 mx-auto' variant="dark" >
            <Container>
                <NavLink style={{ color: 'white' }} to={MAIN_ROUTE}> <img src={logo} style={{fill:"white"}} height="45px"/></NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        {user.isAdmin ?
                            <div>
                                <img onClick={() => history.push(ADMIN_ROUTE)} src={adminpen} height="30px" style={{cursor:"pointer", paddingLeft:"15px"}}/>
                                {/* <Button
                                    variant={"outline-light"}
                                    onClick={() => history.push(ADMIN_ROUTE)}
                                >
                                    Админ панель
                                </Button> */}

                                <img onClick={() => history.push(CART_ROUTE)} src={cart} height="30px" style={{cursor:"pointer", paddingLeft:"25px"}}/>
                                {/* <Button
                                    variant={"outline-light"}
                                    onClick={() => history.push(CART_ROUTE)}
                                    className="ml-2"
                                >
                                    Корзина
                                </Button> */}
                                <img onClick={() => history.push(USERORDER_ROUTE)} src={orders} height="30px" style={{cursor:"pointer", paddingLeft:"25px"}}/>
                                {/* <Button
                                    variant={"outline-light"}
                                    onClick={() => history.push(USERORDER_ROUTE)}
                                    className="ml-2"
                                >
                                    Мои заказы
                                </Button> */}

                                <img onClick={() => logOut()} src={signout} height="30px" style={{cursor:"pointer", paddingLeft:"25px"}}/>
                                {/* <Button
                                    variant={"outline-light"}
                                    onClick={() => logOut()}
                                    className="ml-2"
                                >
                                    
                                </Button> */}
                            </div>



                            :
                            <div>
                                <img onClick={() => history.push(CART_ROUTE)} src={cart} height="30px" style={{cursor:"pointer", paddingLeft:"25px"}}/>
                                <img onClick={() => history.push(USERORDER_ROUTE)} src={orders} height="30px" style={{cursor:"pointer", paddingLeft:"25px"}}/>
                                <img onClick={() => logOut()} src={signout} height="30px" style={{cursor:"pointer", paddingLeft:"25px"}}/>

                            </div>

                        }
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <img onClick={() => history.push(LOGIN_ROUTE)} src={loginkey} height="30px" style={{cursor:"pointer", paddingLeft:"25px"}}/>
                        
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavUser;