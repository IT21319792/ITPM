import express from 'express';
import { createGroup, getAllGroups, updateGroup, deleteGroup, searchGroup, getMyGroup, getAllGroupsWithDetails } from '../../controllers/studentControllers/GroupController.js';
import { LoginValidator } from '../../middlewares/LoggedIn.js';


const GroupRouter = express.Router();

GroupRouter.get('/mygroup',LoginValidator, getMyGroup);
GroupRouter.get('/get-all-groups', getAllGroups);
GroupRouter.get('/get-all-groups-with-details', getAllGroupsWithDetails);
GroupRouter.post('/create-group', createGroup);
GroupRouter.put('/updateGroup/:id', updateGroup);
GroupRouter.delete('/delete-group/:id', LoginValidator, deleteGroup);
GroupRouter.get('/search-group/:key', searchGroup);



export default GroupRouter;