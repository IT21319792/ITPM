import express from 'express';
import { createSupervisorList, deleteSupervisorById, getSupervisorById, getSupervisorsList, updateSupervisorById } from '../../controllers/cordinatorControllers/SupervisorListControlelr.js';

const SupervisorListRouter = express.Router();

SupervisorListRouter.post('/add',createSupervisorList);
SupervisorListRouter.get('get/:id',getSupervisorById);
SupervisorListRouter.put('update/:id',updateSupervisorById);
SupervisorListRouter.delete('delete/:id',deleteSupervisorById);
SupervisorListRouter.get('/',getSupervisorsList);

export default SupervisorListRouter;