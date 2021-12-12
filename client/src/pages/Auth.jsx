import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { LOGIN_ROUTE } from "../components/utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { BOOKS_ROUTE } from '../components/utils/consts';

const Auth = observer(() => {

    const { user } = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const registration = async (email, password) => {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/user/registration`, {username, email, password, role: 'ADMIN' })
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }

    const login = async (username, password) => {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/user/login`, { username, password })
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }
    

    const click = async () => {
          try {
              let data;
              if (isLogin) {
                  data = await login(username, password);
              } else {
                  data = await registration(email, password);
              }
              user.setUser(user)
              user.setIsAuth(true)
              history.push(BOOKS_ROUTE)
          } catch (e) {
              alert(e.response.data.message)
          }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    {isLogin ?
                        <div>
                            <Form.Control

                                className="mt-3"
                                placeholder="Введите ваш username..."
                                value={username}
                                onChange={e => setUserName(e.target.value)}
                            />
                        </div>
                        :
                        <div>
                            <Form.Control

                                className="mt-3"
                                placeholder="Введите ваш email..."
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control

                                className="mt-3"
                                placeholder="Введите ваш username..."
                                value={username}
                                onChange={e => setUserName(e.target.value)}
                            />
                        </div>
                    }
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to="/registration">Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to="/login">Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;