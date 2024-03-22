import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

function AddStudents() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', contactNo: '', password: '', confirm_password: '', address: '', specialization: 'it', semester: 'semester1', role: 'student' });
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
                navigate('/dashboard/adminDash');
                toast.success('Student created successfully');
            })
            .catch((err) => {
                console.log('Error:', err);
                if (err.response && err.response.data && err.response.data.message) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error('An error occurred while creating the student');
                }
            });
    };
    

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Create Student Account</h1>
                    <form onSubmit={handleSubmit} className="mb-4 md:flex md:flex-wrap md:justify-between">
                        <div className='flex gap-2 w-full'>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            type="email"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="contactNo"
                            placeholder="Contact No"
                            value={formData.contactNo}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                        />
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Specialization:</label>
                            <select
                                className="block border border-grey-light w-full p-3 rounded"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                            >
                                <option value="it">IT</option>
                                <option value="se">SE</option>
                                <option value="csne">CSNE</option>
                                <option value="ds">DS</option>
                                <option value="cs">CS</option>
                                <option value="im">IM</option>
                                <option value="ise">ISE</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Semester:</label>
                            <select
                                className="block border border-grey-light w-full p-3 rounded"
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                            >
                                <option value="semester1">Semester 1</option>
                                <option value="semester2">Semester 2</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="role"
                            placeholder="Role"
                            value={formData.role}
                            onChange={handleChange}
                            disabled
                        />
                        <button
                            type="submit"
                            className="w-full text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        >
                            Add Student
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddStudents;
