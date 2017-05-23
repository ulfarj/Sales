import {
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  FETCH_GROUPS_REQUEST,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAILURE,
  SET_GROUPS_REQUEST,
  SET_GROUPS_SUCCESS,
  SET_GROUPS_FAILURE,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE,
} from '../constants/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  items: [],
};

export default function groups(state = initialState, action) {
  switch (action.type) {
    case CREATE_GROUP_REQUEST: {
      return {
        ...state,
        ...action,
      };
    }
    case CREATE_GROUP_SUCCESS: {
      return {
        ...state,
        ...action,
      };
    }
    case CREATE_GROUP_FAILURE: {
      return {
        ...state,
        ...action,
      };
    }
    case FETCH_GROUPS_REQUEST: {
      return {
        ...state,
        ...action,
      }
    }
    case FETCH_GROUPS_SUCCESS: {
      return {
        ...state,
        ...action,
      }
    }
    case FETCH_GROUPS_FAILURE: {
      return {
        ...state,
        ...action,
      }
    }
    case SET_GROUPS_REQUEST: {
      return {
        ...state,
        ...action,
      };
    }
    case SET_GROUPS_SUCCESS: {
      return {
        ...state,
        ...action,
      };
    }
    case SET_GROUPS_FAILURE: {
      return {
        ...state,
        ...action,
      };
    }
    case DELETE_GROUP_REQUEST: {
      return {
        ...state,
        ...action,
      };
    }
    case DELETE_GROUP_SUCCESS: {
      return {
        ...state,
        ...action,
      };
    }
    case DELETE_GROUP_FAILURE: {
      return {
        ...state,
        ...action,
      };
    }
    default:
      return state;
  }
}
