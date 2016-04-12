import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import categories from './categories';
import companies from './companies';

export default combineReducers({	
	categories,
	companies,
	routing: routerReducer,
});