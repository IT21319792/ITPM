import express from 'express';
import { addAssignments,searchAssignments,getAllAssignments, updateAssignment, deleteAssignment } from '../../controllers/cordinatorControllers/AddAssignmentController.js';


const AddAssignmentRouter = express.Router();
AddAssignmentRouter.get('/', getAllAssignments);
AddAssignmentRouter.post('/add', addAssignments);
AddAssignmentRouter.get('/search', searchAssignments);
AddAssignmentRouter.post('/update/:id', updateAssignment);
AddAssignmentRouter.delete('/delete/:id', deleteAssignment);

export default AddAssignmentRouter;
