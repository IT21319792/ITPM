import express from 'express';
import  {addRubric,getRubrics,updateRubric,deleteRubric} from '../controllers/RubricController.js';
const RubricRouter = express.Router();

RubricRouter.post('/addrubric', addRubric);
RubricRouter.get('/getrubrics', getRubrics);
RubricRouter.put('/putrubric/:id', updateRubric);
RubricRouter.delete('/deleterubric/:id', deleteRubric);

export default RubricRouter;


