import mongoose from 'mongoose';

const submitAssignmentSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true 
  },
  submittedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students',
    required: true
  },

},
{ timestamps: true }
);



const SubmitAssignment = mongoose.model('SubmitAssignment', submitAssignmentSchema);

export default SubmitAssignment;
