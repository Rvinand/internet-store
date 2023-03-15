import React from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";
import {IBrand} from "../Types/IBrand";
import {Form} from "react-bootstrap";

const BrandCheck = () => {

    const dispatch = useAppDispatch()
    const {setSelectedBrand} = deviceSlice.actions
    const device = useAppSelector(state => state.DeviceSlice)

    return (
        <div>
            {device.brands.map((brand: IBrand) =>
                <Form.Check
                    key={brand.id}
                    className="p-1"
                    type={"checkbox"}
                    name="group1"
                    label={brand.name}
                    onClick={() => dispatch(setSelectedBrand(brand))}
                />
            )}
        </div>
    );
};

export default BrandCheck;
