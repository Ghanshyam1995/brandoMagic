import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/bootstrap.min.css';
import './index.css';
import './assets/css/font-awesome.min.css';
import 'react-notifications-component/dist/theme.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import ps from './store';
import { PersistGate } from "redux-persist/integration/react";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en);   


ReactDOM.render(
    <Provider store={ps.store}>
        <PersistGate persistor={ps.persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
