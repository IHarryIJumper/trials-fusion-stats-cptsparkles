/*import Promise from 'promise';
import express from 'express';
import path from 'path';*/

import {
	DashboardMethods
} from '../../dashboardMethods.js';


export class SlideshowRoutesMethodsClass {

	/*PROD*/

	static setEvents(req, res, app) {
		console.logWithTime('Impressive Slideshow /setEvents');

		DashboardMethods.Slideshow.prod.setEvents().then((response) => {
			console.logWithTime(response);
			res.send(response);
		});

	}

	static getEventsData(req, res, app) {
		console.logWithTime('Impressive Slideshow /getEventsData');

		DashboardMethods.Slideshow.prod.getEventsData().then((response) => {
			console.logWithTime(JSON.stringify(response));
			response.time = new Date().getTime();
			res.send(response);
		});

	}

	static getEventData(req, res, app) {
		console.logWithTime('Impressive Slideshow /getEventData');

		DashboardMethods.Slideshow.prod.getEventData().then((response) => {
			console.logWithTime(JSON.stringify(response));
			response.time = new Date().getTime();
			res.send(response);
		});

	}

	/*TEST*/

	static setTestEvents(req, res, app) {
		console.logWithTime('Impressive Slideshow /setTestEvents');

		let data = req.body

		DashboardMethods.Slideshow.test.setEvents(data).then((response) => {
			console.logWithTime(JSON.stringify(response));
			res.send(response);
		});

	}

	static getTestEventsData(req, res, app) {
		console.logWithTime('Impressive Slideshow /getTestEventsData');

		let data = req.body;

		// console.log(data);
		DashboardMethods.Slideshow.test.getEventsData(data).then((response) => {
			// console.logWithTime('JSON.stringify(response)');
			console.logWithTime(JSON.stringify(response));
			// response.time = new Date().getTime();
			res.send(response);
		});

	}

	static getTestEventData(req, res, app) {
		console.logWithTime('Impressive Slideshow /getTestEventData');

		let data = req.body;

		console.log(data);
		DashboardMethods.Slideshow.test.getEventData(data).then((response) => {
			console.logWithTime(JSON.stringify(response));
			// response.time = new Date().getTime();
			res.send(response);
		});

	}

}