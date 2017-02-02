import {
  CREATE_CONTRACT_REQUEST,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_FAILURE,
  FETCH_CONTRACTS_REQUEST,
  FETCH_CONTRACTS_SUCCESS,
  FETCH_CONTRACTS_FAILURE,
} from '../constants/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  items: [],
};

export default function contracts(state = initialState, action) {
  switch (action.type) {
    case CREATE_CONTRACT_REQUEST: {
      return {
        ...state,
        ...action,
      };
    }
    case CREATE_CONTRACT_SUCCESS: {
      return {
        ...state,
        ...action,
      };
    }
    case CREATE_CONTRACT_FAILURE: {
      return {
        ...state,
        ...action,
      };
    }
    case FETCH_CONTRACTS_REQUEST: {
      return {
        ...state,
        ...action,
      }
    }
    case FETCH_CONTRACTS_SUCCESS: {
      return {
        ...state,
        ...action,        
      }
    }
    case FETCH_CONTRACTS_FAILURE: {
      return {
        ...state,
        ...action,
      }
    }
    default:
      return state;
  }
}
