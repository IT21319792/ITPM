import React, { useEffect, useState } from 'react'
import CoordinatorWelcomeCard from '../../../components/CoordinatorWelcomeCard'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';

function StudentMng() {
  const Navigate = useNavigate();
  
  const handlePage = () => {
   Navigate('/dashboard/addSupervisor');
  }
  
  const handleAssignPage = (rowData) => {
    Navigate('/dashboard/assignmember', { state: { rowData: rowData }});
  }
  
  const handleUpdate = () => {
    // Handle update logic
  }
  
  const handleDelete = () => {
    // Handle delete logic
  }

  const [tableData, setTableData] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts
    axios.get('http://localhost:510/group/get-all-groups')
      .then(response => {
        setGroups(response.data); // Assuming response.data is an array of groups
      })
      .catch(error => {
        console.error('Error fetching groups:', error);
      });
  }, []);

  return (
    <div className="p-4">
      <CoordinatorWelcomeCard />
      <p className="mt-2 text-gray-600">Student Management</p>
      <div className="overflow-x-auto bg-white px-6 py-8 rounded shadow-md text-black w-full">
      <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Student Group Details</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Group ID</th>
            <th className="border border-gray-300 px-4 py-2">Member 1</th>
            <th className="border border-gray-300 px-4 py-2">Member 2</th>
            <th className="border border-gray-300 px-4 py-2">Member 3</th>
            <th className="border border-gray-300 px-4 py-2">Member 4</th>
            <th className="border border-gray-300 px-4 py-2">Supervisor</th>
            <th className="border border-gray-300 px-4 py-2">Group Leader</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <tr key={group._id}>
              <td className="border border-gray-300 px-4 py-2">{group.groupID}</td>
              <td className="border border-gray-300 px-4 py-2">{group.member1}</td>
              <td className="border border-gray-300 px-4 py-2">{group.member2}</td>
              <td className="border border-gray-300 px-4 py-2">{group.member3}</td>
              <td className="border border-gray-300 px-4 py-2">{group.member4}</td>
              <td className="border border-gray-300 px-4 py-2">{group.supervisor}</td>
              <td className="border border-gray-300 px-4 py-2">{group.groupLeader}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
      <div className="px-4 py-2">
        <button onClick={handlePage} className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-2">
          Add Student
        </button>
      </div>
    </div>
  )
}

export default StudentMng;