import express from 'express';
import { CreateStudent} from '../../controllers/studentControllers/StudentController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const studentROuter = express.Router();

// studentROuter.get('/get-user', LoginValidator, getUserDetails);
// studentROuter.post('/login', Login);
studentROuter.post('/create', CreateStudent);
// studentROuter.post('/send-email', sendNewEmail);
// studentROuter.delete('/delete-account/:id', deleteAccount);
// studentROuter.put('/update-account/:id', updateAccount);

export default studentROuter;