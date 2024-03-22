import express from 'express';
import { createGroup, getAllGroups, updateGroup, deleteGroup, searchGroup } from '../../controllers/studentControllers/GroupController.js';

const GroupRouter = express.Router();

GroupRouter.post('/create-group', createGroup);
GroupRouter.get('/get-all-groups', getAllGroups);
GroupRouter.put('/updateGroup/:id', updateGroup);
GroupRouter.delete('/delete-group/:id', deleteGroup);
GroupRouter.get('/search-group/:key', searchGroup);


export default GroupRouter;