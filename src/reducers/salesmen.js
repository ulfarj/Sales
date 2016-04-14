import {
  REQUEST_SALESMEN, RECEIVE_SALESMEN
} from '../constants/ActionTypes';

export default function salesmen(state = {}, action) {
  switch (action.type) {
    case REQUEST_SALESMEN:
       return Object.assign({}, state, {
        isFetching: true,
        items: [],
        loaded: false
      })
    case RECEIVE_SALESMEN:
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
