import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes';
import webconfig from 'config';

function requestComments(companyId) {
  return {
    type: types.REQUEST_COMMENTS,
    companyId: companyId
  }
}

function receiveComments(json) {
  return {
    type: types.RECEIVE_COMMENTS,
    items: json,
    receivedAt: Date.now()
  }
}

export function fetchComments(companyId) {

  const config = {
		method: 'GET',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
  }

  return dispatch => {
    dispatch(requestComments(companyId))
    return fetch(webconfig.apiUrl+'/comments/'+companyId, config)
      .then(response => response.json())
      .then(json => dispatch(receiveComments(json)))
  }
}
