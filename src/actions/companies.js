import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes'

function requestCompanies() {
  return {
    type: types.REQUEST_COMPANIES
  }
}

function receiveCompanies(json) {     
  return {
    type: types.RECEIVE_COMPANIES,
    items: json,
    receivedAt: Date.now()
  }
}

export function fetchCompanies() { 

  var name = 'xx'; 

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },             
    body: `name=${name}`        
   }  

  return dispatch => {
    dispatch(requestCompanies())
    return fetch(`http://localhost:3030/companies/namex/ssnx`)
      .then(response => response.json())       
      .then(json => dispatch(receiveCompanies(json)))      
  } 
}