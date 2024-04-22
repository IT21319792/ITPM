
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';

function SignUp() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', contactNo: '', password: '', confirm_password: '', address: ''})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      role: ['staff'],
      [e.target.name]: e.target.value
    })
  }
 const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:510/user/create', formData)
      .then(() => {
        alert('User created successfully')
        console.log('User created successfully')//alert('User created successfully')
        console.log('Form data:', formData)
        navigate('/login')
      })
      .catch((err) => {
        console.log('Form data:', formData)
        console.log('Error:', err)//alert('User creation failed')
        alert(err.response.data.message)
      })
  }

  return (

    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Staff Signup</h1>
          <form onSubmit={handleSubmit} className="mb-4 md:flex md:flex-wrap md:justify-between" action="/signup/" method="post">

            <div className='flex gap-2 w-full'>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="firstName"
                placeholder="First Name"
                id='firstName'
                onChange={handleChange} />

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="lastName"
                placeholder="Last Name"
                id='lastName'
                onChange={handleChange} />


            </div>



            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              id='email'
              onChange={handleChange} />


            <input
              type="tel"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="contactNo"
              placeholder="contact No"
              id='contactNo'
              onChange={handleChange} />

            <input
              type="string"
              className="block border border-grey-light w-full h-48 p-3 rounded mb-4"
              name="address"
              placeholder="Address"
              id='address'
              onChange={handleChange} />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              id='password'
              onChange={handleChange} />



            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
              id='confirm_password'
              onChange={handleChange}
            />



            <button
              type="submit" className="w-full text-center  bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Sign Up
            </button>
            <div>
              <p className='text-red-600 text-center'>

              </p>
            </div>



          </form>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Terms of Service
            </a> and
            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6 flex gap-2">
          <p>Already have an account? </p>
          <Link to="/login" >
            <span className="no-underline border-b border-blue text-blue-700" href="../login/">
              Log in
            </span>
          </Link>
          <Button
            variant="text"
            color="primary"
            sx={{ textDecoration: 'none', borderBottom: '1px solid blue', color: 'blue' }}
            onClick={() => navigate('/studentsignup')}
          >
            Student Signup
          </Button>

        </div>
      </div>
    </div>
  )
}

export default SignUp;