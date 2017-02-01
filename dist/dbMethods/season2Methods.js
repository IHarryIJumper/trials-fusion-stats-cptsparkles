'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SeasonTwoDataModel = undefined;

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

// import _ from 'lodash';

var seasonTwoDataSchema = _mongoose2.default.Schema({
    _id: String,
    persons: Object,
    maps: Object,
    date: Object,
    episode: {
        id: Number,
        name: String
    }
}, {
    collection: 'seasonTwoData'
});

seasonTwoDataSchema.methods.getData = function () {
    console.logWithTime('seasonTwoDataSchema getData');

    return new _promise2.default(function (resolve, reject) {
        SeasonTwoDataModel.find({}).lean().exec(function (err, doc) {
            if (err) {

                var _error = {
                    code: 812,
                    message: 'Get season 2 data error'
                };

                console.errorWithTime(_error);
                console.lod(err);
                resolve(_error);
            } else {

                if (doc !== null) {
                    if (Array.isArray(doc)) {
                        resolve(doc);
                    }
                }

                var _error2 = {
                    code: 813,
                    message: 'Season 2 data corrupted'
                };

                resolve(_error2);
            }
        });
    });
};

var SeasonTwoDataModel = exports.SeasonTwoDataModel = _mongoose2.default.model('seasonTwoData', seasonTwoDataSchema);