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

function loginSuccess(token, userId) {
	return {
		type: types.LOGIN_SUCCESS,
		token: token,
    userId: userId
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

        console.log('response');
        console.log(response);

        if(!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
    })
    .then(response => {
      console.log(response);
      sessionStorage.token = response.access_token;
      sessionStorage.userId = response.userName;
      dispatch(loginSuccess(response.access_token, response.userName));
      //browserHistory.push('/application/'+sessionStorage.advertisementId);
    })
    .catch(error => {
      dispatch(loginFailure(error));
    })
  }
}
