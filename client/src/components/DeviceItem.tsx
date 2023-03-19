import React, {FC} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from 'react-router-dom'
import {DEVICE_ROUTE} from "../utils/consts";
import {IDevice} from "../Types/IDevice";
import AddToSavedBtn from "./AddToSavedBtn";
import AddToBasketBtn from "./AddToBasketBtn";
import {convertToRub} from "../utils/convertToRub";

interface DeviceItemProps {
    device: IDevice
}

const DeviceItem: FC<DeviceItemProps> = ({device}) => {
    const navigate = useNavigate()

    return (
        <Col md={3} className={"mt-5"}>
            <Card style={{cursor: 'pointer', flexDirection: "row"}} border={"light"} className={"d-flex"}>
                {device.images
                    ?
                    <Image
                        onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
                        height={150}
                        src={'http://localhost:5000/' + device.images[0]}
                        style={{marginRight: "1rem"}}
                    />
                    :
                    <div style={{color: "crimson"}}>Картинку не удалось загрузить</div>
                }

                <Card.Text
                    onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
                    style={{minWidth: "20rem"}}>
                    {device.name}
                </Card.Text>
                <Col>
                    <Card.Title className={"p-1"} style={{textAlign: "end"}}>{convertToRub(device.price)}</Card.Title>
                    <Card.Body style={{minHeight: "5rem", paddingLeft: 0, paddingRight: 0}} className={"d-flex"}>
                        <AddToSavedBtn device={device}/>
                        <AddToBasketBtn device={device}/>
                    </Card.Body>
                </Col>


            </Card>
        </Col>
    );
};

export default DeviceItem;
