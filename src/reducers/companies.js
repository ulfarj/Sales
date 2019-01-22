import {
  REQUEST_COMPANIES, RECEIVE_COMPANIES, SET_FILTER,
  UPDATE_COMPANY_ITEM, UPDATE_COMPANY_ITEM_SALES,
  UPDATE_COMPANY_ITEM_COMMENT, UPDATE_COMPANY_ITEM_GROUP,
  UPDATE_COMPANY_ITEM_FOCUS_GROUP,
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
        //items: update(state.items, { $set: action.items}),
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
           namersk: { $set: action.company.namersk },
           address: { $set: action.company.address },
           contact: { $set: action.company.contact },
           email: { $set: action.company.email },
           legal: { $set: action.company.legal },
           dontcontact: { $set: action.company.dontcontact },
           phone: { $set: action.company.phone },
           postalCode: { $set: action.company.postalCode },
           ssn: { $set: action.company.ssn },
         },
       })
     })
     case UPDATE_COMPANY_ITEM_SALES:
       return Object.assign({}, state, {
        items: update(state.items, {
          [action.index]: {
            sales: { $set: action.sales },
          },
        })
      })
     case UPDATE_COMPANY_ITEM_COMMENT:
       return Object.assign({}, state, {
        items: update(state.items, {
          [action.index]: {
            comment: { $set: action.comment },
          },
        })
      })
      case UPDATE_COMPANY_ITEM_GROUP:
        return Object.assign({}, state, {
         items: update(state.items, {
           [action.index]: {
             maingroup: { $set: action.group.maingroup },
             subgroup: { $set: action.group.subgroup },
             subsubgroup: { $set: action.group.subsubgroup },
           },
         })
       })
       case UPDATE_COMPANY_ITEM_FOCUS_GROUP:
        return Object.assign({}, state, {
          items: update(state.items, {
            [action.index]: {
              focusGroups: { $set: action.focusGroups },
            },
          })
        })
    default:
      return state
  }
}
