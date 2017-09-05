/**
 * Created by admin on 6/28/2017.
 */
const axios = require('axios');

let data = [
  {
    avatar: './images/test/avatar.png',
    name: 'サッカン 1',
    rank: '1',
    mainImage: './images/test/1.jpg'
  },
  {
    avatar: './images/test/avatar.png',
    name: 'サッカン 2',
    rank: '2',
    mainImage: './images/test/2.jpg'
  },
  {
    avatar: './images/test/avatar.png',
    name: 'サッカン 3',
    rank: '3',
    mainImage: './images/test/3.jpg'
  },
  {
    avatar: './images/test/avatar.png',
    name: 'サッカン 4',
    rank: '4',
    mainImage: './images/test/1.jpg'
  },
  {
    avatar: './images/test/avatar.png',
    name: 'サッカン 1',
    rank: '1',
    mainImage: './images/test/1.jpg'
  },
  {
    avatar: './images/test/avatar.png',
    name: 'サッカン 2',
    rank: '2',
    mainImage: './images/test/2.jpg'
  },
  {
    avatar: './images/test/avatar.png',
    name: 'サッカン 3',
    rank: '3',
    mainImage: './images/test/3.jpg'
  },
  {
    avatar: './images/test/avatar.png',
    name: 'サッカン 4',
    rank: '4',
    mainImage: './images/test/1.jpg'
  }
];

function getImage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(data);
    }, 3000);
  });
}

function removeQueryStringParameter(key, url) {
  if (!url) url = window.location.href;

  var hashParts = url.split('#');

  var regex = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");

  if (hashParts[0].match(regex)) {
    //REMOVE KEY AND VALUE
    url = hashParts[0].replace(regex, '$1');

    //REMOVE TRAILING ? OR &
    url = url.replace(/([?&])$/, '');

    //ADD HASH
    if (typeof hashParts[1] !== 'undefined' && hashParts[1] !== null)
      url += '#' + hashParts[1];
  }

  return url;
}

/***** Ranking APIs *****/
async function getToken() {
  let url = '/v1/ranking/token';
  let result = await axios.get(url);
  return result;
}

async function getRanking(params, token, nextUrl) {
  let url = '/v1/ranking/list';
  let mode = (params && params.mode) ? params.mode : null;
  url += '?mode=' + mode + '&token=' + token;

  if (params && params.date) {
    url+= `&date=${params.date}`;
  }
  if (nextUrl) {
    nextUrl = nextUrl.replace(/&/g, 'magicalstring');
    url += '&next_url=' + nextUrl;
  }
  let result = await axios.get(url);
  return result;
}

async function getRankingDetail(id, token) {
  let url = '/v1/ranking/detail';
  if (id && token) {
    url += '?id=' + id + '&token=' + token;
    let result = await axios.get(url);
    return result;
  } else {
    return null;
  }
}

async function getUserWork(type, userID, token, nextUrl) {
  let url = '/v1/ranking/userwork';
  url += '?type=' + type + '&user_id=' + userID + '&token=' + token;
  if (nextUrl) {
    nextUrl = nextUrl.replace(/&/g, 'magicalstring');
    url += '&next_url=' + nextUrl;
  }
  let result = await axios.get(url);
  return result;
}

async function getRankingRelated(illustID, token, nextUrl) {
  let url = '/v1/ranking/related';
  url += '?token=' + token;
  if (illustID) {
    url += '&illust_id=' + illustID;
  }
  if (nextUrl) {
    nextUrl = nextUrl.replace(/&/g, 'magicalstring');
    url += '&next_url=' + nextUrl;
  }
  let result = await axios.get(url);
  return result;
}

async function searchRanking(token, word, nextUrl) {
  let url = '/v1/ranking/search';
  url += '?token=' + token + '&word=' + word;
  if (nextUrl) {
    nextUrl = nextUrl.replace(/&/g, 'magicalstring');
    url += '&next_url=' + nextUrl;
  }

  let result = await axios.get(url);
  return result;
}
/***** GIF APIs *****/
async function searchGif(params) {
  let searchUrl = '/v1/tenor/search';
  searchUrl += `?limit=20`;

  if (params && params.pos) {
    searchUrl += `&pos=${params.pos}`;
  }

  if (params && params.term) {
    searchUrl += `&tag=${params.term}`;
  }

  let result = await axios.get(searchUrl);

  let searchUrlWithoutPos = removeQueryStringParameter('pos', searchUrl);
  let nextUrl = `${searchUrlWithoutPos}&pos=${result.data.next}`;
  return {...result.data, nextUrl: nextUrl};
}

async function searchMoreGif(searchUrl) {
  let result = await axios.get(searchUrl);
  let searchUrlWithoutPos = removeQueryStringParameter('pos', searchUrl);
  let nextUrl = `${searchUrlWithoutPos}&pos=${result.data.next}`;
  return {...result.data, nextUrl: nextUrl};
}

async function getGifDetail(id) {
  let result = await axios.get('/v1/tenor/gif?ids=' + id);
  return result.data.results;
}


async function getAutoComplete(params) {
  let searchUrl = 'v1/tenor/autocomplete';

  if (params && params.pos) {
    searchUrl += `?pos=${params.pos}`;
  }

  if (params && params.term) {
    searchUrl += `?tag=${params.term}`;
  }

  let result = await axios.get(searchUrl);
  let responseObj = [];
  result.data.results.map((item) => {
    responseObj.push({
      value: item,
      label: item
    });
  });
  return responseObj;
}

export default {
  getImage,
  searchGif,
  getGifDetail,
  getToken,
  getRanking,
  getRankingDetail,
  getAutoComplete,
  getUserWork,
  getRankingRelated,
  searchRanking,
  searchMoreGif
};
