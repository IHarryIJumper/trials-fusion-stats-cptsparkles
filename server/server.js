"use strict";

import './helpers/consoleLogHelper.js'

import express from 'express';
import {
	routes
} from './routes/routes.js';
import bodyParser from 'body-parser';

import {
	mongoDBConnection
} from './mongoDBConnection.js'
import mongoose from 'mongoose';

const app = express();

let webpackCompiler;

if (process.env.NODE_ENV !== 'production') {
	const webpack = require('webpack');
	const config = require('../webpack.config');
	const compiler = webpack(config);

	app.use(require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath
	}));

	app.use(require('webpack-hot-middleware')(compiler));

	webpackCompiler = compiler;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

if (process.env.NODE_ENV !== 'production') {
	routes(app, webpackCompiler);
} else {
	routes(app);
}

app.listen(process.env.PORT || 7777);

console.logWithTime(`Listening on http://localhost:${process.env.PORT || 7777}`);