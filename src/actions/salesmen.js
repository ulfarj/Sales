import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes';
import webconfig from 'config';

function requestSalesmen() {
  return {
    type: types.REQUEST_SALESMEN
  }
}

function receiveSalesmen(json) {
  return {
    type: types.RECEIVE_SALESMEN,
    items: json,
    receivedAt: Date.now()
  }
}

function shouldFetchSalesmen(state) {

  const salesmen = state.salesmen;

  if (_.isEmpty(salesmen)) {
    return true;
  }
  if (salesmen.isFetching) {
    return false
  }

  return salesmen.didInvalidate
}

function fetchSalesmen() {
  return dispatch => {
    dispatch(requestSalesmen())
    return fetch(webconfig.apiUrl+'/salesmen')
      .then(response => response.json())
      .then(json => dispatch(receiveSalesmen(json)))
  }
}

export function fetchSalesmenIfNeeded() {

   return (dispatch, getState) => {
    if (shouldFetchSalesmen(getState())) {
        return dispatch(fetchSalesmen())
    }
  }
}

export function fetchCurrentSalesmen() {
  return dispatch => {
    dispatch(requestSalesmen())
    return fetch(webconfig.apiUrl+'/salesmen')
      .then(response => response.json())
      .then(json => dispatch(receiveSalesmen(json)))
  }
}
