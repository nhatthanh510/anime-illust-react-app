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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(data);
    }, 3000);
  });
}

function searchGif() {
  let promiseObj = axios.get('/v1/tenor/search');
  return promiseObj.then(function (res) {
    return res.data.results;
  });
}

export default {
  getImage,
  searchGif
};
