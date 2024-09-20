import mongoose from 'mongoose';


const SupervisorListSchema = new mongoose.Schema({
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
    }
}, { timestamps: true });





const SupervisoListModel = mongoose.model("SupervisorList", SupervisorListSchema);

export default SupervisoListModel;