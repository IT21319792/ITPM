import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
import SchedulePresentationValidation from "../../validation/SchedulePresentation";
import Sweetalert2 from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";


function UpdateSchedule() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [scheduledPresentation, setScheduledPresentation] = useState({});
  const [examinersList, setExaminersList] = useState([
    "Select Examiner",
    "Ms. Indudini Thennakoon",
    "Mr. Boshitha Gunarathne",
    "Mr. Deneth Pinsara",
    "Ms. Rashmi Shehela",
    "Mr. Madhusha Prasad",
    "Ms. Tharushi Perera",
    "Mr. Tharindu Madushan",
    "Ms. Tharushi Perera",
    "Mr. Tharindu Madushan",
    "Ms. Oshitha Kone",
    "Mr. Kamshe Kure"
  ]);
  const [examiners, setexaminers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:510/schedule/searchSchedule/" + id)
      .then((res) => {
        setexaminers(res.data.data.examiners);
        setScheduledPresentation(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderExaminersFirst = () => {
    return examinersList.map((examiner, index) => {
      return (
        <option
          key={index}
          value={examiner}
          selected={examiners[0] === examiner ? true : false}
        >
          {" "}
          {examiner}{" "}
        </option>
      );
    });
  };

  const renderExaminersSecond = () => {
    return examinersList.map((examiner, index) => {
      return (
        <option
          key={index}
          value={examiner}
          selected={examiners[1] === examiner ? true : false}
        >
          {" "}
          {examiner}{" "}
        </option>
      );
    });
  };

  const renderExaminersThird = () => {
    return examinersList.map((examiner, index) => {
      return (
        <option
          key={index}
          value={examiner}
          selected={examiners[2] === examiner ? true : false}
        >
          {" "}
          {examiner}{" "}
        </option>
      );
    });
  };

  const onHandleExaminerChange = (e) => {
    if (e.target.name === "examiners01") {
      examiners[0] = e.target.value;
      setScheduledPresentation({
        ...scheduledPresentation,
        examiners: examiners,
      });
    } else if (e.target.name === "examiners02") {
      examiners[1] = e.target.value;
      setScheduledPresentation({
        ...scheduledPresentation,
        examiners: examiners,
      });
    } else if (e.target.name === "examiners03") {
      examiners[2] = e.target.value;
      setScheduledPresentation({
        ...scheduledPresentation,
        examiners: examiners,
      });
    }
  };

  const OnHandleChangeInputs = (e) => {
    if (e.target.name === "examiners") {
      setScheduledPresentation({
        ...scheduledPresentation,
        examiners: examiners,
      });
    } else {
      setScheduledPresentation({
        ...scheduledPresentation,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onUpdate = () => {
    const newSchedule = {
      ScheduleID: scheduledPresentation.ScheduleID,
      GroupID: scheduledPresentation.GroupID,
      date: scheduledPresentation.date,
      location: scheduledPresentation.location,
      timeDuration: scheduledPresentation.timeDuration,
      topic: scheduledPresentation.topic,
      examiners: examiners,
    };

    console.log(newSchedule);

    const { errors, isValid } = SchedulePresentationValidation(newSchedule);

    if (!isValid) {
      setErrors(errors);
      console.log(errors);
      console.log("Error updating schedule");
      Sweetalert2.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        icon: "error",
        title: "Please enter your details",
      });
    } else {
      setErrors(errors);
      Axios.put("http://localhost:510/schedule/putSchedule/:id", newSchedule)
        .then((response) => {
          if (response.data.status === 200) {
            Sweetalert2.fire({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              icon: "success",
              title: `${response.data.message}`,
            });
          }

          navigate("/dashboard/pMemberDash/ScheduledPresentations");
        })
        .catch((error) => {
          console.error("Error updating schedule:", error);
        });
    }
  };

  return (
    <div className="main_container w-full h-full">
      <div className="item fw-bold text-center">
        <h5 className="pageName">Update Scheduled Presentation</h5>
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
                    Select Group
                  </label>
                  <div className="relative h-10 w-72 min-w-[425px]">
                    <select
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      name="GroupID"
                      value={scheduledPresentation.GroupID}
                      onChange={(e) => OnHandleChangeInputs(e)}
                    >
                      <option defaultValue="Select Group">Select Group</option>
                      <option value="Group 01">Group 01</option>
                      <option value="Group 02">Group 02</option>
                      <option value="Group 03">Group 03</option>
                      <option value="Group 04">Group 04</option>
                      <option value="Group 01">Group 05</option>
                      <option value="Group 02">Group 06</option>
                      <option value="Group 03">Group 07</option>
                      <option value="Group 04">Group 08</option>
                    </select>
                    <p
                      className={
                        errors.GroupID
                          ? "mt-2 peer-invalid:visible text-pink-600 text-sm block"
                          : "mt-2 invisible text-pink-600 text-sm hidden"
                      }
                    >
                      {errors.GroupID ? errors.GroupID : ""}
                    </p>
                  </div>
                </div>
                <div className="col">
                  <label className="block">
                    <span className="block text-sm font-medium text-slate-500">
                      Select Date
                    </span>
                    <input
                      type="text"
                      className="block min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      name="date"
                      onFocus={(e) => {
                        e.currentTarget.type = "date";
                      }}
                      value={moment(scheduledPresentation.date).format(
                        "YYYY-MM-DD"
                      )}
                      onChange={(e) => {
                        setScheduledPresentation({ date: e.target.value });
                      }}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <p
                      className={
                        errors.date
                          ? "mt-2 peer-invalid:visible text-pink-600 text-sm block"
                          : "mt-2 invisible text-pink-600 text-sm hidden"
                      }
                    >
                      {errors.date ? errors.date : ""}
                    </p>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="col">
                  <label
                    className="block text-sm font-medium text-slate-500"
                    htmlFor="group "
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Location"
                    className="block min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    name="location"
                    value={scheduledPresentation.location}
                    onChange={(e) => OnHandleChangeInputs(e)}
                  />
                  <p
                    className={
                      errors.location
                        ? "mt-2 peer-invalid:visible text-pink-600 text-sm block"
                        : "mt-2 invisible text-pink-600 text-sm hidden"
                    }
                  >
                    {errors.location ? errors.location : ""}
                  </p>
                </div>
                <div className="col">
                  <label className="block">
                    <span className="block text-sm font-medium text-slate-500">
                      Time
                    </span>
                    <input
                      type="text"
                      placeholder="HH:MM AM/PM"
                      className="block min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      name="timeDuration"
                      value={scheduledPresentation.timeDuration}
                      onChange={(e) => OnHandleChangeInputs(e)}
                    />
                    <p
                      className={
                        errors.timeDuration
                          ? "mt-2 peer-invalid:visible text-pink-600 text-sm block"
                          : "mt-2 invisible text-pink-600 text-sm hidden"
                      }
                    >
                      {errors.timeDuration ? errors.timeDuration : ""}
                    </p>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="col">
                  <label
                    className="block text-sm font-medium text-slate-500"
                    htmlFor="group "
                  >
                    Title of the Presentation
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
                    value={scheduledPresentation.topic}
                    onChange={(e) => OnHandleChangeInputs(e)}
                  />
                  <p
                    className={
                      errors.topic
                        ? "mt-2 peer-invalid:visible text-pink-600 text-sm block"
                        : "mt-2 invisible text-pink-600 text-sm hidden"
                    }
                  >
                    {errors.topic ? errors.topic : ""}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="col">
                  <label
                    className="block text-sm font-medium text-slate-500"
                    htmlFor="group "
                  >
                    Select Examiner 01
                  </label>
                  <div className="relative h-10 w-72 min-w-[885px]">
                    <select
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      name="examiners01"
                      onChange={(e) => {
                        onHandleExaminerChange(e);
                      }}
                    >
                      {renderExaminersFirst()}
                    </select>
                  </div>
                  <p
                    className={
                      errors.examiners
                        ? "mt-2 peer-invalid:visible text-pink-600 text-sm block"
                        : "mt-2 invisible text-pink-600 text-sm hidden"
                    }
                  >
                    {errors.examiners ? errors.examiners : ""}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="col">
                  <label
                    className="block text-sm font-medium text-slate-500"
                    htmlFor="group "
                  >
                    Select Examiner 02
                  </label>
                  <div className="relative h-10 w-72 min-w-[885px]">
                    <select
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      name="examiners02"
                      onChange={(e) => {
                        onHandleExaminerChange(e);
                      }}
                    >
                      {renderExaminersSecond()}
                    </select>
                  </div>
                  <p
                    className={
                      errors.examiners
                        ? "mt-2 peer-invalid:visible text-pink-600 text-sm block"
                        : "mt-2 invisible text-pink-600 text-sm hidden"
                    }
                  >
                    {errors.examiners ? errors.examiners : ""}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="col">
                  <label
                    className="block text-sm font-medium text-slate-500"
                    htmlFor="group "
                  >
                    Select Examiner 03
                  </label>
                  <div className="relative h-10 w-72 min-w-[885px]">
                    <select
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                      name="examiners03"
                      onChange={(e) => {
                        onHandleExaminerChange(e);
                      }}
                    >
                      {renderExaminersThird()}
                    </select>
                  </div>
                  <p
                    className={
                      errors.examiners
                        ? "mt-2 peer-invalid:visible text-pink-600 text-sm block"
                        : "mt-2 invisible text-pink-600 text-sm hidden"
                    }
                  >
                    {errors.examiners ? errors.examiners : ""}
                  </p>
                </div>
              </div>
              {/* Button to publish schedule */}
              <div className="col mt-5">
                <div className="flex justify-end mr-7 align-items-center">
                  <Link to="/dashboard/pMemberDash/SchedulePresentation">
                    <button
                      type="button"
                      className="btn btnAdd hover:bg-green-700 bg-green-800 text-white font-bold py-2 px-4 rounded"
                    >
                      Create Schedule
                    </button>
                  </Link>

                  <button
                    type="button"
                    className="btn btnAdd hover:bg-blue-700 bg-blue-800 text-white font-bold py-2 ml-72 px-4 rounded mr-40"
                    id="btnAdd "
                    onClick={() => {
                      onUpdate();
                    }}
                  >
                    Update Schedule
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateSchedule;
