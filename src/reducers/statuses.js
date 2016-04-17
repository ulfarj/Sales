import {
  REQUEST_STATUSES, RECEIVE_STATUSES
} from '../constants/ActionTypes';

export default function statuses(state = {}, action) {
  switch (action.type) {
    case REQUEST_STATUSES:
       return Object.assign({}, state, {
        isFetching: true,
        items: [],
        loaded: false
      })
    case RECEIVE_STATUSES:
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
