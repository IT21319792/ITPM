import MarkModel from "../models/MarkModel.js";

// Function to add a new mark
const addMark = async (req, res) => {
  const {
      presentationID,
      groupID,
      studentID,
      examinermark,
      examiner1mark,
      examiner2mark,
      examiner3mark,
  } = req.body;

  try {
  const result = await MarkModel.create({
      presentationID,
      groupID,
      studentID,
      examinermark,
      examiner1mark,
      examiner2mark,
      examiner3mark
      });

// response with the created mark data
      res.status(200).json({
          message: "Mark added successfully",
          result: {
              data: result,
              response: true,
          },
      });
  } catch (err) {
      res.status(500).json({
          message: "Error while adding Mark",
          error: err,
      });
  }
};

// Function to get all marks
const getMark = async (req, res) => {
    let results = await MarkModel.find();
  if (!results) {
    res.status(500).json({
      message: "Error while getting all Mark",
      error: "Something went wrong",
    });
  } else {
    res.status(200).json({
      message: "All Mark details",
      data: results,
    });
  }
};




// Function to update a mark
const updateMark = async (req, res) => {
    const {
      presentationID,
      groupID,
      studentID,
      examinermark,
      examiner1mark,
      examiner2mark,
      examiner3mark,
    } = req.body;

  // Finding and updating a mark entry in the database
    const result = await MarkModel.findOneAndUpdate({
      presentationID,
      groupID,
      studentID,
      examinermark,
      examiner1mark,
      examiner2mark,
      examiner3mark,
    });

    if (!result) {
        res.status(500).json({
            message: "Error while updating marks",
            error: "Something went wrong",
        });
    } else {
        res.status(200).json({
            message: "Marks updated successfully",
            data: result,
        });
    }
};




// Function to delete a mark
const deleteMark = async (req, res) => {
    const response = await MarkModel.findByIdAndDelete(req.params.id);
    if (!response) {
      res.status(500).send(err);
    } else {
      res.status(200).json({
        message: "Marks Deleted successfully",
        result: {
          data: response,
          response: true,
        },
      });
    }
};




// Function to search for marks by presentationID, groupID, or studentID
const searchMark = async (req, res) => {
  console.log(req.params.key)
  let data =await MarkModel.find(
    {
      "$or": [
        { "presentationID": {$regex:req.params.key}},
        { "groupID": {$regex:req.params.key}},
        { "studentID": {$regex:req.params.key}}
      ],
    }
  );
  console.log(data);
  res.status(200).json({
    message: "Marks details",
    data: data,
  })
};




// Exporting CRUD functions
export {addMark,getMark,updateMark,deleteMark,searchMark};
