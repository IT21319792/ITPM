import React, { useEffect, useState } from 'react';
import CoordinatorWelcomeCard from '../../../components/CoordinatorWelcomeCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Sweetalert from 'sweetalert2';


function ProjectMemberMng() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedUser, setSelectedUser] = useState({
    firstName: '',
    lastName: '',
    contactNo: '',
    email: ''
  });;


  // get data from the backend (all 3 models) and update the table
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch only the users with the role 'coordinator'
        const userData = await axios.get('http://localhost:510/user', {
          params: {
            role: 'coordinator'
          }
        });

        const [scheduleData, markingData] = await Promise.all([
          axios.get('http://localhost:510/assignShedule'),
          axios.get('http://localhost:510/assignMark')
        ]);

        console.log("userData:", userData);
        console.log("scheduleData:", scheduleData);
        console.log("markingData:", markingData);

        // Assuming userData.data contains the filtered users
        const members = userData.data;
        const scheduleMap = new Map(scheduleData.data.map(item => [item.firstName, item]));
        const markingMap = new Map(markingData.data.map(item => [item.firstName, item]));

        console.log("Members:", members);
        console.log("Schedule Map:", scheduleMap);
        console.log("Marking Map:", markingMap);

        const updatedTableData = members.map(member => ({
          ...member,
          assignedSchedule: scheduleMap.get(member.firstName) || null,
          assignedMarking: markingMap.get(member.firstName) || null
        }));

        console.log("Updated Table Data:", updatedTableData);
        setTableData(updatedTableData);
      } catch (error) {
        console.log("Error fetching data:", error);
        toast.error('Failed to load members');
      }
    }

    fetchData();
  }, []);


  //navigate to next page
  const handlePage = () => {
    navigate('/dashboard/addmember');
  };
  //assigning page eka
  const handleAssignPage = (rowData) => {
    if (rowData.assignedSchedule || rowData.assignedMarking) {
      const toastId = toast.warn(
        <div>
          <p>This member is already assigned to both schedule and marking.</p>
          <button onClick={() => handleProceed(rowData, toastId)} className="bg-blue-500 text-white rounded bg-primary px-3 pb-2 pt-2.5 ml-2">Proceed</button>
          <button onClick={() => toast.dismiss(toastId)} className="bg-red-500 inline-block rounded text-white bg-primary px-3 pb-2 pt-2.5 ml-2">Cancel</button>
        </div>,
        {
          closeOnClick: false,
          draggable: false,
          autoClose: false // Prevents auto-closing
        }
      );
    } else {
      navigate('/dashboard/assignmember', { state: { rowData } });
    }
  };

  const handleProceed = (rowData, toastId) => {
    navigate('/dashboard/assignmember', { state: { rowData } });
    toast.dismiss(toastId); // Dismiss the toast message after proceeding
  };
  //pop up window eka
  const handleUpdate = (user) => {
    setSelectedUser(user); // Set the selected user details
    setIsModalOpen(true); // Open the modal
  };

  //update function
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:510/user/update-account/${selectedUser._id}`, selectedUser);

      if (response.status === 200) {
        console.log('User updated successfully:', response.data.message);
        setTableData(prevData => prevData.map(data => data._id === selectedUser._id ? selectedUser : data)); // refresh nokara table eke adaala data eka witarak update wenawa
        setIsModalOpen(false); // Close modal after successful update
        Sweetalert.fire({
          title: 'Success',
          text: 'User updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      } else {
        console.error('Failed to update user:', response.data.message);
        Sweetalert.fire({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
      Sweetalert.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  };
  // delete function
  // const handleDelete = async (id) => {
  //   try {


  //     const response = await axios.delete(`http://localhost:510/user/delete-account/${id}`);

  //     if (response.status === 200) {
  //       console.log('User deleted successfully');
  //       // Remove the deleted user from the table data
  //       setTableData(prevData => prevData.filter(data => data._id !== id)); 
  //       toast.success('User deleted successfully');
  //     } else {
  //       console.error('Failed to delete user:', response.data.message);
  //       toast.error('Failed to delete user:', response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting user:', error.message);
  //     toast.error('Error deleting user:', error.message);
  //   }
  // };



  const handleDelete = (id) => {
    Sweetalert.fire({
      title: 'Are you sure?',
      text: "You want to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:510/user/delete-account/${id}`).then((response) => {
          console.log(response)
          if (response.status === 200) {
            setTableData(prevData => prevData.filter(data => data._id !== id));
            Sweetalert.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            )
          } else {
            Sweetalert.fire(
              'Not Deleted!',
              'Something want wrong',
              'error'
            )

          }
        })

      }
    })

  }


  return (
    <div className="p-4">
      <CoordinatorWelcomeCard />
      <p className="mt-2 text-gray-600">Project Member Management</p>
      <div className="overflow-x-auto bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
            <tr>
              <th scope="col" className="px-6 py-4">First Name</th>
              <th scope="col" className="px-6 py-4">Last Name</th>
              <th scope="col" className="px-6 py-4">Contact Number</th>
              <th scope="col" className="px-6 py-4">staffPost</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Assigned Schedule</th>
              <th scope="col" className="px-6 py-4">Assigned Marking</th>
              <th scope="col" className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index} className="border-dark:border-neutral-500">
                <td className="px-6 py-4">{data.firstName}</td>
                <td className="px-6 py-4">{data.lastName}</td>
                <td className="px-6 py-4">{data.contactNo}</td>
                <td className="px-6 py-4">{data.staffPost}</td>
                <td className="px-6 py-4">{data.email}</td>
                <td className="px-6 py-4">{data.address}</td>
                <td className="px-6 py-4">{data.assignedSchedule ? data.assignedSchedule.selectedAssignment : 'Not Assigned to any'}</td>
                <td className="px-6 py-4">{data.assignedMarking ? data.assignedMarking.selectedAssignment : 'Not Assigned to any'}</td>
                <td className="px-6 py-4 flex justify-center text-white">
                  <button onClick={() => handleUpdate(data)} className="bg-blue-500 rounded bg-primary px-3 pb-2 pt-2.5 ml-2">Update</button>
                  <button onClick={() => handleDelete(data._id)} className="bg-red-500 inline-block rounded bg-primary px-3 pb-2 pt-2.5 ml-2">Delete</button>

                  <ToastContainer />
                  <button
                    onClick={() => handleAssignPage(data)}
                    disabled={data.assignedSchedule && data.assignedMarking}
                    className={`bg-green-700 inline-block rounded bg-primary px-3 pb-2 pt-2.5 ml-2 ${data.assignedSchedule && data.assignedMarking ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Assign This Member
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2">
        <button onClick={handlePage} className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-2">
          Add Member
        </button>
      </div>

      {/* pop up for Update */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-xl mb-4">Update User</h2>
            <form onSubmit={handleUpdateUser}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input
                  type="text"
                  value={selectedUser.firstName}
                  onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input
                  type="text"
                  value={selectedUser.lastName}
                  onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
                <input
                  type="text"
                  value={selectedUser.contactNo}
                  onChange={(e) => setSelectedUser({ ...selectedUser, contactNo: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



    </div>
  );



}

export default ProjectMemberMng;