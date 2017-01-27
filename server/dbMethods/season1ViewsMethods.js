// import Promise from 'promise';
import mongoose from 'mongoose';

// mongoose.Promise = global.Promise;


let seasonOnePageViewsSchema = mongoose.Schema({
    _id: String,
    date: Object,
    data: Number
}, {
    collection: 'seasonOnePageViews'
});

seasonOnePageViewsSchema.methods.setView = function () {
    console.logWithTime('seasonOnePageViewsSchema setView');

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

    SeasonOnePageViewsModel.findOneAndUpdate(findQuery, incQuery, {
        upsert: true
    }).lean().exec((err, doc) => {
        if (err) {
            const _error = {
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

            const _error = {
                code: 823,
                message: 'Set season one page view error'
            };

        }
    });
};


export const SeasonOnePageViewsModel = mongoose.model('seasonOnePageViews', seasonOnePageViewsSchema);