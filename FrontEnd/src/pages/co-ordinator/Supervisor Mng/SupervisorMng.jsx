import React, { useEffect, useState } from 'react'
import CoordinatorWelcomeCard from '../../../components/CoordinatorWelcomeCard'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Sweetalert from 'sweetalert2'
import {  FaTrash } from 'react-icons/fa';


function SupervisorMng() {
  const Navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [supData, setSupData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedUser, setSelectedUser] = useState({
    firstName: '',
    lastName: '',
    contactNo: '',
    email: ''
  });; // State to store the selected user for pop up form
  const [addedUsers, setAddedUsers] = useState([]);


  useEffect(() => {
    // Fetch added users from the database or any other source

    axios.get('http://localhost:510/supervisorList/')
      .then(response => {
        setAddedUsers(response.data);
        console.log('Added users:', response.data);
      })
      .catch(error => {
        console.error('Error fetching added users:', error);
      });

  }, []);

  const handlePage = () => {
    Navigate('/dashboard/addSupervisor');
  }

  const handleAssignPage = (rowData) => {
    Navigate('/dashboard/assignmember', { state: { rowData: rowData } });
  }

  //pop up window eka
  const handleUpdate = (user) => {
    setSelectedUser(user); // Set the selected user details
    setIsModalOpen(true); // Open the modal
  };


  //update function

  const handleAdd = (rowData) => {
    // Extract relevant data from rowData
    const relevantData = {
      firstName: rowData.firstName,
      lastName: rowData.lastName,
      contactNo: rowData.contactNo,
      email: rowData.email,
      staffPost: rowData.staffPost,
      level: rowData.level
    };
  
    // Add the supervisor to the supervisor list
    axios.post('http://localhost:510/supervisorList/add', relevantData)
      .then(() => {
        // Update the user's role in the user database
        axios.put('http://localhost:510/user/update-role', {
          userId: rowData._id,  // Use the user's ID
          newRole: ['supervisor']  // Add 'supervisor' to the role array
        })
        .then(() => {
          // Update the state to reflect changes
          setAddedUsers(prevUsers => [...prevUsers, rowData]);
          
          toast.success('Supervisor added to list successfully');
          Sweetalert.fire({
            title: 'Success',
            text: 'Supervisor added successfully and user role updated',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          console.log('Supervisor added successfully and user role updated');
        })
        .catch((err) => {
          console.log('Error updating user role:', err);
          Sweetalert.fire({
            title: 'Error',
            text: err.response.data.message || 'Error updating user role',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
      })
      .catch((err) => {
        console.log('Error:', err);
        Sweetalert.fire({
          title: 'Error',
          text: err.response.data.message || 'Error adding supervisor',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };
  



  //update function
  //  const handleupdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.put(`http://localhost:510/user/update-account/${selectedUser._id}`, selectedUser);

  //     if (response.status === 200) {
  //       console.log('User updated successfully:', response.data.message);
  //       setTableData(prevData => prevData.map(data => data._id === selectedUser._id ? selectedUser : data)); // refresh nokara table eke adaala data eka witarak update wenawa
  //       setIsModalOpen(false); // Close modal after successful update
  //       Sweetalert.fire({ 
  //         title: 'Success',
  //         text: 'User updated successfully',
  //         icon: 'success',
  //         confirmButtonText: 'OK'
  //       })
  //     } else {
  //       console.error('Failed to update user:', response.data.message);
  //       Sweetalert.fire({
  //         title: 'Error',
  //         text: response.data.message,
  //         icon: 'error',
  //         confirmButtonText: 'OK'
  //       })
  //     }
  //   } catch (error) {
  //     console.error('Error updating user:', error.message);
  //     Sweetalert.fire({
  //       title: 'Error',
  //       text: error.message,
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     })
  //   }
  // };

  // const handleDelete = async (id) => {
  //   const confirmation = window.confirm('Are you sure you want to delete this user?');

  //   if (confirmation) {
  //     try {
  //       const response = await axios.delete(`http://localhost:510/user/delete-account/${id}`);

  //       if (response.status === 200) {
  //         console.log('User deleted successfully');
  //         // Remove the deleted user from the table data
  //         setTableData(prevData => prevData.filter(data => data._id !== id));
  //         toast.success('User deleted successfully');
  //       } else {
  //         console.error('Failed to delete user:', response.data.message);
  //         toast.error('Failed to delete user:', response.data.message);
  //       }
  //     } catch (error) {
  //       console.error('Error deleting user:', error.message);
  //       toast.error('Error deleting user:', error.message);
  //     }
  //   }
  // };

  const handleDelete = (email) => {
    // Find the user in supData with the matching email
    const user = supData.find(user => user.email === email);
    // Find the user in tableData with the matching email
    const user1 = tableData.find(user => user.email === email);
  
    if (user && user1) {
      // Delete the user from the supervisor list database
      axios.delete(`http://localhost:510/supervisorList/delete/${user._id}`)
        .then(() => {
          // Update the user's roles in the user database
          return axios.put('http://localhost:510/user/remove-role', {
            userId: user1._id, // Use the user table ID
            roleToRemove: 'supervisor' 
          });
        })
        .then(() => {
          // Update the state to reflect changes
          setTableData(prevData => prevData.filter(data => data._id !== user1._id));
          setSupData(prevSupData => prevSupData.filter(sup => sup.email !== email));
  
          toast.success('Supervisor deleted successfully and user role updated');
          Sweetalert.fire({
            title: 'Success',
            text: 'Supervisor deleted successfully and user role updated',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        })
        .catch((err) => {
          console.log('Error:', err);
          Sweetalert.fire({
            title: 'Error',
            text: err.response?.data?.message || 'Error occurred',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    } else {
      Sweetalert.fire({
        title: 'Error',
        text: 'User not found',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  
  



  useEffect(() => {
    axios.get('http://localhost:510/user')
      .then(res => {
        const supervisor = res.data.filter(user => user.level === "1" || user.level === "2");
        console.log(supervisor);
    
        setTableData(supervisor);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:510/supervisorList/')
      .then(res => {
        const supervisor = res.data;
        console.log(supervisor );
        setSupData(supervisor);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-4">
      <CoordinatorWelcomeCard />
      <p className="mt-2 text-gray-600">Supervisor Management</p>
      <div className="overflow-x-auto bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h2 className="text-lg font-bold mb-4">Assign Users as Supervisors</h2>
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
            <tr>
              <th scope="col" className="px-6 py-4">First Name</th>
              <th scope="col" className="px-6 py-4">Last Name</th>
              <th scope="col" className="px-6 py-4">Contact Number</th>
              {/* <th scope="col" className="px-6 py-4">Level</th> */}
              <th scope="col" className="px-6 py-4">Post</th>
              <th scope="col" className="px-6 py-4">Email</th>
             
              <th scope="col" className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
  {tableData.map((data, index) => {
    const isAdded = addedUsers.find((supervisor) => supervisor.email === data.email);
    return (
      <tr key={index} className="border-dark:border-neutral-500">
        <td className="px-6 py-4">{data.firstName}</td>
        <td className="px-6 py-4">{data.lastName}</td>
        <td className="px-6 py-4">{data.contactNo}</td>
        {/* <td className="px-6 py-4">{data.level}</td> */}
        <td className="px-6 py-4">{data.staffPost}</td>
        <td className="px-6 py-4">{data.email}</td>
        
      
        <td>
          <button
            onClick={() => handleAdd(data)}
            className={`bg-blue-500 rounded bg-primary px-3 pb-2 pt-2.5 ml-2 ${addedUsers.find((supervisor) => supervisor.email === data.email) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={addedUsers.find((supervisor) => supervisor.email === data.email)}
          >
            Add
          </button>
        </td>
        <td>
          {/* Conditionally render the Delete button if the user exists in the database */}
          {isAdded && (
            <button
              onClick={() => handleDelete(data.email)} // Pass email instead of ID
              className="bg-red-500 inline-block rounded px-3 pb-2 pt-2.5 ml-2"
            >
              <FaTrash />
            </button>
          )}
        </td>
      </tr>
    );
  })}
</tbody>

        </table>
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
  )
}

export default SupervisorMng;