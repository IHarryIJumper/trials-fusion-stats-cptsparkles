console.logWithTime = (text) => {
	const currentdate = new Date();
	const datetime = '[' + currentdate.getDate() + "/" +
		(currentdate.getMonth() + 1) + "/" +
		currentdate.getFullYear() + " @ " +
		currentdate.getHours() + ":" +
		currentdate.getMinutes() + ":" +
		currentdate.getSeconds() + ']';

		console.log(datetime + ' ' + text)
};

console.errorWithTime = (text) => {
	const currentdate = new Date();
	const datetime = '[' + currentdate.getDate() + "/" +
		(currentdate.getMonth() + 1) + "/" +
		currentdate.getFullYear() + " @ " +
		currentdate.getHours() + ":" +
		currentdate.getMinutes() + ":" +
		currentdate.getSeconds() + ']';

		console.error(datetime + ' ' + text)
};