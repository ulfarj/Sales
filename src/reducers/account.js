import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_STEP,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  LOGIN, AUTHENTICATED, NOT_AUTHENTICATED,
} from '../constants/ActionTypes';

export default function login(state = {}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
       return Object.assign({}, state, {
        ...action,
        isFetching: true,
        isAuthenticated: false,
        validationErrors: [],
        error: null
      })
    case LOGIN_SUCCESS:
       return Object.assign({}, state, {
        userId: action.userId,
        token: action.token,
        expires: action.expires,
       	isFetching: false,
        isAuthenticated: true,
      })
    case LOGIN_FAILURE:
       return Object.assign({}, state, {
         ...action,
       	isFetching: false,
    		isAuthenticated: false,
      })
    case LOGOUT_REQUEST:
        return Object.assign({}, state, {
          credentials: action.credentials,
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
          isAuthenticated: false,
          token: null,
        })
    case LOGIN:
        return Object.assign({}, state, {
          isAuthenticated: true,
        })
    case AUTHENTICATED:
        return {
          userName: action.userName,
          token: action.token,
          isAuthenticated: true,
        }
    case NOT_AUTHENTICATED:
        return {
          ...state,
          isAuthenticated: false,
          token: null,
        }
    default:
      return state
  }
}
