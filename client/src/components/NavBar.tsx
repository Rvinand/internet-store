import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SAVED_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {userSlice} from "../store/UserSlice";

const NavBar = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.UserSlice)
    const navigate = useNavigate()

    const {setUser, setIsAuth} = userSlice.actions

    const logOut = () => {
        dispatch(setUser(null))
        dispatch(setIsAuth(false))
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="warning" variant="dark">
            <Container>
                <NavLink style={{color: 'white', textDecoration: "none", fontWeight: "700", fontSize: "1.5rem"}}
                         to={SHOP_ROUTE}>VEGA</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            style={{display: "block", marginRight: "1rem"}}
                            variant={"dark"}
                            onClick={() => navigate(SAVED_ROUTE)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-heart" viewBox="0 0 16 16">
                                <path
                                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        </Button>
                        <Button
                            style={{display: "block", marginRight: "1rem"}}
                            variant={"dark"}
                            onClick={() => navigate(BASKET_ROUTE)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-basket3" viewBox="0 0 16 16">
                                <path
                                    d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6h-9.21z"/>
                            </svg>
                        </Button>
                        <Button
                            style={{display: "block", width: "5rem", marginRight: "1rem"}}
                            variant={"primary"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ
                        </Button>

                        <Button
                            style={{display: "block", width: "5rem"}}
                            variant={"light"}
                            onClick={() => logOut()}
                        >
                            Выйти
                        </Button>

                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
};

export default NavBar;
