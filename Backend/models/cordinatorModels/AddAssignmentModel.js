import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['presentation', 'report'],
    required: true
  },
  subType: {
    type: String,
    required: function () {
      return this.type === 'presentation' || this.type === 'report';
    },
    enum: {
      values: [
        'proposal',
        'progress1',
        'progress2',
        'final',
        'topicAssessmentForm',
        'projectCharter',
        'statusDocument1',
        'logBook',
        'proposalDocument',
        'statusDocument2',
        'finalThesis'
      ],
      message: '{VALUE} is not a valid subType'
    }
  },
  deadline: {
    type: Date,
    required: true
  },
  semester: {
    type: Number,
    
  },
  description: {
    type: String,
    
  },
  user: {
    type: String, 
    required: true
  },
  role: {
    type: String,
    required: true
  }
}, { timestamps: true });

const AddAssignment = mongoose.model('Assignment', assignmentSchema);
export default AddAssignment;