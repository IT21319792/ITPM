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



export {addRubric};