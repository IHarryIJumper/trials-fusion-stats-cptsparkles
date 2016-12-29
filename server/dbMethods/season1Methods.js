import Promise from 'promise';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

import _ from 'lodash';

let seasonOneDataSchema = mongoose.Schema({
    _id: String,
    persons: Object,
    maps: Object,
    date: Object,
    episode: {
        id: Number,
        name: String
    }
}, {
    collection: 'seasonOneData'
});

seasonOneDataSchema.methods.getData = function () {
    console.logWithTime('seasonOneDataSchema getData');

    return new Promise((resolve, reject) => {
        SeasonOneDataModel.find({}).lean().exec((err, doc) => {
            if (err) {

                const _error = {
                    code: 810,
                    message: 'Get season 1 data error'
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
                    code: 811,
                    message: 'Season 1 data corrupted'
                };

                resolve(_error);
            }
        });
    });

};


export const SeasonOneDataModel = mongoose.model('seasonOneData', seasonOneDataSchema);