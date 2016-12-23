import mongoose from 'mongoose';
import {
	databaseURL
} from './databases-API/databases-api.js';

let debugMode,
	db_url;

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
	db_url = databaseURL.debug;
} else {
	db_url = databaseURL.production;
}

mongoose.connect(db_url);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('connected', function () {
	console.logWithTime('Mongoose default connection open to ' + db_url);
});

console.logWithTime('Mongoose connect');