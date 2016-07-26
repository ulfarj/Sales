import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../constants/ActionTypes';
import webconfig from 'config';

function requestCompanies(filter) {
  return {
    type: types.REQUEST_COMPANIES,
    filter: filter
  }
}

function receiveCompanies(json) {

  return {
    type: types.RECEIVE_COMPANIES,
    items: json,
    receivedAt: Date.now()
  }
}

export function fetchCompanies(filter) {

  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(filter)
  }

  return dispatch => {
    dispatch(requestCompanies(filter))
    return fetch(webconfig.apiUrl+'/companies/', config)
      .then(response => response.json())
      .then(json => dispatch(receiveCompanies(json)))
  }
}

export function setFilter(filter) {
  return {
    type: types.SET_FILTER,
    filter: filter
  }
}

export function updateCompanyItems(index, company) {
  return {
    type: types.UPDATE_COMPANY_ITEM,
    index: index,
    company: company
  }
}

export function updateCompanyItem(company) {

  return (dispatch, getState) => {
    let items = getState().companies.items;
    let index = _.findIndex(items, ['_id', company.id]);

    dispatch(updateCompanyItems(index, company));
  }
}

export function updateCompanyItemSales(index, sales) {
  return {
    type: types.UPDATE_COMPANY_ITEM_SALES,
    index: index,
    sales: sales
  }
}

export function updateCompanySales(companyId, sales) {

  return (dispatch, getState) => {
    let items = getState().companies.items;
    let index = _.findIndex(items, ['_id', companyId]);

    dispatch(updateCompanyItemSales(index, sales));
  }
}
