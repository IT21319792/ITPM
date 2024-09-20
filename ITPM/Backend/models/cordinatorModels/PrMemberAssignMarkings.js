import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PrMemberAssignMarkingsSchema = new Schema({
    firstName: {
        type: String,
        required: true
      },
      selectedAssignment: {
        type: String,
        enum: ['presentation', 'report'],
        required: true
      },
      selectedSubType: {
        type: String,
        required: true
      }
}, { timestamps: true });

const PrMember = mongoose.model("pmember_assigned_markings", PrMemberAssignMarkingsSchema);
export default PrMember;