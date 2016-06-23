import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import { createHistory } from 'history';
import { reduxReactRouter } from 'redux-router';

export default function configureStore(initialState) {
  const store = createStore(
  	rootReducer,
  	initialState,
  	applyMiddleware(thunkMiddleware, createLogger()),
  	reduxReactRouter({createHistory}),
  	);

  return store;
}
