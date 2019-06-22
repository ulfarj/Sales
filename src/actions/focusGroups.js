import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes';
import webconfig from 'config';
import { updateCompanyFocusGroup } from './companies';

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

  const config = {
		method: 'GET',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
  }

    return dispatch => {
      dispatch(request())
      return fetch(webconfig.apiUrl+'/focusGroups', config)
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


function setGroupsRequest(groups) {
  return {
    type: types.SET_FOCUS_GROUPS_REQUEST,
    groups,
  }
}

function setGroupsSuccess(response) {
  return {
    type: types.SET_FOCUS_GROUPS_SUCCESS,
    response,
  }
}

function setGroupsFailure(error) {
  return {
    type: types.SET_FOCUS_GROUPS_FAILURE,
    error,
  }
}

export function setFocusGroups(companyId, focusGroups) {

  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
    body: JSON.stringify({ companyId, focusGroups }),
  }

  return (dispatch) => {
    dispatch(setGroupsRequest(focusGroups))
    return fetch(webconfig.apiUrl+'/setFocusGroups/', config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(setGroupsFailure(response.error));
        } else {
          dispatch(setGroupsSuccess(response));
          dispatch(updateCompanyFocusGroup(companyId, focusGroups));
        }
     });
  }
}


export function setFocusGroupsBulk(focusGroups) {

  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
    body: JSON.stringify({ focusGroups }),
  }

 
  return (dispatch) => {
    dispatch(setGroupsRequest(focusGroups))
    return fetch(webconfig.apiUrl+'/setFocusGroupsBulk/', config)
      .then(response => {
        console.log('res', response.json())
      })
      .then(function(response) {
        dispatch(setGroupsSuccess(response));
     });
  }
}