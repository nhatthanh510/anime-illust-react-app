/**
 * Created by admin on 6/28/2017.
 */
import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants'

export function getData() {
  return {
    type: FETCHING_DATA
  };
}

export function getDataSuccess(data) {
  return {
    type: FETCHING_DATA_SUCCESS,
    data,
  };
}

export function getDataFailure() {
  return {
    type: FETCHING_DATA_FAILURE
  };
}

import getImage from '../api/api';
export function fetchData() {
  return async (dispatch) => {
    dispatch(getData());
    try {
      let data = await getImage();
      dispatch(getDataSuccess(data));
    } catch (error) {
      console.log('err:', error);
    }
  };
}
