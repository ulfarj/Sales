import {
  CREATE_COMPANY_REQUEST, CREATE_COMPANY_SUCCESS, CREATE_COMPANY_FAILURE,
  UPDATE_COMPANY_REQUEST, UPDATE_COMPANY_SUCCESS, UPDATE_COMPANY_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  FIND_COMPANY_BY_ID_REQUEST, FIND_COMPANY_BY_ID_SUCCESS, FIND_COMPANY_BY_ID_FAILURE,
  COMPANY_INITIALISE,
} from '../constants/ActionTypes';

const initialState = {
  ssn: null,
};

export default function company(state = initialState, action) {
  switch (action.type) {
    case COMPANY_INITIALISE:      
      return Object.assign({}, state, {        
        ssn: null,
      })
    case CREATE_COMPANY_REQUEST:
       return Object.assign({}, state, {
        isFetching: true,
        company: action.company,
        loaded: false,
        ssn: null,
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
    case ADD_COMMENT_REQUEST:
      return Object.assign({}, state, {
        comment: action.comment
      })
    case ADD_COMMENT_SUCCESS:
      return Object.assign({}, state, {
      })
    case ADD_COMMENT_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      })
    case FIND_COMPANY_BY_ID_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        ssn: action.ssn,
        loaded: false
      })
    case FIND_COMPANY_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        company: action.company,
        loaded: true
      })
    case FIND_COMPANY_BY_ID_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        error: action.error,
      })
    default:
      return state
  }
}
