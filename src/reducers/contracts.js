import {
  CREATE_CONTRACT_REQUEST,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_FAILURE,
  FETCH_CONTRACTS_REQUEST,
  FETCH_CONTRACTS_SUCCESS,
  FETCH_CONTRACTS_FAILURE,
  DELETE_CONTRACT_REQUEST,
  DELETE_CONTRACT_SUCCESS,
  DELETE_CONTRACT_FAILURE,
} from '../constants/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  items: [],
  isFetching: false,
};

export default function contracts(state = initialState, action) {
  switch (action.type) {
    case CREATE_CONTRACT_REQUEST: {
      return {
        ...state,
        ...action,
        isFetching: true,
      };
    }
    case CREATE_CONTRACT_SUCCESS: {
      return {
        ...state,
        ...action,
        isFetching: false,
      };
    }
    case CREATE_CONTRACT_FAILURE: {
      return {
        ...state,
        ...action,
        isFetching: false,
      };
    }
    case FETCH_CONTRACTS_REQUEST: {
      return {
        ...state,
        ...action,
        isFetching: true,
      }
    }
    case FETCH_CONTRACTS_SUCCESS: {
      return {
        ...state,
        ...action,
        isFetching: false,
      }
    }
    case FETCH_CONTRACTS_FAILURE: {
      return {
        ...state,
        ...action,
        isFetching: false,
      }
    }
    case DELETE_CONTRACT_REQUEST: {
      return {
        ...state,
        ...action,
        isFetching: true,
      }
    }
    case DELETE_CONTRACT_SUCCESS: {
      return {
        ...state,
        ...action,
        isFetching: false,
      }
    }
    case DELETE_CONTRACT_FAILURE: {
      return {
        ...state,
        ...action,
        isFetching: false,
      }
    }
    default:
      return state;
  }
}
