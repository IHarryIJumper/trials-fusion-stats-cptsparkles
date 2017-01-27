// import Promise from 'promise';
import mongoose from 'mongoose';

// mongoose.Promise = global.Promise;


let mainPageViewsSchema = mongoose.Schema({
    _id: String,
    date: Object,
    data: Number
}, {
    collection: 'mainPageViews'
});

mainPageViewsSchema.methods.setView = function () {
    console.logWithTime('mainPageViewsSchema setView');

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

    MainPageViewsModel.findOneAndUpdate(findQuery, incQuery, {
        upsert: true
    }).lean().exec((err, doc) => {
        if (err) {
            const _error = {
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

            const _error = {
                code: 821,
                message: 'Set main page view error'
            };

        }
    });
};


export const MainPageViewsModel = mongoose.model('mainPageViews', mainPageViewsSchema);