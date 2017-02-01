'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SeasonOnePageViewsModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mongoose.Promise = global.Promise;


var seasonOnePageViewsSchema = _mongoose2.default.Schema({
    _id: String,
    date: Object,
    data: Number
}, {
    collection: 'seasonOnePageViews'
}); // import Promise from 'promise';


seasonOnePageViewsSchema.methods.setView = function () {
    console.logWithTime('seasonOnePageViewsSchema setView');

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

    SeasonOnePageViewsModel.findOneAndUpdate(findQuery, incQuery, {
        upsert: true
    }).lean().exec(function (err, doc) {
        if (err) {
            var _error = {
                code: 822,
                message: 'Set season one page view error'
            };

            console.errorWithTime(_error);
            console.log(err);
        } else {

            if (doc !== null) {
                // console.log(doc);
                console.logWithTime('Season One page view ' + doc.data + ' is set');
            }

            var _error2 = {
                code: 823,
                message: 'Set season one page view error'
            };
        }
    });
};

var SeasonOnePageViewsModel = exports.SeasonOnePageViewsModel = _mongoose2.default.model('seasonOnePageViews', seasonOnePageViewsSchema);