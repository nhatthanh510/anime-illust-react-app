import Cookies from 'universal-cookie';
import api from '../api/api';

export default function CookieHandler() {
  let tokenCookies;
  function createCookieInstance() {
    var cookies = new Cookies();
    return cookies;
  }

  function getCookiesInstance() {
    if (!tokenCookies) {
      tokenCookies = createCookieInstance();
    }
    return tokenCookies;
  }

  function setCookiesValue(key, token, params) {
    getCookiesInstance().set(key, token, params)
  }

  async function getCookiesValue(key) {
    let result =  getCookiesInstance().get(key);
    if (!result) {
      let res = await api.getToken();
      let newToken = {};
      if (res) {
        newToken = {
          access_token: res.data.response.access_token,
          expires_in: res.data.response.expires_in
        };
        setCookiesValue(key, newToken.access_token, { path: '/', maxAge: newToken.expires_in });
        result =  getCookiesInstance().get(key);
      }
    }
    return result;
  }

  return {
    getCookiesValue
  };
}
