import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import DeviceItem from "../components/DeviceItem";
import {Col, Container} from "react-bootstrap";
import {deviceSlice} from "../store/DeviceSlice";
import {useCookies} from "react-cookie";

const Saved = () => {

    const {savedDevices} = useAppSelector(state => state.DeviceSlice)
    const dispatch = useAppDispatch()
    const {setSavedDevices} = deviceSlice.actions

    const [cookie] = useCookies(["savedDevices"]);

    useEffect(() => {
        if (savedDevices.length === 0 && cookie.savedDevices) {
            dispatch(setSavedDevices(cookie.savedDevices))
        }
    }, [])

    // TODO сохранение сохранённых девайсов пользователя если он auth

    return (
        <Container className={"mt-3"}>
            {
                savedDevices.length !== 0
                    ? savedDevices.map((device, index) => {
                        return <Col key={index}>
                            <DeviceItem device={device}/>
                        </Col>
                    })
                    : <div style={{
                        margin: "auto",
                        width: "20rem",
                        textAlign: "center",
                        fontSize: "1.5rem",
                        marginTop: "23rem"
                    }}>Пока вы не сохроняли устройсва</div>
            }

        </Container>
    );
};

export default Saved;
