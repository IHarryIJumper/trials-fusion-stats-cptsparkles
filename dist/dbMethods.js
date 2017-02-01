'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DatabaseMethods = undefined;

var _season1Methods = require('./dbMethods/season1Methods.js');

var _season2Methods = require('./dbMethods/season2Methods.js');

var _mainViewsMethods = require('./dbMethods/mainViewsMethods.js');

var _season1ViewsMethods = require('./dbMethods/season1ViewsMethods.js');

var _season2ViewsMethods = require('./dbMethods/season2ViewsMethods.js');

var _donationViewsMethods = require('./dbMethods/donationViewsMethods.js');

var _contactsViewsMethods = require('./dbMethods/contactsViewsMethods.js');

var DatabaseMethods = exports.DatabaseMethods = {
	seasonOne: new _season1Methods.SeasonOneDataModel(),
	seasonTwo: new _season2Methods.SeasonTwoDataModel(),
	MainPageViews: new _mainViewsMethods.MainPageViewsModel(),
	SeasonOnePageViews: new _season1ViewsMethods.SeasonOnePageViewsModel(),
	SeasonTwoPageViews: new _season2ViewsMethods.SeasonTwoPageViewsModel(),
	DonationPageViews: new _donationViewsMethods.DonationPageViewsModel(),
	ContactsPageViews: new _contactsViewsMethods.ContactsPageViewsModels()
};