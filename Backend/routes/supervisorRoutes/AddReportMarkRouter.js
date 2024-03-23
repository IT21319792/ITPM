import express from 'express';
import { addReportMarks,getAllReportMarks,getReportMarkById,updateReportMarks,deleteReportMarks } from '../../controllers/SupervisorControllers/AddReportMarkControlelr.js';

const AddRepoMarkRouter = express.Router();

AddRepoMarkRouter.post('/addMark', addReportMarks);
AddRepoMarkRouter.get('/', getAllReportMarks);
AddRepoMarkRouter.get('/:id', getReportMarkById);
AddRepoMarkRouter.put('/update/:id', updateReportMarks);
AddRepoMarkRouter.delete('/delete/:id', deleteReportMarks);

export default AddRepoMarkRouter;
