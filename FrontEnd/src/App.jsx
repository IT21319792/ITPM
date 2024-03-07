import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import StudentDash from './pages/student/StudentDash';
import AdminDash from './pages/admin/AdminDash';




function App() {

  return(
    <BrowserRouter>

      <Routes>
        
          {/* Admin Routes  */}
          <Route path='adminDash' element={<AdminDash />} />


          {/* Student Routes  */}
          <Route path='studentDash' element={<StudentDash />} />
     
    
      </Routes>
    
    
    </BrowserRouter>

  );


}


export default App;