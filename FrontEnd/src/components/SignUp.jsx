
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';

function SignUp() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', contactNo: '', password: '', confirm_password: '', address: '' })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Map staff post to level
    //level 1 kenekta = cordinator, pMember, supervisor knk wenna puluwan
    //level 2 kenekta = pMember, supervisor, examiner knk wenna puluwan
    //level 3 kenekta = examiner knk wenna puluwan

    //cordinator wenna puluwa --> level 1 kenekta
    //pMember wenna puluwa --> level 1,2 kenekta
    //supervisor wenna puluwa --> level 1,2 kenekta
    //examiner wenna puluwa --> level 2,3 kenekta
    const levelMap = {
        "Chancellor": 1,
        "Vice-Chancellor": 1,
        "Deans": 1,
        "Department Chairs/Heads": 1,
        "Professors": 2,
        "Associate Professors": 2,
        "Assistant Professors": 2,
        "Assistant Lecturer": 3,
        "Lecturers": 3,
        "Senior Lecturers": 2,
        "Instructors": 3
    };
    // Retrieve the selected staff post from the form data
    const selectedStaffPost = formData.staffPost;
    // Determine the level based on the selected staff post
    const level = levelMap[selectedStaffPost];
    
    // Update form data with the role
    const updatedFormData = {
        ...formData,
        level: level,
        role: ['staff'],
    };

    axios.post('http://localhost:510/user/create', updatedFormData)
        .then(() => {
            alert('User created successfully');
            console.log('User created successfully');
            navigate('/studentlogin');
        })
        .catch((err) => {
            console.log('Form data:', updatedFormData);
            console.log('Error:', err);
            alert(err.response.data.message);
        });
};


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

            <select
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="staffPost"
              id="staffPost"
              onChange={handleChange}
            >
              <option value="">Select Staff Post</option>
              <option value="Chancellor">Chancellor</option>
              <option value="Vice-Chancellor">Vice-Chancellor</option>
              <option value="Deans">Deans</option>
              <option value="Department Chairs/Heads">Department Chairs/Heads</option>
              <option value="Professors">Professors</option>
              <option value="Associate Professors">Associate Professors</option>
              <option value="Assistant Professors">Assistant Professors</option>
              <option value="Assistant Lecturer">Assistant Lecturer</option>
              <option value="Lecturers">Lecturers</option>
              <option value="Senior Lecturers">Senior Lecturers</option>
              <option value="Instructors">Instructors</option>
            </select>


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