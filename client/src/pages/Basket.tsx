import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import DeviceItem from "../components/DeviceItem";
import {Col, Container} from "react-bootstrap";
import {deviceSlice} from "../store/DeviceSlice";
import {useCookies} from "react-cookie";

const Basket = () => {
    const [cookie] = useCookies(["basketDevices"]);
    const {basketDevices} = useAppSelector(state => state.DeviceSlice)
    const dispatch = useAppDispatch()
    const {setBasketDevices} = deviceSlice.actions


    useEffect(() => {
        if (basketDevices.length === 0 && cookie.basketDevices) {
            dispatch(setBasketDevices(cookie.basketDevices))
        }
    }, [])

    return (
        <Container className={"mt-3"}>
            {
                basketDevices.length !== 0
                    ? basketDevices.map((device, index) => {
                        return <Col key={index}>
                            <DeviceItem device={device}/>
                        </Col>
                    })
                    : <div style={{
                        margin: "auto",
                        width: "20rem",
                        textAlign: "center",
                        fontSize: "1.5rem",
                        marginTop: "23rem"
                    }}>Пока что корзина пуста</div>
            }
        </Container>
    );
};

export default Basket;
