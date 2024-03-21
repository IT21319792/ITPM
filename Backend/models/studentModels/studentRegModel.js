import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const StudentSchema = new mongoose.Schema({
    studentID:{
        type: String,
    },
    firstName: {
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
    password: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        enum: ["it", "se","csne","ds", "cs", "im", "ise"],
    },
    semester: {
        type: String,
        enum: ["semester1", "semester2"],
    },
}, { timestamps: true });

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