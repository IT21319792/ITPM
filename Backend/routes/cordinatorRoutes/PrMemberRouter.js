import express from 'express';
import { createPrMember, getPrMembers, getPrMemberById, updatePrMember, deletePrMember } from '../../controllers/cordinatorControllers/PrMemberController.js';


const PrMemberRouter = express.Router();
PrMemberRouter.get('/', getPrMembers);
PrMemberRouter.post('/add', createPrMember);
PrMemberRouter.get('/search', getPrMemberById);
PrMemberRouter.put('/update/:id', updatePrMember);
PrMemberRouter.delete('/delete/:id', deletePrMember);

export default PrMemberRouter;