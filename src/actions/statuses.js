import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes'

function requestStatuses() {
  return {
    type: types.REQUEST_STATUSES
  }
}

function receivesStatuses(json) {
  return {
    type: types.RECEIVE_STATUSES,
    items: json,
    receivedAt: Date.now()
  }
}

function shouldFetchStatuses(state) {

  const statuses = state.statuses;

  if (_.isEmpty(statuses)) {
    return true;
  }
  if (statuses.isFetching) {
    return false
  }

  return statuses.didInvalidate
}

function fetchStatuses() {
  return dispatch => {
    dispatch(requestStatuses())
    return fetch(`http://localhost:3030/statuses`)
      .then(response => response.json())
      .then(json => dispatch(receivesStatuses(json)))
  }
}

export function fetchStatusesIfNeeded() {
   return (dispatch, getState) => {
    if (shouldFetchStatuses(getState())) {
        return dispatch(fetchStatuses())
    }
  }
}
