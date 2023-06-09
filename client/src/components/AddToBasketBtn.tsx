import React, {FC, useEffect} from 'react';
import {useCookies} from "react-cookie";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";
import {Button} from "react-bootstrap";
import {IDevice} from "../Types/IDevice";
import {createBasketDevice, deleteBasketDevice, fetchBasketDevices} from "../http/basketAPI";
import {fetchOneDevice} from "../http/deviceAPI";

interface AddToBasketBtnProps {
    device: IDevice
}

const AddToBasketBtn: FC<AddToBasketBtnProps> = ({device}) => {

    const [cookie, setCookie] = useCookies(["basketDevices"]);

    const {basketDevices} = useAppSelector(state => state.DeviceSlice)
    const {user} = useAppSelector(state => state.UserSlice)
    const {setBasketDevices} = deviceSlice.actions
    const dispatch = useAppDispatch()


    const addToBasket = async () => {
        if (user) {
            await createBasketDevice(user.id, device.id)
            const newBasketDevices = [...basketDevices, device]
            dispatch(setBasketDevices(newBasketDevices))

        } else {
            const newBasketDevices = [...basketDevices, device]

            setCookie("basketDevices", newBasketDevices, {
                path: "/"
            });

            dispatch(setBasketDevices(newBasketDevices))
        }
    }
    const deleteFromBasket = async () => {

        if (user) {
            await deleteBasketDevice(user.id, device.id)
            const newBasketDevices = basketDevices.filter(d => d.name !== device.name)

            dispatch(setBasketDevices(newBasketDevices))

        } else {
            const newBasketDevices = basketDevices.filter(d => d.name !== device.name)

            setCookie("basketDevices", newBasketDevices, {
                path: "/"
            });

            dispatch(setBasketDevices(newBasketDevices))
        }

    }

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
        } else if (cookie.basketDevices) {
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