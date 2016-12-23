import Promise from 'promise';
import mongoose from 'mongoose';

import _ from 'underscore';

import {
    SettingsApiMethods
} from './helpers/collectionHelpers.js';

import {
    IntervalParserMethods
} from './helpers/intervalParser.js';

import {
    DataParserMethods
} from './helpers/dataParserHelper.js';

import {
    SlideshowTestElementsSchemaMethods
} from './helpers/slideshowTestElementsMethods.js';

import {
    CollectionMethodsHelpers
} from './helpers/collectionMethodsHelpers.js';

let SlideshowTestDashboardSchema = mongoose.Schema({
    _id: String,
    instanceId: String,
    compId: String,
    events: Object
}, {
    collection: 'slideshowTestDashboard'
});

SlideshowTestDashboardSchema.methods.setEvents = function (data) {
    console.logWithTime('SlideshowTestDashboardSchema setTestEvents');

    if (!CollectionMethodsHelpers.checkDataStructure(data, 'setData')) {
        const _error = {
            code: 455,
            message: 'Bad set data'
        };
        return new Promise.all([_error])
    } else {
        let saveEventsPromises = [],
            instanceId = SettingsApiMethods.getDecodedInstanceJSON(data.instance).instanceId,
            // instanceId = data.instance,
            compId = data.compId;

        _.each(data.events, (eventsElement, eventsElementIndex) => {

            switch (parseInt(eventsElement.eventId)) {
                case 0:
                    saveEventsPromises.push(CollectionMethodsHelpers.saveDataFunction(this.model('slideshowTestDashboard'), instanceId, compId, eventsElement.eventId, eventsElement.data));
                    break;
                case 1:
                    saveEventsPromises.push(CollectionMethodsHelpers.saveElementsFunction(this.model('slideshowTestDashboard'), instanceId, compId, eventsElement.eventId, eventsElement.elements));
                    break;
                case 2:
                    saveEventsPromises.push(CollectionMethodsHelpers.saveElementsFunction(this.model('slideshowTestDashboard'), instanceId, compId, eventsElement.eventId, eventsElement.elements));
                    break;
                case 3:
                    saveEventsPromises.push(CollectionMethodsHelpers.saveElementsFunction(this.model('slideshowTestDashboard'), instanceId, compId, eventsElement.eventId, eventsElement.elements));
                    break;
                default:
                    console.logWithTime('Switch default');
                    console.logWithTime(typeof eventsElement.eventId);
                    saveEventsPromises.push(new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const _error = {
                                code: 452,
                                message: 'Event ID not found'
                            };
                            resolve(_error);
                        }, 100);
                    }))
            }

        });

        return new Promise.all(saveEventsPromises);
    }

};

SlideshowTestDashboardSchema.methods.getEventsData = function (data) {
    console.logWithTime('SlideshowTestDashboardSchema getEventsData');

    if (!CollectionMethodsHelpers.checkDataStructure(data, 'multiGet')) {
        const _error = {
            code: 456,
            message: 'Bad get events data'
        };
        return new Promise.all([_error])
    } else {
        let getEventsPromises = [],
            instanceId = SettingsApiMethods.getDecodedInstanceJSON(data.instance).instanceId,
            // instanceId = data.instance,
            compId = data.compId;

        const intervalObject = IntervalParserMethods.parseInterval(data.interval.start, data.interval.finish);

        _.each(data.events, (eventElement, eventElementIndex) => {

            switch (parseInt(eventElement)) {
                case 0:
                    getEventsPromises.push(CollectionMethodsHelpers.getEventDataFunction(this.model('slideshowTestDashboard'), instanceId, compId, intervalObject, eventElement));
                    break;
                case 1:
                    getEventsPromises.push(CollectionMethodsHelpers.getElementsFunction(this.model('slideshowTestDashboard'), instanceId, compId, intervalObject, eventElement));
                    break;
                case 2:
                    getEventsPromises.push(CollectionMethodsHelpers.getElementsFunction(this.model('slideshowTestDashboard'), instanceId, compId, intervalObject, eventElement));
                    break;
                case 3:
                    getEventsPromises.push(CollectionMethodsHelpers.getElementsFunction(this.model('slideshowTestDashboard'), instanceId, compId, intervalObject, eventElement));
                    break;
                default:
                    console.logWithTime('Switch default');
                    console.logWithTime(typeof eventElement);
                    getEventsPromises.push(new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const _error = {
                                code: 452,
                                message: 'Event ID not found'
                            };
                            resolve(_error);
                        }, 100);
                    }))
            }

        });

        return new Promise.all(getEventsPromises)


    }


};

SlideshowTestDashboardSchema.methods.getEventData = function (data) {
    console.logWithTime('SlideshowTestDashboardSchema getEventData');

    if (!CollectionMethodsHelpers.checkDataStructure(data, 'singleGet')) {
        return new Promise((resolve, reject) => {
            const _error = {
                code: 457,
                message: 'Bad get event data'
            };

            resolve(_error)
        });
    } else {
        return new Promise((resolve, reject) => {

            let eventData,
                instanceId = SettingsApiMethods.getDecodedInstanceJSON(data.instance).instanceId,
                // instanceId = data.instance,
                compId = data.compId;


            const intervalObject = IntervalParserMethods.parseInterval(data.interval.start, data.interval.finish);

            switch (parseInt(data.eventId)) {
                case 0:
                    eventData = CollectionMethodsHelpers.getEventDataFunction(this.model('slideshowTestDashboard'), instanceId, compId, intervalObject, data.eventId);
                    break;
                case 1:
                    eventData = CollectionMethodsHelpers.getElementsFunction(this.model('slideshowTestDashboard'), instanceId, compId, intervalObject, data.eventId);
                    break;
                case 2:
                    eventData = CollectionMethodsHelpers.getElementsFunction(this.model('slideshowTestDashboard'), instanceId, compId, intervalObject, data.eventId);
                    break;
                case 3:
                    eventData = CollectionMethodsHelpers.getElementsFunction(this.model('slideshowTestDashboard'), instanceId, compId, intervalObject, data.eventId);
                    break;
                default:
                    console.logWithTime('Switch default');
                    console.logWithTime(typeof data.eventId);
                    eventData = new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const _error = {
                                code: 452,
                                message: 'Event ID not found'
                            };
                            resolve(_error);
                        }, 100);
                    });
            }

            eventData.then((response) => {
                resolve(response);
            });

        });
    }


};


let SlideshowTestDashboardModel = mongoose.model('slideshowTestDashboard', SlideshowTestDashboardSchema);

export let SlideshowTestDashboardSchemaMethods = SlideshowTestDashboardModel;