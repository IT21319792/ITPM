import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Cookies from 'js-cookie';
import ProjectMemberWelcomCard from "../../components/PMemberWelcomeCard";

function PMemberDash() {
  const [assignedList, setAssignedList] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null); // Store logged-in user ID
  useState(() => {
    setLoggedInUserId(Cookies.get('firstName') || 'Backend eken Badu ennaha:(');
    
  }, []);
console.log(loggedInUserId);
  useEffect(() => {
    // Fetch logged-in user ID (replace with your authentication logic)
    // const fetchLoggedInUserId = async () => {
    //   try {
    //     const response = await Axios.get('/api/auth/user'); 
    //     console.log(response.data);
    //     setLoggedInUserId(response.data.id);
    //   } catch (error) {
    //     console.error("Error fetching logged-in user ID:", error);
    //   }
    // };

     // fetchLoggedInUserId();
    // Fetch assigned tasks based on logged-in user ID
    const getAllAssigned = async () => {
      try {
        const response = await Axios.get(`http://localhost:510/assignShedule/search/${loggedInUserId}`);
        console.log(response.data);
        setAssignedList(response.data);
      } catch (error) {
        console.error("Error fetching assigned tasks:", error);
      }
    };

    if (loggedInUserId) { // Fetch data only if user ID is available
      getAllAssigned();
    }
  }, [loggedInUserId]);

  const displayAllAssigns = () => {
    if (assignedList.length === 0) {
      return (
        <tr key="no-assignments">
          <td colSpan="3" className="text-center text-gray-500">
            No Assignments Found
          </td>
        </tr>
      );
    }

    return assignedList.map((assigned) => (
      <tr
        itemScope="row"
        className="hover:bg-blue-50 cursor-pointer"
        key={assigned._id}
      >
        <td className="px-6 py-4 whitespace-nowrap">{assigned.firstName}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {assigned.selectedAssignment}
        </td> 
        <td className="px-6 py-4 whitespace-nowrap">
          {assigned.selectedSubType}
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
            <table className="rounded-l-lg w-3/4 text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-white uppercase rounded-lg bg-blue-800">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Project Member Name
                  </th>
                  <th scope="col" className="px-6 py-3 text">
                    Assigned Task
                  </th>
                  <th scope="col" className="px-6 py-3 text">
                   Subtype
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
              className="btnSchedule bg-blue-800 text-white font-bold rounded-md px-4 py-2 mb-3 mr-36 ml-48"
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