import React, {useEffect, useState} from 'react';
import BrandCheck from "../components/BrandCheck";
import Col from "react-bootstrap/Col";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import {Button, Container, Form, Row} from "react-bootstrap";
import {fetchBrands, fetchCategories, fetchDevices} from "../http/deviceAPI";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";
import {useParams} from "react-router-dom";
import {IDevice} from "../Types/IDevice";
import {IBrand} from "../Types/IBrand";

const CategoryPage = () => {
    const dispatch = useAppDispatch()
    const device = useAppSelector(state => state.DeviceSlice)
    const {setDevices, setTotalCount, setBrands, setCategories, setSelectedBrands} = deviceSlice.actions
    const [isAllUncheck, setIsAllUncheck] = useState<boolean>(false)
    const {category} = useParams<{category: string}>()

    useEffect(() => {
        fetchBrands().then(data => dispatch(setBrands(data)))

        let selectedBrandsIds: number[] | null = [];
        if (device.selectedBrands) {
            selectedBrandsIds = device.selectedBrands.map(brand => brand.id)
        } else {
            selectedBrandsIds = null
        }

        if (device.selectedCategory !== null) {
            fetchDevices(device.selectedCategory.id, selectedBrandsIds, device.page, 3).then(data => {
                dispatch(setDevices(data.rows))
                dispatch(setTotalCount(data.count))
            })
        } else {
            fetchCategories().then(data => {
                dispatch(setCategories(data))
                const currentCategory: IDevice = data.filter((c: IDevice) => c.name === category)
                fetchDevices(currentCategory.id, selectedBrandsIds, device.page, 3).then(data => {
                    dispatch(setDevices(data.rows))
                    dispatch(setTotalCount(data.count))
                })
            })

        }
    }, [device.page, device.selectedCategory, device.selectedBrands])

    function resetFiltration() {
        dispatch(setSelectedBrands([]))
        setIsAllUncheck(true)
    }

    return (
        <Container>
            <Row className={"mt-3"}>
                <Col
                    md={3}
                    style={{borderRadius: "5px", backgroundColor: "#fff"}}
                >
                    <Form className={"p-3"}>
                        <Form.Group>
                            <Form.Label
                                style={{fontWeight: 700, fontSize: "1.25rem"}}
                            >
                                Производители
                            </Form.Label>
                            {device.brands.map((brand: IBrand, i: number) =>
                                <BrandCheck key={i} brand={brand} isAllUncheck={isAllUncheck}/>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Button
                                className={"mt-5"}
                                onClick={(resetFiltration)}
                                variant={"outline-warning"}
                                style={{minWidth: "100%"}}
                                
                            >
                                Сбросить
                            </Button>
                        </Form.Group>
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