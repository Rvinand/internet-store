import React, {FC, useEffect} from 'react';
import {useCookies} from "react-cookie";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";
import {Button} from "react-bootstrap";
import {IDevice} from "../Types/IDevice";

interface AddToBasketBtnProps {
    device: IDevice
}

const AddToBasketBtn:FC<AddToBasketBtnProps> = ({device}) => {

    const [cookie, setCookie] = useCookies(["basketDevices"]);

    const {basketDevices} = useAppSelector(state => state.DeviceSlice)
    const {setBasketDevices} = deviceSlice.actions
    const dispatch = useAppDispatch()


    const addToBasket = () => {
        const newBasketDevices = [...basketDevices, device]

        setCookie("basketDevices", newBasketDevices, {
            path: "/"
        });

        dispatch(setBasketDevices(newBasketDevices))
    }
    const deleteFromBasket = () => {
        const newBasketDevices = basketDevices.filter(d => d.name !== device.name)

        setCookie("basketDevices", newBasketDevices, {
            path: "/"
        });

        dispatch(setBasketDevices(newBasketDevices))
    }

    useEffect(() => {
        if (cookie.basketDevices) {
            dispatch(setBasketDevices(cookie.basketDevices))
        }
    }, [])

    return (
        <div>
            {
                basketDevices.map(d => d.name).includes(device.name)
                    ? <Button style={{display: "block"}} variant={"dark"} onClick={deleteFromBasket}>Убрать
                        из корзины</Button>
                    : <Button style={{display: "block"}} variant={"outline-dark"}
                              onClick={addToBasket}>Купить</Button>
            }
        </div>
    );
};

export default AddToBasketBtn;