import {
    UPDATE_SIZE,
} from '../constants/ActionTypes';
  
  export default function common(state = {}, action) {
    switch (action.type) {
      case UPDATE_SIZE:
         return Object.assign({}, state, { 
             width: action.width,
             height: action.height,
         })     
      default:
        return state
    }
  }
  