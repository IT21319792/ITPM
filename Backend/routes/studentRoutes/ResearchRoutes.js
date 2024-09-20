import express from 'express';
import { createResearch, getAllResearch, deleteResearch, updateResearch, getOneResearch, getMyResearch } from '../../controllers/studentControllers/ResearchController.js';
import { LoginValidator } from '../../middlewares/LoggedIn.js';

const researchRouter = express.Router();

researchRouter.get('/myResearch', LoginValidator, getMyResearch);
researchRouter.get('/', getAllResearch);
researchRouter.get('/:id', getOneResearch);
researchRouter.post('/', createResearch);
researchRouter.delete('/:id', deleteResearch);
researchRouter.put('/:id', updateResearch);

export default researchRouter;
