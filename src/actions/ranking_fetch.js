import {
  FETCHING_RANKING_DATA, FETCHING_RANKING_DATA_SUCCESS, FETCHING_RANKING_DATA_FAILURE,
  FETCHING_RANKING_DATA_MORE, FETCHING_RANKING_DATA_MORE_SUCCESS, FETCHING_RANKING_DATA_MORE_FAILURE,
  FETCHING_RANKING_DETAIL, FETCHING_RANKING_DETAIL_SUCCESS, FETCHING_RANKING_DETAIL_FAILURE,
  FETCHING_RANKING_RELATED, FETCHING_RANKING_RELATED_SUCCESS, FETCHING_RANKING_RELATED_FAILURE,
  FETCHING_RANKING_RELATED_MORE, FETCHING_RANKING_RELATED_MORE_SUCCESS, FETCHING_RANKING_RELATED_MORE_FAILURE,
  SEARCH_RANKING_DATA, SEARCH_RANKING_DATA_SUCCESS, SEARCH_RANKING_DATA_FAILURE,
} from './constants';
import api from '../api/api';
import { fetchUserWorks } from '../actions/user_work_fetch';
import { formatRankingDataImageURL, formatRankingDetailImageURL } from '../helper/image_helper';
import CookieHandler from '../helper/cookie_helper';

export function getRankingData() {
  return {
    type: FETCHING_RANKING_DATA
  };
}

export function getRankingDataSuccess(data) {
  return {
    type: FETCHING_RANKING_DATA_SUCCESS,
    data
  };
}

export function getRankingDataFailure() {
  return {
    type: FETCHING_RANKING_DATA_FAILURE
  };
}

export function getRankingDataMore() {
  return {
    type: FETCHING_RANKING_DATA_MORE
  };
}

export function getRankingDataMoreSuccess(dataMore) {
  return {
    type: FETCHING_RANKING_DATA_MORE_SUCCESS,
    dataMore
  };
}

export function getRankingDataMoreFailure() {
  return {
    type: FETCHING_RANKING_DATA_MORE_FAILURE
  };
}

export function getRankingDetail() {
  return {
    type: FETCHING_RANKING_DETAIL
  };
}

export function getRankingDetailSuccess(dataDetail) {
  return {
    type: FETCHING_RANKING_DETAIL_SUCCESS,
    dataDetail
  };
}

export function getRankingDetailFailure() {
  return {
    type: FETCHING_RANKING_DETAIL_FAILURE
  };
}

export function getRankingRelated() {
  return {
    type: FETCHING_RANKING_RELATED
  };
}

export function getRankingRelatedSuccess(data) {
  return {
    type: FETCHING_RANKING_RELATED_SUCCESS,
    data
  };
}

export function getRankingRelatedFailure() {
  return {
    type: FETCHING_RANKING_RELATED_FAILURE
  };
}

export function getRankingRelatedMore() {
  return {
    type: FETCHING_RANKING_RELATED_MORE
  };
}

export function getRankingRelatedMoreSuccess(dataMore) {
  return {
    type: FETCHING_RANKING_RELATED_MORE_SUCCESS,
    dataMore
  };
}

export function getRankingRelatedMoreFailure() {
  return {
    type: FETCHING_RANKING_RELATED_MORE_FAILURE
  };
}

// SEARCH RANKING ACTION
export function searchRankingData() {
  return {
    type: SEARCH_RANKING_DATA
  };
}

export function searchRankingDataSuccess(data) {
  return {
    type: SEARCH_RANKING_DATA_SUCCESS,
    data
  };
}

export function searchRankingDataFailure() {
  return {
    type: SEARCH_RANKING_DATA_FAILURE
  };
}

export function fetchRankingData(params) {
  return async (dispatch) => {
    dispatch(getRankingData());
    try {
      let tokenCookiesValue = await CookieHandler().getCookiesValue('tokenCookies');
      let result = await api.getRanking(params, tokenCookiesValue);
      formatRankingDataImageURL(result.data.illusts);
      dispatch(getRankingDataSuccess(result));
    } catch (error) {
      dispatch(getRankingDataFailure());
    }
  };
}

export function fetchRankingDataMore(nextUrl) {
  return async (dispatch) => {
    dispatch(getRankingDataMore());
    try {
      let tokenCookiesValue = await CookieHandler().getCookiesValue('tokenCookies');
      let result = await api.getRanking(null, tokenCookiesValue, nextUrl);
      formatRankingDataImageURL(result.data.illusts);
      dispatch(getRankingDataMoreSuccess(result));
    } catch (error) {
      dispatch(getRankingDataMoreFailure());
    }
  };
}

export function fetchRankingDetail(id) {
  return async (dispatch, getState) => {
    dispatch(getRankingDetail());
    try {
      let tokenCookiesValue = await CookieHandler().getCookiesValue('tokenCookies');
      let result;
      result = await api.getRankingDetail(id, tokenCookiesValue);
      formatRankingDetailImageURL(result.data.illust);
      if (result.data.illust.meta_pages.length > 0) {
        formatRankingDataImageURL(result.data.illust.meta_pages);
      }
        dispatch(getRankingDetailSuccess(result.data.illust));
      const dataDetail = getState().rankingData.dataDetail;
      dispatch(fetchUserWorks('illust', dataDetail.user.id));
      dispatch(fetchRankingRelated(dataDetail.id));
    } catch (error) {
      dispatch(getRankingDetailFailure());
    }
  };
}

export function fetchRankingRelated(illustID) {
  return async (dispatch) => {
    dispatch(getRankingRelated());
    try {
      let tokenCookiesValue = await CookieHandler().getCookiesValue('tokenCookies');
      let result = await api.getRankingRelated(illustID, tokenCookiesValue);
      formatRankingDataImageURL(result.data.illusts);
      dispatch(getRankingRelatedSuccess(result));
    } catch (error) {
      dispatch(getRankingRelatedFailure());
    }
  };
}

export function fetchRankingRelatedMore(nextURL) {
  return async (dispatch) => {
    dispatch(getRankingRelatedMore());
    try {
      let tokenCookiesValue = await CookieHandler().getCookiesValue('tokenCookies');
      let result = await api.getRankingRelated(null, tokenCookiesValue, nextURL);
      formatRankingDataImageURL(result.data.illusts);
      dispatch(getRankingRelatedMoreSuccess(result));
    } catch (error) {
      console.log(error)
      dispatch(getRankingRelatedMoreFailure());
    }
  };
}

export function fetchRankingDataSearch(word) {
  return async (dispatch) => {
    dispatch(searchRankingData());
    try {
      let tokenCookiesValue = await CookieHandler().getCookiesValue('tokenCookies');
      let result = await api.searchRanking(tokenCookiesValue, word);
      formatRankingDataImageURL(result.data.illusts);
      dispatch(searchRankingDataSuccess(result));
    } catch (error) {
      dispatch(searchRankingDataFailure());
    }
  };
}
