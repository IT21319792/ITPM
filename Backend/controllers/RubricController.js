import { get } from "mongoose";
import RubricModel from "../models/RubricModel.js";

// add new rubric
const addRubric = async (req, res) => {
    const {
        topic,
        criteria,
        marks,
        type
    } = req.body;

    const result = await RubricModel.find();
    const rubricCount = result.length;

    // generate new rubric ID for marking rubric
    const newRubricID = `R${rubricCount + 1}`;

    const mongooseRes = new RubricModel({
        rubricID: newRubricID,
        topic,
        criteria,
        marks,
        type
    });

    console.log(mongooseRes);
    mongooseRes.save().then((result) => {
        res.status(200).json({
            message: "rubric added successfully",
            result: {
                data: result,
                response: true,
            },
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Error while adding rubric",
            error: err,
        });
    });
};

// get all rubrics
const getRubrics = async (req, res) => {
    let results = await RubricModel.find();
  if (!results) {
    res.status(500).json({
      message: "Error while getting all runbrics",
      error: "Something went wrong",
    });
  } else {
    res.status(200).json({
      message: "All rubrics details",
      data: results,
    });
  }
};

// create update function for rubric
const updateRubric = async (req, res) => {
    const {
        rubricID,
        topic,
        criteria,
        marks,
        type
    } = req.body;

    const result = await RubricModel.findOneAndUpdate({
        rubricID: rubricID
    }, {
        topic: topic,
        criteria: criteria,
        marks: marks,
        type: type
    });

    if (!result) {
        res.status(500).json({
            message: "Error while updating rubric",
            error: "Something went wrong",
        });
    } else {
        res.status(200).json({
            message: "Rubric updated successfully",
            data: result,
        });
    }
};



export {addRubric,getRubrics,updateRubric};
