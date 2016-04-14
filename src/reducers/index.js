import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import categories from './categories';
import companies from './companies';
import salesmen from './salesmen';

export default combineReducers({
	categories,
	companies,
	salesmen,
	routing: routerReducer,
});
