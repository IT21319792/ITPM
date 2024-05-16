import React, { useState, useEffect } from "react";
import { Button, Checkbox, TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios';
import authAxios from "../utils/authAxios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { uploadFileToCloud } from "../utils/CloudinaryConfig";
import { Box } from "@mui/system";
import jsPDF from "jspdf";

export default function Research() {
    const [members, setMembers] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [myResearch, setMyResearch] = useState({});
    const [myGroup, setMyGroup] = useState({});
    const [isUploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        title: "",
        student1: "",
        student2: "",
        student3: "",
        student4: "",
        supervisor1: "",
        supervisor2: "",
        coSupervisor1: "",
        coSupervisor2: "",
        journalName: "",
        issnNumber: "",
        h5IndexLink: "",
        hIndexLink: "",
        scopusSiteLink: "",
        imageLinkOfAcceptanceLetter: previewImage,
    });

    const handleCancel = () => {
        console.log("Cancelled");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    //set uploaded image to preview
    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            imageLinkOfAcceptanceLetter: previewImage
        }));
    }, [previewImage])


    //Form SUbmission Handelling
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData);
            console.log(previewImage);
            if (!formData.imageLinkOfAcceptanceLetter) {
                throw Error('Image is required')
            }
            const response = await axios.post('http://localhost:510/research/', formData);

            console.log("Research Paper Submitted successfully!");
            toast.success("Research Paper Submitted successfully!");

            <Link to="/dashboard/studentDash">Go to Student Dashboard</Link>

        } catch (error) {
            console.error("Error submitting research paper:", error);
            toast.error("Error submitting research paper. Please try again later.");
        }
    };

    //Get Logged-in user's Research
    const GetMyResearch = async () => {
        try {
            const res = await authAxios.get("http://localhost:510/research/myResearch")
            setMyResearch(res.data[0]);
            console.log(res.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    //Get Logged-in user's Group
    const GetMyGroup = async () => {
        try {
            const res = await authAxios.get("http://localhost:510/group/mygroup");
            setMembers(res.data);
            console.log(res.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };


    //Get All Supervisors
    const [sup, setSup] = useState([])
    const GetSup = async () => {
        try {
            const res = await authAxios.get("http://localhost:510/user/get-all-supervisors");
            setSup(res.data);
            console.log(res.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    //Get ALl Co-Supervisors
    const [cosup, setCoSup] = useState([])
    const GetCoSup = async () => {
        try {
            const res = await authAxios.get("http://localhost:510/user/get-all-cosupervisors");
            setCoSup(res.data);
            console.log(res.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        GetMyResearch();
        GetMyGroup();
        GetSup();
        GetCoSup();
    }, []);


    //set my groupmembers to dropdown
    const [extractedMembers, setExtractedMembers] = useState({});
    useEffect(() => {
        const extracted = members.reduce((acc, member) => {
            acc.member1 = member.member1;
            acc.member2 = member.member2;
            acc.member3 = member.member3;
            acc.member4 = member.member4;
            return acc;
        }, {});

        setExtractedMembers(extracted);
    }, [members]);


    //Image uploading Handle
    const handleImageUpload = async (event) => {
        console.log('file change');
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setSelectedFile(file);
                setUploading(true)
                const resp = await uploadFileToCloud(file)
                setPreviewImage(resp)
                setUploading(false)
            } else {
                alert('Please select an image file.');
            }
        }
    };


    const handleGeneratePDF = () => {
        const doc = new jsPDF();

        // Check if myResearch exists and has data
        if (Object.keys(myResearch).length !== 0) {
            // Set font size for title
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text("My Research Submission Details", 10, 10);

            // Reset font style and size
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);

            // Function to add wrapped text
            const addWrappedText = (text, x, y, maxWidth) => {
                const lines = doc.splitTextToSize(text, maxWidth);
                doc.text(lines, x, y);
                return y + (lines.length * 6); // Adjust line height as needed
            };

            let currentY = 20;
            currentY = addWrappedText(`Title: ${myResearch.title}`, 10, currentY, 180);
            currentY = addWrappedText(`Student 1: ${myResearch.student1}`, 10, currentY, 180);
            currentY = addWrappedText(`Student 2: ${myResearch.student2}`, 10, currentY, 180);
            currentY = addWrappedText(`Student 3: ${myResearch.student3}`, 10, currentY, 180);
            currentY = addWrappedText(`Student 4: ${myResearch.student4}`, 10, currentY, 180);
            currentY = addWrappedText(`Supervisor 1: ${myResearch.supervisor1}`, 10, currentY, 180);
            currentY = addWrappedText(`Supervisor 2: ${myResearch.supervisor2}`, 10, currentY, 180);
            currentY = addWrappedText(`Co-Supervisor 1: ${myResearch.coSupervisor1}`, 10, currentY, 180);
            currentY = addWrappedText(`Co-Supervisor 2: ${myResearch.coSupervisor2}`, 10, currentY, 180);
            currentY = addWrappedText(`Journal Name: ${myResearch.journalName}`, 10, currentY, 180);
            currentY = addWrappedText(`ISSN Number: ${myResearch.issnNumber}`, 10, currentY, 180);
            currentY = addWrappedText(`H5 Index Link: ${myResearch.h5IndexLink}`, 10, currentY, 180);
            currentY = addWrappedText(`H Index Link: ${myResearch.hIndexLink}`, 10, currentY, 180);
            currentY = addWrappedText(`Scopus Site Link: ${myResearch.scopusSiteLink}`, 10, currentY, 180);
            currentY = addWrappedText(`Image Link Of Acceptance Letter: ${myResearch.imageLinkOfAcceptanceLetter}`, 10, currentY, 180);

            doc.save("MyResearch.pdf");
        } else {
            console.error("No research data available.");
        }
    }



    return (
        <>

            {/* If the logged in Student haven't submit the Research paper*/}
            {!myResearch && (
                <>
                    <div className="main_container w-full h-full">
                        <div className="item fw-bold text-center">
                            <h2 className="pageName" style={{ fontSize: '2em' }}>Research Paper Submission</h2>
                        </div>
                        <div className="card p-5">
                            <div className="smallcard row max-w-5xl mx-auto border rounded-md py-10 px-10">
                                <div className="col-md-6">
                                    <form id="itemForm" className="ml-7" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-2">
                                            <div className="col">
                                                <label
                                                    className="block text-sm font-medium text-slate-500"
                                                    htmlFor="title"
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Title"
                                                    id="title"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    className="block min-w-[885px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                                />
                                            </div>
                                        </div>


                                        {/* Student1 input starts here*/}
                                        <div className="grid grid-cols-2 mt-10">
                                            <div className="col">
                                                <label
                                                    className="block text-sm font-medium text-slate-500"
                                                    htmlFor="student1"
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
                                                        name="student1"
                                                        value={formData.student1}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Student 1</option>
                                                        <option key={extractedMembers.member1} value={extractedMembers.member1}>{extractedMembers.member1}</option>
                                                        <option key={extractedMembers.member2} value={extractedMembers.member2}>{extractedMembers.member2}</option>
                                                        <option key={extractedMembers.member3} value={extractedMembers.member3}>{extractedMembers.member3}</option>
                                                        <option key={extractedMembers.member4} value={extractedMembers.member4}>{extractedMembers.member4}</option>

                                                    </select>
                                                </div>
                                            </div>


                                            {/*Student2 input starts here*/}
                                            <div className="col">
                                                <label
                                                    className="block text-sm font-medium text-slate-500"
                                                    htmlFor="student2"
                                                >
                                                    Student2
                                                </label>
                                                <div className="relative h-10 w-72 min-w-[425px]">
                                                    <select
                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 bg-white border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                        name="student2"
                                                        value={formData.student2}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Student 2</option>
                                                        <option key={extractedMembers.member1} value={extractedMembers.member1}>{extractedMembers.member1}</option>
                                                        <option key={extractedMembers.member2} value={extractedMembers.member2}>{extractedMembers.member2}</option>
                                                        <option key={extractedMembers.member3} value={extractedMembers.member3}>{extractedMembers.member3}</option>
                                                        <option key={extractedMembers.member4} value={extractedMembers.member4}>{extractedMembers.member4}</option>

                                                    </select>
                                                </div>
                                            </div>

                                            {/*Student3 input starts here*/}
                                            <div className="col">
                                                <label
                                                    className="block text-sm font-medium text-slate-500"
                                                    htmlFor="student3"
                                                >
                                                    Student3
                                                </label>
                                                <div className="relative h-10 w-72 min-w-[425px]">
                                                    <select
                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 bg-white border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                        name="student3"
                                                        value={formData.student3}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Student 3</option>
                                                        <option key={extractedMembers.member1} value={extractedMembers.member1}>{extractedMembers.member1}</option>
                                                        <option key={extractedMembers.member2} value={extractedMembers.member2}>{extractedMembers.member2}</option>
                                                        <option key={extractedMembers.member3} value={extractedMembers.member3}>{extractedMembers.member3}</option>
                                                        <option key={extractedMembers.member4} value={extractedMembers.member4}>{extractedMembers.member4}</option>

                                                    </select>
                                                </div>
                                            </div>

                                            {/*Student4 input starts here*/}
                                            <div className="col">
                                                <label
                                                    className="block text-sm font-medium text-slate-500"
                                                    htmlFor="student4"
                                                >
                                                    Student4
                                                </label>
                                                <div className="relative h-10 w-72 min-w-[425px]">
                                                    <select
                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 bg-white border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                        name="student4"
                                                        value={formData.student4}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Student 4</option>
                                                        <option key={extractedMembers.member1} value={extractedMembers.member1}>{extractedMembers.member1}</option>
                                                        <option key={extractedMembers.member2} value={extractedMembers.member2}>{extractedMembers.member2}</option>
                                                        <option key={extractedMembers.member3} value={extractedMembers.member3}>{extractedMembers.member3}</option>
                                                        <option key={extractedMembers.member4} value={extractedMembers.member4}>{extractedMembers.member4}</option>

                                                    </select>
                                                </div>
                                            </div>



                                            {/* Supervisor input starts here */}
                                            <div className="col mt-10">
                                                <label
                                                    className="block text-sm font-medium text-slate-500"
                                                    htmlFor="supervisor1"
                                                >
                                                    Supervisor1
                                                </label>
                                                <div className="relative h-10 w-72 min-w-[425px]">
                                                    <select
                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                        name="supervisor1"
                                                        value={formData.supervisor1}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Supervisor 1</option>
                                                        {sup.map((supervisor, index) => (
                                                            <option key={index} value={`${supervisor.firstName} ${supervisor.lastName}`}>
                                                                {`${supervisor.firstName} ${supervisor.lastName}`}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col mt-10">
                                                <label
                                                    className="block text-sm font-medium text-slate-500"
                                                    htmlFor="supervisor2"
                                                >
                                                    Supervisor2
                                                </label>
                                                <div className="relative h-10 w-72 min-w-[425px]">
                                                    <select
                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                        name="supervisor2"
                                                        value={formData.supervisor2}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Supervisor 2</option>
                                                        {sup.map((supervisor, index) => (
                                                            <option key={index} value={`${supervisor.firstName} ${supervisor.lastName}`}>
                                                                {`${supervisor.firstName} ${supervisor.lastName}`}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Co-Supervisor input starts here */}
                                            <div className="col mt-10">
                                                <label
                                                    className="block text-sm font-medium text-slate-500"
                                                    htmlFor="coSupervisor1"
                                                >
                                                    Co-Supervisor1
                                                </label>
                                                <div className="relative h-10 w-72 min-w-[425px]">
                                                    <select
                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                        name="coSupervisor1"
                                                        value={formData.coSupervisor1}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Co-Supervisor 1</option>
                                                        {cosup.map((cosupervisor, index) => (
                                                            <option key={index} value={`${cosupervisor.firstName} ${cosupervisor.lastName}`}>
                                                                {`${cosupervisor.firstName} ${cosupervisor.lastName}`}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col mt-10">
                                                <label
                                                    className="block text-sm font-medium text-slate-500"
                                                    htmlFor="coSupervisor2"
                                                >
                                                    Co-Supervisor2
                                                </label>
                                                <div className="relative h-10 w-72 min-w-[425px]">
                                                    <select
                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                        name="coSupervisor2"
                                                        value={formData.coSupervisor2}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Co-Supervisor 2</option>
                                                        {cosup.map((cosupervisor, index) => (
                                                            <option key={index} value={`${cosupervisor.firstName} ${cosupervisor.lastName}`}>
                                                                {`${cosupervisor.firstName} ${cosupervisor.lastName}`}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>



                                        </div>

                                        {/* Journal name input starts here */}
                                        <div className="grid grid-cols-2">
                                            <div className="col mt-10">
                                                <label className="block text-sm font-medium text-slate-500" htmlFor="journalName">
                                                    Journal Name
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter the journalName"
                                                    className="block w-72 min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                    name="journalName"
                                                    value={formData.journalName}
                                                    onChange={handleChange}
                                                />
                                            </div>




                                            {/* ISSN number input starts here */}
                                            <div className="col mt-10">
                                                <label className="block text-sm font-medium text-slate-500" htmlFor="ISSNNumber">
                                                    ISSN Number
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter the ISSN Number here"
                                                    className="block w-72 min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                    name="issnNumber"
                                                    value={formData.issnNumber}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>


                                        {/* H5-IndexLink input starts here */}
                                        <div className="grid grid-cols-2">
                                            <div className="col mt-10">
                                                <label className="block text-sm font-medium text-slate-500" htmlFor="h5IndexLink">
                                                    H5-Index Link
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter the h5IndexLink here"
                                                    className="block w-72 min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                    name="h5IndexLink"
                                                    value={formData.h5IndexLink}
                                                    onChange={handleChange}
                                                />
                                            </div>


                                            {/* H-IndexLink input starts here */}
                                            <div className="col mt-10">
                                                <label className="block text-sm font-medium text-slate-500" htmlFor="hIndexLink">
                                                    H-Index Link
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter the H-Index here"
                                                    className="block w-72 min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                    name="hIndexLink"
                                                    value={formData.hIndexLink}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>


                                        {/* Scopus Site Link input starts here */}
                                        <div className="grid grid-cols-2">
                                            <div className="col mt-10">
                                                <label className="block text-sm font-medium text-slate-500" htmlFor="scopusSiteLink">
                                                    Scopus Site Link
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter the Scopus Site Link here"
                                                    className="block w-72 min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                    name="scopusSiteLink"
                                                    value={formData.scopusSiteLink}
                                                    onChange={handleChange}
                                                />
                                            </div>


                                            {/* Image Link input starts here */}
                                            <div className="col mt-10">
                                                <label className="block text-sm font-medium text-slate-500" htmlFor="acceptanceLetterUpload">
                                                    Upload Acceptance Letter
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="block w-72 min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
        placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                    name="acceptanceLetterUpload"
                                                    onChange={handleImageUpload} // Call function to handle image upload
                                                />
                                                <div className="w-20 h-20">
                                                    <img src={previewImage} alt={isUploading ? 'Uploading....' : 'Image'} className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        </div>
                                        <br /><br />
                                        <div>
                                            <div>

                                                {/* Submission buttons part */}
                                                <div style={{ display: 'flex', marginBottom: '20px', marginLeft: '284px' }}>
                                                    <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                                        <Button
                                                            style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '8px' }}
                                                            variant="contained"
                                                            type="submit"
                                                        >
                                                            Add
                                                        </Button>
                                                        <div style={{ width: '50px' }}></div> {/* This adds space between buttons */}
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
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div >
                    </div >
                </>
            )}




            {/* If the logged in Student have previously submitted the Research paper*/}
            {myResearch &&
                <div>

                    <TableContainer component={Paper} className="bg-white rounded-lg shadow-md">
                        <Table className="min-w-max" aria-label="group members table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="font-bold" style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>My Research</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        <label className="font-bold">Title:</label>
                                        <span className="ml-2">{myResearch.title}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="flex">
                                            <div className="w-1/2">
                                                <label className="font-bold">Student 1:</label>
                                                <span className="ml-2">{myResearch.student1}</span>
                                            </div>
                                            <div className="w-1/2">
                                                <label className="font-bold">Student 2:</label>
                                                <span className="ml-2">{myResearch.student2}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="flex">
                                            <div className="w-1/2">
                                                <label className="font-bold">Student 3:</label>
                                                <span className="ml-2">{myResearch.student3}</span>
                                            </div>
                                            <div className="w-1/2">
                                                <label className="font-bold">Student 4:</label>
                                                <span className="ml-2">{myResearch.student4}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="flex">
                                            <div className="w-1/2">
                                                <label className="font-bold">Supervisor 1:</label>
                                                <span className="ml-2">{myResearch.supervisor1}</span>
                                            </div>
                                            <div className="w-1/2">
                                                <label className="font-bold">Supervisor 2:</label>
                                                <span className="ml-2">{myResearch.supervisor2}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="flex">
                                            <div className="w-1/2">
                                                <label className="font-bold">Journal Name:</label>
                                                <span className="ml-2">{myResearch.journalName}</span>
                                            </div>
                                            <div className="w-1/2">
                                                <label className="font-bold">ISSN Number:</label>
                                                <span className="ml-2">{myResearch.issnNumber}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <div className="flex">
                                            <div className="w-1/2">
                                                <label className="font-bold">H5 Index Link:</label>
                                                <a href={myResearch.h5IndexLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">{myResearch.h5IndexLink}</a>
                                            </div>
                                            <div className="w-1/2">
                                                <label className="font-bold">H Index Link:</label>
                                                <a href={myResearch.hIndexLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">{myResearch.hIndexLink}</a>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="flex">
                                            <div className="w-1/2">
                                                <label className="font-bold">Scopus Site Link:</label>
                                                <a href={myResearch.scopusSiteLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">{myResearch.scopusSiteLink}</a>
                                            </div>
                                            <div className="w-1/2">
                                                <label className="font-bold">Acceptance Letter Image:</label>
                                                <img
                                                    src={myResearch.imageLinkOfAcceptanceLetter}
                                                    alt="Acceptance Letter"
                                                    style={{ maxWidth: '200px', maxHeight: '200px' }} // Adjust size as needed
                                                />
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button onClick={handleGeneratePDF} style={{ position: 'absolute', top: '10px', right: '10px' }}>Generate PDF</Button>
                </div>
            }

        </>
    );
}
