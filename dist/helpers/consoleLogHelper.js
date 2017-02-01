"use strict";

console.logWithTime = function (text) {
	var currentdate = new Date();
	var datetime = '[' + currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + ']';

	console.log(datetime + ' ' + text);
};

console.errorWithTime = function (text) {
	var currentdate = new Date();
	var datetime = '[' + currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + ']';

	console.error(datetime + ' ' + text);
};