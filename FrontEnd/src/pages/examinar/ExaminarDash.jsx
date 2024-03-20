import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoordinatorWelcomeCard from '../../components/CoordinatorWelcomeCard';
import { useNavigate } from 'react-router-dom';

function ProjectMemberMng() {
    const Navigate = useNavigate();

    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:510/presentation/marks/students')
            .then(res => {
                console.log(res.data);
                setStudentData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleAddMarks = (rowData) => {
        Navigate('/dashboard/addMarks', { state: { rowData: rowData } });
    }

    const handleUpdate = () => {
        // Handle update functionality
    }

    return (
        <div className="p-4">
            <CoordinatorWelcomeCard />
            <p className="mt-2 text-gray-600">Project Member Management</p>

            {/* Table */}
            <div>
                <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                        <tr>
                            <th scope="col" className="px-6 py-4">First Name</th>
                            <th scope="col" className="px-6 py-4">Last Name</th>
                            <th scope="col" className="px-6 py-4">Email</th>
                            <th scope="col" className="px-6 py-4">Status</th>
                            <th scope="col" className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.map((data, index) => (
                            <tr key={index} className="border- dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium transition duration-300 ease-in-out hover:bg-neutral-100  dark:hover:bg-neutral-600">{data.firstName}</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium transition duration-300 ease-in-out hover:bg-neutral-100  dark:hover:bg-neutral-600">{data.lastName}</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium transition duration-300 ease-in-out hover:bg-neutral-100  dark:hover:bg-neutral-600">{data.email}</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium transition duration-300 ease-in-out hover:bg-neutral-100  dark:hover:bg-neutral-600">{data.hasMarks ? 'Marks Added' : 'No Marks'}</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    <button onClick={handleUpdate} className={`rounded px-3 pb-2 pt-2.5 ml-2 ${data.hasMarks ? 'bg-gray-500 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`} disabled={data.hasMarks}>Update</button>
                                    <button onClick={() => handleAddMarks(data)} className={`rounded px-3 pb-2 pt-2.5 ${data.hasMarks ? 'bg-gray-500 text-gray-400 cursor-not-allowed' : 'bg-green-700 text-white hover:bg-green-800'}`} disabled={data.hasMarks}>Add Marks</button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProjectMemberMng;
