import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'; // Correct import statement

function AssignmentAdd() {
  const [formData, setFormData] = useState({ title: '', type: '', subType: '', deadline: '', description: '' });
  const [showSubTypeDropdown, setShowSubTypeDropdown] = useState(false);
  const [pdfURL, setPdfURL] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'type' && value !== '') {
      setShowSubTypeDropdown(true);
    } else {
      setShowSubTypeDropdown(false);
    }
  };

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Assignment Title: ${formData.title}`, 10, 10);
    doc.text(`Assignment Type: ${formData.type}`, 10, 20);
    if (formData.subType !== '') {
      doc.text(`Assignment Subtype: ${formData.subType}`, 10, 30);
    }
    doc.text(`Deadline: ${formData.deadline}`, 10, 40);
    doc.text(`Description: ${formData.description}`, 10, 50);
    const pdfData = doc.output('blob');
    const pdfURL = URL.createObjectURL(pdfData);
    setPdfURL(pdfURL);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:510/assignment/create', formData)
      .then(() => {
        alert('Assignment added successfully');
        generatePDF();
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
            <select
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="type"
              onChange={handleChange}
              defaultValue=""
            >
              <option value="" disabled hidden>Choose Assignment Type</option>
              <option value="presentation">Presentation</option>
              <option value="report">Report Document</option>
            </select>

            {showSubTypeDropdown && (
              <select
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="subType"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled hidden>Choose Subtype</option>
                {formData.type === "presentation" && (
                  <>
                    <option value="proposal">Proposal</option>
                    <option value="progress1">Progress 1</option>
                    <option value="progress2">Progress 2</option>
                    <option value="final">Final</option>
                  </>
                )}
                {formData.type === "report" && (
                  <>
                    <option value="topicAssessmentForm">Topic Assessment Form</option>
                    <option value="projectCharter">Project Charter</option>
                    <option value="statusDocument1">Status Document 1</option>
                    <option value="logBook">Log Book</option>
                    <option value="proposalDocument">Proposal Document</option>
                    <option value="statusDocument2">Status Document 2</option>
                    <option value="finalThesis">Final Thesis</option>
                  </>
                )}
              </select>
            )}

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
        {pdfURL && (
          <div className="mt-8">
            <h2 className="text-2xl mb-4">Preview PDF:</h2>
            <iframe title="Assignment Preview" src={pdfURL} width="100%" height="500px" />
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignmentAdd;
