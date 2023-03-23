import React, {FC, useEffect} from 'react';
import {useCookies} from "react-cookie";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {deviceSlice} from "../store/DeviceSlice";
import {Button} from "react-bootstrap";
import {IDevice} from "../Types/IDevice";

interface AddToSavedBtnProps {
    device: IDevice
}

const AddToSavedBtn:FC<AddToSavedBtnProps> = ({device}) => {
    const [cookie, setCookie] = useCookies(["savedDevices"]);

    const {savedDevices} = useAppSelector(state => state.DeviceSlice)
    const {setSavedDevices} = deviceSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (cookie.savedDevices) {
            dispatch(setSavedDevices(cookie.savedDevices))
        }
    }, [])

    const addToSaved = () => {
        const newSavedDevices = [...savedDevices, device]

        setCookie("savedDevices", newSavedDevices, {
            path: "/"
        });

        dispatch(setSavedDevices(newSavedDevices))
    }
    const deleteFromSaved = () => {

        const newSavedDevices = savedDevices.filter(d => d.name !== device.name)

        setCookie("savedDevices", newSavedDevices, {
            path: "/"
        });

        dispatch(setSavedDevices(newSavedDevices))

    }

    return (
        <div>
            {
                savedDevices.map(d => d.name).includes(device.name)
                    ? <Button style={{width: "2.5rem", marginRight: "0.5rem"}} variant={"danger"}
                              onClick={deleteFromSaved}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                    </Button>
                    : <Button style={{width: "2.5rem", marginRight: "0.5rem"}} variant={"outline-danger"}
                              onClick={addToSaved}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-heart" viewBox="0 0 16 16">
                            <path
                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                    </Button>
            }
        </div>
    );
};

export default AddToSavedBtn;