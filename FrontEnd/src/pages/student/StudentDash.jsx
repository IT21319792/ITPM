import * as React from 'react';
import BasicLineChart from '../../components/BasicLineChart';
import TopNav from '../../components/TopNav';
import WelcomeCard from '../../components/WelcomeCard';
<<<<<<< HEAD
import Sidebar from '../../components/StudentSidebar';
import { Typography } from '@mui/material';
=======
import Sidebar from '../../components/Sidebar';
>>>>>>> 3e7fb9ee920122f5d47fbb96b479a9da9f7e9f1a

function StudentDash() {
    return (
        <>
            <Sidebar /> {/* Move Sidebar to the left corner */}
            
            <div style={{ marginLeft: '240px' }}> {/* Adjust margin based on Sidebar width */}
            
                <TopNav />
<<<<<<< HEAD
                <div style={{ marginTop: '10px', marginLeft:'10px', marginRight: '10px'}}>
                <WelcomeCard />
                </div>
                <div style={{marginLeft:'50px'}}>
                <Typography>My Progress</Typography>
                <BasicLineChart />
                </div>
=======
                <div style={{ marginTop: '10px', marginLeft:'10px'}}>
                <WelcomeCard />
                </div>
                <BasicLineChart />
>>>>>>> 3e7fb9ee920122f5d47fbb96b479a9da9f7e9f1a
            </div>
        </>
    );
}

export default StudentDash;
