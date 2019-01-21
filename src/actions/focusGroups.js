import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes';
import webconfig from 'config';
import {fetchGroups} from './groups';

function request() {
  return {
    type: types.REQUEST_FOCUS_GROUPS,
  }
}

function receive(json) {
  return {
    type: types.RECEIVE_FOCUS_GROUPS,
    items: json,
    receivedAt: Date.now()
  }
}

export function fetchCurrentFocusGroups() {
    return dispatch => {
      dispatch(request())
      return fetch(webconfig.apiUrl+'/focusGroups')
        .then(response => response.json())
        .then(json => dispatch(receive(json)))
    }
}

function shouldFetch(state) {

  const focusGroups = state.focusGroups.items;

  if (_.isEmpty(focusGroups)) {
    return true;
  }
  if (focusGroups.isFetching) {
    return false
  }

  return focusGroups.didInvalidate
}

export function fetchFocusGoupsIfNeeded() {
   return (dispatch, getState) => {
    if (shouldFetch(getState())) {
        return dispatch(fetchCurrentFocusGroups())
    }
  }
}


