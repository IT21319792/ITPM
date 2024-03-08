import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import StudentDash from './pages/student/StudentDash';
import AdminDash from './pages/admin/AdminDash';
import CordinatorDash from './pages/co-ordinator/CordinatorDash';
import Supervisor from './pages/supervisor/Supervisor';






function App() {

  return(
    <BrowserRouter>

      <Routes>
        
          {/* Admin Routes  */}
          <Route path='adminDash' element={<AdminDash />} />


          {/* Student Routes  */}
          <Route path='studentDash' element={<StudentDash />} />


          {/* Cordinator Routes  */}
          <Route path='CordinatorDash' element={<CordinatorDash/>} />


          {/* Supervisor Routes  */}
          <Route path='Supervisor' element={<Supervisor/>} />

    

    
      </Routes>
    
    
    </BrowserRouter>

  );


}


export default App;