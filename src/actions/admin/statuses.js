import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../../constants/ActionTypes';
import webconfig from 'config';
import { fetchCurrentStatuses } from '../statuses';

function createStatusRequest(status, color) {
  return {
    type: types.CREATE_STATUS_REQUEST,
    status: status,
    color: color
  }
}

function createStatusSuccess(){
  return {
    type: types.CREATE_STATUS_SUCCESS
  }
}

function createStatusFailure(error){
  return {
    type: types.CREATE_STATUS_FAILURE,
    error: error
  }
}

export function createStatus(name, color) {
  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({"name": name, "color": color})
  }

  return (dispatch, getState) => {
    dispatch(createStatusRequest(name, color))
    return fetch(webconfig.apiUrl+'/createStatus/', config)
      .then(response => response.json())
      .then(function(response) {

        if(response.error){
          dispatch(createStatusFailure(response.error));
        } else {
          dispatch(createStatusSuccess(name));
          dispatch(fetchCurrentStatuses());
        }
      });
  }
}

function deleteStatusRequest(category) {
  return {
    type: types.DELETE_STATUS_REQUEST,
    status: status
  }
}

function deleteStatusSuccess(){
  return {
    type: types.DELETE_STATUS_SUCCESS
  }
}

function deleteStatusFailure(error){
  return {
    type: types.DELETE_STATUS_FAILURE,
    error: error
  }
}


export function deleteStatus(id) {

  return (dispatch, getState) => {
    dispatch(deleteStatusRequest(id))
    return fetch(webconfig.apiUrl+'/deleteStatus/'+id)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(deleteStatusFailure(response.error));
        } else {
          dispatch(deleteStatusSuccess());
          dispatch(fetchCurrentStatuses());
        }
      });
  }
}
