import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const CoordinatorWelcomeCard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [firstName, setFirstName] = useState('Loading');
  const [userRole, setUserRole] = useState('Loading');

  // Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    setFirstName(Cookies.get('firstName'));
    setUserRole(Cookies.get('role'));

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  //handle the logout function with deleting all cookies
  const handleLogout = () => {
    Cookies.remove('role', { path: '/' });
    Cookies.remove('token', { path: '/' });
    Cookies.remove('pvt', { path: '/' });
    toast.warning('Logout Success!');
    navigate('/login');
  };

  return (
    <Card className='bg-gradient-to-r from-sky-500 to-indigo-500 mb-3'>
      <CardContent>
        <Typography variant='h5' gutterBottom className="text-2xl font-bold font-medium text-white">
          Welcome, {firstName}
        </Typography>
        <Typography variant="subtitle1" component="div" className="mb-2 text-white font-sans">
          This is {userRole} Dashboard
        </Typography>
        <Typography variant="body2" color="textSecondary" className="text-xs text-gray-400">
          {currentTime.toUTCString()}
        </Typography>
        <Button
          size="small"
          onClick={handleLogout}
          style={{
            backgroundColor: '#EF4444', 
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#DC2626',
            },
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          Log out
        </Button>
      </CardContent>
    </Card>
  );
};

export default CoordinatorWelcomeCard;