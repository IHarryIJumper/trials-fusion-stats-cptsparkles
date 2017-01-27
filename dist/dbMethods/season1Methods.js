'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SeasonOneDataModel = undefined;

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

// import _ from 'lodash';

var seasonOneDataSchema = _mongoose2.default.Schema({
    _id: String,
    persons: Object,
    maps: Object,
    date: Object,
    episode: {
        id: Number,
        name: String
    }
}, {
    collection: 'seasonOneData'
});

seasonOneDataSchema.methods.getData = function () {
    console.logWithTime('seasonOneDataSchema getData');

    return new _promise2.default(function (resolve, reject) {
        SeasonOneDataModel.find({}).lean().exec(function (err, doc) {
            if (err) {

                var _error = {
                    code: 810,
                    message: 'Get season 1 data error'
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
                    code: 811,
                    message: 'Season 1 data corrupted'
                };

                resolve(_error2);
            }
        });
    });
};

var SeasonOneDataModel = exports.SeasonOneDataModel = _mongoose2.default.model('seasonOneData', seasonOneDataSchema);