import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    contactNo: {
        type: Number,
        unique:true,

    },
    address: {
        type: String,
        default: 'Not Given'
    },
    email: {
        type: String,
        required: true,
        unique:true,

    },
    password: {
        type: String,
        // required: true
    },
    staffPost: {
        type: String,
        enum: ["Chancellor", "Vice-Chancellor", "Deans", "Department Chairs/Heads", "Professors", "Associate Professors", "Assistant Professors", "Assistant Lecturer", "Lecturers", "Senior Lecturers", "Instructors"],
    },
    level: {
        type: String,
        enum: ["1", "2", "3"],
    },
    role: [{ 
        type: String,
        enum: ["admin", "coordinator", "member", "supervisor", "examiner", "student", "staff"],
    }],
}, { timestamps: true });


//Encrypt the password before saving the document
UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Password compare method
UserSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


const UserModel = mongoose.model("users", UserSchema);

export default UserModel;