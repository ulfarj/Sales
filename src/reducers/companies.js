import {
  REQUEST_COMPANIES, RECEIVE_COMPANIES, SET_FILTER, UPDATE_COMPANY_ITEM,
} from '../constants/ActionTypes';
import update from 'react-addons-update';

export default function companies(state = {}, action) {
  switch (action.type) {
    case REQUEST_COMPANIES:
       return Object.assign({}, state, {
        isFetching: true,
        items: [],
        loaded: false,
        filter: action.filter
      })
    case RECEIVE_COMPANIES:
       return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt,
        loaded: true
      })
    case SET_FILTER:
      return Object.assign({}, state, {
       filter: action.filter
     })
    case UPDATE_COMPANY_ITEM:
      return Object.assign({}, state, {
       items: update(state.items, {
         [action.index]: {
           name: { $set: action.company.name },
           address: { $set: action.company.address },
           contact: { $set: action.company.contact },
           email: { $set: action.company.email },
           legal: { $set: action.company.legal },
           phone: { $set: action.company.phone },
           postalCode: { $set: action.company.postalCode },
           ssn: { $set: action.company.ssn },
         },
       })
     })
    default:
      return state
  }
}
