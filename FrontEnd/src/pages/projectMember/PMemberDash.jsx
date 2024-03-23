import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import ProjectMemberWelcomCard from "../../components/PMemberWelcomeCard";

function PMemberDash() {
  const [assignedList, setAssignedList] = useState([]);

  useEffect(() => {
    getAllAssign();
  }, []);

  const getAllAssign = async () => {
    try {
      const response = await Axios.get(`http://localhost:510/assignShedule/`);
      console.log(response.data);
      setAssignedList(response.data);
    } catch (error) {
      console.error("Error fetching assigned task:", error);
    }
  };

  const displayAllAssigns = () => {
    return assignedList.map((assignes) => (
      <tr
        itemScope="row"
        className="hover:bg-blue-50 cursor-pointer"
        key={assignes._id}
      >
        <td className="px-6 py-4 whitespace-nowrap">{assignes.firstName}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {assignes.selectedAssignment}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {/* create drop down button to show complet, On Hold, Pending */}
          <select className=" bg-yellow-100 border-yellow-100 text-gray-700  rounded-lg p-2" name="status" id="status">
            <option value="completed">
              Completed
            </option>
            <option value="onHold">On Hold</option>
            <option value="pending">Pending</option>
          </select>
        </td>
      </tr>
    ));
  };

  return (
    <div className="main_container w-full h-full" id="print">
      <ProjectMemberWelcomCard />
      <div className="item p-5 bg-lightWhite">
        <div className="pageName flex justify-center text-lg">
          Assigned Tasks For Preject Members
        </div>
        <div className="flex justify-between mb-5">
          <div className="w-full flex justify-center items-center mt-5 relative rounded-md overflow-x-auto shadow-md ml-10">
            <table className="rounded-l-lg w-3/4 text-sm text-left rtl:text-right text-gray-500 " >
              <thead className="text-xs text-white uppercaserounded-lg  bg-blue-800">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Project Member Name
                  </th>
                  <th scope="col" className="px-6 py-3 text">
                    Assigned Task
                  </th>
                  <th scope="col" className="px-6 py-3 text">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>{displayAllAssigns()}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row mt-5 vh-100">
        <div className="ml-80 flex-column justify-content-center align-items-center h-100">
          <Link to="/dashboard/pMemberDash/SchedulePresentation">
            <button
              type="button"
              className="btnSchedule bg-blue-800 text-white font-bold rounded-md px-4 py-2 mb-3 mr-36"
            >
              Create Schedule
            </button>
          </Link>
          <Link to="/dashboard/pMemberDash/ScheduledPresentations">
            <button
              type="button"
              className="btnSchedule bg-green-800 text-white font-bold rounded-md px-4 py-2 ml-20 mr-2"
            >
              Scheduled List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default PMemberDash;
