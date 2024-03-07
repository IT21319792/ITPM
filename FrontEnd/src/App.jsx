import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import StudentDash from './pages/student/StudentDash';
import AdminDash from './pages/admin/AdminDash';
import CoDash from './pages/co-ordinator/CoDash';
import ExaminarDash from './pages/examinar/ExaminarDash';
import PMemberDash from './pages/projectMember/PMemberDash';
import SupervisorDash from './pages/supervisor/SupervisorDash';




function App() {

  return(
    <BrowserRouter>

      <Routes>

          {/* Admin Routes  */}
          <Route path='adminDash' element={<AdminDash />} />


          {/* Student Routes  */}
          <Route path='studentDash' element={<StudentDash />} />


          {/* Co-ordinator Routes  */}
          <Route path='coDash' element={<CoDash />} />


          {/* Examinar Routes  */}
          <Route path='examinarDash' element={<ExaminarDash />} />


          {/* Project Member Routes  */}
          <Route path='pMemberDash' element={<PMemberDash />} />


          {/* Supervisor Routes  */}
          <Route path='supervisorDash' element={<SupervisorDash />} />

          
     
    
      </Routes>
    
    
    </BrowserRouter>

  );


}


export default App;