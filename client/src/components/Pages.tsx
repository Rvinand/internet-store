import React from 'react';
import {Pagination} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";

const Pages = () => {
    const device = useAppSelector(state => state.DeviceSlice)
    const dispatch = useAppDispatch()
    const {setPage} = deviceSlice.actions
    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination
            style={{
                marginTop: "4rem",
                marginLeft: "28rem",
                marginRight: "28rem",
            }}>
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={device.page === page}
                    onClick={() => dispatch(setPage(page))}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
};

export default Pages;
