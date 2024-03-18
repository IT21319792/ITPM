import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PrMemberAssignMarkingsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    semester:{
        type: String,
        required: true
    },
    Type: {
        type: String,
        enum: ["AssignMarkings"],
    },
    pre_rep_Name:{
        type:String,
        required: true
    }

},{ timestamps: true });

const PrMember = mongoose.model("pmember_assigned_markings", PrMemberAssignMarkingsSchema);
export default PrMember;