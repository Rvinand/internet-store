import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";
import {IBrand} from "../Types/IBrand";
import {Form} from "react-bootstrap";

const BrandCheck = () => {

    const dispatch = useAppDispatch()
    const {setSelectedBrands} = deviceSlice.actions
    const device = useAppSelector(state => state.DeviceSlice)
    const [isChecked, setIsChecked] = useState<boolean>(false)


    const checkHandle = (brand: IBrand) => {
        if (isChecked) {
            setIsChecked(false)
            dispatch(setSelectedBrands([...device.selectedBrands.filter(b => b.name !== brand.name)]))
        } else {
            setIsChecked(true)
            dispatch(setSelectedBrands([...device.selectedBrands, brand]))
        }
    }


    return (
        <Form.Group>
            <Form.Label style={{fontWeight: 700, fontSize: "1.25rem"}}>Производители</Form.Label>
            {device.brands.map((brand: IBrand) =>
                <Form.Check
                    key={brand.id}
                    className="p-1"
                    type={"checkbox"}
                    name="group1"
                    label={brand.name}
                    checked={isChecked}
                    onChange={() => checkHandle(brand)}
                />
            )}
        </Form.Group>
    );
};

export default BrandCheck;
