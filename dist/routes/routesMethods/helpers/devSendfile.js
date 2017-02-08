'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DevSendFile = function DevSendFile(res, next, compiler, filepath) {
	var filename = _path2.default.join(compiler.outputPath, filepath);
	// console.log(compiler);
	compiler.outputFileSystem.readFile(filename, function (err, result) {
		if (err) {
			return next(err);
		}
		res.set('content-type', 'text/html');
		res.send(result);
		res.end();
	});
};

exports.default = DevSendFile;