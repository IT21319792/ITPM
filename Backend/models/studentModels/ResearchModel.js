import mongoose from 'mongoose';

const ResearchSchema = new mongoose.Schema({

    groupID: {
        type: mongoose.Schema.ObjectId,
        ref: 'group',
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    student1: {
        type: mongoose.Schema.ObjectId,
        ref: 'student',
        required: true,
    },
    student2: {
        type: mongoose.Schema.ObjectId,
        ref: 'student',
        required: true,
    },
    student3: {
        type: mongoose.Schema.ObjectId,
        ref: 'student',
        required: true,
    },
    student4: {
        type: mongoose.Schema.ObjectId,
        ref: 'student',
        required: true,
    },
    supervisor1: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    supervisor1: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    supervisor2: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    coSupervisor1: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    coSupervisor2: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    journalName: {
        type: String,
        required: true,
    },
    issnNumber: {
        type: String,
    },
    h5IndexLink: {
        type: String,
    },
    hIndexLink: {
        type: String,
    },
    scopusSiteLink: {
        type: String,

    },
    imageLinkOfAcceptanceLetter: {
        type: String,
    }

}, { timestamps: true });

const ResearchModel = mongoose.model("research", ResearchSchema);

export default ResearchModel;

