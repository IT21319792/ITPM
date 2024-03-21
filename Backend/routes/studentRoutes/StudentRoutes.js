import express from 'express';
import { CreateStudent, StudentLogin, deleteStudent, getStudentDetails, updateStudent} from '../../controllers/studentControllers/StudentController.js';
import { LoginValidator } from '../../middlewares/LoggedIn.js';

const StudentRouter = express.Router();

StudentRouter.get('/get-student', LoginValidator, getStudentDetails);
StudentRouter.post('/login', StudentLogin);
StudentRouter.post('/create', CreateStudent);
// StudentRouter.post('/student/send-email', sendNewEmail);
StudentRouter.delete('/delete-student/:id', deleteStudent);
StudentRouter.put('/update-student/:id', updateStudent);

export default StudentRouter;