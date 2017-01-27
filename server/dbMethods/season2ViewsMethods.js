// import Promise from 'promise';
import mongoose from 'mongoose';

// mongoose.Promise = global.Promise;


let seasonTwoPageViewsSchema = mongoose.Schema({
    _id: String,
    date: Object,
    data: Number
}, {
    collection: 'seasonTwoPageViews'
});

seasonTwoPageViewsSchema.methods.setView = function () {
    console.logWithTime('seasonTwoPageViewsSchema setView');

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

    SeasonTwoPageViewsModel.findOneAndUpdate(findQuery, incQuery, {
        upsert: true
    }).lean().exec((err, doc) => {
        if (err) {
            const _error = {
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

            const _error = {
                code: 825,
                message: 'Set season two page error'
            };

        }
    });
};


export const SeasonTwoPageViewsModel = mongoose.model('seasonTwoPageViews', seasonTwoPageViewsSchema);