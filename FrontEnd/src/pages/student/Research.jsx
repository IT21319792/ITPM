import React, { useState } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function Research() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleFileChange = (event) => {
        // Handle file change logic here
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    const sampleData = ['John', 'Jane', 'Doe'];

    return (
        <>
            <div className="main_container w-full h-full">
                <div className="item fw-bold text-center">
                    <h5 className="pageName">Research Paper Submission</h5>
                </div>
                <div className="card p-5">
                    <div className="smallcard row max-w-5xl mx-auto border rounded-md py-10 px-10">
                        <div className="col-md-6">
                            <form id="itemForm" className="ml-7">
                                <div className="grid grid-cols-2">
                                    <div className="col">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="group "
                                        >
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Title"
                                            className="block min-w-[885px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                            name="topic"
                                        />

                                    </div>
                                </div>
                                <div className="grid grid-cols-2 mt-10">
                                    <div className="col">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="group "
                                        >
                                            Student1
                                        </label>
                                        <div className="relative h-10 w-72 min-w-[425px]">
                                            <select
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                name="GroupID"
                                            >
                                                <option defaultValue="Select Group">Select Student 1</option>
                                                <option value="IT21158186">IT21158186</option>
                                                <option value="IT21158187">IT21158187</option>
                                                <option value="IT21158188">IT21158188</option>
                                                <option value="IT21158189">IT21158189</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="group "
                                        >
                                            Student2
                                        </label>
                                        <div className="relative h-10 w-72 min-w-[425px]">
                                            <select
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                name="GroupID"
                                            >
                                                <option defaultValue="Select Group">Select Student 1</option>
                                                <option value="IT21158186">IT21158186</option>
                                                <option value="IT21158187">IT21158187</option>
                                                <option value="IT21158188">IT21158188</option>
                                                <option value="IT21158189">IT21158189</option>
                                            </select>
                                        </div>
                                    </div>



                                    <div className="col">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="group "
                                        >
                                            Student3
                                        </label>
                                        <div className="relative h-10 w-72 min-w-[425px]">
                                            <select
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                name="GroupID"
                                            >
                                                <option defaultValue="Select Group">Select Student 3</option>
                                                <option value="IT21158186">IT21158186</option>
                                                <option value="IT21158187">IT21158187</option>
                                                <option value="IT21158188">IT21158188</option>
                                                <option value="IT21158189">IT21158189</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className="col">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="group "
                                        >
                                            Student4
                                        </label>
                                        <div className="relative h-10 w-72 min-w-[425px]">
                                            <select
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                name="GroupID"
                                            >
                                                <option defaultValue="Select Group">Select Student 4</option>
                                                <option value="IT21158186">IT21158186</option>
                                                <option value="IT21158187">IT21158187</option>
                                                <option value="IT21158188">IT21158188</option>
                                                <option value="IT21158189">IT21158189</option>
                                            </select>
                                        </div>
                                    </div>




                                    {/*Superviser input starts here*/}
                                    <div className="col mt-10">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="group "
                                        >
                                            Supervisor1
                                        </label>
                                        <div className="relative h-10 w-72 min-w-[425px]">
                                            <select
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                name="GroupID"
                                            >
                                                <option defaultValue="Select Group">Select Supervisor 1</option>
                                                <option value="IT21158186">IT21158186</option>
                                                <option value="IT21158187">IT21158187</option>
                                                <option value="IT21158188">IT21158188</option>
                                                <option value="IT21158189">IT21158189</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/*Superviser input starts here*/}
                                    <div className="col mt-10">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="group "
                                        >
                                            Supervisor2
                                        </label>
                                        <div className="relative h-10 w-72 min-w-[425px]">
                                            <select
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                name="GroupID"
                                            >
                                                <option defaultValue="Select Group">Select Supervisor 2</option>
                                                <option value="IT21158186">IT21158186</option>
                                                <option value="IT21158187">IT21158187</option>
                                                <option value="IT21158188">IT21158188</option>
                                                <option value="IT21158189">IT21158189</option>
                                            </select>
                                        </div>
                                    </div>













                                </div>
                                <br></br>
                                <div>
                                    {/* Image Upload part */}
                                    <input
                                        accept="image/*"
                                        id="file-upload"
                                        type="file"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <InputLabel htmlFor="file-upload">Acceptance Letter Image</InputLabel>
                                    <label htmlFor="file-upload">
                                        <Button variant="contained" component="span">
                                            Upload Image
                                        </Button>
                                    </label>

                                    <div>
                                        {/* Submission buttons part */}
                                        <br></br>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', width: 'calc(50% - 4px)' }}>
                                            <Button
                                                style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '8px' }}
                                                variant="contained"
                                                fullWidth
                                                type="submit"
                                            >
                                                Add
                                            </Button>
                                            <div style={{ width: '8px' }}></div> {/* This adds space between buttons */}
                                            <Button
                                                style={{ backgroundColor: '#f44336', color: 'white' }}
                                                variant="contained"
                                                fullWidth
                                                component={Link}
                                                to="/inventory"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
