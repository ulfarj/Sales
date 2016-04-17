import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes'

function requestCompanies() {
  return {
    type: types.REQUEST_COMPANIES
  }
}

function receiveCompanies(json) {
  return {
    type: types.RECEIVE_COMPANIES,
    items: json,
    receivedAt: Date.now()
  }
}

export function fetchCompanies(filter) {

  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(filter)
  }

  return dispatch => {
    dispatch(requestCompanies())
    return fetch(`http://localhost:3030/companies/`, config)
      .then(response => response.json())
      .then(json => dispatch(receiveCompanies(json)))
  }
}
