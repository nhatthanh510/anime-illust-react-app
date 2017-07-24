/**
 * Created by admin on 6/28/2017.
 */
import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants'
import api from '../api/api';

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

export function fetchData() {
  return async (dispatch) => {
    dispatch(getData());
    try {
      let data = await api.getImage();
      dispatch(getDataSuccess(data));
    } catch (error) {
      console.log('err:', error);
    }
  };
}

export function fetchGifData() {
  return async (dispatch) => {
    dispatch(getData());
    try {
      let data = await api.searchGif();
      dispatch(getDataSuccess(data));
    } catch (error) {
      console.log('err:', error);
    }
  };
}
