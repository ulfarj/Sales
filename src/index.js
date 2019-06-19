import React, { Component, PropTypes } from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Main from './components/main';
import configureStore from './store/configureStore';
import Routes from './routes';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routes store={store} />
  </Provider>,
  document.getElementById('app')
);
