let http = require('http');
const TENOR_LIMIT = 25;
const DEFAULT_QUERY = 'anime';
const API_KEY = 'LIVDSRZULELA';
const HOST_NAME = 'api.tenor.com';
const DEFAULT_AUTOCOMPLETE_KEYWORD = '';

module.exports = {
    search: (req, res) => {
      console.log(req.query.tag);
        let query = req.query.tag,
        pos = req.query.pos;

        let path = '/v1/search?tag=' + (query ? encodeURIComponent(query) : DEFAULT_QUERY) + '&key=' + API_KEY + '&limit=' + TENOR_LIMIT + '&safesearch=strict';
        if (pos) {
            path += '&pos=' + pos;
        }

        http.get({
            hostname: HOST_NAME,
            path: path,
            agent: false
            }, (response) => {
                let body = '';
                response.on('data', function(d) {
                    body += d;
                });
                response.on('end', function() {
                    res.json(JSON.parse(body));
                });
            }
        );
    },
    get: (req, res) => {
        let ids = req.query.ids;

        let path = '/v1/gifs?key=' + API_KEY + '&ids=' + ids;

        http.get({
            hostname: HOST_NAME,
            path: path,
            agent: false
            }, (response) => {
                let body = '';
                response.on('data', function(d) {
                    body += d;
                });
                response.on('end', function() {
                    res.json(JSON.parse(body));
                });
            }
        );
    },

    autocomplete: (req, res) => {
      let query = req.query.tag,
        pos = req.query.pos;

      let path = '/v1/autocomplete?tag=' + (query ? encodeURIComponent(query) : DEFAULT_AUTOCOMPLETE_KEYWORD) + '&key=' + API_KEY + '&limit=' + TENOR_LIMIT + '&safesearch=strict';
      if (pos) {
        path += '&pos=' + pos;
      }

      http.get({
          hostname: HOST_NAME,
          path: path,
          agent: false
        }, (response) => {
          let body = '';
          response.on('data', function(d) {
            body += d;
          });
          response.on('end', function() {
            res.json(JSON.parse(body));
          });
        }
      );
    }
};
