import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const SchedulePresentationSchema = new Schema({
    ScheduleID : {type: String, required: true, unique: true},
    GroupID : {type: String, required: true},
    date : {type: String, required: true},
    time : {type: String, required: true},
    location : {type: String, required: true},
    examiners : {type : Array,"default":[],required: true}
}, {timestamps: true});

const SchedulePresentationModel = mongoose.model('schedulePresentation', SchedulePresentationSchema);
export default SchedulePresentationModel;