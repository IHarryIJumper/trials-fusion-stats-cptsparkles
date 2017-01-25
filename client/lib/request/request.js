// import qs from 'querystring';

export const get = (url, successFunction, errorFunction) => {
	const http = new XMLHttpRequest();

	let paramsStringify = '';
	/*if (params !== undefined) {
		paramsStringify = '?' + $.params(params);
	} */

	http.open("GET", url + paramsStringify, true);
	http.onreadystatechange = function () {
		if (http.readyState === 4) {

			if (http.status === 200) {
				if (successFunction != undefined) {
					successFunction(http.responseText);
				}
			} else {
				if (errorFunction != undefined) {
					errorFunction(http.responseText);
				}
			}
		}
	}
	http.send(null);
}

export const post = (url, data, successFunction, errorFunction) => {

	const http = new XMLHttpRequest();

	http.open("POST", url, true);

	http.setRequestHeader("Content-type", "application/json;charset=UTF-8");

	http.onreadystatechange = function () {
		if (http.readyState === 4) {

			if (http.status === 200) {
				if (successFunction != undefined) {
					successFunction(http.responseText);
				}
			} else {
				if (errorFunction != undefined) {
					errorFunction(http.responseText);
				}
			}
		}
	}


	http.send(JSON.stringify(data));
}