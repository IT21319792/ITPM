import mongoose from 'mongoose';

const PresentationMarksSchema = new mongoose.Schema({
  presentationType: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  marks: [{
    type: Number,
    required: true
  }],
  rubricIndex: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const PresentationMarksModel = mongoose.model('presentation_marks', PresentationMarksSchema);
export default PresentationMarksModel;
