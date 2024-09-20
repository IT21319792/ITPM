import mongoose from "mongoose";

const Schema = mongoose.Schema;
const RubricSchema = new Schema(
  {
    rubricID: { type: String, required: true, unique: true },
    topic: { type: String, required: true },
    criteriaDetails: { type: Array, default: [], required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

const RubricModel = mongoose.model("rubrics", RubricSchema);
export default RubricModel;
