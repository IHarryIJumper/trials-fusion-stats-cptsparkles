import express from 'express';
import path from 'path';

import {
	DatabaseMethods
} from '../../dbMethods.js';

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
			DatabaseMethods.MainPageViews.setView();
			app.use(express.static(__dirname + '/../../../public'));
			res.sendFile('main.html', {
				root: __dirname + '/../../../public/view'
			});
		}

	}

	static season1Page(req, res, app, next, compiler) {
		console.logWithTime('GET /season1');

		if (process.env.NODE_ENV !== 'production') {
			DevSendFile(res, next, compiler, 'view/season1.html');
		} else {
			DatabaseMethods.SeasonOnePageViews.setView();
			app.use(express.static(__dirname + '/../../../public'));
			res.sendFile('season1.html', {
				root: __dirname + '/../../../public/view'
			});
		}
	}

	static season2Page(req, res, app, next, compiler) {
		console.logWithTime('GET /season2');

		if (process.env.NODE_ENV !== 'production') {
			DevSendFile(res, next, compiler, 'view/season2.html');
		} else {
			DatabaseMethods.SeasonTwoPageViews.setView();
			app.use(express.static(__dirname + '/../../../public'));
			res.sendFile('season2.html', {
				root: __dirname + '/../../../public/view'
			});
		}
	}

	static donationPage(req, res, app, next, compiler) {
		console.logWithTime('GET /donationPage');


		if (process.env.NODE_ENV !== 'production') {
			DevSendFile(res, next, compiler, 'view/donate.html');
		} else {
			DatabaseMethods.DonationPageViews.setView();
			app.use(express.static(__dirname + '/../../../public'));
			res.sendFile('donate.html', {
				root: __dirname + '/../../../public/view'
			});
		}
	}

	static contactsPage(req, res, app, next, compiler) {
		console.logWithTime('GET /contactsPage');


		if (process.env.NODE_ENV !== 'production') {
			DevSendFile(res, next, compiler, 'view/contacts.html');
		} else {
			DatabaseMethods.ContactsPageViews.setView();
			app.use(express.static(__dirname + '/../../../public'));
			res.sendFile('contacts.html', {
				root: __dirname + '/../../../public/view'
			});
		}
	}
}