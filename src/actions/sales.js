import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes';
import { fetchCompanies, updateCompanySales } from './companies';
import webconfig from 'config';

function requestSales(companyId) {
  return {
    type: types.REQUEST_SALES,
    companyId: companyId
  }
}

function receiveSales(items) {
  return {
    type: types.RECEIVE_SALES,
    items: items,
    receivedAt: Date.now()
  }
}

export function fetchSales(companyId) {
  return dispatch => {
    dispatch(requestSales(companyId))
    return fetch(webconfig.apiUrl+'/sales/'+companyId)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveSales(json));
        dispatch(updateCompanySales(companyId, json));
      })
  }
}

function addSaleRequest(sale) {
  return {
    type: types.ADD_SALE_REQUEST,
    sale: sale
  }
}

function addSaleSuccess(){
  return {
    type: types.ADD_SALE_SUCCESS
  }
}

function addSaleFailure(error){
  return {
    type: types.ADD_SALE_FAILURE,
    error: error
  }
}

export function addSale(id, sale) {

  var body = {
    "id": id,
    "sale": sale
  };

  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(body)
  }

  return (dispatch, getState) => {
    dispatch(addSaleRequest(sale))
    return fetch(webconfig.apiUrl+'/addSale/', config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(addSaleFailure(response.error));
        } else {
          dispatch(addSaleSuccess());
        }
      })
      .then(function(response) {
        //dispatch(fetchCompanies(getState().companies.filter));
      })
      .then(function(response) {
        dispatch(fetchSales(id));
      });
  }
}

function deleteSaleRequest(sale) {
  return {
    type: types.DELETE_SALE_REQUEST,
    sale: sale
  }
}

function deleteSaleSuccess(){
  return {
    type: types.DELETE_SALE_SUCCESS
  }
}

function deleteSaleFailure(error){
  return {
    type: types.DELETE_SALE_FAILURE,
    error: error
  }
}

export function deleteSale(id, categoryId) {

  var body = {
    "id": id,
    "categoryId": categoryId
  };

  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(body)
  }

  return (dispatch, getState) => {
    dispatch(deleteSaleRequest(body))
    return fetch(webconfig.apiUrl+'/deleteSale/', config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(deleteSaleFailure(response.error));
        } else {
          dispatch(deleteSaleSuccess());
        }
      })
      .then(function(response) {
        //dispatch(fetchCompanies(getState().companies.filter));
      })
      .then(function(response) {
        dispatch(fetchSales(id));
      });
  }
}


function updateSaleRequest(sale) {
  return {
    type: types.UPDATE_SALE_REQUEST,
    sale: sale
  }
}

function updateSaleSuccess(){
  return {
    type: types.UPDATE_SALE_SUCCESS
  }
}

function updateSaleFailure(error){
  return {
    type: types.UPDATE_SALE_FAILURE,
    error: error
  }
}

export function updateSale(id, categoryId, sale) {

  var body = {
    "id": id,
    "categoryId": categoryId,
    "sale": sale
  };

  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(body)
  }

  return (dispatch, getState) => {
    dispatch(updateSaleRequest(sale))
    return fetch(webconfig.apiUrl+'/updateSale/', config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(updateSaleFailure(response.error));
        } else {
          dispatch(updateSaleSuccess());
        }
      })
      .then(function(response) {
        //dispatch(fetchCompanies(getState().companies.filter));
      })
      .then(function(response) {
        dispatch(fetchSales(id));
      });
  }
}
