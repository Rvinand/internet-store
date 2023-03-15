import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import UserSlice from "./UserSlice";
import DeviceSlice from "./DeviceSlice";

export const store = configureStore({
    reducer: {
        UserSlice,
        DeviceSlice
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
