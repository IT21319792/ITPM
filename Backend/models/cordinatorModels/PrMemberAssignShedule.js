import mongoose from 'mongoose';  
const Schema= mongoose.Schema;

const PrMemberAssignSheduleSchema = new Schema({

  memberName:{
    type: String,
    required: true
  },
  semester:{

    type: String,
    required: true
  },
  Type: {
    type: String,
    enum: ["AssignShedule"],
 },
 presentationName:{
    type:String,
    required: true
 }

  
    
})
const PrMemberAssignShedule = mongoose.model("p_member_assign_shedule", PrMemberAssignSheduleSchema);
export default PrMemberAssignShedule;