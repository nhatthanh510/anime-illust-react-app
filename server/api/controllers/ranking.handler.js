let REQ = require('request');

const API_HOST_NAME = 'https://app-api.pixiv.net';
const OAUTH_HOST_NAME = 'https://oauth.secure.pixiv.net/auth/token';
const RANKING_FILTER = true;
const SEARCH_FILTER = true;
const RELATED_FILTER = true;
const USER_WORK_FILTER = true;
const PIXIV_HEADERS = {
    'App-OS': 'ios',
    'App-OS-Version': '9.3.3',
    'App-Version': '6.0.9',
    'User-Agent': 'PixivIOSApp/6.0.9 (iOS 9.3.3; iPhone8,1)',
    'Referer': 'https://app-api.pixiv.net/'
};
const PIXIV_DUMMY_USERNAME = [
    'ann740836@gmail.com',
    'alizabethta@gmail.com',
    'vanvonguyen@yahoo.com',
    'trumbede@yahoo.com',
    'hinhchimomohinhchimo@yahoo.com',
    'damudumamay@yahoo.com',
    'trangnhinhitrang@yahoo.com',
    'vovonha@hotmail.com',
    'nhucangcot@hotmail.com',
    'fullstackornostack@outlook.com.vn'
];
const DEFAULT_SEARCH_TARGET = 'partial_match_for_tags'; //exact_match_for_tags, partial_match_for_tags, title_and_caption
const DEFAULT_SORT = 'date_desc'; //date_asc, date_desc

module.exports = {
    list: (req, res) => {
        let params = req.query;
        if (!params.token || (!params.next_url && !params.mode)) {
            res.json({
                message: 'error',
                description: 'Missing parameter'
            });

            return false;
        }

        let path = API_HOST_NAME + '/v1/illust/ranking';

        if (params.next_url) {
            path = params.next_url.replace(/magicalstring/g, '&');
        } else {
            path += '?mode=' + params.mode;
            if (params.date) {
                path += '&date=' + params.date;
            }

            if (RANKING_FILTER) {
                path += '&filter=for_android';
            }
        }

        let cloneHeader = Object.assign({}, PIXIV_HEADERS);
        cloneHeader['Authorization'] = 'Bearer ' + params.token;

        let options = {
            url: path,
            headers: cloneHeader
        };

        REQ.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let jsonObj = JSON.parse(body);
                res.json(jsonObj);
            } else if (error) {
                res.json({
                    message: 'error',
                    description: error
                });
            }
        });
    },
    get: (req, res) => {
        let params = req.query;
        if (!params.token || !params.id) {
            res.json({
                message: 'error',
                description: 'Missing parameter'
            });

            return false;
        }
        let path = API_HOST_NAME + '/v1/illust/detail';
        path += '?illust_id=' + params.id;

        let cloneHeader = Object.assign({}, PIXIV_HEADERS);
        cloneHeader['Authorization'] = 'Bearer ' + params.token;

        let options = {
            url: path,
            headers: cloneHeader
        };

        REQ.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            } else if (error) {
                res.json({
                    message: 'error',
                    description: error.message
                });
            } else {
                res.json({
                    message: 'error',
                    description: 'deo biet'
                });
            }
        });
    },
    getToken: (req, res) => {
        let randomUsername = PIXIV_DUMMY_USERNAME[Math.floor(Math.random() * PIXIV_DUMMY_USERNAME.length)];
        let options = {
            url: OAUTH_HOST_NAME,
            headers: PIXIV_HEADERS,
            form: {
                'username': randomUsername,
                'password': 'Admin@123!@#',
                'client_id': 'bYGKuGVw91e0NMfPGp44euvGt59s',
                'client_secret': 'HP3RmkgAmEGro0gn1x9ioawQE8WMfvLXDz3ZqxpK',
                'get_secure_url': '1',
                'grant_type': 'password'
            }
        };

        REQ.post(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            }
        });
    },
    //
    search: (req, res) => {
        let params = req.query;
        if (!params.token || (!params.word && !params.next_url)) {
            res.json({
                message: 'error',
                description: 'Missing parameter'
            });

            return false;
        }

        let path = API_HOST_NAME + '/v1/search/illust';

        if (params.next_url) {
            path = params.next_url.replace(/magicalstring/g, '&');
        } else {
            path += '?word=' + params.word;
            path += '&search_target=' + (params.search_target ? params.search_target : DEFAULT_SEARCH_TARGET);
            path += '&sort=' + (params.sort ? params.sort : DEFAULT_SORT);

            if (params.duration) {
                path += '&duration=' + params.duration;
            }

            if (SEARCH_FILTER) {
                path += '&filter=for_android';
            }
        }

        let cloneHeader = Object.assign({}, PIXIV_HEADERS);
        cloneHeader['Authorization'] = 'Bearer ' + params.token;

        let options = {
            url: path,
            headers: cloneHeader
        };

        REQ.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            } else {
                res.json({
                    message: 'error',
                    description: error.message
                });
            }
        });
    },
    related: (req, res) => {
        let params = req.query;
        if (!params.token || (!params.illust_id && !params.next_url)) {
            res.json({
                message: 'error',
                description: 'Missing parameter'
            });

            return false;
        }

        let path = API_HOST_NAME + '/v2/illust/related';

        if (params.next_url) {
            path = params.next_url.replace(/magicalstring/g, '&');
        } else {
            path += '?illust_id=' + params.illust_id;

            if (RELATED_FILTER) {
                path += '&filter=for_android';
            }
        }

        let cloneHeader = Object.assign({}, PIXIV_HEADERS);
        cloneHeader['Authorization'] = 'Bearer ' + params.token;

        let options = {
            url: path,
            headers: cloneHeader
        };

        REQ.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            } else {
                if (error) {
                    res.json({
                        message: 'error',
                        description: error.message
                    });
                } else {
                    res.json({
                        message: 'error',
                        description: 'error'
                    });
                }

            }
        });
    },
    //type (manga, illust)
    user_work: (req, res) => {
        let params = req.query;
        if (!params.token || ((!params.type || !params.user_id) && !params.next_url)) {
            res.json({
                message: 'error',
                description: 'Missing parameter'
            });

            return false;
        }

        let path = API_HOST_NAME + '/v1/user/illusts';

        if (params.next_url) {
            path = params.next_url.replace(/magicalstring/g, '&');
        } else {
            path += '?type=' + params.type;
            path += '&user_id=' + params.user_id;

            if (USER_WORK_FILTER) {
                path += '&filter=for_android';
            }
        }

        let cloneHeader = Object.assign({}, PIXIV_HEADERS);
        cloneHeader['Authorization'] = 'Bearer ' + params.token;

        let options = {
            url: path,
            headers: cloneHeader
        };

        REQ.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            } else {
                res.json({
                    message: 'error',
                    description: error
                });
            }
        });
    },
    user_detail: (req, res) => {
        let params = req.query;
        if (!params.token || !params.user_id) {
            res.json({
                message: 'error',
                description: 'Missing parameter'
            });

            return false;
        }

        let path = API_HOST_NAME + '/v1/user/detail';

        path += '?user_id=' + params.user_id;

        let cloneHeader = Object.assign({}, PIXIV_HEADERS);
        cloneHeader['Authorization'] = 'Bearer ' + params.token;

        let options = {
            url: path,
            headers: cloneHeader
        };

        REQ.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            } else {
                res.json({
                    message: 'error',
                    description: error
                });
            }
        });
    }
};