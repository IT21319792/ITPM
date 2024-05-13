import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
import { dbConfig } from './utils/dbConfig.js';
import cors from 'cors';
import userRouter from './routes/UserRoutes.js';
import RubricRouter from './routes/projectMemberRoutes/RubricRoutes.js';
import ScheduleRouter from './routes/projectMemberRoutes/SchedulePresentationRoutes.js';

import { assign } from 'nodemailer/lib/shared/index.js';
import AssignMarkRouter from './routes/cordinatorRoutes/AssignMarkRouter.js';
import AssignShedulerouter from './routes/cordinatorRoutes/AssignSheduleRouter.js';
import AddMarkRouter from './routes/examinerRoutes/AddMarkRouter.js';
import AddAssignmentRouter from './routes/cordinatorRoutes/AddAssignmentRouter.js';
import StudentRouter from './routes/studentRoutes/StudentRoutes.js';
import GroupRouter from './routes/studentRoutes/GroupRoutes.js';
import AddRepoMarkRouter from './routes/supervisorRoutes/AddReportMarkRouter.js';
import researchRouter from './routes/studentRoutes/ResearchRoutes.js';
import bodyparser from 'body-parser';
import nodemailer from 'nodemailer';
import { sendLoginOTP } from './controllers/studentControllers/StudentController.js';
import PrMemberRouter from './routes/cordinatorRoutes/PrMemberRouter.js';
import SupervisorRouter from './routes/cordinatorRoutes/SupervisorRoutes.js';

// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');


// Function to generate a random 4-digit OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
}

// Function to send OTP via email
export async function sendOTP(email, otp) {
    let transporter = nodemailer.createTransport({
        // Your email configuration
        // Example for Gmail:
        service: 'Gmail',
        auth: {
            user: 'dknimzara@gmail.com',
            pass: 'vgmideeikciunyuk'
        }
    });

    let info = await transporter.sendMail({
        from: '"Your Name" <dknimzara@gmail.com>',
        to: email,
        subject: 'Your OTP',
        text: `Your OTP for login is: ${otp}`,
    });

    console.log('Message sent: %s', info.messageId);
}


const PORT = process.env.PORT || 510;
const app = express();
app.use(express.json());
dotenv.config();

app.use(morgan('dev'));
app.use(cors());
app.get('/', async (req, res) => {
    res.status(200).json('Server is up and running');
})
// Route to send OTP


//Admin Routes
app.use('/user', userRouter);
app.use('/rubric', RubricRouter);
app.use('/schedule', ScheduleRouter);
app.use('/assignMark', AssignMarkRouter);
app.use('/assignShedule', AssignShedulerouter);
app.use('/presentation', AddMarkRouter)
app.use('/assignment', AddAssignmentRouter);
app.use('/student', StudentRouter);
app.use('/group', GroupRouter);
app.use('/report', AddRepoMarkRouter);
app.use('/research', researchRouter);
app.use('/prmember', PrMemberRouter);
app.use('/supervisor',SupervisorRouter);

dbConfig().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is up and running on 🚀 @http://localhost:${PORT}`);
    })
}).catch((err) => {
    console.log(err);

})

