import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  RESET_CATEGORY_STATUSES_REQUEST,
  RESET_CATEGORY_STATUSES_SUCCESS,
  RESET_CATEGORY_STATUSES_FAILURE,
  RESET_CATEGORY_STATUSES_INIT,
} from '../constants/ActionTypes';

export default function categories(state = {}, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
       return Object.assign({}, state, {
        isFetching: true,
        items: [],
        loaded: false
      })
    case RECEIVE_CATEGORIES:
       return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt,
        loaded: true
      })
    case RESET_CATEGORY_STATUSES_REQUEST:
      return Object.assign({}, state, {
        isResetting: true,        
        resetDone: false,
        response: null,
        category: action.category,
        name: action.name,
        statuses: action.statuses,        
      })
     case RESET_CATEGORY_STATUSES_SUCCESS:     
      return Object.assign({}, state, {        
        isResetting: false,        
        resetDone: true,
        response: action.response,
      })
      case RESET_CATEGORY_STATUSES_FAILURE:
        return Object.assign({}, state, {
          isResetting: false,        
          resetDone: true,
          error: action.error,          
        })
      case RESET_CATEGORY_STATUSES_INIT:     
        return Object.assign({}, state, {        
          isResetting: false,        
          resetDone: false,
          response: null,
        })
    default:
      return state
  }
}
