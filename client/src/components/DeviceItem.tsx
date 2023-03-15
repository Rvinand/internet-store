import React, {FC} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from 'react-router-dom'
import {DEVICE_ROUTE} from "../utils/consts";
import {IDevice} from "../Types/IDevice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";
import {useCookies} from "react-cookie";

interface DeviceItemProps {
    device: IDevice
}

const DeviceItem: FC<DeviceItemProps> = ({device}) => {
    const navigate = useNavigate()

    const [cookie, setCookie] = useCookies(["basketDevices", "savedDevices"]);

    const {basketDevices, savedDevices} = useAppSelector(state => state.DeviceSlice)
    const {setBasketDevices, setSavedDevices} = deviceSlice.actions
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
    const addToSaved = () => {
        const newSavedDevices = [...savedDevices, device]

        setCookie("savedDevices", newSavedDevices, {
            path: "/"
        });

        dispatch(setSavedDevices(newSavedDevices))
    }
    const deleteFromSaved = () => {

        const newSavedDevices = savedDevices.filter(d => d.name !== device.name)

        setCookie("savedDevices", newSavedDevices, {
            path: "/"
        });

        dispatch(setSavedDevices(newSavedDevices))

    }

    return (
        <Col md={3} className={"mt-5"}>
            <Card style={{cursor: 'pointer', flexDirection: "row"}} border={"light"} className={"d-flex"}>
                <Image height={150} src={'http://localhost:5000/' + device.img} style={{marginRight: "1rem"}}/>
                <Card.Text onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
                           style={{minWidth: "20rem"}}>{device.name}</Card.Text>
                <Col>
                    <Card.Title className={"p-1"} style={{textAlign: "end"}}>{device.price.toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                        minimumFractionDigits: 0
                    })}</Card.Title>
                    <Card.Body style={{minHeight: "5rem", paddingLeft: 0, paddingRight: 0}} className={"d-flex"}>
                        {
                            savedDevices.map(d => d.name).includes(device.name)
                                ? <Button style={{width: "4rem", marginRight: "1rem"}} variant={"dark"}
                                          onClick={deleteFromSaved}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                    </svg>
                                </Button>
                                : <Button style={{width: "4rem", marginRight: "1rem"}} variant={"outline-dark"}
                                          onClick={addToSaved}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-heart" viewBox="0 0 16 16">
                                        <path
                                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                    </svg>
                                </Button>
                        }
                        {
                            basketDevices.map(d => d.name).includes(device.name)
                                ? <Button style={{display: "block"}} variant={"dark"} onClick={deleteFromBasket}>Убрать
                                    из корзины</Button>
                                : <Button style={{display: "block"}} variant={"outline-dark"}
                                          onClick={addToBasket}>Купить</Button>
                        }
                    </Card.Body>
                </Col>


            </Card>
        </Col>
    );
};

export default DeviceItem;
