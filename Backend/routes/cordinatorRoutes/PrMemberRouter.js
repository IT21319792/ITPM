import express from 'express';
import { createPrMember, getPrMembers, getPrMemberById, updatePrMember, deletePrMember, findPrMemberByName } from '../../controllers/cordinatorControllers/PrMemberController.js';


const PrMemberRouter = express.Router();
PrMemberRouter.get('/', getPrMembers);
PrMemberRouter.post('/add', createPrMember);
PrMemberRouter.get('/search', getPrMemberById);
PrMemberRouter.put('/update/:id', updatePrMember);
PrMemberRouter.delete('/delete/:id', deletePrMember);
PrMemberRouter.get('/:firstName', findPrMemberByName);

export default PrMemberRouter;