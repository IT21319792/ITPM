import express from 'express';
import  {addMark,getMark,updateMark,deleteMark,searchMark} from '../controllers/MarkController.js';
const MarkRouter = express.Router();

MarkRouter.post('/addMark', addMark);
MarkRouter.get('/getMark', getMark);
MarkRouter.put('/putMark/:id', updateMark);
MarkRouter.delete('/deleteMark/:id', deleteMark);
MarkRouter.get('/searchMark/:key', searchMark);

export default MarkRouter;
 