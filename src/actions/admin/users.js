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
  const config = {
		method: 'GET',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
  }

  return dispatch => {
    dispatch(requestUsers())
    return fetch(webconfig.apiUrl+'/users', config)
      .then(response => response.json())
      .then(json => dispatch(requestUsersSuccess(json)))
  }
}

function createUserRequest(name, username, type, salesman, password) {
  return {
    type: types.CREATE_USER_REQUEST,
    name,
    username,
    type,
    salesman,
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

export function createUser(name, username, type, salesman, password) {
  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(
      {
        "name": name,
        "username": username,
        "type": type,
        "salesman": salesman,
        "password": password,
      }),
      Authorization: sessionStorage.token,
  }

  return (dispatch, getState) => {
    dispatch(createUserRequest(name, type, salesman, password))
    return fetch(webconfig.apiUrl+'/createUser/', config)
      .then(response => response.json())
      .then(function(response) {

        if(response.error){
          dispatch(createUserFailure(response.error));
        } else {
          dispatch(createUserSuccess(name, username, type, salesman, password));
          dispatch(fetchCurrentUsers());
        }
      });
  }
}

function deleteUserRequest(user) {
  return {
    type: types.DELETE_USER_REQUEST,
    user: user
  }
}

function deleteUserSuccess(){
  return {
    type: types.DELETE_USER_SUCCESS
  }
}

function deleteUserFailure(error){
  return {
    type: types.DELETE_USER_FAILURE,
    error: error
  }
}


export function deleteUser(id) {

  const config = {
		method: 'GET',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
  }

  return (dispatch, getState) => {
    dispatch(deleteUserRequest(id))
    return fetch(webconfig.apiUrl+'/deleteUser/'+id, config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(deleteUserFailure(response.error));
        } else {
          dispatch(deleteUserSuccess());
          dispatch(fetchCurrentUsers());
        }
      });
  }
}
