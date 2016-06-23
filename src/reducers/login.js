import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_STEP,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  LOGIN
} from '../constants/ActionTypes';

export default function login(state = {}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
       return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        credentials: action.credentials,
        validationErrors: [],
        error: null
      })
    case LOGIN_SUCCESS:
       return Object.assign({}, state, {
       	isFetching: false,
        isAuthenticated: true,
        token: action.token,
        userId: action.userId
      })
    case LOGIN_FAILURE:
       return Object.assign({}, state, {
       	isFetching: false,
    		isAuthenticated: false,
    		error: action.error,
        validationErrors: action.validationErrors
      })
    case LOGOUT_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        })
    case LOGOUT_SUCCESS:
        return Object.assign({}, state, {
         	isFetching: false,
          isAuthenticated: false,
          token: null,
        })
    case LOGOUT_FAILURE:
        return Object.assign({}, state, {
         	isFetching: false,
      		error: action.error
        })  
    case LOGIN:
        return Object.assign({}, state, {
          token: action.token,
          isAuthenticated: true,
          userId: action.userId
        })
    default:
      return state
  }
}
