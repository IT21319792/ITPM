import React, { useEffect, useState } from 'react'
import CoordinatorWelcomeCard from '../../../components/CoordinatorWelcomeCard'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';

function ProjectMemberMng() {
  const Navigate = useNavigate();
  
  const handlePage = () => {
    Navigate('/dashboard/addmember');
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

  return (
    <div className="p-4">
      <CoordinatorWelcomeCard />
      <p className="mt-2 text-gray-600">Project Member Management</p>
      <div>
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
            <tr>
              <th scope="col" className="px-6 py-4">First Name</th>
              <th scope="col" className="px-6 py-4">Last Name</th>
              <th scope="col" className="px-6 py-4">Contact Number</th>
              <th scope="col" className="px-6 py-4">Address</th>
              <th scope="col" className="px-6 py-4">Email</th>
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
                  <td className="px-6 py-4">
                    <button onClick={handleUpdate} className="bg-blue-500 rounded bg-primary px-3 pb-2 pt-2.5 ml-2">Assign This Member</button>
                    <button onClick={handleDelete} className="bg-red-500 inline-block rounded bg-primary px-3 pb-2 pt-2.5">Assign This Member</button>
                    <button onClick={() => handleAssignPage(data)} className="bg-green-700 inline-block rounded bg-primary px-3 pb-2 pt-2.5">Assign This Member</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={handlePage} className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 mt-4">
          Add Member
        </button>
      </div>
    </div>
  )
}

export default ProjectMemberMng;
