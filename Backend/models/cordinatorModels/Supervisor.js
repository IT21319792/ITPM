import mongoose from 'mongoose';


const SupervisorSchema = new mongoose.Schema({
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
    groups: {
        type: Array,
        default: [],
    },
    tittles: {
        type: Array,
        default: [],
    },

}, { timestamps: true });





const SupervisorModel = mongoose.model("Supervisor", SupervisorSchema);

export default SupervisorModel;