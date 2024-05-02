import mongoose from 'mongoose';

const presentationSchema = new mongoose.Schema({
  reportType: {
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
const ReportMarkAddModel = mongoose.model('ReportMark', presentationSchema);
export default ReportMarkAddModel;