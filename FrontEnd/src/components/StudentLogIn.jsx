import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';


function StudentLogin() {

  const navigate=useNavigate()

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', contactNo: '', password: '', confirm_password: '', specialization: '', semester: '', role: '' })
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:510/student/s-login', formData)
    .then((res)=>{
      Cookies.set('role', res.data.userRole);
      Cookies.set('firstName', res.data.firstName)
      Cookies.set('token', res.data.token)
     
      if(res.data.userRole=='student'){
        navigate(`/s-login-otp?email=${formData.email}`)
      }
      

      toast.success(`${res.data.userRole}, successfully Logged In!`)
      console.log(res)//alert('Student Logged In successfully')
    })
    .catch((err)=>{
    console.log('Error:', err)//alert('Student Logged In failed')
    alert(err.response.data.message)
    })
  }


  return (
    
    <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Student Log In</h1>
                    <form onSubmit={handleSubmit} className="mb-4 md:flex md:flex-wrap md:justify-between" action="/signup/" method="post">
                   
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"  
                        id='email'
                        onChange={handleChange}/>


                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" 
                        id='password'
                        onChange={handleChange}/>

                       
               

                    <button   
                    type="submit" className="w-full text-center  bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Sign In
                    </button>
                    <div>
                      <p className='text-red-600 text-center'>
                  
                      </p>
                    </div>

                   

                    </form>
                </div>

                <div className="text-grey-dark mt-6 flex gap-2">
                    <p>Cannot Sign In ? </p>
                    
                    <span className="no-underline border-b border-blue text-blue-700" href="#">
                       Contact Administrators!
                    </span>

                    <Button
            variant="text"
            color="primary"
            sx={{ textDecoration: 'none', borderBottom: '1px solid blue', color: 'blue' }}
            onClick={() => navigate('/login')}
          >
            User Login
          </Button>
                </div>

                <div className="text-grey-dark mt-6 flex gap-2">
                    <Link to='/'>
                    <span className="no-underline border-b border-blue text-blue-700" href="/">
                       Home
                    </span>  
                    </Link> 
                </div>
            </div>
        </div>
  )
}

export default  StudentLogin;