import path from 'path';

const DevSendFile = (res, next, compiler, filepath) => {
	const filename = path.join(compiler.outputPath, filepath);
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

export default DevSendFile;