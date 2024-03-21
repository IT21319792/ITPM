import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExaminarWelcomeCard from '../../components/ExaminarWelcomeCard';
import { useLocation } from 'react-router-dom';

function ExaminerPresentationMarks() {
  const [presentationType, setPresentationType] = useState('');
  const [rubricMarks, setRubricMarks] = useState([]);
  const [rubricData, setRubricData] = useState(null);
  const [error, setError] = useState(null);
  const { rowData } = useLocation().state;

  useEffect(() => {
    if (presentationType) {
      axios.get(`http://localhost:510/rubric/searchrubric/${presentationType}`)
        .then(response => {
          if (response.data.data.length === 0) {
            setError(`No rubric data found for ${presentationType}`);
            setRubricData(null);
          } else {
            setRubricData(response.data.data);
            setRubricMarks(Array.from({ length: 3 }, () => Array.from({ length: response.data.data.length }, () => ({ mark: '', studentId: '' }))));
            setError(null);
            console.log('Rubric data:', response.data.data);
          }
        })
        .catch(error => {
          setError(error.response.data.message);
          setRubricData(null);
        });
    }
  }, [presentationType]);

  const handleChange = (e, studentIndex, rubricIndex) => {
    const value = e.target.value;
    const maxMark = rubricData && rubricData[rubricIndex].marks;
    if (value <= maxMark) {
      const updatedMarks = [...rubricMarks];
      updatedMarks[studentIndex][rubricIndex].mark = value;
      setRubricMarks(updatedMarks);
    } else {
      alert(`The value entered for Rubric ${rubricIndex + 1} cannot exceed ${maxMark}`);
    }
  };


  const handlePresentationTypeChange = (e) => {
    setPresentationType(e.target.value);
    setError(null);
  };

  //mark add function
  const addMarksForStudent = (studentMarks, firstName) => {
    axios.post('http://localhost:510/presentation/add', { presentationType, studentMarks, firstName })
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
      <ExaminarWelcomeCard />
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-8">
        <div className="bg-white rounded shadow-md w-full">
          <h1 className="text-3xl text-center py-4">Add Marks</h1>

          <div className="flex flex-col items-center mb-4">
            <label className="text-sm font-bold mb-2">Presentation Type:</label>
            <select
              className="border border-grey-light w-full p-2 rounded"
              onChange={handlePresentationTypeChange}
              value={presentationType}
            >
              <option value="">Select Presentation Type</option>
              <option value="Presentation 1">Presentation 1</option>
              <option value="Presentation 2">Presentation 2</option>
              <option value="Presentation 3">Presentation 3</option>
              <option value="Presentation 4">Presentation 4</option>
            </select>
            {error && <div className="text-red-500">{error}</div>}
          </div>

          <div className="flex flex-col items-center mb-4">
            {rubricData && (
              <div className="w-full bg-gray-100 p-4 rounded">
                <h2 className="text-xl mb-4">Rubric Data</h2>
                <ul>
                  {rubricData.map((rubric, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-semibold">Rubric ID:</span> {rubric.rubricID}, <span className="font-semibold">Mark:</span> {rubric.marks}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h2 className="text-xl mb-4">{rowData.firstName}</h2>

            </div>
          </div>

          <div className="flex flex-col items-center">
            {rubricMarks.map((student, studentIndex) => (
              <div key={studentIndex} className="flex flex-col md:flex-row gap-2 items-center mb-4">
                <div className="md:w-1/5 text-center md:text-left mb-2 md:mb-0">Student {studentIndex + 1}</div>
                {student.map((rubric, rubricIndex) => (
                  <input
                    key={rubricIndex}
                    type="number"
                    className="border border-grey-light w-full p-2 rounded mb-2 md:mb-0"
                    placeholder={`Enter mark for Rubric ${rubricIndex + 1}`}
                    value={rubric.mark}
                    onChange={(e) => handleChange(e, studentIndex, rubricIndex)}
                  />
                ))}
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => addMarksForStudent(rubricMarks, rowData.firstName)}
              disabled={!rubricData} // Disable button if rubric data is not loaded
            >
              Add Marks
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ExaminerPresentationMarks;
