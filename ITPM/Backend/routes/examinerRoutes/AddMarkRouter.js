import express from 'express';
import { addPresentationMarks, deletePresentationMarks, getAllPresentationMarks, getPresentationMarkById, getPresentationMarksByGroupId, updatePresentationMarks } from '../../controllers/examinerControlelrs/AddMarkController.js';


const AddMarkRouter = express.Router();
AddMarkRouter.post('/addMark', addPresentationMarks);
AddMarkRouter.get('/', getAllPresentationMarks);
AddMarkRouter.get('/:id', getPresentationMarkById);
AddMarkRouter.put('/update/:id', updatePresentationMarks);
AddMarkRouter.delete('/delete/:id', deletePresentationMarks);
AddMarkRouter.get('/presentationMarks/:groupId', getPresentationMarksByGroupId);


export default AddMarkRouter;