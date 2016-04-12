import React, { Component, PropTypes } from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Main from './src/components/main';
import configureStore from './src/store/configureStore';
 
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>, 
  document.getElementById('app')
);