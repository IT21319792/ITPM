import express from 'express';
import { CreateStudent, StudentLogin, deleteStudent, getSameSemesterSpecializationStudents, getStudentDetails, updateStudent} from '../../controllers/studentControllers/StudentController.js';
import { LoginValidator } from '../../middlewares/LoggedIn.js';

const StudentRouter = express.Router();

StudentRouter.get('/get-student', LoginValidator, getStudentDetails);
StudentRouter.post('/s-login', StudentLogin);
StudentRouter.post('/create', CreateStudent);
// StudentRouter.post('/student/send-email', sendNewEmail);
StudentRouter.delete('/delete-student/:id', deleteStudent);
StudentRouter.put('/update-student/:id', updateStudent);
StudentRouter.get('/get-same-semester-specialization-students', getSameSemesterSpecializationStudents);

export default StudentRouter;