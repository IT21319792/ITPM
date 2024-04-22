import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:510/user/login', formData);
      Cookies.set('role', res.data.userRole);
      Cookies.set('firstName', res.data.firstName);
      Cookies.set('level', res.data.level);
      Cookies.set('staffPost', res.data.staffPost);
      // switch (res.data.userRole) {
      //   case 'admin':
      //     navigate('/dashboard/adminDash');
      //     break;
      //   case 'student':
      //     navigate('/dashboard/studentDash');
      //     break;
      //   case 'examinar':
      //     navigate('/dashboard/examinerDash');
      //     break;
      //   case 'supervisor':
      //     navigate('/dashboard/supervisorDash');
      //     break;
      //   case 'member':
      //     navigate('/dashboard/pMemberDash');
      //     break;
      //   case 'coordinator':
      //     navigate('/dashboard');
      //     break;
      //   default:
      //     navigate('/');
      // }
      // Assuming res.data.userRole is an array of roles
      const userRoles = res.data.userRole;

      // Check if the array includes a certain role
      if (userRoles.includes('admin')) {
        navigate('/dashboard/adminDash');
      } else if (userRoles.includes('student')) {
        navigate('/dashboard/studentDash');
      } else if (userRoles.includes('examinar')) {
        navigate('/main');
      } else if (userRoles.includes('supervisor')) {
        navigate('/dashboard/supervisorDash');
      } else if (userRoles.includes('member')) {
        navigate('/dashboard/pMemberDash');
      } else if (userRoles.includes('coordinator')) {
        navigate('/dashboard');
      } else if (userRoles.includes('staff')) {
        navigate('/main');
      } else {
        navigate('/');
      }
      toast.success(`${res.data.userRole}, successfully Logged In!`);
    } catch (err) {
      console.log('Error:', err);
      toast.error(err.response.data.message || 'User Login failed');
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">User Log In</h1>
          <form onSubmit={handleSubmit} className="mb-4 md:flex md:flex-wrap md:justify-between">
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="text-grey-dark mt-6 flex gap-2">
          <p>Cannot Sign In? Contact Administrators!</p>
          <Button
            variant="text"
            color="primary"
            sx={{ textDecoration: 'none', borderBottom: '1px solid blue', color: 'blue' }}
            onClick={() => navigate('/s-login')}
          >
            Student Login
          </Button>
        </div>
        <div className="text-grey-dark mt-6 flex gap-2">
          <Link to='/'>
            <span className="no-underline border-b border-blue text-blue-700">
              Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
