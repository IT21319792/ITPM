import React, { useEffect, useState } from "react";
import "../../styles/SchedulePresentation.css";
import Axios from "axios";


function SchedulePresentation(props) {
  const [scheduleList, setScheduleList] = useState([]);
  const [ScheduleID, setScheduleID] = useState("");
  const [GroupID, setGroupID] = useState("");
  const [date, setDate] = useState("");
  const [timeDuration, settimeDuration] = useState("");
  const [location, setlocation] = useState("");
  const [topic, settopic] = useState("");
  const [examiners, setexaminers] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((response) => {
      setScheduleList(response.data);
    });
  }, []);


  return (
    <div className="main_container w-full h-full">
      <div className="item fw-bold text-center">
        <h5 className="pageName">Schedule Presentation</h5>
      </div>
      <div className="card p-5">
        <div className="smallcard row max-w-5xl mx-auto border rounded-md py-10 px-10">
          <div className="col-md-6">
            <form id="itemForm" className="ml-7">
              <div className="grid grid-cols-2">
                <div className="col">
                  <label className="block text-sm font-medium text-slate-500" htmlFor="group ">Select Group</label>
                  <div className="relative h-10 w-72 min-w-[425px]">
                    <select className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                      <option defaultValue="Select Group">Select Group</option>
                      <option value="Group 01">Group 01</option>
                      <option value="Group 02">Group 02</option>
                      <option value="Group 03">Group 03</option>
                      <option value="Group 04">Group 04</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <label className="block">
                    <span className="block text-sm font-medium text-slate-500">
                      Select Date
                    </span>
                    <input
                      type="date"
                      className="block min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                    <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                      Please provide a valid date.
                    </p>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="col">
                  <label className="block text-sm font-medium text-slate-500" htmlFor="group ">Location</label>
                  <input
                      type="text" placeholder="Enter Location"
                      className="block min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                    <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                      Please provide a location.
                    </p>
                </div>
                <div className="col">
                  <label className="block">
                    <span className="block text-sm font-medium text-slate-500">
                      Time
                    </span>
                    <input
                      type="text" placeholder="HH:MM AM/PM"
                      className="block min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                    <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                      Please provide the time.
                    </p>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="col">
                  <label className="block text-sm font-medium text-slate-500" htmlFor="group ">Title of the Presentation</label>
                  <input
                      type="text" placeholder="Enter Title"
                      className="block min-w-[885px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                    <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                      Please provide a title for schedule.
                    </p>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="col">
                  <label className="block text-sm font-medium text-slate-500" htmlFor="group ">Select Examiner 01 </label>
                  <div className="relative h-10 w-72 min-w-[885px]">
                    <select className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                      <option defaultValue="Select Examiner">Select Examiner </option>
                      <option value="Ms. Indudini Thennakoon">Ms. Indudini Thennakoon</option>
                      <option value="Mr. Boshitha Gunarathne">Mr. Boshitha Gunarathne</option>
                      <option value="Mr. Deneth Pinsara">Mr. Deneth Pinsara</option>
                      <option value="Ms. Rashmi Shehela">Ms. Rashmi Shehela</option>
                      <option value="Mr. Madhusha Prasad">Mr. Madhusha Prasad</option>
                    </select>
                  </div>
                    <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                      Please select exmainer name
                    </p>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="col">
                  <label className="block text-sm font-medium text-slate-500" htmlFor="group ">Select Examiner 02 </label>
                  <div className="relative h-10 w-72 min-w-[885px]">
                    <select className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                      <option defaultValue="Select Examiner">Select Examiner </option>
                      <option value="Ms. Indudini Thennakoon">Ms. Indudini Thennakoon</option>
                      <option value="Mr. Boshitha Gunarathne">Mr. Boshitha Gunarathne</option>
                      <option value="Mr. Deneth Pinsara">Mr. Deneth Pinsara</option>
                      <option value="Ms. Rashmi Shehela">Ms. Rashmi Shehela</option>
                      <option value="Mr. Madhusha Prasad">Mr. Madhusha Prasad</option>
                    </select>
                  </div>
                    <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                      Please select exmainer name
                    </p>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="col">
                  <label className="block text-sm font-medium text-slate-500" htmlFor="group ">Select Examiner 03 </label>
                  <div className="relative h-10 w-72 min-w-[885px]">
                    <select className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                      <option defaultValue="Select Examiner">Select Examiner </option>
                      <option value="Ms. Indudini Thennakoon">Ms. Indudini Thennakoon</option>
                      <option value="Mr. Boshitha Gunarathne">Mr. Boshitha Gunarathne</option>
                      <option value="Mr. Deneth Pinsara">Mr. Deneth Pinsara</option>
                      <option value="Ms. Rashmi Shehela">Ms. Rashmi Shehela</option>
                      <option value="Mr. Madhusha Prasad">Mr. Madhusha Prasad</option>
                    </select>
                  </div>
                    <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                      Please select exmainer name
                    </p>
                </div>
              </div>
              {/* Button to publish schedule */}
              <div className="col mt-5">
                <div className="flex justify-end mr-7 align-items-center">
                  <button type="button" className="btn btnAdd hover:bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded" id="btnAdd " >Publish Schedule</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchedulePresentation;
