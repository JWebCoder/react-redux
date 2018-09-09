import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import RouterApp from "./router";
import { store } from './store';
import '@fortawesome/fontawesome-free/css/all.css'

ReactDOM.render(
    <Provider store={store}>
        <RouterApp/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
