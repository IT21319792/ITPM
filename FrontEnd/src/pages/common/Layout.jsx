import * as React from 'react';
import BasicLineChart from '../../components/BasicLineChart';
import TopNav from '../../components/TopNav';
import WelcomeCard from '../../components/WelcomeCard';
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { adminListItems, studentListItems, examinarListItems, supervisorListItems, memberListItems, cordinatorListItems } from '../../components/NavNavigation/listItems';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Layout() {

    const userRole=Cookies.get('role');
    const [navLinks,setNavlinks]=React.useState()
    

    useEffect(() => {
        switch (userRole) {
          case "admin": //Admin
            setNavlinks(adminListItems);
            break;
          case "student": //Student
            setNavlinks(studentListItems);
            break;
          case "examinar": //Examinar
            setNavlinks(examinarListItems);
            break;
          case "supervisor": //Supervisor
            setNavlinks(supervisorListItems);
            break;
          case "member": //Project Member
            setNavlinks(memberListItems);
            break;
          case "co-ordinator": //Co-ordinator
            setNavlinks(cordinatorListItems);
            break;
          
          default:          
            toast.error("Login Expired ! Please Login Again");
            navigate("/");
        }
    
      }, []);


    return (
        <>
            <Sidebar navLinks={navLinks}/>
            
            <div style={{ marginLeft: '240px' }}> {/* Adjust margin based on Sidebar width */}
            
                <TopNav />
                <div style={{ marginTop: '10px', marginLeft:'10px'}}>
                <Outlet />
                </div>
            </div>
        </>
    );
}
