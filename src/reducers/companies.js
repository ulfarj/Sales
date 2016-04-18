import {
  REQUEST_COMPANIES, RECEIVE_COMPANIES
} from '../constants/ActionTypes';

export default function companies(state = {}, action) {
  switch (action.type) {
    case REQUEST_COMPANIES:
       return Object.assign({}, state, {
        isFetching: true,
        items: [],
        loaded: false
      })
    case RECEIVE_COMPANIES:
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
