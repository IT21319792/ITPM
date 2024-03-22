import express from "express";
import {
  addRubric,
  getRubrics,
  updateRubric,
  deleteRubric,
  searchRubricByTopic,
  searchRubricByType,
  searchRubricByRubricID,
} from "../../controllers/projectMemberControllers/RubricController.js";
const RubricRouter = express.Router();

RubricRouter.post("/addrubric", addRubric);
RubricRouter.get("/getrubrics", getRubrics);
RubricRouter.put("/putrubric/:id", updateRubric);
RubricRouter.delete("/deleterubric/:id", deleteRubric);
RubricRouter.get("/searchrubrictype/:key", searchRubricByType);
RubricRouter.get("/searchrubrictopic/:key", searchRubricByTopic);
RubricRouter.get("/searchrubricbyid/:key", searchRubricByRubricID);

export default RubricRouter;
