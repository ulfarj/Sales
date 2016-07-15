import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import * as types from '../../constants/ActionTypes';
import webconfig from 'config';
import { fetchCurrentCategories } from '../categories';

function createCategoryRequest(category) {
  return {
    type: types.CREATE_CATEGORY_REQUEST,
    category: category
  }
}

function createCategorySuccess(){
  return {
    type: types.CREATE_CATEGORY_SUCCESS
  }
}

function createCategoryFailure(error){
  return {
    type: types.CREATE_CATEGORY_FAILURE,
    error: error
  }
}

export function createCategory(name) {
  let config = {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({"name": name})
  }

  return (dispatch, getState) => {
    dispatch(createCategoryRequest(name))
    return fetch(webconfig.apiUrl+'/createCategory/', config)
      .then(response => response.json())
      .then(function(response) {

        if(response.error){
          dispatch(createCategoryFailure(response.error));
        } else {
          dispatch(createCategorySuccess(name));
          dispatch(fetchCurrentCategories());
        }
      });
  }
}

function deleteCategoryRequest(category) {
  return {
    type: types.DELETE_CATEGORY_REQUEST,
    category: category
  }
}

function deleteCategorySuccess(){
  return {
    type: types.DELETE_CATEGORY_SUCCESS
  }
}

function deleteCategoryFailure(error){
  return {
    type: types.DELETE_CATEGORY_FAILURE,
    error: error
  }
}


export function deleteCategory(id) {

  return (dispatch, getState) => {
    dispatch(deleteCategoryRequest(id))
    return fetch(webconfig.apiUrl+'/deleteCategory/'+id)
      .then(response => response.json())
      .then(function(response) {
        if(response.error){
          dispatch(deleteCategoryFailure(response.error));
        } else {
          dispatch(deleteCategorySuccess());
          dispatch(fetchCurrentCategories());
        }
      });
  }
}
