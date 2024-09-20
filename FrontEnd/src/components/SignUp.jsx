import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    password: "",
    confirm_password: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const levelMap = {
      Chancellor: 1,
      "Vice-Chancellor": 1,
      Deans: 1,
      "Department Chairs/Heads": 1,
      Professors: 2,
      "Associate Professors": 2,
      "Assistant Professors": 2,
      "Assistant Lecturer": 3,
      Lecturers: 3,
      "Senior Lecturers": 2,
      Instructors: 3,
    };

    const selectedStaffPost = formData.staffPost;
    const level = levelMap[selectedStaffPost];

    const updatedFormData = {
      ...formData,
      level: level,
      role: ["staff"],
    };

    axios
      .post("http://localhost:510/user/create", updatedFormData)
      .then(() => {
        alert("User created successfully");
        console.log("User created successfully");
        navigate("/studentlogin");
      })
      .catch((err) => {
        console.log("Form data:", updatedFormData);
        console.log("Error:", err);
        alert(err.response.data.message);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="container max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Staff Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              name="firstName"
              placeholder="First Name"
              id="firstName"
              onChange={handleChange}
            />
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              name="lastName"
              placeholder="Last Name"
              id="lastName"
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            name="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
          />
          <select
            className="w-full p-3 border border-gray-300 rounded-lg"
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
            className="w-full p-3 border border-gray-300 rounded-lg"
            name="contactNo"
            placeholder="Contact No"
            id="contactNo"
            onChange={handleChange}
          />
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            name="address"
            placeholder="Address"
            id="address"
            onChange={handleChange}
          />
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            name="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
          />
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            name="confirm_password"
            placeholder="Confirm Password"
            id="confirm_password"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-700 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
        <div className="mt-4 flex justify-center gap-4">
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
            onClick={() => navigate("/studentsignup")}
          >
            Student Signup
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
    </div>
  );
}

export default SignUp;
