import express from 'express';
import {addPresentationMarks, getAllPresentationMarks,getStudentsWithMarksStatus} from '../../controllers/examinerControlelrs/AddMarkController.js';


const AddMarkRouter = express.Router();
AddMarkRouter.post('/add', addPresentationMarks);
AddMarkRouter.get('/', getAllPresentationMarks);
AddMarkRouter.get('/search/:key', getAllPresentationMarks);
AddMarkRouter.get('/marks/students', getStudentsWithMarksStatus);

export default AddMarkRouter;
