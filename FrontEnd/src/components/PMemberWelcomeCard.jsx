import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const PMemberWelcomeCard = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('Loading');
  const cardStyle = {
    minWidth: 200,
    background: '#0B7528',
    position: 'relative',
    margin: '0 5px', // Equal margins on both sides
    paddingLeft: 0, // Removed padding from the left side
  };

  // Retrieve first name from cookies on component mount
  useState(() => {
    setFirstName(Cookies.get('firstName') || 'Backend eken Badu ennaha:(');
  }, []);

  //handle the logout function with deleting all cookies
  const handleLogout = () => {
    Cookies.remove('userRole', { path: '/' });
    Cookies.remove('token', { path: '/' });
    Cookies.remove('pvt', { path: '/' });
    toast.warning('Logout Success!');
    navigate('/login');
  };

  return (
    <>
      <Card sx={cardStyle}>
        <CardContent>
          <Typography variant='h6' gutterBottom className="text-lg font-semibold">
            Welcome, {firstName} to Project Member Dashboard
          </Typography>
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={handleLogout}
            style={{ position: 'absolute', top: 18, right: 15 }}
          >
            Log out
          </Button>
        </CardContent>
      </Card>
      <Typography variant="body2" color="textSecondary" style={{ textAlign: 'right', marginRight: '15px' }}>
        {new Date().toUTCString()} {/* Display current time */}
      </Typography>
    </>
  );
};

export default PMemberWelcomeCard;
