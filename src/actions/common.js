import * as types from '../constants/ActionTypes';

export function updateSize(width, height) {
    return {
      type: types.UPDATE_SIZE,
      width,
      height,
    }
  }