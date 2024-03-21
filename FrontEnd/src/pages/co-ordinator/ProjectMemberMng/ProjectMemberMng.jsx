import React, { useEffect, useState } from 'react';
import CoordinatorWelcomeCard from '../../../components/CoordinatorWelcomeCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProjectMemberMng() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userData, scheduleData, markingData] = await Promise.all([
          axios.get('http://localhost:510/user'),
          axios.get('http://localhost:510/assignShedule'),
          axios.get('http://localhost:510/assignMark')
        ]);

        console.log("userData:", userData);
        console.log("scheduleData:", scheduleData);
        console.log("markingData:", markingData);

        const members = userData.data.filter(user => user.role === "member");
        const scheduleMap = new Map(scheduleData.data.map(item => [item.firstName, item]));
        const markingMap = new Map(markingData.data.map(item => [item.firstName, item]));

        console.log("Members:", members);
        console.log("Schedule Map:", scheduleMap);
        console.log("Marking Map:", markingMap);

        const updatedTableData = members.map(member => ({
          ...member,
          assignedSchedule: scheduleMap.get(member.firstName) || null,
          assignedMarking: markingMap.get(member.firstName) || null
        }));

        console.log("Updated Table Data:", updatedTableData);

        setTableData(updatedTableData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);


  const Navigate = useNavigate();
  
  const handlePage = () => {
    navigate('/dashboard/addmember');
  };

// assign page eketa navvigating
const handleAssignPage = (rowData) => {
  if (rowData.assignedSchedule || rowData.assignedMarking) {
    const toastId = toast.warn(
      <div>
        <p>This member is already assigned to both schedule and marking.</p>
        <button onClick={() => handleProceed(rowData, toastId)} className="bg-blue-500 text-white rounded bg-primary px-3 pb-2 pt-2.5 ml-2">Proceed</button>
        <button onClick={() => toast.dismiss(toastId)} className="bg-red-500 inline-block rounded text-white bg-primary px-3 pb-2 pt-2.5 ml-2">Cancel</button>
      </div>,
      {
        closeOnClick: false,
        draggable: false,
        autoClose: false // Prevents auto-closing
      }
    );
  } else {
    navigate('/dashboard/assignmember', { state: { rowData } });
  }
};

const handleProceed = (rowData, toastId) => {
  navigate('/dashboard/assignmember', { state: { rowData } });
  toast.dismiss(toastId); // Dismiss the toast message after proceeding
};

  const handleUpdate = () => {
    //  update logic eka
  };

  const handleDelete = () => {
    // Handle delete logic
  }

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:510/user')
      .then(res => {
        const members = res.data.filter(user => user.role === "member");
        setTableData(members);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
    // delete logic
  };

  return (
    <div className="p-4">
      <CoordinatorWelcomeCard />
      <p className="mt-2 text-gray-600">Project Member Management</p>
      <div className="overflow-x-auto bg-white px-6 py-8 rounded shadow-md text-black w-full">
      <p className="mt-2 text-gray-600">Project Member Management</p>
      <div className="overflow-x-auto bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
          <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
            <tr>
              <th scope="col" className="px-6 py-4">First Name</th>
              <th scope="col" className="px-6 py-4">Last Name</th>
              <th scope="col" className="px-6 py-4">Contact Number</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Assigned Schedule</th>
              <th scope="col" className="px-6 py-4">Assigned Marking</th>
              <th scope="col" className="px-6 py-4">Actions</th>
              <th scope="col" className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => {
              return (
                <tr key={index} className="border-dark:border-neutral-500">
                  <td className="px-6 py-4">{data.firstName}</td>
                  <td className="px-6 py-4">{data.lastName}</td>
                  <td className="px-6 py-4">{data.contactNo}</td>
                  <td className="px-6 py-4">{data.address}</td>
                  <td className="px-6 py-4">{data.email}</td>
                  <td className="px-6 py-4 flex justify-center">
                    <button onClick={handleUpdate} className="bg-blue-500 rounded bg-primary px-3 pb-2 pt-2.5 ml-2">Assign This Member</button>
                    <button onClick={handleDelete} className="bg-red-500 inline-block rounded bg-primary px-3 pb-2 pt-2.5 ml-2">Assign This Member</button>
                    <button onClick={() => handleAssignPage(data)} className="bg-green-700 inline-block rounded bg-primary px-3 pb-2 pt-2.5 ml-2">Assign This Member</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2">
        <button onClick={handlePage} className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-2">
          Add Member
        </button>
      </div>
    </div>
  );
}

export default ProjectMemberMng;
