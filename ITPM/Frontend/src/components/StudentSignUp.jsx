import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopNav from '../components/TopNav';
import StickyFooter from './Footer/StickyFooter';

function StudentSignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    contactNo: '',
    email: '',
    aLevelStream: '',
    subject1: '',
    subject1Result: '',
    subject2: '',
    subject2Result: '',
    subject3: '',
    subject3Result: '',
    guardianName: '',
    guardianEmail: '',
    password: '',
    confirm_password: '',
    specialization: '',
    semester: '',
    role: 'student'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:510/student/create', formData)
      .then(() => {
        alert('Student Account created successfully');
        console.log('Student Account created successfully');
       // navigate('/s-login');
      })
      .catch((err) => {
        console.log('Form data:', formData);
        console.log('Error:', err);
        alert(err.response.data.message);
      });
  };

  return (
    <>
    <TopNav/>
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white px-8 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Student Sign-Up</h1>
          <form onSubmit={handleSubmit} className="mb-4 space-y-4" action="/signup/" method="post">
            <div className='grid grid-cols-3 gap-3'>
              <input
                type="text"
                className="block border border-gray-300 w-full p-3 rounded"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
              />

              <input
                type="text"
                className="block border border-gray-300 w-full p-3 rounded"
                name="middleName"
                placeholder="Middle Name"
                onChange={handleChange}
              />

              <input
                type="text"
                className="block border border-gray-300 w-full p-3 rounded"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
              />

              <input
                type="tel"
                className="block border border-gray-300 w-full p-3 rounded"
                name="contactNo"
                placeholder="Contact No"
                onChange={handleChange}
              />

              <input
                type="email"
                className="block border border-gray-300 w-full p-3 rounded"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />

              <select
                className="block border border-gray-300 w-full p-3 rounded"
                name="aLevelStream"
                onChange={handleChange}
              >
                <option value="">A/L Stream</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            <div className='grid grid-cols-2 gap-3'>

              <input
                type="text"
                className="block border border-gray-300 w-full p-3 rounded"
                name="subject1"
                placeholder="Subject 1"
                onChange={handleChange}
              />

              <select
                className="block border border-gray-300 w-full p-3 rounded"
                name="subject1Result"
                onChange={handleChange}
              >
                <option value="">Select Result for Subject 1</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>

              <input
                type="text"
                className="block border border-gray-300 w-full p-3 rounded"
                name="subject2"
                placeholder="Subject 2"
                onChange={handleChange}
              />

              <select
                className="block border border-gray-300 w-full p-3 rounded"
                name="subject2Result"
                onChange={handleChange}
              >
                <option value="">Select Result for Subject 2</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>

              <input
                type="text"
                className="block border border-gray-300 w-full p-3 rounded"
                name="subject3"
                placeholder="Subject 3"
                onChange={handleChange}
              />

              <select
                className="block border border-gray-300 w-full p-3 rounded"
                name="subject3Result"
                onChange={handleChange}
              >
                <option value="">Select Result for Subject 3</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>

              <input
                type="text"
                className="block border border-gray-300 w-full p-3 rounded"
                name="guardianName"
                placeholder="Guardian Name"
                onChange={handleChange}
              />

              <input
                type="email"
                className="block border border-gray-300 w-full p-3 rounded"
                name="guardianEmail"
                placeholder="Guardian Email"
                onChange={handleChange}
              />

              <input
                type="password"
                className="block border border-gray-300 w-full p-3 rounded"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />

              <input
                type="password"
                className="block border border-gray-300 w-full p-3 rounded"
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={handleChange}
              />

              <select
                className="block border border-gray-300 w-full p-3 rounded"
                name="specialization"
                onChange={handleChange}
              >
                <option value="">Select Specialization</option>
                <option value="it">Information Technology (IT)</option>
                <option value="se">Software Engineering (SE)</option>
                <option value="csne">Computer Science and Network Engineering (CSNE)</option>
                <option value="ds">Data Science (DS)</option>
                <option value="cs">Cyber Security (CS)</option>
                <option value="im">Interactive Media (IM)</option>
                <option value="ise">Information Systems Engineering (ISE)</option>
              </select>

              <select
                className="block border border-gray-300 w-full p-3 rounded"
                name="semester"
                onChange={handleChange}
              >
                <option value="">Select Semester</option>
                <option value="semester1">Semester 1</option>
                <option value="semester2">Semester 2</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
            >
              Sign Up
            </button>
            <div>
              <p className='text-red-600 text-center'>
              </p>
            </div>
          </form>
          <div className="text-center text-sm text-gray-700 mt-4">
            By signing up, you agree to the
            <a className="no-underline border-b border-gray-700 text-gray-700" href="#">
              Terms of Service
            </a> and
            <a className="no-underline border-b border-gray-700 text-gray-700" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="text-gray-700 mt-6 flex gap-2">
          <p>Already have an account? </p>
          <Link to="/s-login">
            <span className="no-underline border-b border-blue-500 text-blue-700" href="../login/">
              Log in
            </span>
          </Link>
          <Link
            to="/signup"
            className="text-blue-700 font-semibold hover:underline"
            onClick={() => navigate('/signup')}
          >
            Staff Signup
          </Link>
        </div>
      </div>
    </div>
    <StickyFooter/>
    </>
  );
}

export default StudentSignUp;


