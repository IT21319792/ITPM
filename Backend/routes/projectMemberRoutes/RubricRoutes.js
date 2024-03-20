import express from 'express';
import  {addRubric,getRubrics,updateRubric,deleteRubric,searchRubric} from '../../controllers/projectMemberControllers/RubricController.js';
const RubricRouter = express.Router();

RubricRouter.post('/addrubric', addRubric);
RubricRouter.get('/getrubrics', getRubrics);
RubricRouter.put('/putrubric/:id', updateRubric);
RubricRouter.delete('/deleterubric/:id', deleteRubric);
RubricRouter.get('/searchrubric/:key', searchRubric);

export default RubricRouter;


