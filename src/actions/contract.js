import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';
import webconfig from 'config';

function createContractRequest(contract) {
  return {
    type: types.CREATE_CONTRACT_REQUEST,
    contract,
  }
}

function createContractSuccess(response) {
  return {
    type: types.CREATE_CONTRACT_SUCCESS,
    body,
  }
}

function createContractFailure(error) {
  return {
    type: types.CREATE_CONTRACT_SUCCESS,
    error,
  }
}

export function createContract(contract) {

  console.log(contract);

  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: contract
  }

  return (dispatch) => {
    dispatch(createContractRequest(contract))
    return fetch(webconfig.apiUrl+'/createContract/', config)
      .then(response => response.json())
      .then(function(response) {

        if(response.error){
          dispatch(createcontractFailure(response.error));
        } else {
          dispatch(createContractSuccess(response));
          //dispatch(fetchCurrentSalesmen());
        }
      });
  }
}
