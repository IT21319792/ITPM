import express from 'express';
import { createSupervisor, deleteSupervisorById, getSupervisorById, getSupervisors, updateSupervisorById } from '../../controllers/cordinatorControllers/SupervisorController.js';

const SupervisorRouter = express.Router();

SupervisorRouter.post('/add',createSupervisor);
SupervisorRouter.get('get/:id',getSupervisorById);
SupervisorRouter.put('update/:id',updateSupervisorById);
SupervisorRouter.delete('delete/:id',deleteSupervisorById);
SupervisorRouter.get('/',getSupervisors);

export default SupervisorRouter;