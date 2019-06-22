import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes';
import { fetchCompanies, updateCompanyItem } from './companies';
import { fetchComments } from './comments';
import webconfig from 'config';

export function initCompany() {
  return {
    type: types.COMPANY_INITIALISE,
  }
}

function findCompanyRequest(ssn) {
  return {
    type: types.FIND_COMPANY_BY_ID_REQUEST,
    ssn,
  }
}

function findCompanySuccess(company){
  return {
    type: types.FIND_COMPANY_BY_ID_SUCCESS,
    company,
  }
}

function findCompanyFailure(error){
  return {
    type: types.FIND_COMPANY_BY_ID_FAILURE,
    error: error
  }
}

export function findCompany(ssn) {

  const config = {
		method: 'GET',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
  }

  return (dispatch, getState) => {
    dispatch(findCompanyRequest(ssn))
    return fetch(webconfig.apiUrl+'/company/'+ssn, config)
      .then(response => response.json())
      .then(function(response) {

        if(response.error){
          dispatch(findCompanyFailure(response.error));
        } else {
          dispatch(findCompanySuccess(response));
        }
      });
  }
}

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


export function createCompany(ssn, name, address, postalCode, phone, email, comment, sales, namersk, contact) {

  var company = {
    "ssn": ssn,
    "name": name,
    "address": address,
    "postalCode": postalCode,
    "phone": phone,
    "email": email,
    "comment": comment,
    "sales": sales,
    "namersk": namersk,
    "contact": contact,
  };

  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
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
          dispatch(fetchCompanies(getState().companies.filter))
        }
      });
  }
}


export function importCompanies(companies) {

  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
    body: JSON.stringify({"companies": companies})
  }

  return (dispatch, getState) => {
    //dispatch(createCompanyRequest(company))
    fetch(webconfig.apiUrl+'/importcompanies/', config);
  }
}


export function updateCompany(id, ssn, name, address, postalCode, phone, email, legal, dontcontact, contact, namersk) {

  var company = {
    "id": id,
    "ssn": ssn,
    "name": name,
    "address": address,
    "postalCode": postalCode,
    "phone": phone,
    "email": email,
    "legal": legal,
    "dontcontact": dontcontact,
    "contact": contact,
    "namersk": namersk,
  };

  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
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
          dispatch(updateCompanyItem(company));
    //      dispatch(fetchCompanies(getState().companies.filter))
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
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
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
          dispatch(fetchComments(id));
          //dispatch(fetchCompanies(getState().companies.filter))
        }
      });
  }
}


export function deleteCompany(id) {

  var company = {
    "id": id
  };

  const config = {
		method: 'GET',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
  }

  return (dispatch, getState) => {
    dispatch(updateCompanyRequest(company))
    return fetch(webconfig.apiUrl+'/deleteCompany/'+id, config)
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
