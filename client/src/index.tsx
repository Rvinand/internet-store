import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store/store';
import App from './App';
import './index.scss'
import {CookiesProvider} from "react-cookie";


const container = document.getElementById('root')!;
const root = createRoot(container);


root.render(
    <CookiesProvider>
        <Provider store={store}>
            <App/>
        </Provider>
    </CookiesProvider>
);