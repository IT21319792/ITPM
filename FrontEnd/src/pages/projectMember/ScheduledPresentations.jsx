import React, { useEffect, useState } from "react";
import "../../styles/SchedulePresentation.css";
import Axios from "axios";
import { Link } from "react-router-dom";

function ScheduledPresentations() {
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    getAllSchedule();
  }, []);

  const getAllSchedule = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:510/schedule/getSchedules"
      );
      console.log(response.data.data);
      setScheduleList(response.data.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Returns the date portion only
  };

  const displayAllSchedules = () => {
    return scheduleList.map((schedules) => (
      <tr itemScope="row" key={schedules._id}>
        <td>{schedules.GroupID}</td>
        <td>{formatDate(schedules.date)}</td>
        <td>{schedules.location}</td>
        <td>{schedules.timeDuration}</td>
        <td>{schedules.topic}</td>
        <td>{schedules.examiners[0]}</td>
        <td>{schedules.examiners[1]}</td>
        <td>{schedules.examiners[2]}</td>
        <td>
        <Link to={`/dashboard/pMemberDash/ScheduledPresentations/UpdateSchedule/${schedules._id}`}>
          <button
            className="btn btn-default ml-7"
            
          >
            <i
              style={{ cursor: "pointer", color: "#1044A7" }}
              className="fa-solid fa-pen me-3  d-inline"
            />
          </button>
          </Link>
          <button
            className="btn btn-default ml-3"
            
          >
            <i
              style={{ cursor: "pointer", color: "#ff0000"}}
              className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline"
            />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="main_container w-full h-full">
      <div className="item fw-bold text-center">
        <h5 className="pageName">Scheduled Presentations</h5>
      </div>

      <div className="card p-5">
        <div className="table-responsive">
          <table
            className="table table-striped custom-table"
            id="scheduledPResentationTable"
          >
            <thead>
              <tr>
                <th scope="col">Group ID</th>
                <th scope="col">Date</th>
                <th scope="col">Location</th>
                <th scope="col">Time Duration</th>
                <th scope="col">Title</th>
                <th scope="col">Examiner 01</th>
                <th scope="col">Examiner 02</th>
                <th scope="col">Examiner 03</th>
                <th scope="col"/>
              </tr>
            </thead>
            <tbody>{displayAllSchedules()}</tbody>
          </table>
        </div>
        <div className="flex-column justify-content-center align-items-center h-100 mt-5">
          <Link to="/dashboard/pMemberDash/SchedulePresentation">
            <button
              type="button"
              className="btnSchedule bg-green-800 text-white font-bold rounded-md px-4 py-2 mb-3"
            >
              Schedule Presenation
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ScheduledPresentations;
