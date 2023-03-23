import React, {useEffect} from 'react';
import {Button, Card, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryBar from "../components/CategoryBar";
import {useAppDispatch} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";
import {fetchCategories} from "../http/deviceAPI";
import rupor from "../assets/rupor.png"

const Shop = () => {


    const dispatch = useAppDispatch()
    const {setCategories} = deviceSlice.actions


    useEffect(() => {
        fetchCategories().then(data => dispatch(setCategories(data)))
    }, [])

    return (
        <Container>
            <Row className="mt-4">
                <Col md={3}>
                    <CategoryBar/>
                </Col>
                <Col md={1}>

                </Col>
                <Col md={6}>
                    <Row className={"mb-4 mt-2"}>
                        <Col>
                            <Card className={'p-3'}
                                  style={{
                                      height: "15rem",
                                      background: "#ecf9ff url(https://cmp.dns-shop.ru/images/78097831b51ec906c029.png) no-repeat bottom"
                                  }}>
                                <Card.Title>Сервис</Card.Title>
                                <Card.Text>Гарантия, возврат, обмен и ремонт</Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card className={'p-3'}
                                  style={{
                                      height: "15rem",
                                      background: "#e8f8f0 url(https://cmp.dns-shop.ru/images/8093fcc9cf0b9f8c19c5.webp) no-repeat bottom"
                                  }}>
                                <Card.Title>Акции</Card.Title>
                                <Card.Text>Скидки, рассрочки, выгодные комплекты</Card.Text>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className={'p-3'}
                                  style={{
                                      height: "15rem",
                                      background: "#fcf6d7 url(https://cmp.dns-shop.ru/images/61cb8851c7a94b3200c4.webp) no-repeat bottom"
                                  }}>
                                <Card.Title>
                                    Собрать кухню
                                </Card.Title>
                                <Card.Text> Выбирайте технику для кухни по-новому!</Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card className={'p-3'}
                                  style={{
                                      height: "15rem",
                                      background: "#ffefef url(https://cmp.dns-shop.ru/images/c97288867824cbe1ed8d.webp) no-repeat bottom"
                                  }}>
                                <Card.Title>
                                    Помощь
                                </Card.Title>
                                <Card.Text> Частые вопросы, полезная информация</Card.Text>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
