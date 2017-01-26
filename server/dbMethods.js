import {
	SeasonOneDataModel
} from './dbMethods/season1Methods.js';

import {
	SeasonTwoDataModel
} from './dbMethods/season2Methods.js';



export const DatabaseMethods = {
	seasonOne: new SeasonOneDataModel(),
	seasonTwo: new SeasonTwoDataModel()
};