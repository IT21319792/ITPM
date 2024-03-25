import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import PMemberWelcomeCard from '../../components/PMemberWelcomeCard';
import { useNavigate } from 'react-router-dom';
import Sweetalert2 from 'sweetalert2';

function ProjectMemberMng() {
    const navigate = useNavigate();
    const [presentationData, setpresentationData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); //search part

    useEffect(() => {
        Axios.get('http://localhost:510/presentation/')
            .then(res => {
                console.log(res.data);
                setpresentationData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleAddMarks = () => {
        navigate('/dashboard/addMarks');
    }
    //search part
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredPresentationData = presentationData.filter(report =>
        report.group.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getAllSchedule = async () => {
        try {
            const response = await Axios.get('http://localhost:510/presentation/');
            setpresentationData(response.data);
        } catch (error) {
            console.error('Error fetching presentation marks:', error);
            // Handle error
        }
    };
    const handleDelete = (rowData) => {
        Sweetalert2.fire({
            title: 'Are you sure?',
            text: 'You want to delete this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await Axios.delete(`http://localhost:510/presentation/delete/${rowData._id}`);
                    if (response.status === 200) {
                        Sweetalert2.fire('Deleted!', 'Your record has been deleted.', 'success');
                        setpresentationData(prevData => prevData.filter(student => student._id !== rowData._id));
                        getAllSchedule(); // Assuming this function is defined somewhere
                    } else {

                    }
                } catch (error) {
                    console.error('Error deleting presentation mark:', error);
                    Sweetalert2.fire('Error!', 'Failed to delete the record', 'error');
                }
            }
        });
    };



    const handleUpdate = (rowData) => {
        navigate('/dashboard/update', { state: { rowData } });
    }

    return (
        <div className="p-4">
            <PMemberWelcomeCard />
            <input
                type="text"
                placeholder="Search by group..."
                className="p-2 mb-4 border rounded"
                value={searchQuery}
                onChange={handleSearch}
            />


            {/* Table */}
            <table className="table-auto w-full mt-4">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Group</th>
                        <th className="border px-4 py-2">Presentation Type</th>
                        {presentationData.length > 0 && presentationData[0].groupMarks.map((mark, index) => (
                            <th key={index} className="border px-4 py-2">{`Rubric ${index + 1} marks`}</th>
                        ))}
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPresentationData.length > 0 ? (
                                            filteredPresentationData.map((presentation, index) => (
                                                <tr key={index}>
                                                    <td className="border px-4 py-2">{presentation.group}</td>
                                                    <td className="border px-4 py-2">{presentation.presentationType}</td>
                                                    {presentation.groupMarks.map((mark, index) => (
                                                        <td key={index} className="border px-4 py-2">{mark.rubricID}</td>
                                                    ))}
                                                    <td className="border px-4 py-2">
                                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(presentation)}>Delete</button>
                                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleUpdate(presentation)}>Update</button>
                                                    </td>
                                                </tr>
                                            ))
                    ) : (
                        <tr>
                        <td colSpan="7" className="border px-4 py-2 text-center">
                            No data found for: <span style={{ fontWeight: 'bold' }}>{searchQuery}</span>
                        </td>

                    </tr>
                    )

                    }
                </tbody>
            </table>
            <div className='p-4'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded" onClick={() => handleAddMarks()}>Add Marks</button>
            </div>
        </div>
    )
}

export default ProjectMemberMng;
