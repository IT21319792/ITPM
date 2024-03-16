import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
import { dbConfig } from './utils/dbConfig.js';
import cors from 'cors';
import userRouter from './routes/UserRoutes.js';
import RubricRouter from './routes/RubricRoutes.js';
import ScheduleRouter from './routes/SchedulePresentationRoutes.js';
import MarkRouter from './routes/MarkRoutes.js';


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

//Mark Routes
app.use('/Mark', MarkRouter);

dbConfig().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is up and running on 🚀 @http://localhost:${PORT}`);
    })
}).catch((err)=>{
    console.log(err);
})

