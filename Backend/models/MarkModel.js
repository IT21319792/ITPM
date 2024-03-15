import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const MarkSchema = new Schema({
    presentationID: {
        type: String, 
        required: true, 
        unique: true
    },
        
    groupID: {
        type: String, 
        required: true,
        unique: true
    },

    studentID: {
        type: String, 
        required: true,
        unique: true
    },

    examinermark: {
        type: Number, 
        required: true
    },

    examiner1mark: {
        type: Number, 
        required: true
    },

    examiner2mark: {
        type: Number, 
        required: true
    },

    examiner3mark: {
        type: Number, 
        required: true
    }

}, {timestamps: true});


const MarkModel = mongoose.model('Marks', MarkSchema);
export default MarkModel;
