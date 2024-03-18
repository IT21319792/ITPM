import React, { useState } from 'react';
import axios from 'axios';

function ExaminerPresentationMarks() {
  const [presentationType, setPresentationType] = useState(''); // State to store presentation type
  const [rubricMarks, setRubricMarks] = useState([
    [{ mark: '', studentId: '' }, { mark: '', studentId: '' }, { mark: '', studentId: '' }],
    [{ mark: '', studentId: '' }, { mark: '', studentId: '' }, { mark: '', studentId: '' }],
    [{ mark: '', studentId: '' }, { mark: '', studentId: '' }, { mark: '', studentId: '' }],
    [{ mark: '', studentId: '' }, { mark: '', studentId: '' }, { mark: '', studentId: '' }]
  ]);

  const handleChange = (e, studentIndex, rubricIndex) => {
    const updatedMarks = [...rubricMarks];
    updatedMarks[studentIndex][rubricIndex].mark = e.target.value;
    setRubricMarks(updatedMarks);
  };

  const handlePresentationTypeChange = (e) => {
    setPresentationType(e.target.value);
  };

  const addMarksForStudent = (studentMarks) => {
    // Send data to backend
    axios.post('http://localhost:510/presentation/add', { presentationType, studentMarks })
      .then(() => {
        alert('Marks added successfully');
        console.log('Marks added successfully');
      })
      .catch((err) => {
        console.log('Error:', err);
        alert('Failed to add marks');
        alert(err.response.data.message);
      });
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-fit mx-auto flex-1 flex flex-col items-center justify-center px-8">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Add Marks</h1>
          {/* Dropdown to select presentation type */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Presentation Type:</label>
            <select
              className="block border border-grey-light w-full p-3 rounded"
              onChange={handlePresentationTypeChange}
              value={presentationType}
            >
              <option value="">Select Presentation Type</option>
              <option value="Presentation 1">Presentation 1</option>
              <option value="Presentation 2">Presentation 2</option>
              <option value="Presentation 3">Presentation 3</option>
              <option value="Presentation 4">Presentation 4</option>
            </select>
          </div>
          {/* Form to enter marks for each student */}
          <div className="flex flex-col">
            {rubricMarks.map((student, studentIndex) => (
              <div key={studentIndex} className="flex gap-2 w-full items-center">
                <div className="p-3">Student {studentIndex + 1}</div>
                {student.map((rubric, rubricIndex) => (
                  <input
                    key={rubricIndex}
                    type="number"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder={`Enter mark for Student ${studentIndex + 1} Rubric ${rubricIndex + 1}`}
                    value={rubric.mark}
                    onChange={(e) => handleChange(e, studentIndex, rubricIndex)}
                  />
                ))}
                {/* Button to add marks for current student */}
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => addMarksForStudent(rubricMarks[studentIndex])}
                >
                  Add Marks
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExaminerPresentationMarks;
