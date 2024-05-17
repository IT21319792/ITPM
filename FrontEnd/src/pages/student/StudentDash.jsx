import * as React from 'react';
import BasicLineChart from '../../components/BasicLineChart';
import TopNav from '../../components/TopNav';
import WelcomeCard from '../../components/WelcomeCard';
import Sidebar from '../../components/Sidebar';

function StudentDash() {
    return (
        
        <>
        <WelcomeCard />
        <h1>My Progress</h1>
        < BasicLineChart />
        </>
    );
}

export default StudentDash;