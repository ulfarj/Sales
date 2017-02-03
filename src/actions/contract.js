import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';
import webconfig from 'config';

function fetchContractsRequest(companyId) {
  return {
    type: types.FETCH_CONTRACTS_REQUEST,
    companyId,
  }
}

function fetchContractsSuccess(contracts) {
  return {
    type: types.FETCH_CONTRACTS_SUCCESS,
    items: contracts,
  }
}

function fetchContractsFailure(error) {
  return {
    type: types.FETCH_CONTRACTS_FAILURE,
    error,
  }
}

export function fetchContracts(companyId) {
  let config = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
  }

  return (dispatch, getState) => {
    dispatch(fetchContractsRequest(companyId))
    return fetch(webconfig.apiUrl+'/contracts/'+companyId, config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(fetchContractsFailure(response.error));
        } else {
          dispatch(fetchContractsSuccess(response));
        }
      });
  }
}

function createContractRequest(contract) {
  return {
    type: types.CREATE_CONTRACT_REQUEST,
    contract,
  }
}

function createContractSuccess(response) {
  return {
    type: types.CREATE_CONTRACT_SUCCESS,
    response,
  }
}

function createContractFailure(error) {
  return {
    type: types.CREATE_CONTRACT_SUCCESS,
    error,
  }
}

export function createContract(contract) {

  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(contract),
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
          dispatch(fetchContracts(contract.companyId));
        }
     });
  }
}


export function updateContract(contract) {

  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(contract),
  }

  return (dispatch) => {
    dispatch(createContractRequest(contract))
    return fetch(webconfig.apiUrl+'/updateContract/', config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(createcontractFailure(response.error));
        } else {
          dispatch(createContractSuccess(response));
          dispatch(fetchContracts(contract.companyId));
        }
     });
  }
}
