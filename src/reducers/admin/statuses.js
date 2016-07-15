import {
  CREATE_STATUS_REQUEST, CREATE_STATUS_SUCCESS, CREATE_STATUS_FAILURE,
  DELETE_STATUS_REQUEST, DELETE_STATUS_SUCCESS, DELETE_STATUS_FAILURE,
} from '../../constants/ActionTypes';

export default function company(state = {}, action) {
  switch (action.type) {
    case CREATE_STATUS_REQUEST:
       return Object.assign({}, state, {
        isFetching: true,
        status: action.status,
        color: action.color,
        loaded: false
      })
    case CREATE_STATUS_SUCCESS:
       return Object.assign({}, state, {
        isFetching: false,
        loaded: true
      })
    case CREATE_STATUS_FAILURE:
       return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        error: action.error
        })
    case DELETE_STATUS_REQUEST:
       return Object.assign({}, state, {
         isFetching: true,
         status: action.status,
         loaded: false
        })
    case CREATE_STATUS_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          loaded: true
        })
    case CREATE_STATUS_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          loaded: true,
          error: action.error
        })
    default:
      return state
  }
}
