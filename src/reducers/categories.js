import {
  REQUEST_CATEGORIES, RECEIVE_CATEGORIES
} from '../constants/ActionTypes';

export default function advertisements(state = {}, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
       return Object.assign({}, state, {
        isFetching: true,
        items: [],
        loaded: false
      })
    case RECEIVE_CATEGORIES:
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