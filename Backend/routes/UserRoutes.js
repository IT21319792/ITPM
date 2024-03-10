import express from 'express';
import { CreateAccount, Login, getUserDetails, sendNewEmail, updateAccount, deleteAccount } from '../controllers/UserController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const userRouter = express.Router();

userRouter.get('/get-user', LoginValidator, getUserDetails);
userRouter.post('/login', Login);
userRouter.post('/create', CreateAccount);
userRouter.post('/send-email', sendNewEmail);
userRouter.delete('/delete-account/:id', deleteAccount);
userRouter.put('/update-account/:id', updateAccount);

export default userRouter;