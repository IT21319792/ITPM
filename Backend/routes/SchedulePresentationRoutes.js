import express from 'express';
import  {createSchedule,getSchedules,updateSchedule,deleteSchedule,searchSchedule} from '../controllers/SchedulePresentationController.js';
const SchduleRouter = express.Router();

SchduleRouter.post('/createSchedule', createSchedule);
SchduleRouter.get('/getSchedules', getSchedules);
SchduleRouter.put('/putSchedule/:id', updateSchedule);
SchduleRouter.delete('/deleteSchedule/:id', deleteSchedule);
SchduleRouter.get('/searchSchedule/:key', searchSchedule);

export default SchduleRouter;
