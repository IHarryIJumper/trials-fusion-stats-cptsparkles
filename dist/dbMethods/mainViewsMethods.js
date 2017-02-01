'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MainPageViewsModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mongoose.Promise = global.Promise;


var mainPageViewsSchema = _mongoose2.default.Schema({
    _id: String,
    date: Object,
    data: Number
}, {
    collection: 'mainPageViews'
}); // import Promise from 'promise';


mainPageViewsSchema.methods.setView = function () {
    console.logWithTime('mainPageViewsSchema setView');

    var findQuery = {
        date: {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate()
        }
    },
        incQuery = {
        $inc: {
            data: 1
        }
    };

    MainPageViewsModel.findOneAndUpdate(findQuery, incQuery, {
        upsert: true
    }).lean().exec(function (err, doc) {
        if (err) {
            var _error = {
                code: 820,
                message: 'Set main page view error'
            };

            console.errorWithTime(_error);
            console.log(err);
        } else {

            if (doc !== null) {
                // console.log(doc);
                console.logWithTime('Main page view ' + doc.data + ' is set');
            }

            var _error2 = {
                code: 821,
                message: 'Set main page view error'
            };
        }
    });
};

var MainPageViewsModel = exports.MainPageViewsModel = _mongoose2.default.model('mainPageViews', mainPageViewsSchema);