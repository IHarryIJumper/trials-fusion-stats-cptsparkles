import Promise from 'promise';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

// import _ from 'lodash';

let seasonTwoDataSchema = mongoose.Schema({
    _id: String,
    persons: Object,
    maps: Object,
    date: Object,
    episode: {
        id: Number,
        name: String
    }
}, {
    collection: 'seasonTwoData'
});

seasonTwoDataSchema.methods.getData = function () {
    console.logWithTime('seasonTwoDataSchema getData');

    return new Promise((resolve, reject) => {
        SeasonTwoDataModel.find({}).lean().exec((err, doc) => {
            if (err) {

                const _error = {
                    code: 812,
                    message: 'Get season 2 data error'
                };

                console.errorWithTime(_error);
                console.lod(err);
                resolve(_error);

            } else {
                
                if (doc !== null) {
                    if (Array.isArray(doc)) {
                        resolve(doc);
                    }
                }

                const _error = {
                    code: 813,
                    message: 'Season 2 data corrupted'
                };

                resolve(_error);
            }
        });
    });

};


export const SeasonTwoDataModel = mongoose.model('seasonTwoData', seasonTwoDataSchema);