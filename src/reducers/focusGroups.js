import {
    REQUEST_FOCUS_GROUPS,
    RECEIVE_FOCUS_GROUPS,
  } from '../constants/ActionTypes';

  const initialState = {
    items: [],
    isFetching: false,
    loaded: false,
  };

  export default function statuses(state = initialState, action) {
    switch (action.type) {
      case REQUEST_FOCUS_GROUPS:
         return Object.assign({}, state, {
          isFetching: true,
          items: [],
          loaded: false
        })
      case RECEIVE_FOCUS_GROUPS:
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