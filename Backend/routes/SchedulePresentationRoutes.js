import express from 'express';
import  {createSchedule,getSchedules,updateSchedule,deleteSchedule} from '../controllers/SchedulePresentationController.js';
const SchduleRouter = express.Router();

SchduleRouter.post('/createSchedule', createSchedule);
SchduleRouter.get('/getSchedules', getSchedules);

export default SchduleRouter;
