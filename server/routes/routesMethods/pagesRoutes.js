
import express from 'express';
import path from 'path';

export class PagesRoutes {
	static mainPage(req, res, app) {
		console.logWithTime('GET /');
		
        app.use(express.static(__dirname + '/../../../dist'));
        app.use(express.static(__dirname + '/../../../public'));
		res.sendFile('main.html', { root: __dirname + '/../../../client/view/'});
	}

	static season1Page(req, res, app) {
		console.logWithTime('GET /season1');

        app.use(express.static(__dirname + '/../../../dist'));
        app.use(express.static(__dirname + '/../../../public'));
		res.sendFile('season1.html', { root: __dirname + '/../../../client/view/'});
	}

	static season2Page(req, res, app) {
		console.logWithTime('GET /season2');

        app.use(express.static(__dirname + '/../../../dist'));
        app.use(express.static(__dirname + '/../../../public'));
		res.sendFile('season2.html', { root: __dirname + '/../../../client/view/'});
	}
}