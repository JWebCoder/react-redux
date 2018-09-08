import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import RouterApp from "./router";
import { store } from './store';
import App from './App'

ReactDOM.render(
    <Provider store={store}>
        <RouterApp/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
