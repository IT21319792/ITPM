import mongoose from 'mongoose';

const presentationSchema = new mongoose.Schema({
  presentationType: {
    type: String,
    
  },
  group:{
    type: String,
  },
  groupMarks: [{
    rubricID: {
      type: String,
      
    },
    mark: {
      type: Number,
      
    }
  }]
});

// Create a model from the schema
const PresentationMarkAddModel = mongoose.model('Presentation', presentationSchema);
export default PresentationMarkAddModel;