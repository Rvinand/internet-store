import React, {useEffect} from 'react';
import BrandCheck from "../components/BrandCheck";
import Col from "react-bootstrap/Col";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import {Container, Form, Row} from "react-bootstrap";
import {fetchDevices} from "../http/deviceAPI";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";

const CategoryPage = () => {
    const dispatch = useAppDispatch()
    const device = useAppSelector(state => state.DeviceSlice)
    const {setDevices, setTotalCount} = deviceSlice.actions

    useEffect(() => {
        fetchDevices(device.selectedCategory.id, device.selectedBrand.id, device.page, 3).then(data => {
            dispatch(setDevices(data.rows))
            dispatch(setTotalCount(data.count))
        })
    }, [device.page, device.selectedCategory, device.selectedBrand])

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <Form className={"p-3"}>
                        <BrandCheck/>
                    </Form>
                </Col>
                <Col md={8}>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>

        </Container>
    );
};

export default CategoryPage;