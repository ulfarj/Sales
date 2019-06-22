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
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
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
    type: types.CREATE_CONTRACT_FAILURE,
    error,
  }
}

export function createContract(contract) {

  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
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
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
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

function deleteContractRequest(contract) {
  return {
    type: types.DELETE_CONTRACT_REQUEST,
    contract,
  }
}

function deleteContractSuccess(response) {
  return {
    type: types.DELETE_CONTRACT_SUCCESS,
    response,
  }
}

function deleteContractFailure(error) {
  return {
    type: types.DELETE_CONTRACT_FAILURE,
    error,
  }
}

export function deleteContract(contract) {
  const config = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      Authorization: sessionStorage.token,
    },
  }

  return (dispatch) => {
    dispatch(deleteContractRequest(contract))
    return fetch(webconfig.apiUrl+'/deleteContract/'+contract._id, config)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(deleteContractFailure(response.error));
        } else {
          dispatch(deleteContractSuccess(response));
          dispatch(fetchContracts(contract.companyId));
        }
     });    
  }
}
