import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {toast} from 'react-toastify';

const CoordinatorWelcomeCard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [firstName, setFirstName] = useState('Loading');
  const [userRole, setUserRole] = useState('Loading');
  // const cardStyle = {
  //   minWidth: 250,
  //   background: 'linear-gradient(to bottom right, #293660, rgba(0, 0, 0, 0)), url(https://cutewallpaper.org/21/school-background-image/Back-To-School-Background-in-2019-School-fonts-Cartoon-.jpg) top right no-repeat',
  //   backgroundSize: 'cover',
  //   position: 'relative',
  // };

  // Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    setFirstName(Cookies.get('firstName') )
    setUserRole(Cookies.get('role') )


    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  //handle the logout function with deleting all cookies
  const handleLogout = () => {

    Cookies.remove('role', { path: '/' });
    Cookies.remove('token', { path: '/' });
    Cookies.remove('pvt', { path: '/' });
    toast.warning('Logout Success!')
    navigate('/login');
  };

  return (
    <Card  className='bg-gradient-to-r from-sky-500 to-indigo-500 mb-3'>

      <CardContent>
        <Typography variant='h5' gutterBottom className="text-2xl font-bold font-medium">
          Welcome, {firstName}
        </Typography>
        <Typography variant="subtitle1" component="div" className="mb-2 text-white font-sans">
          This is {userRole}   Dashboard
        </Typography>
        <Typography variant="body2" color="textSecondary" className="text-xs text-gray-400">
          {currentTime.toUTCString()}
        </Typography>
      </CardContent>
      <Button size="small" onClick={handleLogout} className="mt-4 bg-lightBlue-500 text-white hover:bg-lightBlue-600 hover:text-white">
        Log out
      </Button>

    </Card>
  );
};

export default CoordinatorWelcomeCard;

