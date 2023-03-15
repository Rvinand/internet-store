import React from 'react';
import {Route, Routes} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {useAppSelector} from "../store/hooks";

const AppRouter = () => {
    const user = useAppSelector(state => state.UserSlice)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
        </Routes>
    );
};

export default AppRouter;
