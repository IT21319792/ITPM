import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ScoreIcon from '@mui/icons-material/Score';
import NotificationsIcon from '@mui/icons-material/Notifications';


{/*Admin Lists bucket for the sidebar navigations */ }
export const adminListItems = (
  <React.Fragment>
    
    <Link to={'/dashboard/adminDash'}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/notices'}>
      <ListItemButton>
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText primary="Notices" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/userMNG'}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Users" />
      </ListItemButton>
    </Link>
    
  </React.Fragment>

);


{/*Student Lists bucket for the sidebar navigations */ }
export const studentListItems = (
  <React.Fragment>

    <Link to={'/dashboard/studentDash'}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/assignments'}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Assignments" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/research'}>
      <ListItemButton>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Research" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/myResults'}>
      <ListItemButton>
        <ListItemIcon>
          <ScoreIcon />
        </ListItemIcon>
        <ListItemText primary="My Results" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/myTeam'}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="My Team" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/notifications'}>
      <ListItemButton>
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItemButton>
    </Link>

  </React.Fragment>
);


{/*Examinar Lists bucket for the sidebar navigations */ }
export const examinarListItems = (
  <React.Fragment>
    
    <Link to={'/dashboard/examinarDash'}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/marksAssignments'}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Assignemnts" />
      </ListItemButton>
    </Link>

  
  </React.Fragment>

);


{/*Supervisor Lists bucket for the sidebar navigations */ }
export const supervisorListItems = (
  <React.Fragment>
    
    <Link to={'/dashboard/supervisorDash'}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/reports'}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
    </Link>

  
  </React.Fragment>

);


{/*Project Member Lists bucket for the sidebar navigations */ }
export const memberListItems = (
  <React.Fragment>
    
    <Link to={'/dashboard/pMemberDash'}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/markingRubric'}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Marking" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/publishAssignments'}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Assignemnts" />
      </ListItemButton>
    </Link>

  
  </React.Fragment>

);

{/*Co-ordinator Lists bucket for the sidebar navigations */}
export const cordinatorListItems = (
  <React.Fragment>
    
    <Link to={'/dashboard'}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/proMembers'}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Project Members" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/examiners'}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Examiners" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/supervisors'}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="supervisors" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/stdDetails'}>
      <ListItemButton>
        <ListItemIcon>
          <ScoreIcon />
        </ListItemIcon>
        <ListItemText primary="Student Details" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/assignmentDetails'}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Assignments" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/presentationDetails'}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Presentation & Report Details" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/marking'}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Marking" />
      </ListItemButton>
    </Link>


  
  </React.Fragment>
);