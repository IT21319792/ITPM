import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({

    groupID: {
        type: String, 
        required: true, 
        unique: true},
    member1: {
        type: String,
    },
    member2: {
        type: String,
        required: true,
    },
    member3: {
        type: String,
        required: true
    },
    member4: {
        type: String,
        required: true
    },
    groupLeader: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const GroupModel = mongoose.model("group", GroupSchema);

export default GroupModel;

