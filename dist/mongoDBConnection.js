'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _databasesApi = require('./databases-API/databases-api.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debugMode = void 0,
    db_url = void 0;

console.logWithTime('Node Environment: ' + process.env.NODE_ENV);

switch (process.env.NODE_ENV) {
	case 'production':
		debugMode = false;
		break;
	case 'development':
		debugMode = true;
		// debugMode = false;
		break;
	default:
		debugMode = true;
}

console.logWithTime('Mongo debug mode: ' + debugMode);

if (debugMode) {
	db_url = _databasesApi.databaseURL.debug;
} else {
	db_url = _databasesApi.databaseURL.production;
}

_mongoose2.default.connect(db_url);

_mongoose2.default.connection.on('error', console.error.bind(console, 'connection error:'));
_mongoose2.default.connection.on('connected', function () {
	console.logWithTime('Mongoose default connection open to ' + db_url);
});

console.logWithTime('Mongoose connect');