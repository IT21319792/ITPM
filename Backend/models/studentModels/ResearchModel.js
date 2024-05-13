import mongoose from "mongoose";

const ResearchSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    student1: {
        type: String,
        required: true,
    },
    student2: {
        type: String,
        required: true,
    },
    student3: {
        type: String,
        required: true,
    },
    student4: {
        type: String,
        required: true,
    },
    supervisor1: {
        type: String,
        required: true,
    },
    supervisor1: {
        type: String,
        required: true,
    },
    supervisor2: {
        type: String,
        required: true,
    },
    coSupervisor1: {
        type: String,
        required: true,
    },
    coSupervisor2: {
        type: String,
        required: true,
    },
    journalName: {
        type: String,
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
    },

}, { timestamps: true });

const ResearchModel = mongoose.model("research", ResearchSchema);

export default ResearchModel;