// import Promise from 'promise';
import mongoose from 'mongoose';

// mongoose.Promise = global.Promise;


let donationPageViewsSchema = mongoose.Schema({
    _id: String,
    date: Object,
    data: Number
}, {
    collection: 'donationPageViews'
});

donationPageViewsSchema.methods.setView = function () {
    console.logWithTime('donationPageViewsSchema setView');

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

    DonationPageViewsModel.findOneAndUpdate(findQuery, incQuery, {
        upsert: true
    }).lean().exec((err, doc) => {
        if (err) {
            const _error = {
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

            const _error = {
                code: 827,
                message: 'Set donation page view error'
            };

        }
    });
};


export const DonationPageViewsModel = mongoose.model('donationPageViews', donationPageViewsSchema);