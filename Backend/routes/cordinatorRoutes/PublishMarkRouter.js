import express from 'express';
import { addPublishedMark, deletePublishedMark, getPublishedMarkById, getPublishedMarks } from '../../controllers/cordinatorControllers/PublishMarkController.js';

const PublishRouter = express.Router();

PublishRouter.post('/add', addPublishedMark);
PublishRouter.post('/', addPublishedMark);
PublishRouter.get('/', getPublishedMarks);
PublishRouter.get('/:id', getPublishedMarkById);
PublishRouter.delete('/:id', deletePublishedMark);


export default PublishRouter;
