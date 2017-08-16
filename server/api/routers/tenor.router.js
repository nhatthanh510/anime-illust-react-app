


let express = require('express'),
    handler = require('../controllers/tenor.handler.js');

let router = express.Router();

module.exports = (app, root) => {
    router.route('/search').get(handler.search);
    router.route('/gif').get(handler.get);
    router.route('/autocomplete').get(handler.autocomplete);
    app.use(root, router);
};
