'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DonationPageViewsModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mongoose.Promise = global.Promise;


var donationPageViewsSchema = _mongoose2.default.Schema({
    _id: String,
    date: Object,
    data: Number
}, {
    collection: 'donationPageViews'
}); // import Promise from 'promise';


donationPageViewsSchema.methods.setView = function () {
    console.logWithTime('donationPageViewsSchema setView');

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

    DonationPageViewsModel.findOneAndUpdate(findQuery, incQuery, {
        upsert: true
    }).lean().exec(function (err, doc) {
        if (err) {
            var _error = {
                code: 826,
                message: 'Set donation page view error'
            };

            console.errorWithTime(_error);
            console.log(err);
        } else {

            if (doc !== null) {
                // console.log(doc);
                console.logWithTime('Donation page view ' + doc.data + ' is set');
            }

            var _error2 = {
                code: 827,
                message: 'Set donation page view error'
            };
        }
    });
};

var DonationPageViewsModel = exports.DonationPageViewsModel = _mongoose2.default.model('donationPageViews', donationPageViewsSchema);