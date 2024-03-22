import mongoose from 'mongoose';

const ExaminerPresentationMarksSchema = new mongoose.Schema({
  presentationType: {
    type: String,
    required: true
  },
  students: [
    {
      firstName: {
        type: String,
        required: true
      },
      marks: [
        {
          rubricID: {
            type: Number,
            required: true
          },
          mark: {
            type: Number,
            required: true
          }
        }
      ]
    }
  ]
}, { timestamps: true });

const ExaminerPresentationMarksModel = mongoose.model('ExaminerPresentationMarks', ExaminerPresentationMarksSchema);
export default ExaminerPresentationMarksModel;
