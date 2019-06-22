import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../../constants/ActionTypes';
import webconfig from 'config';
import { fetchCurrentFocusGroups } from '../focusGroups';

function createRequest(focusGroups) {
  return {
    type: types.CREATE_FOCUS_GROUP_REQUEST,
    focusGroups: focusGroups
  }
}

function createSuccess(){
  return {
    type: types.CREATE_FOCUS_GROUP_SUCCESS
  }
}

function createFailure(error){
  return {
    type: types.CREATE_FOCUS_GROUP_FAILURE,
    error: error
  }
}

export function createFocusGroup(name, color) {
  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({"name": name, "color": color}),
    Authorization: sessionStorage.token,
  }

  return (dispatch, getState) => {
    dispatch(createRequest(name))
    return fetch(webconfig.apiUrl+'/createFocusGroup/', config)
      .then(response => response.json())
      .then(function(response) {

        if(response.error){
          dispatch(createFailure(response.error));
        } else {
          dispatch(createSuccess(name));
          dispatch(fetchCurrentFocusGroups());
        }
      });
  }
}

function deleteRequest(focusGroups) {
  return {
    type: types.DELETE_FOCUS_GROUP_REQUEST,
    focusGroups: focusGroups
  }
}

function deleteSuccess(){
  return {
    type: types.DELETE_FOCUS_GROUP_SUCCESS
  }
}

function deleteFailure(error){
  return {
    type: types.DELETE_FOCUS_GROUP_FAILURE,
    error: error
  }
}


export function deleteFocusGroup(id) {

  const config = {
		method: 'GET',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      
    },
  }

  return (dispatch, getState) => {
    dispatch(deleteRequest(id))
    return fetch(webconfig.apiUrl+'/deleteFocusGroup/'+id, config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(deleteFailure(response.error));
        } else {
          dispatch(deleteSuccess());
          dispatch(fetchCurrentFocusGroups());
        }
      });
  }
}
