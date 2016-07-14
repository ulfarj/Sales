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
      'Content-Type':'application/json'
    },
    body: JSON.stringify({"name": name})
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
