import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes';
import {  pushState } from 'redux-router';
import { browserHistory } from 'react-router';
import moment from 'moment';
import webconfig from 'config';


function loginRequest(credentials) {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials: credentials
  }
}

function loginFailure(error) {
	return {
		type: types.LOGIN_FAILURE,
		error: error
	}
}

function loginSuccess(token, userId, expires) {
	return {
		type: types.LOGIN_SUCCESS,
		token: token,
    userId: userId,
    expires: expires,
	}
}

export function login(token, userId) {
  return {
    type: types.LOGIN,
    token: token,
    userId: userId
  }
}

export function loginUser(username, password) {

  const grant_type = 'password';

  let config = {
  		method: 'POST',
    	headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      body: `grant_type=${grant_type}&username=${username}&password=${password}`
   }

  return dispatch => {

    dispatch(loginRequest({username: username, password: password}))
    return fetch(webconfig.apiUrl+'/authenticate', config)
    .then(response => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
    })
    .then(response => {
      localStorage.token = response.access_token;
      localStorage.userId = response.userName;
      localStorage.expires = response.expires;
      dispatch(loginSuccess(response.access_token, response.userName, response.expires));
      browserHistory.push('/');
    })
    .catch(error => {
      dispatch(loginFailure(error));
    })
  }
}

export function authenticated(user) {
  return {
    type: types.AUTHENTICATED,
    user,
  };
}

export function notAuthenticated() {
  return {
    type: types.NOT_AUTHENTICATED,
  };
}
