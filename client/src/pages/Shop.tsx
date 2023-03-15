import React, {useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryBar from "../components/CategoryBar";
import {useAppDispatch} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";
import {fetchCategories} from "../http/deviceAPI";

const Shop = () => {


    const dispatch = useAppDispatch()
    const {setCategories} = deviceSlice.actions


    useEffect(() => {
        fetchCategories().then(data => dispatch(setCategories(data)))
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
