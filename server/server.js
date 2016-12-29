"use strict";

import './helpers/consoleLogHelper.js'

import express from 'express';
import { routes } from './routes/routes.js';
import bodyParser from 'body-parser';

import {
	mongoDBConnection
} from './mongoDBConnection.js'
import mongoose from 'mongoose';

const app = express();


if(process.env.NODE_ENV !== 'production'){
    const webpack = require('webpack');
    const config =  require('../webpack.config');
    const compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}

/**
 * Create the express app
 */

/*app.use((req, res, next) => {
	console.logWithTime(req.method);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');

	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

routes(app);

app.listen(process.env.PORT || 7777);

console.logWithTime(`Listening on http://localhost:${process.env.PORT || 7777}`);