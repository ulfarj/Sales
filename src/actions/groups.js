import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';
import webconfig from 'config';
import { updateCompanyGroup } from './companies';

function fetchGroupsRequest() {
  return {
    type: types.FETCH_GROUPS_REQUEST,
  }
}

function fetchGroupsSuccess(groups) {
  return {
    type: types.FETCH_GROUPS_SUCCESS,
    items: groups,
  }
}

function fetchGroupsFailure(error) {
  return {
    type: types.FETCH_GROUPS_FAILURE,
    error,
  }
}

export function fetchGroups() {
  let config = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
  }

  return (dispatch, getState) => {
    dispatch(fetchGroupsRequest())
    return fetch(webconfig.apiUrl+'/groups/', config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(fetchGroupsFailure(response.error));
        } else {
          dispatch(fetchGroupsSuccess(response));
        }
      });
  }
}

function createGroupRequest(group) {
  return {
    type: types.CREATE_GROUP_REQUEST,
    group,
  }
}

function createGroupSuccess(response) {
  return {
    type: types.CREATE_GROUP_SUCCESS,
    response,
  }
}

function createGroupFailure(error) {
  return {
    type: types.CREATE_GROUP_FAILURE,
    error,
  }
}

export function createGroup(group) {

  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
    body: JSON.stringify(group),
  }

  return (dispatch) => {
    dispatch(createGroupRequest(group))
    return fetch(webconfig.apiUrl+'/createGroup/', config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(createGroupFailure(response.error));
        } else {
          dispatch(createGroupSuccess(response));
          dispatch(fetchGroups());
        }
     });
  }
}

function setGroupsRequest(groups) {
  return {
    type: types.SET_GROUPS_REQUEST,
    groups,
  }
}

function setGroupsSuccess(response) {
  return {
    type: types.SET_GROUPS_SUCCESS,
    response,
  }
}

function setGroupsFailure(error) {
  return {
    type: types.SET_GROUPS_FAILURE,
    error,
  }
}

export function setGroups(groups) {

  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
    body: JSON.stringify(groups),
  }

  return (dispatch) => {
    dispatch(setGroupsRequest(groups))
    return fetch(webconfig.apiUrl+'/setGroups/', config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(setGroupsFailure(response.error));
        } else {
          dispatch(setGroupsSuccess(response));
          dispatch(updateCompanyGroup(groups));
        }
     });
  }
}


function deleteGroupRequest(group) {
  return {
    type: types.DELETE_GROUP_REQUEST,
    group,
  }
}

function deleteGroupSuccess(){
  return {
    type: types.DELETE_GROUP_SUCCESS
  }
}

function deleteGroupFailure(error){
  return {
    type: types.DELETE_GROUP_FAILURE,
    error,
  }
}


export function deleteGroup(id) {
  const config = {
		method: 'GET',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
  }

  return (dispatch, getState) => {
    dispatch(deleteGroupRequest(id))
    return fetch(webconfig.apiUrl+'/deleteGroup/'+id, config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(deleteGroupFailure(response.error));
        } else {
          dispatch(deleteGroupSuccess());
          dispatch(fetchGroups());
        }
      });
  }
}
