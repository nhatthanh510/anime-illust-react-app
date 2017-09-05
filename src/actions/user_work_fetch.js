import {
    FETCHING_USER_WORKS, FETCHING_USER_WORKS_SUCCESS, FETCHING_USER_WORKS_FAILURE
} from './constants';
import api from '../api/api';
import {formatRankingDataImageURL} from '../helper/image_helper';
import Cookies from 'universal-cookie';

export function getUserWork() {
    return {
        type: FETCHING_USER_WORKS
    };
}

export function getUserWorkSuccess(data) {
    return {
        type: FETCHING_USER_WORKS_SUCCESS,
        data
    };
}

export function getUserWorkFailure() {
    return {
        type: FETCHING_USER_WORKS_FAILURE
    };
}

export function fetchUserWorks(type, userID) {
    return async (dispatch) => {
        dispatch(getUserWork());
        try {
            let tokenCookies = new Cookies();
            let tokenCookiesValue = tokenCookies.get('tokenCookies');
            if (tokenCookiesValue != null) {
                let result = await api.getUserWork(type, userID, tokenCookiesValue);
                formatRankingDataImageURL(result.data.illusts);
                dispatch(getUserWorkSuccess(result));
            } else {
                let res = await api.getToken();
                let newToken = {};
                if (res) {
                    newToken = {
                        access_token: res.data.response.access_token,
                        expires_in: res.data.response.expires_in
                    };
                    tokenCookies.set('tokenCookies', newToken.access_token, { path: '/', maxAge: newToken.expires_in });
                    let result = await api.getUserWork(type, userID, tokenCookiesValue);
                    formatRankingDataImageURL(result.data.illusts);
                    dispatch(getUserWorkSuccess(result));
                }
            }
        } catch (error) {
            console.log(error)
            dispatch(getUserWorkFailure());
        }
    };
}