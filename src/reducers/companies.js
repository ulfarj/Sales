import {
  REQUEST_COMPANIES, RECEIVE_COMPANIES, SET_FILTER
} from '../constants/ActionTypes';

export default function companies(state = {}, action) {
  switch (action.type) {
    case REQUEST_COMPANIES:
       return Object.assign({}, state, {
        isFetching: true,
        items: [],
        loaded: false,
        filter: action.filter
      })
    case RECEIVE_COMPANIES:
       return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt,
        loaded: true
      })
    case SET_FILTER:
      return Object.assign({}, state, {       
       filter: action.filter
     })
    default:
      return state
  }
}
