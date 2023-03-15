import React from 'react';
import {Col} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import {useAppSelector} from "../store/hooks";

const DeviceList = () => {
    const device = useAppSelector(state => state.DeviceSlice.devices)

    return (
        <Col className="d-flex" style={{flexDirection: "column"}}>
            {device.map(device =>
                    <DeviceItem key={device.id} device={device}/>
            )}
        </Col>
    );
};

export default DeviceList;
