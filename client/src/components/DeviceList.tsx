import React from 'react';
import {Col} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import {useAppSelector} from "../store/hooks";

const DeviceList = () => {
    const device = useAppSelector(state => state.DeviceSlice.devices)

    return (
        <Col className="d-flex" style={{flexDirection: "column"}}>
            {device.map(device =>
                <div
                    key={device.id}
                    style={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                    }}
                    className={"m-2"}
                >
                    <DeviceItem device={device}/>
                </div>
            )}
        </Col>
    );
};

export default DeviceList;
