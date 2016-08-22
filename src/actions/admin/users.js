import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../../constants/ActionTypes';
import webconfig from 'config';

function requestUsers() {
  return {
    type: types.REQUEST_USERS
  }
}

function requestUsersSuccess(users) {
  return {
    type: types.RECEIVE_USERS,
    items: users,
    receivedAt: Date.now()
  }
}

export function fetchCurrentUsers() {
  return dispatch => {
    dispatch(requestUsers())
    return fetch(webconfig.apiUrl+'/users')
      .then(response => response.json())
      .then(json => dispatch(requestUsersSuccess(json)))
  }
}

function createUserRequest(name, type, password) {
  return {
    type: types.CREATE_USER_REQUEST,
    name,
    type,
    password
  }
}

function createUserSuccess(){
  return {
    type: types.CREATE_USER_SUCCESS
  }
}

function createUserFailure(error){
  return {
    type: types.CREATE_USER_FAILURE,
    error: error
  }
}

export function createUser(name, type, password) {
  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({"name": name, "type": type, "password": password})
  }

  return (dispatch, getState) => {
    dispatch(createUserRequest(name, type, password))
    return fetch(webconfig.apiUrl+'/createUser/', config)
      .then(response => response.json())
      .then(function(response) {

        if(response.error){
          dispatch(createUserFailure(response.error));
        } else {
          dispatch(createUserSuccess(name, type, password));
          //dispatch(fetchCurrentCategories());
        }
      });
  }
}
