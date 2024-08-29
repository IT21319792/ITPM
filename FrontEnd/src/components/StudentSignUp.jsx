import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import TopNav from "../components/TopNav";
import StickyFooter from "./Footer/StickyFooter";

function StudentSignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNo: "",
    email: "",
    aLevelStream: "",
    subject1: "",
    subject1Result: "",
    subject2: "",
    subject2Result: "",
    subject3: "",
    subject3Result: "",
    guardianName: "",
    guardianEmail: "",
    password: "",
    confirm_password: "",
    specialization: "",
    semester: "",
    role: "student",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:510/student/create", formData)
      .then(() => {
        toast.success("Student Account created successfully");
        navigate("/s-login");
      })
      .catch((err) => {
        console.log("Form data:", formData);
        console.log("Error:", err);
        toast.error(
          err.response.data.message || "Student Account creation failed"
        );
      });
  };

  return (
    <>
      {/* <TopNav /> */}
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="container max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Student Sign-Up
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="middleName"
                placeholder="Middle Name"
                onChange={handleChange}
              />
              <input
                type="text"
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="contactNo"
                placeholder="Contact No"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              <select
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="aLevelStream"
                onChange={handleChange}
                required
              >
                <option value="">A/L Stream</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="subject1"
                placeholder="Subject 1"
                onChange={handleChange}
                required
              />
              <select
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="subject1Result"
                onChange={handleChange}
                required
              >
                <option value="">Select Result</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
              <input
                type="text"
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="subject2"
                placeholder="Subject 2"
                onChange={handleChange}
                required
              />
              <select
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="subject2Result"
                onChange={handleChange}
                required
              >
                <option value="">Select Result</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
              <input
                type="text"
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="subject3"
                placeholder="Subject 3"
                onChange={handleChange}
                required
              />
              <select
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="subject3Result"
                onChange={handleChange}
                required
              >
                <option value="">Select Result</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
              <input
                type="text"
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="guardianName"
                placeholder="Guardian Name"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="guardianEmail"
                placeholder="Guardian Email"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />
              <select
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="specialization"
                onChange={handleChange}
                required
              >
                <option value="">Select Specialization</option>
                <option value="it">Information Technology (IT)</option>
                <option value="se">Software Engineering (SE)</option>
                <option value="csne">
                  Computer Science and Network Engineering (CSNE)
                </option>
                <option value="ds">Data Science (DS)</option>
                <option value="cs">Cyber Security (CS)</option>
                <option value="im">Interactive Media (IM)</option>
                <option value="ise">
                  Information Systems Engineering (ISE)
                </option>
              </select>
              <select
                className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="semester"
                onChange={handleChange}
                required
              >
                <option value="">Select Semester</option>
                <option value="semester1">Semester 1</option>
                <option value="semester2">Semester 2</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full p-4 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-700 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/s-login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
          
        </div>
        
        {/* Centered buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "blue",
              color: "white",
              "&:hover": {
                backgroundColor: "darkblue",
              },
            }}
            onClick={() => navigate("/signup")}
          >
            Staff Signup
          </Button>
          <Link to="/">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "green",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
              }}
            >
              Home
            </Button>
          </Link>
        </div>
      </div>
      
      <StickyFooter />
    </>
  );
}

export default StudentSignUp;
