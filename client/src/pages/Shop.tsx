import React, {useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryBar from "../components/CategoryBar";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";
import {fetchBrands, fetchDevices, fetchCategories} from "../http/deviceAPI";

const Shop = () => {


    const dispatch = useAppDispatch()
    const {setTypes, setBrands, setDevices, setTotalCount} = deviceSlice.actions


    useEffect(() => {
        fetchCategories().then(data => dispatch(setTypes(data)))
        fetchBrands().then(data => dispatch(setBrands(data)))
        fetchDevices(null, null, 1, 2).then(data => {
            dispatch(setDevices(data.rows))
            dispatch(setTotalCount(data.count))
        })
    }, [])



    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <CategoryBar/>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
