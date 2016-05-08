import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes'

function createCompanyRequest(company) {
  return {
    type: types.CREATE_COMPANY_REQUEST,
    company: company
  }
}

function createSuccess(){
  return {
    type: types.CREATE_COMPANY_SUCCESS
  }
}

function createFailer(error){
  return {
    type: types.CREATE_COMPANY_FAILURE,
    error: error
  }
}

function updateCompanyRequest(company) {
  return {
    type: types.UPDATE_COMPANY_REQUEST,
    company: company
  }
}

function updateSuccess(){
  return {
    type: types.UPDATE_COMPANY_SUCCESS
  }
}

function updateFailure(error){
  return {
    type: types.UPDATE_COMPANY_FAILURE,
    error: error
  }
}


export function createCompany(ssn, name, address, postalCode, phone, email, comment, sales) {

  var company = {
    "ssn": ssn,
    "name": name,
    "address": address,
    "postalCode": postalCode,
    "phone": phone,
    "email": email,
    "comment": comment,
    "sales": sales
  };

  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(company)
  }

  return dispatch => {
    dispatch(createCompanyRequest(company))
    return fetch(`http://localhost:3030/company/`, config)
      .then(response => response.json())
      .then(function(response) {

        if(response.error){
          dispatch(createFailure(response.error));
        } else {
          dispatch(createSuccess(company));
        }
      });
  }
}


export function updateCompany(id, ssn, name, address, postalCode, phone, email, comment, sales) {

  var company = {
    "id": id,
    "ssn": ssn,
    "name": name,
    "address": address,
    "postalCode": postalCode,
    "phone": phone,
    "email": email,
    "comment": comment,
    "sales": sales
  };

  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(company)
  }

  return dispatch => {
    dispatch(updateCompanyRequest(company))
    return fetch(`http://localhost:3030/updateCompany/`, config)
      .then(response => response.json())
      .then(function(response) {

        if(response.error){
          dispatch(updateFailure(response.error));
        } else {
          dispatch(updateSuccess(company));
        }
      });
  }
}
