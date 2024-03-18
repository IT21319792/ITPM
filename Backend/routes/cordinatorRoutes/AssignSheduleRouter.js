
import express from 'express';
import { assignShedule, getAssignShedule, updateAssignedShedule, deleteAssignShedule, getOneAssignShedule,searchAssignShedule } from '../../controllers/cordinatorControllers/AssignSheduleController.js';

const AssignShedulerouter = express.Router();

AssignShedulerouter.post('/add',assignShedule);
AssignShedulerouter.get('/',getAssignShedule);
AssignShedulerouter.put('/update/:id',updateAssignedShedule);
AssignShedulerouter.delete('/delete/:id',deleteAssignShedule);
AssignShedulerouter.get('/get/:id',getOneAssignShedule);
AssignShedulerouter.get('/search/:key',searchAssignShedule);

export default AssignShedulerouter;

