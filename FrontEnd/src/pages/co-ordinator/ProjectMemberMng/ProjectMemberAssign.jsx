import React, { useEffect, useState } from 'react';
import CoordinatorWelcomeCard from '../../../components/CoordinatorWelcomeCard';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import Sweetalert from 'sweetalert2';
function PresentationDetails() {
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({ firstName: '', selectedOption: '', selectedAssignment: '', selectedSubType: '', semester: '', assignmentType: '', assignmentSubType: '' });
  const { rowData } = useLocation().state;

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:510/assignment/');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleOptionChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, selectedOption: value, selectedAssignment: '', selectedSubType: '', assignmentType: '', assignmentSubType: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newFormData = { ...formData, firstName: rowData.firstName };
      console.log('New Form Data:', newFormData); 
      if (formData.selectedOption === 'scheduleAssignment') {
        await axios.post('http://localhost:510/assignShedule/add', newFormData);
        console.log('Assigning member to assignment:', formData);
        alert('Member assigned to assignment successfully');
        Sweetalert.fire({
          title: 'Success',
          text: 'Member assigned to assignment successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      } else if (formData.selectedOption === 'addMarkingRubric') {
        await axios.post('http://localhost:510/assignMark/add', newFormData);
        console.log('Assigning member to add marking rubric:', formData);
        Sweetalert.fire({
          title: 'Success',
          text: 'Member assigned to add marking rubric successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      console.error('Error assigning member:', error);
      Sweetalert.fire({
        title: 'Error',
        text: 'Error assigning member',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  };
  


  return (
    <div className="p-4">
      <CoordinatorWelcomeCard />
      <p className="mt-2 text-gray-600">Assign Member Form</p>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Assign this member</h1>
           
            <form onSubmit={handleSubmit} className="mb-4 md:flex md:flex-wrap md:justify-between">
              <div className="flex gap-2 w-full">
                <div>
                  <label>

                    {/* input*/}
                    <input
                      type="radio"
                      name="selectedOption"
                      value="scheduleAssignment"
                      checked={formData.selectedOption === 'scheduleAssignment'}
                      onChange={handleOptionChange}
                    />
                    Schedule Assignment
                  </label>
                </div>
                <div>
                  <label>
                    {/* input*/}
                    <input
                      type="radio"
                      name="selectedOption"
                      value="addMarkingRubric"
                      checked={formData.selectedOption === 'addMarkingRubric'}
                      onChange={handleOptionChange}
                    />
                    Add Marking Rubric
                  </label>


                </div>
              </div>
              {/* input*/}
              {formData.selectedOption === 'scheduleAssignment' && (
                <div className="flex gap-2 w-full">
              
                  <select
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="selectedAssignment"
                    onChange={handleChange}
                    value={formData.selectedAssignment}
                  >
                    <option value="">Select an assignment</option>
                    <option value="presentation">Presentation</option>
                  </select>
                  {/* input*/}
                 
                  {formData.selectedAssignment && (
                   
                   <select
                      className="block border border-grey-light w-full p-3 rounded mb-4"
                      name="selectedSubType"
                      onChange={handleChange}
                      value={formData.selectedSubType}
                    >
                      <option value="">Select an assignment subtype</option>
                     
                      {assignments
                        .filter((assignment) => assignment.type === formData.selectedAssignment)
                        .flatMap((assignment) => assignment.subType ? assignment.subType : [])
                        .map((subType) => (
                          <option key={subType} value={subType}>{subType}</option>
                        ))}
                    </select>
                  )}
                </div>
              )}
              {/* input*/}
              {formData.selectedOption === 'addMarkingRubric' && (
                <div className="flex gap-2 w-full">
                  
                  <select
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="selectedAssignment"
                    onChange={handleChange}
                    value={formData.selectedAssignment}
                  >
                    <option value="">Select a type</option>
                    <option value="presentation">Presentation</option>
                    <option value="report">Report</option>
                  </select>
                  
                  {formData.selectedAssignment && (
                    
                    <select
                      className="block border border-grey-light w-full p-3 rounded mb-4"
                      name="selectedSubType"
                      onChange={handleChange}
                      value={formData.selectedSubType}
                    >
                      <option value="">Select a subtype</option>
                      {assignments
                        .filter((assignment) => assignment.type === formData.selectedAssignment)
                        .flatMap((assignment) => assignment.subType ? assignment.subType : [])
                        .map((subType) => (
                          <option key={subType} value={subType}>{subType}</option>
                        ))}
                    </select>
                  )}
                </div>
              )}
              <div className="block border border-grey-light w-full p-3 rounded mb-4">
                {rowData.firstName}
              </div>
              <button
                type="submit"
                className="w-full text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Add Member
              </button>
              <div>
                <p className="text-red-600 text-center"></p>
              </div>
            </form>
            <div className="text-center text-sm text-grey-dark mt-4">
              Password set to default:
              <h1 className="no-underline text-grey-dark">Users must update their password in their profile</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresentationDetails;
