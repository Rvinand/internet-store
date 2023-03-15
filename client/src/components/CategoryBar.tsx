import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {IDeviceCategory} from "../Types/IDeviceCategory";
import {useNavigate} from "react-router-dom";
import {deviceSlice} from "../store/DeviceSlice";
import {Image} from "react-bootstrap";

const CategoryBar = () => {
    const device = useAppSelector(state => state.DeviceSlice)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const {setSelectedCategory} = deviceSlice.actions

    const switchCategory = (category: IDeviceCategory) => {
        dispatch(setSelectedCategory(category))
        navigate("category/" + category.name)
    }

    return (
        <ListGroup>
            {device.categories.map((category: IDeviceCategory) =>
                <ListGroup.Item
                    style={{cursor: 'pointer', border: "none"}}
                    onClick={() => switchCategory(category)}
                    key={category.id}
                >
                    <Image src={'http://localhost:5000/' + category.icon} height={24} width={24}/>
                    <span style={{marginLeft: "1rem"}}>{category.name}</span>
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default CategoryBar;
