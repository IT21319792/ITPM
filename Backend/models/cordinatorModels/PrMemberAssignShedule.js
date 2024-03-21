import mongoose from 'mongoose';

const { Schema } = mongoose;

const PrMemberAssignSheduleSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  selectedAssignment: {
    type: String,
    enum: ['presentation'],
    required: true
  },
  selectedSubType: {
    type: String,
    required: true
  }
});


const PrMemberAssignShedule = mongoose.model("p_member_assign_shedule", PrMemberAssignSheduleSchema);

export default PrMemberAssignShedule;
