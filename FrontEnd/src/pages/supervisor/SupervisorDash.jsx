import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import PMemberWelcomeCard from '../../components/PMemberWelcomeCard';
import { useNavigate } from 'react-router-dom';
import Sweetalert2 from 'sweetalert2';
import SupervisorWelcomeCard from '../../components/SupervisorWelcomeard';

function SupervisorDash() {
    const navigate = useNavigate();
    const [reportData, setReportData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); //search part


    useEffect(() => {
        Axios.get('http://localhost:510/report/')
            .then(res => {
                console.log(res.data);
                setReportData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleAddMarks = () => {
        navigate('/dashboard/addReportMarks');
    }
    //search part
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredReportData = reportData.filter(report =>
        report.group.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //delete kalata passe
    const getAllReport = async () => {
        try {
            const response = await Axios.get('http://localhost:510/report/');
            setReportData(response.data);
        } catch (error) {
            console.error('Error fetching presentation marks:', error);

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
                    const response = await Axios.delete(`http://localhost:510/report/delete/${rowData._id}`);
                    if (response.status === 200) {
                        Sweetalert2.fire('Deleted!', 'Your record has been deleted.', 'success');
                        setReportData(prevData => prevData.filter(report => report._id !== rowData._id));
                        getAllReport();
                    } else {

                    }
                } catch (error) {
                    console.error('Error deleting Report mark:', error);
                    Sweetalert2.fire('Error!', 'Failed to delete the record', 'error');
                }
            }
        });
    };

    //update
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
                        <th className="border px-4 py-2">Report</th>
                        <th className="border px-4 py-2">Rubric 1 marks</th>
                        <th className="border px-4 py-2">Rubric 2 marks</th>
                        <th className="border px-4 py-2">Rubric 3 marks</th>
                        <th className="border px-4 py-2">Rubric 4 marks</th>
                        {/* Add headers for other rubric marks if necessary */}
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReportData.length > 0 ? (
                        filteredReportData.map((report, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{report.group}</td>
                                <td className="border px-4 py-2">{report.reportType}</td>
                                <td className="border px-4 py-2">{report.groupMarks[0]?.rubricID}</td>
                                <td className="border px-4 py-2">{report.groupMarks[1]?.rubricID}</td>
                                <td className="border px-4 py-2">{report.groupMarks[2]?.rubricID}</td>
                                <td className="border px-4 py-2">{report.groupMarks[3]?.rubricID}</td>
                                <td className="border px-4 py-2">
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(report)}>Delete</button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleUpdate(report)}>Update</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="border px-4 py-2 text-center">
                                No data found for: <span style={{ fontWeight: 'bold' }}>{searchQuery}</span>
                            </td>

                        </tr>
                    )}
                </tbody>

            </table>
            <div className='p-4'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded" onClick={() => handleAddMarks()}>Add Marks</button>
            </div>
        </div>
    )
}

export default SupervisorDash;
