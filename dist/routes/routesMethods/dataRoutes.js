'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DataRoutes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbMethods = require('../../dbMethods.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataRoutes = exports.DataRoutes = function () {
	function DataRoutes() {
		_classCallCheck(this, DataRoutes);
	}

	_createClass(DataRoutes, null, [{
		key: 'getSeason1Data',
		value: function getSeason1Data(req, res, app) {
			console.logWithTime('getSeason1Data');

			_dbMethods.DatabaseMethods.seasonOne.getData().then(function (response) {
				// console.logWithTime(JSON.stringify(response));
				setTimeout(function () {
					res.send(response);
				}, 500);
			});
		}
	}, {
		key: 'getSeason2Data',
		value: function getSeason2Data(req, res, app) {
			console.logWithTime('getSeason2Data');

			_dbMethods.DatabaseMethods.seasonTwo.getData().then(function (response) {
				// console.logWithTime(JSON.stringify(response));
				res.send(response);
			});
		}
	}]);

	return DataRoutes;
}();