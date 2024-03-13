import SchedulePresentationModel from "../models/SchedulePresentationModel.js";

// create new presentation schedule
const createSchedule = async (req, res) => {
    const {
        GroupID,
        date,
        time,
        location,
        topic,
        examiners
    } = req.body;

    const result = await SchedulePresentationModel.find();
    const scheduleCount = result.length;

    // generate new schedule ID for presentation schedule
    const newScheuleID = `P${scheduleCount + 1}`;

    const mongooseRes = new SchedulePresentationModel({
        ScheduleID: newScheuleID,
        GroupID,
        date,
        time,
        location,
        topic,
        examiners
    });

    console.log(mongooseRes);
    mongooseRes.save().then((result) => {
        res.status(200).json({
            message: "Presentation schedule added successfully",
            result: {
                data: result,
                response: true,
            },
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Error while adding presentation schedule",
            error: err,
        });
    });
};

// get all presentation schedules

const getSchedules = async (req, res) => {
    let results = await SchedulePresentationModel.find();
    if (!results) {
        res.status(500).json({
            message: "Error while getting all presentation schedules",
            error: "Something went wrong",
        });
    } else {
        res.status(200).json({
            message: "All presentation schedules details",
            data: results,
        });
    }
}

export {createSchedule,getSchedules};

