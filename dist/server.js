"use strict";

require('./helpers/consoleLogHelper.js');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes/routes.js');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoDBConnection = require('./mongoDBConnection.js');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var webpackCompiler = void 0;

if (process.env.NODE_ENV !== 'production') {
	var webpack = require('webpack');
	var config = require('../webpack.config');
	var compiler = webpack(config);

	app.use(require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath
	}));

	app.use(require('webpack-hot-middleware')(compiler));

	webpackCompiler = compiler;
}

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
	extended: true
}));

if (process.env.NODE_ENV !== 'production') {
	(0, _routes.routes)(app, webpackCompiler);
} else {
	(0, _routes.routes)(app);
}

app.listen(process.env.PORT || 7777);

console.logWithTime('Listening on http://localhost:' + (process.env.PORT || 7777));