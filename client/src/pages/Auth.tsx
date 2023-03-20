import React from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {useAppDispatch} from "../store/hooks";
import {userSlice} from "../store/UserSlice";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {IUser} from "../Types/IUser";

const Auth = () => {
    const dispatch = useAppDispatch()
    const {setUser, setIsAuth} = userSlice.actions
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE

    async function submitHandle(values: {email: string, password: string}){
        try {
            let data: IUser | null = null;
            if (isLogin) {
                data = await login(values.email, values.password);
            } else {
                data = await registration(values.email, values.password);
            }
            dispatch(setUser(data))
            dispatch(setIsAuth(true))
            navigate(SHOP_ROUTE)
        } catch (e: any) {
            alert(e.response.data.message)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Некоректный адрес почты').required('Значение не введено'),
            password: Yup.string()
                .min(6, 'В пароле должно быть как минимум 6 символов')
                .required('Значение не введено'),
        }),
        onSubmit: (values) => submitHandle(values)
    });

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
                    <Form.Control
                        id="email"
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        type={"email"}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div style={{color: "crimson"}}>{formik.errors.email}</div>
                    ) : null}
                    <Form.Control
                        id="password"
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        type="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{color: "crimson"}}>{formik.errors.password}</div>
                    ) : null}
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <Button
                            type={"submit"}
                            style={{marginTop: "1rem"}}
                            variant={"outline-success"}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;
