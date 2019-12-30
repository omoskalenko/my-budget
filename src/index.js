import React from 'react';
import ReactDOM from 'react-dom';
import ruRU from 'antd/es/locale/ru_RU';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux'
import store, { history } from './store'
import { ConnectedRouter } from 'connected-react-router'
import moment from 'moment'

import * as serviceWorker from './serviceWorker';

import App from './App';

import "antd/dist/antd.css";
import 'moment/locale/ru'

moment.locale('ru')

ReactDOM.render(
  <Provider store={store} >
    <ConnectedRouter history={history}>
      <ConfigProvider locale={ruRU} >
        <App />
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
