import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IDevice} from "../Types/IDevice";
import {IDeviceCategory} from "../Types/IDeviceCategory";
import {IBrand} from "../Types/IBrand";


interface DeviceState {
    categories: IDeviceCategory[],
    brands: IBrand[],
    devices: IDevice[],
    selectedCategory: IDeviceCategory | null,
    selectedBrands: IBrand[],

    basketDevices: IDevice[],
    savedDevices: IDevice[],
    page: number,
    totalCount: number,
    limit: number
}

const initialState: DeviceState = {
    categories: [],
    brands: [],
    devices: [],
    basketDevices: [],
    savedDevices: [],
    selectedCategory: null,
    selectedBrands: [],
    page: 1,
    totalCount: 0,
    limit: 3
}

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<IDeviceCategory[]>) {
            state.categories = action.payload
        },

        setBrands(state, action: PayloadAction<IBrand[]>) {
            state.brands = action.payload
        },

        setDevices(state, action: PayloadAction<IDevice[]>) {
            state.devices = action.payload
        },

        setBasketDevices(state, action: PayloadAction<IDevice[]>) {
            state.basketDevices = action.payload
        },
        setSavedDevices(state, action: PayloadAction<IDevice[]>) {
            state.savedDevices = action.payload
        },

        setSelectedCategory(state, action: PayloadAction<IDeviceCategory>) {
            state.page = 1
            state.selectedCategory = action.payload
        },

        setSelectedBrands(state, action: PayloadAction<IBrand[]>) {
            state.page = 1
            state.selectedBrands = action.payload
        },

        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },

        setTotalCount(state, action: PayloadAction<number>) {
            state.totalCount = action.payload
        }
    }
})

export default deviceSlice.reducer