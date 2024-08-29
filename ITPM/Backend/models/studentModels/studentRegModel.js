import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const StudentSchema = new mongoose.Schema({
    studentID:{
        type: String,
    },
    firstName: {
        type: String,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    contactNo: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
    },
    aLevelStream: {
        type: String,
        required: true,
    },
    subject1: {
        type: String,
        required: true,
    },
    subject1Result: {
        type: String,
        enum: ["A", "B", "C", "S", "F"],
    },
    subject2: {
        type: String,
        required: true,
    },
    subject2Result: {
        type: String,
        enum: ["A", "B", "C", "S", "F"],
    },
    subject3: {
        type: String,
        required: true,
    },
    subject3Result: {
        type: String,
        enum: ["A", "B", "C", "S", "F"],
    },
    guardianName: {
        type: String,
        required: true,
    },
    guardianEmail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        enum: ["it", "se","csne","ds", "cs", "im", "ise"],
    },
    semester: {
        type: String,
        enum: ["semester1", "semester2"],
    },
    role: {
        type: String,
        enum: ["student"],
    },
},

{ timestamps: true });

//Encrypt the password before saving the document
StudentSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Password compare method
StudentSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


const StudentModel = mongoose.model("students", StudentSchema);

export default StudentModel;