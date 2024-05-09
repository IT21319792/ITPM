import express from 'express';
<<<<<<< HEAD
import { CreateStudent, StudentLogin, deleteStudent, getSameSemesterSpecializationStudents, getStudentDetails, submitAssignment, updateStudent} from '../../controllers/studentControllers/StudentController.js';
import { getAllAssignments } from '../../controllers/cordinatorControllers/AddAssignmentController.js';
=======
import { CreateStudent, StudentLogin, deleteStudent, getSameSemesterSpecializationStudents, getStudentDetails, updateStudent} from '../../controllers/studentControllers/StudentController.js';
>>>>>>> bd0b13a62b3ccfa1f97ee4acd2692aac83ed8ebf
import { LoginValidator } from '../../middlewares/LoggedIn.js';

const StudentRouter = express.Router();

StudentRouter.get('/get-student', LoginValidator, getStudentDetails);
StudentRouter.post('/s-login', StudentLogin);
StudentRouter.post('/create', CreateStudent);
// StudentRouter.post('/student/send-email', sendNewEmail);
StudentRouter.delete('/delete-student/:id', deleteStudent);
StudentRouter.put('/update-student/:id', updateStudent);
StudentRouter.get('/get-same-semester-specialization-students', getSameSemesterSpecializationStudents);
<<<<<<< HEAD
StudentRouter.get('/assignments', getAllAssignments);
StudentRouter.post('/submit-assignment', submitAssignment);
=======
>>>>>>> bd0b13a62b3ccfa1f97ee4acd2692aac83ed8ebf

export default StudentRouter;