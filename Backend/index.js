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


const PORT = process.env.PORT || 510;
const app = express();
app.use(express.json());
dotenv.config();

app.use(morgan('dev'));
app.use(cors());
app.get('/', async (req,res)=>{
    res.status(200).json('Server is up and running');
})

//Admin Routes
app.use('/user',userRouter);
app.use('/rubric', RubricRouter);
app.use('/schedule', ScheduleRouter);
app.use('/assignMark',AssignMarkRouter);
app.use('/assignShedule',AssignShedulerouter);
app.use('/presentation',AddMarkRouter)
app.use('/assignment',AddAssignmentRouter);
app.use('/student', StudentRouter);
app.use('/group', GroupRouter);
app.use('/report',AddRepoMarkRouter);
app.use('/research', researchRouter);

dbConfig().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is up and running on 🚀 @http://localhost:${PORT}`);
    })
}).catch((err)=>{
    console.log(err);
})

