import mongoose from 'mongoose';


const PrMemberSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    contactNo: {
        type: Number,
        unique: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,

    },

    staffPost: {
        type: String,
        enum: ["Chancellor", "Vice-Chancellor", "Deans", "Department Chairs/Heads", "Professors", "Associate Professors", "Assistant Professors", "Assistant Lecturer", "Lecturers", "Senior Lecturers", "Instructors"],
    },
    level: {
        type: String,
        enum: ["1", "2", "3"],
    },

    assignedStatus: {
        type: String,
        enum: ["Assigned", "Not Assigned"],
    },
}, { timestamps: true });





const PrMemberModel = mongoose.model("PMembers", PrMemberSchema);

export default PrMemberModel;