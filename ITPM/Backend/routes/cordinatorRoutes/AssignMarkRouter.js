import express from 'express';
import { AssignMark, getAssignMark, updateAssignMark, deleteAssignMarks,getOneAssignMark } from '../../controllers/cordinatorControllers/AssignMarkController.js';

const AssignMarkRouter = express.Router();
AssignMarkRouter.get('/', getAssignMark);
AssignMarkRouter.post('/add', AssignMark);
AssignMarkRouter.put('/update/:id', updateAssignMark);
AssignMarkRouter.delete('/delete/:id', deleteAssignMarks);
AssignMarkRouter.get('/get/:id', getOneAssignMark);

export default AssignMarkRouter;