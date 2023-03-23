import React, {FC} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from 'react-router-dom'
import {DEVICE_ROUTE} from "../utils/consts";
import {IDevice} from "../Types/IDevice";
import AddToSavedBtn from "./AddToSavedBtn";
import AddToBasketBtn from "./AddToBasketBtn";
import {convertToRub} from "../utils/convertToRub";
import "./DeviceItem.scss"

interface DeviceItemProps {
    device: IDevice
}

const DeviceItem: FC<DeviceItemProps> = ({device}) => {
    const navigate = useNavigate()

    return (
        <Col md={3}>
            <Card style={{flexDirection: "row", border: "none"}} className={"d-flex"}>
                {device.images
                    ?
                    <Image
                        style={{cursor: 'pointer'}}
                        onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
                        height={150}
                        src={'http://localhost:5000/' + device.images[0]}
                        className={"m-3"}
                    />
                    :
                    <div style={{color: "crimson"}}>Картинку не удалось загрузить</div>
                }

                <Card.Text
                    className={"m-3 device_name"}
                    onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
                    style={{minWidth: "20rem", cursor: 'pointer'}}>
                    {device.name}
                </Card.Text>
                <Card.Body>
                    <Card.Title className={"m-3"} style={{textAlign: "end"}}>
                        {convertToRub(device.price)}
                    </Card.Title>
                    <Card.Body style={{minHeight: "5rem"}} className={"d-flex"}>
                        <AddToSavedBtn device={device}/>
                        <AddToBasketBtn device={device}/>
                    </Card.Body>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default DeviceItem;
