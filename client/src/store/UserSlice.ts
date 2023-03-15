import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store/store";


interface UserState {
    isAuth: boolean,
    user: {}
}

const initialState: UserState = {
    isAuth: false,
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setUser(state, action: PayloadAction<any>) {
            state.user = action.payload
        }
    }
})

export default userSlice.reducer
