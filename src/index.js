import React, { Component, PropTypes } from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Routes from './routes';

const store = configureStore();

// ReactDOM.render(
//   <Provider store={store}>
//     <Routes store={store} />
//   </Provider>,
//   document.getElementById('app')
// );

ReactDOM.render(
  <div>Hello</div>,
  document.getElementById('app')
);
