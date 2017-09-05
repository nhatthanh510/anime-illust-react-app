let express = require('express'),
    handler = require('../controllers/ranking.handler.js');

let router = express.Router();

module.exports = (app, root) => {
    router.route('/token').get(handler.getToken);
    router.route('/list').get(handler.list);
    router.route('/detail').get(handler.get);
    router.route('/search').get(handler.search);
    router.route('/related').get(handler.related);
    router.route('/userwork').get(handler.user_work);
    app.use(root, router);
};