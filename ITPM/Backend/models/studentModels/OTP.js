import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
   

}, { timestamps: true,
    expireAfterSeconds:600,
 });

const OTPModel = mongoose.model("otp", OTPSchema);

export default OTPModel;