import {
  FETCHING_GIF_DATA, FETCHING_GIF_DATA_SUCCESS, FETCHING_GIF_DETAIL,
  FETCHING_GIF_DETAIL_SUCCESS, FETCHING_GIF_DATA_FAILURE, FETCHING_GIF_DETAIL_FAILURE,
  FETCHING_GIF_RELATED, FETCHING_GIF_RELATED_SUCCESS, FETCHING_GIF_RELATED_FAILURE,
  FETCHING_GIF_RELATED_MORE, FETCHING_GIF_RELATED_MORE_SUCCESS, FETCHING_GIF_RELATED_MORE_FAILURE,
  FETCHING_GIF_AUTOCOMPLETE, FETCHING_GIF_AUTOCOMPLETE_SUCCESS, FETCHING_GIF_AUTOCOMPLETE_FAILURE
} from './constants';
import api from '../api/api';

export function getGifData() {
  return {
    type: FETCHING_GIF_DATA
  };
}

export function getGifDataSuccess(data) {
  return {
    type: FETCHING_GIF_DATA_SUCCESS,
    data,
  };
}

export function getGifDataFailure() {
  return {
    type: FETCHING_GIF_DATA_FAILURE
  };
}

export function getGifDetail() {
  return {
    type: FETCHING_GIF_DETAIL
  };
}

export function getGifDetailSuccess(dataDetail) {
  return {
    type: FETCHING_GIF_DETAIL_SUCCESS,
    dataDetail,
  };
}

export function getGifDetailFailure() {
  return {
    type: FETCHING_GIF_DETAIL_FAILURE
  };
}

export function getGifRelated() {
  return {
    type: FETCHING_GIF_RELATED
  };
}

export function getGifRelatedSuccess(data) {
  return {
    type: FETCHING_GIF_RELATED_SUCCESS,
    data,
  };
}

export function getGifRelatedFailure() {
  return {
    type: FETCHING_GIF_RELATED_FAILURE
  };
}

export function getGifRelatedMore() {
  return {
    type: FETCHING_GIF_RELATED_MORE
  };
}

export function getGifRelatedMoreSuccess(dataMore) {
  return {
    type: FETCHING_GIF_RELATED_MORE_SUCCESS,
    dataMore,
  };
}

export function getGifRelatedMoreFailure() {
  return {
    type: FETCHING_GIF_RELATED_MORE_FAILURE
  };
}

export function getGifAutoComplete() {
  return {
    type: FETCHING_GIF_AUTOCOMPLETE
  };
}

export function getGifAutoCompleteSuccess(data) {
  return {
    type: FETCHING_GIF_AUTOCOMPLETE_SUCCESS,
    data,
  };
}

export function getGifAutoCompleteFailure() {
  return {
    type: FETCHING_GIF_AUTOCOMPLETE_FAILURE
  };
}

export function fetchGifData(params) {
  return async (dispatch) => {
    dispatch(getGifData());
    try {
      let data = await api.searchGif(params);
      dispatch(getGifDataSuccess(data));
    } catch (error) {
      dispatch(getGifDataFailure());
    }
  };
}

export function fetchGifDetailData(id) {
  return async (dispatch) => {
    dispatch(getGifDetail());
    try {
      let data = await api.getGifDetail(id);
      if (data.length > 0) {
        dispatch(getGifDetailSuccess(data[0]));
      } else {
        dispatch(getGifDetailFailure());
      }
    } catch (error) {
      dispatch(getGifDetailFailure());
    }
  };
}

export function fetchGifRelatedData(pos) {
  return async (dispatch) => {
    dispatch(getGifRelated());
    try {
      let data = await api.searchGif(pos);
      dispatch(getGifRelatedSuccess(data));
    } catch (error) {
      dispatch(getGifRelatedFailure());
    }
  };
}

export function fetchGifRelatedDataMore(next) {
  return async (dispatch) => {
    dispatch(getGifRelatedMore());
    try {
      let dataMore = await api.searchGif(next);
      dispatch(getGifRelatedMoreSuccess(dataMore));
    } catch (error) {
      dispatch(getGifRelatedMoreFailure());
    }
  };
}

export function fetchGifAutoComplete(params) {
  return async (dispatch) => {
    dispatch(getGifAutoComplete());
    try {
      let dataAutoComplete = await api.getAutoComplete(params);
      dispatch(getGifAutoCompleteSuccess(dataAutoComplete));
    } catch (error) {
      dispatch(getGifAutoCompleteFailure());
    }
  };
}
