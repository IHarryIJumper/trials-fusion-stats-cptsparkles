import {
	SeasonOneDataModel
} from './dbMethods/season1Methods.js';

import {
	SeasonTwoDataModel
} from './dbMethods/season2Methods.js';



import {
	MainPageViewsModel
} from './dbMethods/mainViewsMethods.js';

import {
	SeasonOnePageViewsModel
} from './dbMethods/season1ViewsMethods.js';

import {
	SeasonTwoPageViewsModel
} from './dbMethods/season2ViewsMethods.js';

import {
	DonationPageViewsModel
} from './dbMethods/donationViewsMethods.js';

import {
	ContactsPageViewsModels
} from './dbMethods/contactsViewsMethods.js';



export const DatabaseMethods = {
	seasonOne: new SeasonOneDataModel(),
	seasonTwo: new SeasonTwoDataModel(),
	MainPageViews: new MainPageViewsModel(),
	SeasonOnePageViews: new SeasonOnePageViewsModel(),
	SeasonTwoPageViews: new SeasonTwoPageViewsModel(),
	DonationPageViews: new DonationPageViewsModel(),
	ContactsPageViews: new ContactsPageViewsModels()
};