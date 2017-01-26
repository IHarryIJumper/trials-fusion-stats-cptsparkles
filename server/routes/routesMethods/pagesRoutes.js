import express from 'express';
import path from 'path';

import DevSendFile from './helpers/devSendfile.js';

export class PagesRoutes {
	static mainPage(req, res, app, next, compiler) {
		console.logWithTime('GET /');

		// app.use(express.static(__dirname + '/../../../dist'));
		// app.use(express.static(__dirname + '/../../../public'));
		// res.sendFile('main.html', { root: __dirname + '/../../../client/view/'});


		if (process.env.NODE_ENV !== 'production') {
			DevSendFile(res, next, compiler, 'view/main.html');
		} else {
			app.use(express.static(__dirname + '/../../../dist'));
			res.sendFile('main.html', {
				root: __dirname + '/../../../dist/view/'
			});
		}

	}

	static season1Page(req, res, app, next, compiler) {
		console.logWithTime('GET /season1');

		if (process.env.NODE_ENV !== 'production') {
			DevSendFile(res, next, compiler, 'view/season1.html');
		} else {
			app.use(express.static(__dirname + '/../../../dist'));
			// app.use(express.static(__dirname + '/../../../public'));
			res.sendFile('season1.html', {
				root: __dirname + '/../../../client/view/'
			});
		}
	}

	static season2Page(req, res, app, next, compiler) {
		console.logWithTime('GET /season2');

		if (process.env.NODE_ENV !== 'production') {
			DevSendFile(res, next, compiler, 'view/season2.html');
		} else {
			app.use(express.static(__dirname + '/../../../dist'));
			// app.use(express.static(__dirname + '/../../../public'));
			res.sendFile('season2.html', {
				root: __dirname + '/../../../client/view/'
			});
		}
	}

	static donationPage(req, res, app, next, compiler) {
		console.logWithTime('GET /donationPage');


		if (process.env.NODE_ENV !== 'production') {
			DevSendFile(res, next, compiler, 'view/donate.html');
		} else {

			app.use(express.static(__dirname + '/../../../dist'));
			// app.use(express.static(__dirname + '/../../../public'));
			res.sendFile('donate.html', {
				root: __dirname + '/../../../client/view/'
			});
		}
	}

	static contactsPage(req, res, app, next, compiler) {
		console.logWithTime('GET /contactsPage');


		if (process.env.NODE_ENV !== 'production') {
			DevSendFile(res, next, compiler, 'view/contacts.html');
		} else {
			app.use(express.static(__dirname + '/../../../dist'));
			// app.use(express.static(__dirname + '/../../../public'));
			res.sendFile('contacts.html', {
				root: __dirname + '/../../../client/view/'
			});
		}
	}
}