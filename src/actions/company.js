import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes';
import { fetchCompanies } from './companies';
import webconfig from 'config';

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

  return (dispatch, getState) => {
    dispatch(createCompanyRequest(company))
    return fetch(webconfig.apiUrl+'/company/', config)
      .then(response => response.json())
      .then(function(response) {

        if(response.error){
          dispatch(createFailure(response.error));
        } else {
          dispatch(createSuccess(company));

          console.log(getState().companies);

          dispatch(fetchCompanies(getState().companies.filter))
        }
      });
  }
}


export function updateCompany(id, ssn, name, address, postalCode, phone, email, legal, dontcontact) {

  var company = {
    "id": id,
    "ssn": ssn,
    "name": name,
    "address": address,
    "postalCode": postalCode,
    "phone": phone,
    "email": email,
    "legal": legal,
    "dontcontact": dontcontact
  };

  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(company)
  }

  return (dispatch, getState) => {
    dispatch(updateCompanyRequest(company))
    return fetch(webconfig.apiUrl+'/updateCompany/', config)
      .then(response => response.json())
      .then(function(response) {

        if(response.error){
          dispatch(updateFailure(response.error));
        } else {
          dispatch(updateSuccess(company));
          dispatch(fetchCompanies(getState().companies.filter))
        }
      });
  }
}

function addCommentRequest(comment) {
  return {
    type: types.ADD_COMMENT_REQUEST,
    comment: comment
  }
}

function addCommentSuccess(){
  return {
    type: types.ADD_COMMENT_SUCCESS
  }
}

function addCommentFailure(error){
  return {
    type: types.ADD_COMMENT_FAILURE,
    error: error
  }
}

export function addComment(id, comment) {

  var body = {
    "id": id,
    "comment": comment
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
    dispatch(addCommentRequest(comment))
    return fetch(webconfig.apiUrl+'/addComment/', config)
      .then(response => response.json())
      .then(function(response) {

        if(response.error){
          dispatch(addCommentFailure(response.error));
        } else {
          dispatch(addCommentSuccess(comment));
          dispatch(fetchCompanies(getState().companies.filter))
        }
      });
  }
}


export function deleteCompany(id) {

  var company = {
    "id": id
  };

  return (dispatch, getState) => {
    dispatch(updateCompanyRequest(company))
    return fetch(webconfig.apiUrl+'/deleteCompany/'+id)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(updateFailure(response.error));
        } else {
          dispatch(updateSuccess(company));
          dispatch(fetchCompanies(getState().companies.filter))
        }
      });
  }
}
