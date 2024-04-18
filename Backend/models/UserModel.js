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
    role: {
        type: String,
        enum: ["admin", "coordinator", "member", "supervisor", "examinar", "cosupervisor"],
    },
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