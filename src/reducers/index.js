import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import categories from './categories';
import companies from './companies';
import salesmen from './salesmen';
import company from './company';

export default combineReducers({
	categories,
	companies,
	salesmen,
	company,
	routing: routerReducer,
});
