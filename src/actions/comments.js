import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes'

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

  return dispatch => {
    dispatch(requestComments(companyId))
    return fetch(`http://localhost:3030/comments/`+companyId)
      .then(response => response.json())
      .then(json => dispatch(receiveComments(json)))
  }
}
