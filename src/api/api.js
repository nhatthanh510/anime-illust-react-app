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

async function searchGif(params) {
  let searchUrl = '/v1/tenor/search';
  if (params && params.pos) {
    searchUrl += `?pos=${params.pos}`;
  }

  if (params && params.term) {
    searchUrl += `?tag=${params.term}`;
  }

  let result = await axios.get(searchUrl);
  return result.data;
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
  result.data.results.map( (item) => {
    responseObj.push({
      value : item,
      label : item
    }) ;
  } );
  return responseObj;
}

export default {
  getImage,
  searchGif,
  getGifDetail,
  getAutoComplete
};
