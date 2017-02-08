'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SeasonTwoPageViewsModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mongoose.Promise = global.Promise;


var seasonTwoPageViewsSchema = _mongoose2.default.Schema({
    _id: String,
    date: Object,
    data: Number
}, {
    collection: 'seasonTwoPageViews'
}); // import Promise from 'promise';


seasonTwoPageViewsSchema.methods.setView = function () {
    console.logWithTime('seasonTwoPageViewsSchema setView');

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

    SeasonTwoPageViewsModel.findOneAndUpdate(findQuery, incQuery, {
        upsert: true
    }).lean().exec(function (err, doc) {
        if (err) {
            var _error = {
                code: 824,
                message: 'Set season two page error'
            };

            console.errorWithTime(_error);
            console.log(err);
        } else {

            if (doc !== null) {
                // console.log(doc);
                console.logWithTime('Season Two page ' + doc.data + ' is set');
            }

            var _error2 = {
                code: 825,
                message: 'Set season two page error'
            };
        }
    });
};

var SeasonTwoPageViewsModel = exports.SeasonTwoPageViewsModel = _mongoose2.default.model('seasonTwoPageViews', seasonTwoPageViewsSchema);