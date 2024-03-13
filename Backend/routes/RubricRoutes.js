import express from 'express';
import  {addRubric,getRubrics,updateRubric,deleteRubric} from '../controllers/RubricController.js';
const RubricRouter = express.Router();

RubricRouter.post('/addrubric', addRubric);
RubricRouter.get('/getrubrics', getRubrics);
RubricRouter.put('/putrubric/:id', updateRubric);

export default RubricRouter;


