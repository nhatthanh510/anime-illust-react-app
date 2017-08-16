let express = require('express'),
    handler = require('../controllers/ranking.handler.js');

let router = express.Router();

module.exports = (app, root) => {
    router.route('/token').get(handler.getToken);
    router.route('/list').get(handler.list);
    router.route('/detail').get(handler.get);
    router.route('/search').get(handler.search);
    app.use(root, router);
};