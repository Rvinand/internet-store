import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";
import {IBrand} from "../Types/IBrand";
import {Form} from "react-bootstrap";

interface BrandCheckProps {
    brand: IBrand
}

const BrandCheck: FC<BrandCheckProps> = ({brand}) => {

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
        <Form.Check
            key={brand.id}
            className="p-1"
            type={"checkbox"}
            name="brand"
            label={brand.name}
            checked={isChecked}
            onChange={() => checkHandle(brand)}
        />
    );
};

export default BrandCheck;
