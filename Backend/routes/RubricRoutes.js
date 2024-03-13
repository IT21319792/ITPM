import express from 'express';
import  {addRubric,getRubrics} from '../controllers/RubricController.js';
const RubricRouter = express.Router();

RubricRouter.post('/addrubric', addRubric);
RubricRouter.get('/getrubrics', getRubrics);

export default RubricRouter;


