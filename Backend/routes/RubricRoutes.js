import express from 'express';
import  {addRubric} from '../controllers/RubricController.js';
const RubricRouter = express.Router();

RubricRouter.post('/addrubric', addRubric);

export default RubricRouter;


