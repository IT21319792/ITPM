import React, { useEffect, useState } from "react";
import "../../styles/SchedulePresentation.css";
import Axios from "axios";

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
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ScheduledPresentations;
