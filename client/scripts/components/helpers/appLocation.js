export const AppLocation = {
	getCurrentLocation: () => {
		return window.location.protocol + "//" + window.location.host + "/";
	},

	goToPage: (page) => {
		window.location = AppLocation.getCurrentLocation() + page;
	},

	getRequestUrl: (page) => {
		return AppLocation.getCurrentLocation() + page;
	}
};