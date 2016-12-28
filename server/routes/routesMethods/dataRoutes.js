import {
	DatabaseMethods
} from '../../dbMethods.js';


export class DataRoutes {

	static getSeason1Data(req, res, app) {
		console.logWithTime('getSeason1Data');

		DatabaseMethods.seasonOne.getData().then((response) => {
			console.logWithTime(JSON.stringify(response));
			setTimeout(() => {
				res.send(response);
			}, 2000);
		});

	}

	static getSeason2Data(req, res, app) {
		console.logWithTime('getSeason2Data');

		DashboardMethods.Slideshow.prod.getEventsData().then((response) => {
			console.logWithTime(JSON.stringify(response));
			res.send(response);
		});

	}

}