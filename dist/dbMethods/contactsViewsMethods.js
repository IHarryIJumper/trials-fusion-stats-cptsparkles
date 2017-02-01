'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContactsPageViewsModels = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mongoose.Promise = global.Promise;


var contactsPageViewsSchema = _mongoose2.default.Schema({
    _id: String,
    date: Object,
    data: Number
}, {
    collection: 'contactsPageViews'
}); // import Promise from 'promise';


contactsPageViewsSchema.methods.setView = function () {
    console.logWithTime('contactsPageViewsSchema setView');

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

    ContactsPageViewsModels.findOneAndUpdate(findQuery, incQuery, {
        upsert: true
    }).lean().exec(function (err, doc) {
        if (err) {
            var _error = {
                code: 828,
                message: 'Set contacts page view error'
            };

            console.errorWithTime(_error);
            console.log(err);
        } else {

            if (doc !== null) {
                // console.log(doc);
                console.logWithTime('Contacts page view ' + doc.data + ' is set');
            }

            var _error2 = {
                code: 829,
                message: 'Set contacts page view error'
            };
        }
    });
};

var ContactsPageViewsModels = exports.ContactsPageViewsModels = _mongoose2.default.model('contactsPageViews', contactsPageViewsSchema);