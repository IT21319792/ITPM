

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoordinatorWelcomeCard from '../../../components/CoordinatorWelcomeCard';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import AssignmentPDF from '../utils/AssignmentPDF';
import ReactDOMServer from 'react-dom/server';

function AssignmentView() {
  const user = Cookies.get('firstName');
 const role = Cookies.get('role');
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedAssignment, setSelectedAssignment] = useState({
    title: '',
    type: '',
    subType: '',
    deadline: '',
    description: '',
    user: user,
    role: role +' Updated',
  });
 



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
  //pop up window eka
  const handleUpdate = (assignment) => {
    setSelectedAssignment(assignment); // Set the selected user details
    setIsModalOpen(true); // Open the modal
  };

  //update function
  const handleUpdateAssignment = async (e) => {
    e.preventDefault();
    try {
      // Update selectedAssignment state with the latest changes
      const updatedAssignment = { ...selectedAssignment };
  
      const response = await axios.put(`http://localhost:510/assignment/update/${selectedAssignment._id}`, updatedAssignment);
  
      if (response.status === 200) {
        console.log('Assignment updated successfully:', response.data.message);
         
        // Update assignments state with the updated assignment
        setAssignments(prevAssignments => prevAssignments.map(assignment => assignment._id === selectedAssignment._id ? updatedAssignment : assignment));
        setIsModalOpen(false); // Close modal after successful update
        toast.success(response.data.message);
      } else {
        console.error('Failed to update assignment:', response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating assignment:', error.message);
      toast.error(error.message);
    }
  };
  


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:510/assignment/delete/${id}`);
        fetchAssignments();
        toast.success('Assignment deleted successfully');
      } catch (error) {
        console.error('Error deleting assignment:', error);
        toast.error('Error deleting assignment');
      }
    }
  };

  // Inside the AssignmentView component

  const handleGeneratePDF = (assignment) => {
    // Render the AssignmentPDFGenerator component to a string
    const pdfContent = ReactDOMServer.renderToStaticMarkup(<AssignmentPDF assignment={assignment} />);
  
    // Open a new tab with the PDF content
    const pdfWindow = window.open("");
    pdfWindow.document.write(`
      <html>
        <head>
          <title>Assignment PDF</title>
          <style>
            body { margin: 0; }
          </style>
        </head>
        <body>
          ${pdfContent}
        </body>
      </html>
    `);
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
                <th className="px-4 py-2">Created By</th>
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
                    <button onClick={() => handleUpdate(assignment)} className="bg-blue-500 rounded bg-primary px-3 pb-2 pt-2.5 ml-2">Update</button>
                    <button onClick={() => handleGeneratePDF(assignment)}  className="bg-yellow-400 rounded bg-primary px-3 pb-2 pt-2.5 ml-2">Generate PDF</button>
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

          {/* pop up for Update */}
          {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-75">
    <div className="bg-white p-8 rounded-md shadow-md max-w-xl w-full mx-4">
      <h2 className="text-xl mb-4">Update Assignment</h2>
                <form onSubmit={handleUpdateAssignment} className="mb-4 md:flex md:flex-wrap md:justify-between">
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="title"
                    placeholder="Assignment Title"
                    value={selectedAssignment.title}
                    onChange={(e) => setSelectedAssignment({ ...selectedAssignment, title: e.target.value })}
                  />
                  <select
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="type"
                    value={selectedAssignment.type}
                    onChange={(e) => setSelectedAssignment({ ...selectedAssignment, type: e.target.value })}
                  >
                    <option value="presentation">Presentation</option>
                    <option value="report">Report Document</option>
                  </select>

                  {selectedAssignment.type === "presentation" && (
                    <select
                      className="block border border-grey-light w-full p-3 rounded mb-4"
                      name="subType"
                      value={selectedAssignment.subType}
                      onChange={(e) => setSelectedAssignment({ ...selectedAssignment, subType: e.target.value })}
                    >
                      <option value="proposal">Proposal</option>
                      <option value="progress1">Progress 1</option>
                      <option value="progress2">Progress 2</option>
                      <option value="final">Final</option>
                    </select>
                  )}

                  {selectedAssignment.type === "report" && (
                    <select
                      className="block border border-grey-light w-full p-3 rounded mb-4"
                      name="subType"
                      value={selectedAssignment.subType}
                      onChange={(e) => setSelectedAssignment({ ...selectedAssignment, subType: e.target.value })}
                    >
                      <option value="topicAssessmentForm">Topic Assessment Form</option>
                      <option value="projectCharter">Project Charter</option>
                      <option value="statusDocument1">Status Document 1</option>
                      <option value="logBook">Log Book</option>
                      <option value="proposalDocument">Proposal Document</option>
                      <option value="statusDocument2">Status Document 2</option>
                      <option value="finalThesis">Final Thesis</option>
                    </select>
                  )}

                  <input
                    type="date"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="deadline"
                    placeholder="Deadline"
                    value={selectedAssignment.deadline}
                    onChange={(e) => setSelectedAssignment({ ...selectedAssignment, deadline: e.target.value })}
                  />
                  <textarea
                    className="block border border-grey-light w-full h-48 p-3 rounded mb-4"
                    name="description"
                    placeholder="Description"
                    value={selectedAssignment.description}
                    onChange={(e) => setSelectedAssignment({ ...selectedAssignment, description: e.target.value })}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Update Assignment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}



        </div>
      </div>
    </div>
  );
}

export default AssignmentView;
