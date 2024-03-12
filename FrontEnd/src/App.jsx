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
import StudentLogin from './components/StudentLogIn';
import StudentSignUp from './components/StudentSignUp';
import AdminLogin from './components/AdminLogIn';






function App() {

  return (
    <BrowserRouter>

      <Routes>


          {/* Admin Routes  */}
          <Route path='adminDash' element={<AdminDash />} />


          {/* Student Routes  */}
          <Route path='studentDash' element={<StudentDash />} />
          <Route path='/assignments' element={<Assignments />} />
          <Route path='/research' element={<Research/>} />
          <Route path='/myResults' element={<MyResults/>} />
          <Route path='/myTeam' element={<MyTeam/>} />
          <Route path='/notifications' element={<Notifications/>} />


          {/* Co-ordinator Routes  */}
          <Route path='coDash' element={<CoDash />} />


          {/* Examinar Routes  */}
          <Route path='examinarDash' element={<ExaminarDash />} />


          {/* Project Member Routes  */}
          <Route path='pMemberDash' element={<PMemberDash />} />


          {/* Supervisor Routes  */}
          <Route path='supervisorDash' element={<SupervisorDash />} />

          {/* other Routes  */}
          <Route path='/' element={<LandingPage />} />
          <Route path='studentlogin' element={<StudentLogin />} />
          <Route path='studentsignup' element={<StudentSignUp/>} />
          <Route path='adminlogin' element={<AdminLogin />} />  


       



    
      </Routes>


    </BrowserRouter>

  );


}


export default App;