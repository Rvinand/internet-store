import React, {useEffect, useState} from 'react';
import {Spinner} from "react-bootstrap";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import {useAppDispatch} from "./store/hooks";
import {check} from "./http/userAPI";
import {userSlice} from "./store/UserSlice";

function App() {
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(true)

    const {setUser, setIsAuth} = userSlice.actions

    useEffect(() => {
        check().then(() => {
            dispatch(setUser(true))
            dispatch(setIsAuth(true))
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }


    return (
      <BrowserRouter>
          <NavBar />
          <AppRouter />
      </BrowserRouter>
  );
}

export default App;
