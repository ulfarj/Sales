import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import categories from './categories';
import companies from './companies';
import salesmen from './salesmen';
import statuses from './statuses';
import company from './company';
import comments from './comments';
import sales from './sales';
import login from './login';

export default combineReducers({
	categories,
	companies,
	salesmen,
	statuses,
	company,
	comments,
	sales,
	login,
	routing: routerReducer,
});
