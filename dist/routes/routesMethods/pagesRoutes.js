'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PagesRoutes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dbMethods = require('../../dbMethods.js');

var _devSendfile = require('./helpers/devSendfile.js');

var _devSendfile2 = _interopRequireDefault(_devSendfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PagesRoutes = exports.PagesRoutes = function () {
	function PagesRoutes() {
		_classCallCheck(this, PagesRoutes);
	}

	_createClass(PagesRoutes, null, [{
		key: 'mainPage',
		value: function mainPage(req, res, app, next, compiler) {
			console.logWithTime('GET /');

			// app.use(express.static(__dirname + '/../../../dist'));
			// app.use(express.static(__dirname + '/../../../public'));
			// res.sendFile('main.html', { root: __dirname + '/../../../client/view/'});

			if (process.env.NODE_ENV !== 'production') {
				(0, _devSendfile2.default)(res, next, compiler, 'view/main.html');
			} else {
				_dbMethods.DatabaseMethods.MainPageViews.setView();
				app.use(_express2.default.static(__dirname + '/../../../public'));
				res.sendFile('main.html', {
					root: __dirname + '/../../../public/view'
				});
			}
		}
	}, {
		key: 'season1Page',
		value: function season1Page(req, res, app, next, compiler) {
			console.logWithTime('GET /season1');

			if (process.env.NODE_ENV !== 'production') {
				(0, _devSendfile2.default)(res, next, compiler, 'view/season1.html');
			} else {
				_dbMethods.DatabaseMethods.SeasonOnePageViews.setView();
				app.use(_express2.default.static(__dirname + '/../../../public'));
				res.sendFile('season1.html', {
					root: __dirname + '/../../../public/view'
				});
			}
		}
	}, {
		key: 'season2Page',
		value: function season2Page(req, res, app, next, compiler) {
			console.logWithTime('GET /season2');

			if (process.env.NODE_ENV !== 'production') {
				(0, _devSendfile2.default)(res, next, compiler, 'view/season2.html');
			} else {
				_dbMethods.DatabaseMethods.SeasonTwoPageViews.setView();
				app.use(_express2.default.static(__dirname + '/../../../public'));
				res.sendFile('season2.html', {
					root: __dirname + '/../../../public/view'
				});
			}
		}
	}, {
		key: 'donationPage',
		value: function donationPage(req, res, app, next, compiler) {
			console.logWithTime('GET /donationPage');

			if (process.env.NODE_ENV !== 'production') {
				(0, _devSendfile2.default)(res, next, compiler, 'view/donate.html');
			} else {
				_dbMethods.DatabaseMethods.DonationPageViews.setView();
				app.use(_express2.default.static(__dirname + '/../../../public'));
				res.sendFile('donate.html', {
					root: __dirname + '/../../../public/view'
				});
			}
		}
	}, {
		key: 'contactsPage',
		value: function contactsPage(req, res, app, next, compiler) {
			console.logWithTime('GET /contactsPage');

			if (process.env.NODE_ENV !== 'production') {
				(0, _devSendfile2.default)(res, next, compiler, 'view/contacts.html');
			} else {
				_dbMethods.DatabaseMethods.ContactsPageViews.setView();
				app.use(_express2.default.static(__dirname + '/../../../public'));
				res.sendFile('contacts.html', {
					root: __dirname + '/../../../public/view'
				});
			}
		}
	}]);

	return PagesRoutes;
}();