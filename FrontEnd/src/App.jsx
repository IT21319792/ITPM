import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import StudentDash from './pages/student/StudentDash';
import AdminDash from './pages/admin/AdminDash';
import CoDash from './pages/co-ordinator/CoDash';
import ExaminarDash from './pages/examinar/ExaminarDash';
import PMemberDash from './pages/projectMember/PMemberDash';
import SupervisorDash from './pages/supervisor/SupervisorDash';
import Assignments from './pages/student/Assignments';
import Research from './pages/student/Research';
import MyResults from './pages/student/MyResults';
import MyTeam from './pages/student/MyTeam';
import Notifications from './pages/student/Notifications';
import LandingPage from './pages/common/LandingPage';
import StudentSignUp from './components/StudentSignUp';
import Login from './components/LogIn';
import Layout from './pages/common/Layout';
import Notices from './pages/admin/Notices';
import UserMNG from './pages/admin/UserMNG';
import PublishAssignments from './pages/examinar/PublishAssignments';
import Reports from './pages/supervisor/Reports';






function App() {

  return (
    <BrowserRouter>

      <Routes>


        {/* Common Routes  */}
        <Route path='/' element={<LandingPage />} />
        <Route path='studentsignup' element={<StudentSignUp />} />
        <Route path='login' element={<Login />} />
        <Route path='/dashboard' element={<Layout />} >


          {/* Admin Routes  */}
          <Route path='/dashboard/adminDash' element={<AdminDash />} />
          <Route path='/dashboard/notices' element={<Notices />} />
          <Route path='/dashboard/userMNG' element={<UserMNG />} />


          {/* Student Routes  */}
          <Route path='/dashboard/studentDash' element={<StudentDash />} />
          <Route path='/dashboard/assignments' element={<Assignments />} />
          <Route path='/dashboard/research' element={<Research />} />
          <Route path='/dashboard/myResults' element={<MyResults />} />
          <Route path='/dashboard/myTeam' element={<MyTeam />} />
          <Route path='/dashboard/notifications' element={<Notifications />} />


          {/* Co-ordinator Routes  */}
          <Route path='coDash' element={<CoDash />} />


          {/* Examinar Routes  */}
          <Route path='examinarDash' element={<ExaminarDash />} />
          <Route path='/dashboard/publishAssignments' element={<PublishAssignments />} />


          {/* Project Member Routes  */}
          <Route path='pMemberDash' element={<PMemberDash />} />


          {/* Supervisor Routes  */}
          <Route path='supervisorDash' element={<SupervisorDash />} />
          <Route path='/dashboard/reports' element={<Reports />} />


        </Route>

        {/* other Routes  */}



      </Routes>


    </BrowserRouter>

  );


}


export default App;