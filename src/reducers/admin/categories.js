import {
  CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE,
} from '../../constants/ActionTypes';

export default function company(state = {}, action) {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
       return Object.assign({}, state, {
        isFetching: true,
        category: action.category,
        loaded: false
      })
    case CREATE_CATEGORY_SUCCESS:
       return Object.assign({}, state, {
        isFetching: false,
        loaded: true
      })
    case CREATE_CATEGORY_FAILURE:
       return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        error: action.error
        })
    case DELETE_CATEGORY_REQUEST:
       return Object.assign({}, state, {
         isFetching: true,
         category: action.category,
         loaded: false
        })
    case DELETE_CATEGORY_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          loaded: true
        })
    case DELETE_CATEGORY_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          loaded: true,
          error: action.error
        })
    default:
      return state
  }
}
