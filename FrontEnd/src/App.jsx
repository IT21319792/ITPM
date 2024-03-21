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
import SchedulePresentation from './pages/projectMember/SchedulePresentation';
import ProjectMemberMng from './pages/co-ordinator/ProjectMemberMng/ProjectMemberMng';
import ExaminerMng from './pages/co-ordinator/ExaminerMng/ExaminerMng';


import AssignmentDetails from './pages/co-ordinator/AssignmentMng/AssignmentDetails';
import AddMarking from './pages/co-ordinator/Markings/AddMarking';
import ProjectMemberAdd from './pages/co-ordinator/ProjectMemberMng/ProjectMemberAdd';
import PresentationDetails from './pages/co-ordinator/PresentationMng/PresentationDetails';
import ProjectMemberAssign from './pages/co-ordinator/ProjectMemberMng/ProjectMemberAssign';
import ExaminerPresentationMarks from './pages/examinar/examinerPresentationMarks';
import ExaminerAdd from './pages/co-ordinator/ExaminerMng/ExaminerAdd';
import SupervisorMng from './pages/co-ordinator/Supervisor Mng/SupervisorMng';
import SupervisorAdd from './pages/co-ordinator/Supervisor Mng/SupervisorAdd';
import StudentMng from './pages/co-ordinator/StdDetailsMng/StudentFinalMarks';
import AssignmentAdd from './pages/co-ordinator/AssignmentMng/AddAssignments';
import ScheduledPresentations from './pages/projectMember/ScheduledPresentations';
import UpdateSchedule from './pages/projectMember/UpdateSchedule';
import StudentMarksTable from './pages/examinar/ExaminerViewMark';
import Rubrics from './pages/projectMember/MarkingReburics/Rubrics';






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
          <Route path='/dashboard' element={<CoDash />} />
          <Route path='/dashboard/proMembers' element={<ProjectMemberMng />} />
          <Route path='/dashboard/addmember' element={<ProjectMemberAdd />} />
          <Route path='/dashboard/assignmember' element={<ProjectMemberAssign />} />
          <Route path='/dashboard/examiners' element={<ExaminerMng />} />
          <Route path='/dashboard/addexaminer' element={<ExaminerAdd />} />
          <Route path='/dashboard/supervisors' element={<SupervisorMng />} />
          <Route path='/dashboard/addSupervisor' element={<SupervisorAdd />} />
          <Route path='/dashboard/stdDetails' element={<StudentMng />} />
          <Route path='/dashboard/assignmentDetails' element={<AssignmentDetails />} />
          <Route path='/dashboard/presentationDetails' element={<PresentationDetails />} />
          <Route path='/dashboard/marking' element={<AddMarking />} />
          <Route path='/dashboard/addAssignments' element={<AssignmentAdd />} />
          



          {/* Examinar Routes  */}
          <Route path='examinarDash' element={<ExaminarDash />} />
          <Route path='/dashboard/marksAssignments' element={<ExaminerPresentationMarks />} />
          <Route path='/dashboard/addMarks' element={<ExaminerPresentationMarks />} />
          <Route path='/dashboard/marks' element={<StudentMarksTable />} />


          {/* Project Member Routes  */}
          <Route path='pMemberDash' element={<PMemberDash />} />
          <Route path='/dashboard/pMemberDash/SchedulePresentation' element={<SchedulePresentation />} />
          <Route path='/dashboard/pMemberDash/ScheduledPresentations' element={<ScheduledPresentations />} />
          <Route path='/dashboard/pMemberDash/ScheduledPresentations/UpdateSchedule/:id' element={<UpdateSchedule />} />
          <Route path='/dashboard/markingRubric' element={<Rubrics />} />




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