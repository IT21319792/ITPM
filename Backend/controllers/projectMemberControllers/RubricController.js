import RubricModel from "../../models/projectMemberModels/RubricModel.js";

// add new rubric
const addRubric = async (req, res) => {
  const { topic, type, criteriaDetails } = req.body;

  const result = await RubricModel.find();
  const rubricCount = result.length;

  // generate new rubric ID for marking rubric
  const newRubricID = `R${rubricCount + 1}`;

  const mongooseRes = new RubricModel({
    rubricID: newRubricID,
    topic,
    criteriaDetails,
    type,
  });

  console.log(mongooseRes);
  mongooseRes
    .save()
    .then((result) => {
      res.status(200).json({
        message: `${type} rubric added successfully`,
        result: {
          data: result,
          response: true,
          status: 200,
        },
      });
    })
    .catch((err) => {
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
  const id = req.params.id;
  const { rubricID, topic, type, criteriaDetails } = req.body;

  console.log("id", id);
  console.log("topic", topic);
  console.log("type", type);
  console.log("criteriaDetails", criteriaDetails);

  const response = await RubricModel.findOneAndUpdate(
    { rubricID: rubricID },
    {
      topic: topic,
      type: type,
      criteriaDetails: criteriaDetails,
    }
  );
  if (!response) {
    res.status(500).send("Error while updating rubric");
  } else {
    res.status(200).json({
      message: "Rubric Updated successfully",
      result: {
        data: response,
        response: true,
        status: 200,
      },
    });
  }
};

// delete rubric
const deleteRubric = async (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  const response = await RubricModel.findOneAndDelete({ rubricID: id });
  if (!response) {
    res.status(500).send("Error while deleting rubric");
  } else {
    res.status(200).json({
      message: "Rubric Deleted successfully",
      result: {
        data: response,
        response: true,
        status: 200,
      },
    });
  }
};

// create search function to search by rubric ID , topic name, and type

const searchRubricByType = async (req, res) => {
  const data = req.params.key;
  let result = await RubricModel.find({ type: data });
  res.status(200).json({
    message: "Rubric Search By Type details",
    data: result,
  });
};

const searchRubricByTopic = async (req, res) => {
  const data = req.params.key;
  let result = await RubricModel.find({ topic: data });
  res.status(200).json({
    message: "Rubric Search By Topic details",
    data: result,
  });
};

const searchRubricByRubricID = async (req, res) => {
  const data = req.params.key;
  let result = await RubricModel.findById(data);
  res.status(200).json({
    message: "Rubric Search By RubricID details",
    data: result,
  });
};

export {
  addRubric,
  getRubrics,
  updateRubric,
  deleteRubric,
  searchRubricByTopic,
  searchRubricByType,
  searchRubricByRubricID,
};
