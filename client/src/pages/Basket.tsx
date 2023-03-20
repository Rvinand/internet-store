import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import DeviceItem from "../components/DeviceItem";
import {Col, Container} from "react-bootstrap";
import {deviceSlice} from "../store/DeviceSlice";
import {useCookies} from "react-cookie";
import {convertToRub} from "../utils/convertToRub";
import {fetchBasketDevices} from "../http/basketAPI";
import {fetchOneDevice} from "../http/deviceAPI";
import {IDevice} from "../Types/IDevice";

const Basket = () => {
    const [cookie] = useCookies(["basketDevices"]);
    const {basketDevices} = useAppSelector(state => state.DeviceSlice)
    const {user} = useAppSelector(state => state.UserSlice)
    const [priceSum, setPriceSum] = useState<number>(0)
    const dispatch = useAppDispatch()
    const {setBasketDevices} = deviceSlice.actions


    useEffect(() => {
        if (user) {
            fetchBasketDevices(user.id).then(async bd => {
                    const newDevices: IDevice[] = []

                    for (const d of bd.rows) {
                        await fetchOneDevice(d.deviceId).then(dev => {
                            newDevices.push(dev)
                        })
                    }

                    dispatch(setBasketDevices(newDevices))
                }
            )


        } else if (basketDevices.length === 0 && cookie.basketDevices) {
            dispatch(setBasketDevices(cookie.basketDevices))
        }
    }, [])

    useEffect(() => {
        let totalPrice = 0

        basketDevices.map(d => {
            totalPrice += d.price
        })

        setPriceSum(totalPrice)
    }, [basketDevices])

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
            <hr/>
            {
                convertToRub(priceSum)
            }
        </Container>
    );
};

export default Basket;
