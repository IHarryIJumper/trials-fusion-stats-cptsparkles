import {
	SettingsApiMethods
} from '../applicationMethods/helpers/collectionHelpers.js';

export const AuthorizationMiddleware = {
	checkSession: (req, res, next) => {
		// console.log(req.method);
		// console.log(req.session);
		if ((req.session.authorized === true) && (req.session.username !== undefined)) {
			// console.logWithTime(req.session.username + ' LOGGED IN')
			next();
		} else {
			let data = req.body;
			// console.log(data);
			// console.log(req);
			if ((data.application !== undefined) && (data.instance !== undefined)) {
				let appVerified = false
				switch (data.application) {
					case 'slideshow':
						appVerified = SettingsApiMethods.verifySlideshowInstance(data.instance)
						break;
					case 'testSlider':
						appVerified = SettingsApiMethods.verifyTextSliderInstance(data.instance)
						break;
					case 'welcomeBar':
						appVerified = SettingsApiMethods.verifyWelcomeBarInstance(data.instance)
						break;
					case 'sideMenu':
						appVerified = SettingsApiMethods.verifySideMenuInstance(data.instance)
						break;
				}

				if (appVerified) {
					console.logWithTime(data.application + ' APPLICATION AUTHORIZED')
					next();
				} else {
					console.logWithTime('APPLICATION AUTHORIZATION FAILED:')
					console.log(data);
					res.status(500).end('Application authorization failed');
				}
			} else {
				if (req.method === 'GET') { // Commented for debug
					const urlReferer = AuthorizationMiddleware.getLocation(req.headers.referer);
					if ((req.originalUrl !== '/login') && (urlReferer.pathname !== 'login')) {
						res.writeHead(303, {
							'Location': '/login'
						});
						res.end('Not authorized');
					} else {
						next();
					}
				} else {
					if (req.originalUrl !== '/login') {
						console.logWithTime('POST AUTHORIZATION FAILED')
						res.status(500).end('Authorization failed');
					} else {
						next();
					}
				}

				// next();
			}
		}

		// console.log('Request Type:', req.method);
		// next();
	},
	getLocation: (href) => {
		if (href !== undefined && href !== 'undefined') {
			const urlParts = href.split('/');

			// console.log(urlParts);
			const url = {
				hostname: urlParts[0] + '//' + urlParts[2],
				pathname: urlParts[3]
			};
			// console.log(url);
			return url;
		} else {
			return {
				hostname: null,
				pathname: null
			}
		};
	},
	loginPage: (req, res, next) => {
		if ((req.session.authorized === true) && (req.session.username !== undefined)) {
			res.writeHead(303, {
				'Location': '/'
			});
			res.end();
		} else {
			next();
		}
	}
};