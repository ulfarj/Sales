import {
  CREATE_SALESMAN_REQUEST, CREATE_SALESMAN_SUCCESS, CREATE_SALESMAN_FAILURE,
  DELETE_SALESMAN_REQUEST, DELETE_SALESMAN_SUCCESS, DELETE_SALESMAN_FAILURE,
} from '../../constants/ActionTypes';

export default function company(state = {}, action) {
  switch (action.type) {
    case CREATE_SALESMAN_REQUEST:
       return Object.assign({}, state, {
        isFetching: true,
        salesman: action.salesman,
        loaded: false
      })
    case CREATE_SALESMAN_SUCCESS:
       return Object.assign({}, state, {
        isFetching: false,
        loaded: true
      })
    case CREATE_SALESMAN_FAILURE:
       return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        error: action.error
        })
    case DELETE_SALESMAN_REQUEST:
       return Object.assign({}, state, {
         isFetching: true,
         salesman: action.salesman,
         loaded: false
        })
    case CREATE_SALESMAN_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          loaded: true
        })
    case CREATE_SALESMAN_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          loaded: true,
          error: action.error
        })
    default:
      return state
  }
}
