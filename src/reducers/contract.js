import {
  CREATE_CONTRACT_REQUEST,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_FAILURE,
} from '../../constants/ActionTypes';

const initialState = {
};

export default function loans(state = initialState, action) {
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
    default:
      return state;
  }
}
