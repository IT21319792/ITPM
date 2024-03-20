import SchedulePresentationModel from "../../models/projectMemberModels/SchedulePresentationModel.js";
 
// create new presentation schedule
const createSchedule = async (req, res) => {
  const { GroupID, date, timeDuration, location, topic, examiners } = req.body;
 
  const result = await SchedulePresentationModel.find();
  const scheduleCount = result.length;
 
  // generate new schedule ID for presentation schedule
 
  const newScheuleID = `SP${scheduleCount + 1}`;
 
  const mongooseRes = new SchedulePresentationModel({
    ScheduleID: newScheuleID,
    GroupID,
    date,
    timeDuration,
    location,
    topic,
    examiners,
  });
 
  console.log(mongooseRes);
  mongooseRes
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Presentation schedule added successfully",
        result,
        status: res.statusCode,
      });
    })
    .catch((err) => {
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
};
 
// update presentation schedule
 
const updateSchedule = async (req, res) => {
  const {
    ScheduleID,
    GroupID,
    date,
    timeDuration,
    location,
    topic,
    examiners,
  } = req.body;
 
  const result = await SchedulePresentationModel.findOneAndUpdate(
    {
      ScheduleID: ScheduleID,
    },
    {
      GroupID: GroupID,
      date: date,
      timeDuration: timeDuration,
      location: location,
      topic: topic,
      examiners: examiners,
    }
  );
 
  if (!result) {
    res.status(500).json({
      message: "Error while updating scheduled presentation",
      error: "Something went wrong",
    });
  } else {
    res.status(200).json({
      message: "Presentation schedule updated successfully",
      data: result,
    });
  }
};
 
// delete sheculed presentation
 
const deleteSchedule = async (req, res) => {
  const response = await SchedulePresentationModel.findByIdAndDelete(
    req.params.id
  );
  if (!response) {
    res.status(500).send(err);
  } else {
    res.status(200).json({
      message: "Scheduled Presentation Deleted Successfully",
      result: {
        data: response,
        response: true,
      },
    });
  }
};
 
// create search function to search by schedule ID , group ID,date , and location
 
const searchSchedule = async (req, res) => {
  console.log(req.params.key);
  const data = await SchedulePresentationModel.findById(req.params.key);
  if (!data) {
    res.status(500).json({
      message: "Error while getting schedule details",
      error: "Something went wrong",
    });
  } else {
    res.status(200).json({
      message: "Schedule details",
      data: data,
    });
  }
};
 
export {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
  searchSchedule,
};
 