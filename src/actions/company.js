import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes'


function createCompanyRequest(company) {
  return {
    type: types.CREATE_COMPANY_REQUEST,
    company: company
  }
}

function registerSuccess(){
  return {
    type: types.CREATE_COMPANY_SUCCESS
  }
}

function registerFailer(error){
  return {
    type: types.CREATE_COMPANY_FAILURE,
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

  console.log(company);

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
          dispatch(registerFailure(response.error));
        } else {
          dispatch(registerSuccess(company));
        }
      });
  }
}
