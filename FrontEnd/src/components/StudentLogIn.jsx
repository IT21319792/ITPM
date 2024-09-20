import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";

function StudentLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:510/student/s-login", formData)
      .then((res) => {
        Cookies.set("role", res.data.userRole);
        Cookies.set("firstName", res.data.firstName);
        Cookies.set("token", res.data.token);

        if (res.data.userRole == "student") {
          navigate(`/s-login-otp?email=${formData.email}`);
        }

        toast.success(`${res.data.userRole}, successfully Logged In!`);
        console.log(res); //alert('Student Logged In successfully')
      })
      .catch((err) => {
        console.log("Error:", err); //alert('Student Logged In failed')
        alert(err.response.data.message);
      });
  };

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <div className="container max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Student Log In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-gray-700">
          <p>
            Cannot Sign In?{" "}
            <span className="text-blue-500 cursor-pointer">
              Contact Administrators!
            </span>
          </p>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "blue",
              color: "white",
              mt: 2,
              "&:hover": {
                backgroundColor: "darkblue",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Staff Login
          </Button>
        </div>
        <div className="mt-6 text-center">
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

export default StudentLogin;
