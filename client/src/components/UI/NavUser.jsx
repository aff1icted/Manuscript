import React, { useContext } from 'react';
import { Context } from "../../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, USERORDER_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom'
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
        <Navbar className='col-12' bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white' }} to={MAIN_ROUTE}>лого</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        {user.isAdmin ?
                            <div>
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => history.push(ADMIN_ROUTE)}
                                >
                                    Админ панель
                                </Button>
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => history.push(CART_ROUTE)}
                                    className="ml-2"
                                >
                                    Корзина
                                </Button>
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => history.push(USERORDER_ROUTE)}
                                    className="ml-2"
                                >
                                    Мои заказы
                                </Button>

                                <Button
                                    variant={"outline-light"}
                                    onClick={() => logOut()}
                                    className="ml-2"
                                >
                                    Выйти
                                </Button>
                            </div>



                            :
                            <div>
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => history.push(CART_ROUTE)}
                                    className="ml-2"
                                >
                                    Корзина
                                </Button>
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => history.push(USERORDER_ROUTE)}
                                    className="ml-2"
                                >
                                    Мои заказы
                                </Button>
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => logOut()}
                                    className="ml-2"
                                >
                                    Выйти
                                </Button>

                            </div>

                        }
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavUser;