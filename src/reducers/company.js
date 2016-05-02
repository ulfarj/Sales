import {
  CREATE_COMPANY_REQUEST, CREATE_COMPANY_SUCCESS, CREATE_COMPANY_FAILURE,
  UPDATE_COMPANY_REQUEST, UPDATE_COMPANY_SUCCESS, UPDATE_COMPANY_FAILURE
} from '../constants/ActionTypes';

export default function company(state = {}, action) {
  switch (action.type) {
    case CREATE_COMPANY_REQUEST:
       return Object.assign({}, state, {
        isFetching: true,
        company: action.company,
        loaded: false
      })
    case CREATE_COMPANY_SUCCESS:
       return Object.assign({}, state, {
        isFetching: false,
        loaded: true
      })
    case CREATE_COMPANY_FAILURE:
       return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        error: action.error
        })
    case UPDATE_COMPANY_REQUEST:
       return Object.assign({}, state, {
        isFetching: true,
        company: action.company,
        loaded: false
        })
    case UPDATE_COMPANY_SUCCESS:
       return Object.assign({}, state, {
        isFetching: false,
        loaded: true
        })
    case UPDATE_COMPANY_FAILURE:
       return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        error: action.error
       })
    default:
      return state
  }
}
