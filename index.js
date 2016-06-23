import React, { Component, PropTypes } from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Main from './src/components/main';
import configureStore from './src/store/configureStore';
import Routes from './routes';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routes store={store} />
  </Provider>,
  document.getElementById('app')
);
