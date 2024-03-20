import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoordinatorWelcomeCard from '../../../components/CoordinatorWelcomeCard';
import { Navigate, useNavigate } from 'react-router-dom';

function AssignmentView() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignments();
  }, []);


  const AddAssignments = () => {
    navigate('/dashboard/addAssignments');
  }
  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:510/assignment/');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.get(`http://localhost:510/assignment/get/${id}`);
      console.log('Assignment:', response.data);
      alert('Assignment updated successfully');
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:510/assignment/delete/${id}`);
      // After deletion, fetch the updated list of assignments
      fetchAssignments();
      alert('Assignment deleted successfully');
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col bg-white p-4">
     <CoordinatorWelcomeCard />
      <div className="">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full overflow-x-auto">
          <h1 className="mb-8 text-3xl text-center">View Assignments</h1>
          <table className="min-w-full text-left text-sm font-light">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Subtype</th>
                <th className="px-4 py-2">Deadline</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment._id}>
                  <td className="border px-4 py-2">{assignment.title}</td>
                  <td className="border px-4 py-2">{assignment.type}</td>
                  <td className="border px-4 py-2">{assignment.subType}</td>
                  <td className="border px-4 py-2">{new Date(assignment.deadline).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{assignment.description}</td>
                  <td className="border px-4 py-2">{assignment.user}</td>
                  <td className="border px-4 py-2">{assignment.role}</td>
                  <td className="px-4 py-2 flex justify-center">
                    <button
                      onClick={() => handleDelete(assignment._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdate(assignment._id)}
                      className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Update
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <button
              onClick={AddAssignments}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Add Assignments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentView;
