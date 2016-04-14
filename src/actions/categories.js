import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes'

function requestCategories() {
  return {
    type: types.REQUEST_CATEGORIES
  }
}

function receiveCategories(json) {
  return {
    type: types.RECEIVE_CATEGORIES,
    items: json,
    receivedAt: Date.now()
  }
}

function shouldFetchCategories(state) {

  const categories = state.categories;

  if (_.isEmpty(categories)) {
    return true;
  }
  if (categories.isFetching) {
    return false
  }

  return categories.didInvalidate
}

function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories())
    return fetch(`http://localhost:3030/categories`)
      .then(response => response.json())
      .then(json => dispatch(receiveCategories(json)))
  }
}

export function fetchCategoriesIfNeeded() {  
   return (dispatch, getState) => {
    if (shouldFetchCategories(getState())) {
        return dispatch(fetchCategories())
    }
  }
}
