import {
	SlideshowDashboardSchemaMethods
} from './applicationMethods/slideshowDashboardCallMethods.js';

import {
	SlideshowTestDashboardSchemaMethods
} from './applicationMethods/slideshowTestDashboardCallMethods.js';


export const DashboardMethods = {
	Slideshow: {
		prod: new SlideshowDashboardSchemaMethods(),
		test: new SlideshowTestDashboardSchemaMethods()
	}
};