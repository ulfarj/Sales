import {
    REQUEST_FOCUS_GROUPS,
    RECEIVE_FOCUS_GROUPS,
    SET_FOCUS_GROUPS_REQUEST,
    SET_FOCUS_GROUPS_SUCCESS,
    SET_FOCUS_GROUPS_FAILURE,
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
      case SET_FOCUS_GROUPS_REQUEST: {
          return {
            ...state,
            ...action,
          };
        }
        case SET_FOCUS_GROUPS_SUCCESS: {
          return {
            ...state,
            ...action,
          };
        }
        case SET_FOCUS_GROUPS_FAILURE: {
          return {
            ...state,
            ...action,
          };
        }
      default:
        return state
    }
  }