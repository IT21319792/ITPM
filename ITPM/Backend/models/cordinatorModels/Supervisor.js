import mongoose from 'mongoose';


const SupervisorSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
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