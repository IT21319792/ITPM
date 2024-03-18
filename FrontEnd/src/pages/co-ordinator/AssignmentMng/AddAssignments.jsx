import React, { useState } from 'react';
import axios from 'axios';

function AssignmentAdd() {
  const [formData, setFormData] = useState({ title: '', type: '', deadline: '', description: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:510/assignment/create', formData)
      .then(() => {
        alert('Assignment added successfully');
        console.log('Assignment added successfully');
      })
      .catch((err) => {
        console.log('Form data:', formData);
        console.log('Error:', err);
        alert('Assignment adding failed');
        alert(err.response.data.message);
      });
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col bg-white">
      <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Add Assignment</h1>
          <form onSubmit={handleSubmit} className="mb-4 md:flex md:flex-wrap md:justify-between">
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="title"
              placeholder="Assignment Title"
              onChange={handleChange}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="type"
              placeholder="Assignment Type"
              onChange={handleChange}
            />
            <input
              type="date"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="deadline"
              placeholder="Deadline"
              onChange={handleChange}
            />
            <textarea
              className="block border border-grey-light w-full h-48 p-3 rounded mb-4"
              name="description"
              placeholder="Description"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Add Assignment
            </button>
            <div>
              <p className='text-red-600 text-center'></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AssignmentAdd;
