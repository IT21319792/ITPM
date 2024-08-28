import mongoose from 'mongoose';

const presentationSchema = new mongoose.Schema({
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

// Create a model from the schema
const PresentationMarkAddModel = mongoose.model('Presentation', presentationSchema);
export default PresentationMarkAddModel;