// import Promise from 'promise';
import mongoose from 'mongoose';

// mongoose.Promise = global.Promise;


let contactsPageViewsSchema = mongoose.Schema({
    _id: String,
    date: Object,
    data: Number
}, {
    collection: 'contactsPageViews'
});

contactsPageViewsSchema.methods.setView = function () {
    console.logWithTime('contactsPageViewsSchema setView');

    const findQuery = {
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
    }).lean().exec((err, doc) => {
        if (err) {
            const _error = {
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

            const _error = {
                code: 829,
                message: 'Set contacts page view error'
            };

        }
    });
};


export const ContactsPageViewsModels = mongoose.model('contactsPageViews', contactsPageViewsSchema);