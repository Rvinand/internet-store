import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";
import {IDevice} from "../Types/IDevice";
import AddToBasketBtn from "../components/AddToBasketBtn";
import AddToSavedBtn from "../components/AddToSavedBtn";
import Rating from "../components/Rating";
import {convertToRub} from "../utils/convertToRub";
import ImageGallery from 'react-image-gallery';
import "./gallery.scss"


const DevicePage = () => {

    const [device, setDevice] = useState<IDevice | null>(null)

    const images: {original: string, thumbnail: string}[] = []
    device?.images?.map(i => {
        images.push({
            original: 'http://localhost:5000/' + i,
            thumbnail: 'http://localhost:5000/' + i,
        })
    })

    console.log(images)

    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(String(id)).then(data => setDevice(data))
    }, [])

    return (

        <Container className="mt-3">
            {device ?
                <> <h2>{device.name}</h2>
                    <Row>
                        <Col md={4}>
                            {device.images
                                ?
                                <ImageGallery items={images} showPlayButton={false}/>
                                :
                                <div style={{color: "crimson"}}>Картинку не удалось загрузить</div>
                            }

                        </Col>
                        <Col md={4}>
                            <Row className="d-flex flex-column align-items-center">
                                <Rating rating={device.rating}/>
                            </Row>
                        </Col>
                        <Col md={4}>
                            <Card
                                className="d-flex flex-column align-items-center justify-content-around"
                                style={{width: 300, height: 200, fontSize: 32, border: '5px solid lightgray'}}
                            >
                                <h3>{convertToRub(device.price)}</h3>

                                <div className={"d-flex"}>
                                    <AddToSavedBtn device={device}/>
                                    <AddToBasketBtn device={device}/>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    {device.info.length
                        ? <Row className="d-flex flex-column m-3">
                            <h1>Характеристики</h1>
                            {device.info.map((info, index) => {
                                return <Row key={index} style={{padding: 10}}>
                                    {index + 1}.{info.title}: {info.description}
                                </Row>
                            })}
                        </Row>
                        : <></>
                    }

                </>
                : <Spinner animation={"grow"}/>
            }

        </Container>
    );
};

export default DevicePage;
