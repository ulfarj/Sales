import {
  REQUEST_COMMENTS, RECEIVE_COMMENTS
} from '../constants/ActionTypes';

export default function salesmen(state = {}, action) {
  switch (action.type) {
    case REQUEST_COMMENTS:
       return Object.assign({}, state, {
        isFetching: true,
        items: [],
        loaded: false,
        companyId: action.companyId
      })
    case RECEIVE_COMMENTS:
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
