import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CoordinatorWelcomeCard from '../../../components/CoordinatorWelcomeCard';
import Swal from 'sweetalert2';

function AddMarking() {
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishedData, setPublishedData] = useState([]);


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

  const handlePublish = async (mark) => {
    try {
      await axios.post('http://localhost:510/publish/add', mark);
      console.log('Data published successfully:', mark);
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data published successfully.',
      });
    } catch (error) {
      console.error('Error publishing data:', error);
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to publish data. Please try again later.',
      });
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:510/publish/');
        setPublishedData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching published data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:510/publish/${id}`);
      // Filter out the removed item from publishedData state
      setPublishedData(publishedData.filter(data => data._id !== id));
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data removed successfully.',
      });
    } catch (error) {
      console.error('Error removing data:', error);
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to remove data. Please try again later.',
      });
    }
  };


  return (
    <div className="p-4">
      <CoordinatorWelcomeCard />
      <p className="mt-2 text-gray-600">Marks Management</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-4">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Logged User</th>
                <th className="px-4 py-2">Presentation Type</th>
                <th className="px-4 py-2">Group</th>
                <th className="px-4 py-2">Rubric ID</th>
                <th className="px-4 py-2">Mark</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {marksData.map((mark, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{mark.loggedUser}</td>
                  <td className="border px-4 py-2">{mark.presentationType}</td>
                  <td className="border px-4 py-2">{mark.group}</td>
                  <td className="border px-4 py-2">{mark.groupMarks.map(item => item.rubricID).join(', ')}</td>
                  <td className="border px-4 py-2">{mark.groupMarks.map(item => item.mark).join(', ')}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handlePublish(mark)}
                    >
                      Publish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="mt-4">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Logged User</th>
                    <th className="px-4 py-2">Presentation Type</th>
                    <th className="px-4 py-2">Group</th>
                    <th className="px-4 py-2">Rubric ID</th>
                    <th className="px-4 py-2">Mark</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {publishedData.map((data, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{data.loggedUser}</td>
                      <td className="border px-4 py-2">{data.presentationType}</td>
                      <td className="border px-4 py-2">{data.group}</td>
                      <td className="border px-4 py-2">{data.groupMarks.map(item => item.rubricID).join(', ')}</td>
                      <td className="border px-4 py-2">{data.groupMarks.map(item => item.mark).join(', ')}</td>
                      <td className="border px-4 py-2">

                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleRemove(data._id)}
                        >
                         unpublish
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddMarking;
