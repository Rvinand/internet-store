import React from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import DeviceItem from "../components/DeviceItem";
import {Button, Col, Container, Row} from "react-bootstrap";
import {deviceSlice} from "../store/DeviceSlice";
import {useCookies} from "react-cookie";
import {IDevice} from "../Types/IDevice";

const Saved = () => {

    const {savedDevices} = useAppSelector(state => state.DeviceSlice)
    const dispatch = useAppDispatch()
    const {setSavedDevices} = deviceSlice.actions

    const [cookie, setCookie] = useCookies(["savedDevices"]);


    const deleteFromSaved = (device: IDevice) => {

        const newSavedDevices = savedDevices.filter(d => d.name !== device.name)

        setCookie("savedDevices", newSavedDevices, {
            path: "/"
        });

        dispatch(setSavedDevices(newSavedDevices))

    }

    return (
        <Container className={"mt-3"}>
            {savedDevices.map((device, index) => {
                return <Col key={index}>
                    <DeviceItem device={device}/>
                    <Button
                        onClick={() => deleteFromSaved(device)}>Удалить</Button>
                </Col>
            })}
        </Container>
    );
};

export default Saved;
