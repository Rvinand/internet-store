import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";
import {createDevice, fetchBrands, fetchCategories} from "../../http/deviceAPI";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {deviceSlice} from "../../store/DeviceSlice";
import {IBrand} from "../../Types/IBrand";
import {IDeviceCategory} from "../../Types/IDeviceCategory";


const CreateDevice = ({show, onHide}: { show: boolean, onHide: () => void }) => {
    const device = useAppSelector(state => state.DeviceSlice)
    const dispatch = useAppDispatch()
    const {setBrands, setCategories} = deviceSlice.actions

    const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<IDeviceCategory | null>(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState<any>([])

    useEffect(() => {

        fetchCategories().then(data => dispatch(setCategories(data)))

        fetchBrands().then(data => dispatch(setBrands(data)))
    }, [])

    const addInfo = () => {

        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number: any) => {

        setInfo(info.filter((i: { number: any; }) => i.number !== number))
    }

    const changeInfo = (key: string, value: string, number: any) => {

        setInfo(info.map((i: { number: any; }) => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = (e: { target: { files: React.SetStateAction<null>[]; }; }) => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        // @ts-ignore
        formData.append('img', file)
        if (selectedBrand !== null) {
            formData.append('brandId', String(selectedBrand.id))
        } else {
            console.log("Бренд не выбран")
            return
        }

        if (selectedCategory !== null) {

            formData.append('categoryId', String(selectedCategory.id))
        } else {
            console.log("Категория не выбранна")
            return
        }

        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(() => onHide())

        setSelectedBrand(null)
        setSelectedCategory(null)
        setPrice(0)
        setFile(null)
        setInfo([])
    }



    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{selectedCategory?.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.categories.map(category =>
                                <Dropdown.Item
                                    onClick={() => setSelectedCategory(category)}
                                    key={category.id}
                                >
                                    {category.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{selectedBrand?.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название устройства"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        // @ts-ignore
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map((i: { number: React.Key | null | undefined; title: string | number | string[] | undefined; description: string | number | string[] | undefined; }) =>

                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control

                                    value={i.title}

                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control

                                    value={i.description}

                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button

                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDevice;
