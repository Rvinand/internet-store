import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";
import {IDevice} from "../Types/IDevice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";
import {useCookies} from "react-cookie";


const DevicePage = () => {
    const [cookie, setCookie] = useCookies(["basketDevices", "savedDevices"]);

    const {basketDevices, savedDevices} = useAppSelector(state => state.DeviceSlice)
    const {setBasketDevices, setSavedDevices} = deviceSlice.actions
    const dispatch = useAppDispatch()

    const [device, setDevice] = useState<IDevice>({
        id: 0,
        description: "",
        img: null,
        name: "",
        rating: 0,
        price: 0,
        info: [{title: "", description: ""}]
    })
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(String(id)).then(data => setDevice(data))
        if (cookie.savedDevices) {
            dispatch(setSavedDevices(cookie.savedDevices))
        }

        if (cookie.basketDevices) {
            dispatch(setBasketDevices(cookie.basketDevices))
        }
    }, [])


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

        <Container className="mt-3">
            <h2>{device.name}</h2>
            <Row>
                <Col md={4}>

                    {
                        device.img
                            ? <Image width={400} height={400} src={'http://localhost:5000/' + device.img}/>
                            : <div>Картинка не прогрузилась</div>
                    }

                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                background: `url(${bigStar}) no-repeat center center`,
                                width: "5rem",
                                height: "5rem",
                                backgroundSize: 'cover',
                                fontSize: "2rem"
                            }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 200, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{device.price.toLocaleString('ru-RU', {
                            style: 'currency',
                            currency: 'RUB',
                            minimumFractionDigits: 0
                        })}</h3>

                        <div className={"d-flex"}>
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
                        </div>


                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) => {
                    return <Row key={index} style={{padding: 10}}>
                        {index + 1}.{info.title}: {info.description}
                    </Row>
                })}
            </Row>
        </Container>
    );
};

export default DevicePage;
