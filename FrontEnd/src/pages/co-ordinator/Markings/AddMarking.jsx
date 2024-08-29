import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CoordinatorWelcomeCard from '../../../components/CoordinatorWelcomeCard';
import Swal from 'sweetalert2';

function AddMarking() {
  const [marksData, setMarksData] = useState([]);
  const [publishedData, setPublishedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState('1'); // Track the selected semester
  const [publishedMarks, setPublishedMarks] = useState(new Set()); // State to track published marks

  // Fetch Marks Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:510/presentation');
        setMarksData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching marks data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Fetch Published Data
  useEffect(() => {
    async function fetchPublishedData() {
      try {
        const response = await axios.get('http://localhost:510/publish/');
        setPublishedData(response.data);
        // Mark fetched data as published
        const publishedIds = new Set(response.data.map((data) => data._id));
        setPublishedMarks(publishedIds);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching published data:', error);
        setLoading(false);
      }
    }
    fetchPublishedData();
  }, []);

  const handlePublish = async (mark) => {
    try {
      await axios.post('http://localhost:510/publish/add', mark);
      setPublishedMarks((prevPublishedMarks) => new Set(prevPublishedMarks).add(mark._id));
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data published successfully.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to publish data. Please try again later.',
      });
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:510/publish/${id}`);
      setPublishedData(publishedData.filter((data) => data._id !== id));
      setPublishedMarks((prevPublishedMarks) => {
        const updatedMarks = new Set(prevPublishedMarks);
        updatedMarks.delete(id);
        return updatedMarks;
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data removed successfully.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to remove data. Please try again later.',
      });
    }
  };

  // Filter marks data by selected semester and presentation type
  const filterBySemesterAndType = (data, type) => {
    return data.filter((item) => item.semester === selectedSemester && item.presentationType === type);
  };

  // Tables for each presentation type
  const presentationTypes = ['Proposal 1', 'Progress 1', 'Progress 2', 'Progress 3'];

  return (
    <div className="p-4">
      <CoordinatorWelcomeCard />
      <p className="mt-2 text-gray-600">Marks Management</p>

      {/* Radio buttons for selecting semester */}
      <div className="mt-4">
        <label className="mr-4">
          <input
            type="radio"
            value="1"
            checked={selectedSemester === '1'}
            onChange={(e) => setSelectedSemester(e.target.value)}
          />
          Semester 1
        </label>
        <label>
          <input
            type="radio"
            value="2"
            checked={selectedSemester === '2'}
            onChange={(e) => setSelectedSemester(e.target.value)}
          />
          Semester 2
        </label>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-4">
          {presentationTypes.map((type) => (
            <div key={type}>
              <h3 className="mt-6 text-lg font-bold">{type} - Semester {selectedSemester}</h3>

              {/* Marks Data Table for each presentation type */}
              <table className="table-auto w-full mt-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Logged User</th>
                    <th className="px-4 py-2">Presentation Type</th>
                    <th className="px-4 py-2">Group</th>
                    <th className="px-4 py-2">Rubrics</th>
                    <th className="px-4 py-2">Mark</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBySemesterAndType(marksData, type).length === 0 ? (
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan="6">
                        No data added yet.
                      </td>
                    </tr>
                  ) : (
                    filterBySemesterAndType(marksData, type).map((mark, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{mark.loggedUser}</td>
                        <td className="border px-4 py-2">{mark.presentationType}</td>
                        <td className="border px-4 py-2">{mark.group}</td>
                        <td className="border px-4 py-2">{mark.groupMarks.map((item) => item.rubricID).join(', ')}</td>
                        <td className="border px-4 py-2">{mark.groupMarks.map((item) => item.mark).join(', ')}</td>
                        <td className="border px-4 py-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handlePublish(mark)}
                            disabled={publishedMarks.has(mark._id)} // Disable if already published
                          >
                            {publishedMarks.has(mark._id) ? 'Published' : 'Publish'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Published Data Table */}
      <div className="mt-12">
        <h2 className="text-lg font-bold">Published Data</h2>
        <table className="table-auto w-full mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Logged User</th>
              <th className="px-4 py-2">Presentation Type</th>
              <th className="px-4 py-2">Group</th>
              <th className="px-4 py-2">Rubrics</th>
              <th className="px-4 py-2">Mark</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {publishedData.length === 0 ? (
              <tr>
                <td className="border px-4 py-2 text-center" colSpan="6">
                  No data published yet.
                </td>
              </tr>
            ) : (
              publishedData.map((data, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{data.loggedUser}</td>
                  <td className="border px-4 py-2">{data.presentationType}</td>
                  <td className="border px-4 py-2">{data.group}</td>
                  <td className="border px-4 py-2">{data.groupMarks.map((item) => item.rubricID).join(', ')}</td>
                  <td className="border px-4 py-2">{data.groupMarks.map((item) => item.mark).join(', ')}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleRemove(data._id)}
                    >
                      Unpublish
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddMarking;
