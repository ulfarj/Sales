import{
  REQUEST_USERS,
  RECEIVE_USERS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  SET_USER_PASSWORD_REQUEST,
  SET_USER_PASSWORD_SUCCESS,
  SET_USER_PASSWORD_FAILURE,
  SET_USER_TYPE_REQUEST,
  SET_USER_TYPE_SUCCESS,
  SET_USER_TYPE_FAILURE,
} from '../../constants/ActionTypes';

export default function users(state = {}, action) {
  switch (action.type) {
    case REQUEST_USERS:
       return Object.assign({}, state, {
        isFetching: true,
        items: [],
        loaded: false
      })
    case RECEIVE_USERS:
       return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt,
        loaded: true
      })
    default:
      return state
  }
}
