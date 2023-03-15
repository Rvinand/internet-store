import React from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import DeviceItem from "../components/DeviceItem";
import {Button, Col, Container, Row} from "react-bootstrap";
import {deviceSlice} from "../store/DeviceSlice";
import {useCookies} from "react-cookie";
import {IDevice} from "../Types/IDevice";

const Basket = () => {
    const [cookie, setCookie] = useCookies(["basketDevices"]);
    const {basketDevices} = useAppSelector(state => state.DeviceSlice)
    const dispatch = useAppDispatch()
    const {setBasketDevices} = deviceSlice.actions


    const deleteFromBasket = (device: IDevice) => {
        const newBasketDevices = basketDevices.filter(d => d.name !== device.name)

        setCookie("basketDevices", newBasketDevices, {
            path: "/"
        });

        dispatch(setBasketDevices(newBasketDevices))
    }

    return (
        <Container className={"mt-3"}>
            {basketDevices.map((device, index) => {
                return <Col key={index}>
                    <DeviceItem device={device}/>
                    <Button
                        onClick={() => deleteFromBasket(device)}>Удалить</Button>
                </Col>
            })}
        </Container>
    );
};

export default Basket;
