import express from 'express';
import { createResearch, getAllResearch, deleteResearch, updateResearch, getOneResearch } from '../../controllers/studentControllers/ResearchController.js';

const researchRouter = express.Router();

researchRouter.post('/', createResearch);
researchRouter.get('/', getAllResearch);
researchRouter.get('/:id', getOneResearch);
researchRouter.delete('/:id', deleteResearch);
researchRouter.put('/:id', updateResearch);

export default researchRouter;
