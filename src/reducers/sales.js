import {
  REQUEST_SALES, RECEIVE_SALES,
  ADD_SALE_REQUEST, ADD_SALE_SUCCESS, ADD_SALE_FAILURE,
  UPDATE_SALE_REQUEST, UPDATE_SALE_SUCCESS, UPDATE_SALE_FAILURE,
  DELETE_SALE_REQUEST, DELETE_SALE_SUCCESS, DELETE_SALE_FAILURE
} from '../constants/ActionTypes';

export default function company(state = {}, action) {
  switch (action.type) {
    case REQUEST_SALES:
       return Object.assign({}, state, {
        isFetching: true,
        items: [],
        loaded: false,
        companyId: action.companyId
      })
    case RECEIVE_SALES:
       return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt,
        loaded: true
      })
    case ADD_SALE_REQUEST:
      return Object.assign({}, state, {
        sale: action.sale
      })
    case ADD_SALE_SUCCESS:
      return Object.assign({}, state, {
      })
    case ADD_SALE_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      })
    case DELETE_SALE_REQUEST:
      return Object.assign({}, state, {
        sale: action.sale
      })
    case DELETE_SALE_SUCCESS:
      return Object.assign({}, state, {
      })
    case DELETE_SALE_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      })
    case UPDATE_SALE_REQUEST:
      return Object.assign({}, state, {
        sale: action.sale
      })
    case ADD_SALE_SUCCESS:
      return Object.assign({}, state, {
      })
    case ADD_SALE_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      })
    default:
      return state
  }
}
