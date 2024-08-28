import mongoose from 'mongoose';

const publishedMarkSchema = new mongoose.Schema({
    loggedUser: {
        type: String,
        required: true
    },
    presentationType: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    groupMarks: [{
        rubricID: {
            type: String,
            required: true
        },
        mark: {
            type: Number,
            required: true
        }
    }]
});

const PublishedMark = mongoose.model('PublishedMark', publishedMarkSchema);
export default PublishedMark;
