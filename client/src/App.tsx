import React, {useEffect, useState} from 'react';
import {Spinner} from "react-bootstrap";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import {useAppDispatch} from "./store/hooks";
import {check} from "./http/userAPI";
import {userSlice} from "./store/UserSlice";
import {IUser} from "./Types/IUser";

function App() {
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(true)

    const {setUser, setIsAuth} = userSlice.actions

    useEffect(() => {
        check().then((data: IUser) => {
            dispatch(setUser(data))
            dispatch(setIsAuth(true))
        }).finally(() => setLoading(false))
    }, [])


    return (
      <BrowserRouter>
          <NavBar />
          {loading && <Spinner animation={"grow"}/>}
            <AppRouter />
      </BrowserRouter>
  );
}

export default App;
