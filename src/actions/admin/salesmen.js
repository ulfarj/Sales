import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../../constants/ActionTypes';
import webconfig from 'config';
import { fetchCurrentSalesmen } from '../salesmen';

function createSalesmanRequest(salesman) {
  return {
    type: types.CREATE_SALESMAN_REQUEST,
    salesman: salesman
  }
}

function createSalesmanSuccess(){
  return {
    type: types.CREATE_SALESMAN_SUCCESS
  }
}

function createSalesmanFailure(error){
  return {
    type: types.CREATE_SALESMAN_FAILURE,
    error: error
  }
}

export function createSalesman(name) {
  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
    body: JSON.stringify({"name": name}),
    Authorization: sessionStorage.token,
  }

  return (dispatch, getState) => {
    dispatch(createSalesmanRequest(name))
    return fetch(webconfig.apiUrl+'/createSalesman/', config)
      .then(response => response.json())
      .then(function(response) {

        if(response.error){
          dispatch(createSalesmanFailure(response.error));
        } else {
          dispatch(createSalesmanSuccess(name));
          dispatch(fetchCurrentSalesmen());
        }
      });
  }
}

function deleteSalesmanRequest(salesman) {
  return {
    type: types.DELETE_SALESMAN_REQUEST,
    salesman: salesman
  }
}

function deleteSalesmanSuccess(){
  return {
    type: types.DELETE_SALESMAN_SUCCESS
  }
}

function deleteSalesmanFailure(error){
  return {
    type: types.DELETE_SALESMAN_FAILURE,
    error: error
  }
}


export function deleteSalesman(id) {
  const config = {
		method: 'GET',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
  }

  return (dispatch, getState) => {
    dispatch(deleteSalesmanRequest(id))
    return fetch(webconfig.apiUrl+'/deleteSalesman/'+id, config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(deleteSalesmanFailure(response.error));
        } else {
          dispatch(deleteSalesmanSuccess());
          dispatch(fetchCurrentSalesmen());
        }
      });
  }
}
