import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from "../Types/IUser";


interface UserState {
    isAuth: boolean,
    user: IUser | null
}

const initialState: UserState = {
    isAuth: false,
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setUser(state, action: PayloadAction<IUser | null>) {
            state.user = action.payload
        }
    }
})

export default userSlice.reducer
