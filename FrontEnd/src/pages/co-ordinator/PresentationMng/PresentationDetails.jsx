import React, { useEffect, useState } from 'react';
import CoordinatorWelcomeCard from '../../../components/CoordinatorWelcomeCard';
import axios from 'axios';

function PresentationDetails() {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fetch data when component mounts
    axios.get('http://localhost:510/schedule/getSchedules')
      .then(response => {
        setSchedules(response.data.data); // Set schedules from response data
      })
      .catch(error => {
        console.error('Error fetching schedules:', error);
      });
  }, []);

  const [examiners, setExaminers] = useState([]);

  useEffect(() => {
    // Fetch examiner data from the database
    axios.get('http://localhost:510/user')
      .then(response => {
        setExaminers(Array.isArray(response.data) ? response.data : []); // Ensure examiners is an array
      })
      .catch(error => {
        console.error('Error fetching examiners:', error);
      });
  }, []);

  const handleSelectChange = (index, value) => {
    const updatedExaminers = [...selectedSchedule.examiners];
    updatedExaminers[index] = value;
    setSelectedSchedule(prevSchedule => ({ ...prevSchedule, examiners: updatedExaminers }));
  };

  const handleUpdateClick = (schedule) => {
    setSelectedSchedule(schedule);
    setShowPopup(true);
  };

  const handleUpdateSubmit = (updatedSchedule) => {
    // Send updated schedule data to the server
    axios.put(`http://localhost:510/schedule/putSchedule/${updatedSchedule._id}`, updatedSchedule)
      .then(response => {
        // Update schedules state with the updated schedule data
        setSchedules(prevSchedules => prevSchedules.map(schedule =>
          schedule._id === updatedSchedule._id ? updatedSchedule : schedule
        ));
        // Close the popup
        setShowPopup(false);
      })
      .catch(error => {
        console.error('Error updating schedule:', error);
      });
  };

  return (
    <div className="p-4">
      <CoordinatorWelcomeCard />
      <p className="mt-2 text-gray-600">Presentation details</p>

      <div className="overflow-x-auto">
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">Schedule ID</th>
              <th className="p-2 border border-gray-300">Group ID</th>
              <th className="p-2 border border-gray-300">Date</th>
              <th className="p-2 border border-gray-300">Time Duration</th>
              <th className="p-2 border border-gray-300">Location</th>
              <th className="p-2 border border-gray-300">Topic</th>
              <th className="p-2 border border-gray-300">Examiners</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(schedule => (
              <tr key={schedule._id} className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300">{schedule.ScheduleID || schedule._id}</td>
                <td className="p-2 border border-gray-300">{schedule.GroupID}</td>
                <td className="p-2 border border-gray-300">{new Date(schedule.date).toLocaleDateString()}</td>
                <td className="p-2 border border-gray-300">{schedule.timeDuration}</td>
                <td className="p-2 border border-gray-300">{schedule.location}</td>
                <td className="p-2 border border-gray-300">{schedule.topic}</td>
                <td className="p-2 border border-gray-300">
                  <ul className="list-disc list-inside">
                    {schedule.examiners.map((examiner, index) => (
                      <li key={index}>{examiner}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-2 border border-gray-300">
                  <button onClick={() => handleUpdateClick(schedule)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-4.586-7.586a2 2 0 112.828 2.828L11 14l-4 1 1-4 6.414-6.414z" />
                    </svg>
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup/Modal for editing schedule details */}
      {showPopup && selectedSchedule && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg" style={{ maxWidth: '1000px' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Edit Schedule</h2>
              <button onClick={() => setShowPopup(false)} className="text-gray-700 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1">Schedule ID:</label>
              <input
                type="text"
                value={selectedSchedule.ScheduleID}
                onChange={e => setSelectedSchedule(prevSchedule => ({ ...prevSchedule, ScheduleID: e.target.value }))}
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1">Group ID:</label>
              <input
                type="text"
                value={selectedSchedule.GroupID}
                onChange={e => setSelectedSchedule(prevSchedule => ({ ...prevSchedule, GroupID: e.target.value }))}
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1">Date:</label>
              <input
                type="date"
                value={selectedSchedule.date.split('T')[0]} // Format the date if it's in ISO format
                onChange={e => setSelectedSchedule(prevSchedule => ({ ...prevSchedule, date: e.target.value }))} // No need to convert to ISO format
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1">Time Duration:</label>
              <div className="flex items-center">
                <input
                  type="time"
                  value={selectedSchedule.timeDuration.split(' - ')[0]} // Split time into start and end
                  onChange={e => setSelectedSchedule(prevSchedule => ({ ...prevSchedule, timeDuration: `${e.target.value} - ${prevSchedule.timeDuration.split(' - ')[1]}` }))}
                  className="border border-gray-300 p-2 rounded mr-2"
                />
                <span>to</span>
                <input
                  type="time"
                  value={selectedSchedule.timeDuration.split(' - ')[1]} // Split time into start and end
                  onChange={e => setSelectedSchedule(prevSchedule => ({ ...prevSchedule, timeDuration: `${prevSchedule.timeDuration.split(' - ')[0]} - ${e.target.value}` }))}
                  className="border border-gray-300 p-2 rounded ml-2"
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1">Location:</label>
              <input
                type="text"
                value={selectedSchedule.location}
                onChange={e => setSelectedSchedule(prevSchedule => ({ ...prevSchedule, location: e.target.value }))}
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1">Topic:</label>
              <input
                type="text"
                value={selectedSchedule.topic}
                onChange={e => setSelectedSchedule(prevSchedule => ({ ...prevSchedule, topic: e.target.value }))}
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            {/* Examiners - assuming it's an array of strings */}
            {/* Examiner dropdowns */}
            <div className="flex flex-col mb-4">
              <select
                value={selectedSchedule.examiners[0]}
                onChange={e => handleSelectChange(0, e.target.value)}
                className="border border-gray-300 p-2 rounded mb-2"
              >
                <option value="">Select Examiner 1</option>
                {examiners.map(user => (
                  <option key={user._id} value={`${user.firstName} ${user.lastName}`}>
                    {`${user.firstName} ${user.lastName}`}
                  </option>
                ))}
              </select>

              <select
                value={selectedSchedule.examiners[1]}
                onChange={e => handleSelectChange(1, e.target.value)}
                className="border border-gray-300 p-2 rounded mb-2"
              >
                <option value="">Select Examiner 2</option>
                {examiners.map(user => (
                  <option key={user._id} value={`${user.firstName} ${user.lastName}`}>
                    {`${user.firstName} ${user.lastName}`}
                  </option>
                ))}
              </select>

              <select
                value={selectedSchedule.examiners[2]}
                onChange={e => handleSelectChange(2, e.target.value)}
                className="border border-gray-300 p-2 rounded mb-2"
              >
                <option value="">Select Examiner 3</option>
                {examiners.map(user => (
                  <option key={user._id} value={`${user.firstName} ${user.lastName}`}>
                    {`${user.firstName} ${user.lastName}`}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={() => handleUpdateSubmit(selectedSchedule)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PresentationDetails;
