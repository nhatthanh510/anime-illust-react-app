/**
 * Created by admin on 7/11/2017.
 */
/* eslint no-console: 0 */
require('babel-register');
require('../global');

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const fs = require('fs');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.dev');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(require('morgan')('short'));
  app.use("/libs", express.static(path.join(__dirname, '../src/libs')));
  app.use("/images", express.static(path.join(__dirname, '../src/images')));
  app.use("/scripts", express.static(path.join(__dirname, '../src/scripts')));
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000
  }));
  app.get("/", function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../src/index.ejs')));
    res.end();
  });
  app.get("/hello", function(req, res) {
    res.send('Hello');
  });

  fs.readdirSync(__routers).forEach(function (route) {
      let root = '/v1/' + route.split('.')[0];
      require(__routers + route)(app, root);
      console.log('%s OK', root);
  });

} else {
  app.use(express.static(__dirname));
  app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.ejs'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
