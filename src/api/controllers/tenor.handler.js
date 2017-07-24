let http = require('http');
const TENOR_LIMIT = 50;
const DEFAULT_QUERY = 'anime';
const API_KEY = 'LIVDSRZULELA';

module.exports = {
    search: (req, res, next) => {
        let query = req.query.tag,
            pos = req.query.pos;

        let path = '/v1/search?tag=' + (query ? encodeURIComponent(query) : DEFAULT_QUERY) + '&key=' + API_KEY + '&limit=' + TENOR_LIMIT + '&safesearch=strict';
        if (pos) {
            path += '&pos=' + pos;
        }

        http.get({
            hostname: 'api.tenor.com',
            path: path,
            agent: false
        }, (response) => {
            let body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                res.json(JSON.parse(body));
            });
        }
        );
    },
    get: (req, res, next) => {
        let ids = req.query.ids;

        let path = '/v1/gifs?key=' + API_KEY + '&ids=' + ids;

        http.get({
            hostname: 'api.tenor.com',
            path: path,
            agent: false
        }, (response) => {
            let body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                res.json(body);
            });
        }
        );
    }
} 