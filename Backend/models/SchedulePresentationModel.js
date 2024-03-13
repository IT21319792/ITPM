import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const SchedulePresentationSchema = new Schema({
    ScheduleID : {type: String, required: true, unique: true},
    GroupID : {type: String, required: true},
    date : {type: Date, required: true},
    timeDuration : {type: String, required: true}, 
    location : {type: String, required: true},
    topic : {type: String, required: true},
    examiners : {type: Array, default: [], required: true} 
}, {timestamps: true});

const SchedulePresentationModel = mongoose.model('schedulePresentation', SchedulePresentationSchema);
export default SchedulePresentationModel;