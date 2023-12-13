import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoConverter from '../service/mongoConverter';
import * as _ from "lodash";

const scheduleSchema = new mongoose.Schema({
  owner: { type: String, ref: 'user', required: true },
    scheduleEntries:[{
        dayOfWeek: {type: String, required: true},  // E.g., "Monday", "Tuesday", etc.
        courses: [
            {
                timeFrom: {type: String, required: true}, // E.g., "9:00 AM - 10:30 AM"
                timeTo: {type: String, required: true}, // E.g., "9:00 AM - 10:30 AM"
                course: {type: String, required: true}, // E.g., "Math 101"
                // Add more fields as needed for each course
            }
        ],
    }],

}, {
    collection: 'schedule'
});
scheduleSchema.plugin(uniqueValidator);
const scheduleModel = mongoose.model('post', scheduleSchema);

async function query() {
    const result = await scheduleModel.find({});
    {
        if (result) {
            return mongoConverter(result);
        }
    }
}
async function findByOwner(ownerId) {
    try {
        const schedules = await scheduleModel.find({ owner: ownerId });
        return schedules;
    } catch (error) {
        throw new Error('Error fetching schedules by owner');
    }
}

async function get(id) {
    try {
     return scheduleModel.find({_id: id});
     }catch (error) {
        throw new Error('Error fetching schedule by id');
    }
}

async function update(data,id) {
    console.log(id);
    return Promise.resolve().then(() => {
            return scheduleModel.findByIdAndUpdate(id, _.omit(data, 'id'), {new: true});
    });
}
async function createNew(data) {
    return Promise.resolve().then(() => {
        if (!data.id) {
            return new scheduleModel(data).save().then(result => {
                if (result[0]) {
                    return mongoConverter(result[0]);
                }
            });
        } else {
            return scheduleModel.findByIdAndUpdate(data.id, _.omit(data, 'id'), {new: true});
        }
    });
}
async function remove(id) {
    return scheduleModel.deleteOne({_id: id});
}
export default {
    query: query,
    get: get,
    createNew: createNew,
    update:update,
    remove:remove,
    findByOwner: findByOwner,
    model: scheduleModel
};
