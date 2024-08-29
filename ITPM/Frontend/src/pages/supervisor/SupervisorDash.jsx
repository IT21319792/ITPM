import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PMemberWelcomeCard from '../../components/PMemberWelcomeCard';
import SupervisorWelcomeCard from '../../components/SupervisorWelcomeard';

function PresentationTable() {
    const [presentations, setPresentations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:510/report');
                setPresentations(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching presentations:', error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleUpdate = (presentation) => {
        navigate('/dashboard/updateMarksReports', { state: { presentation } });
    };

    const handleDelete = async (presentation) => {
        try {
            const presentationId = presentation._id;
            await axios.delete(`http://localhost:510/report/delete/${presentationId}`);
            setPresentations(prevPresentations => prevPresentations.filter(prevPresentation => prevPresentation._id !== presentationId));
            Swal.fire({
                icon: 'success',
                title: 'Presentation Deleted!',
                text: 'The presentation has been deleted successfully.',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete the presentation. Please try again later.',
            });
            console.error('Error deleting presentation:', error);
        }
    };

    return (
        <div style={{ maxWidth: '100%', overflowX: 'auto', padding: '20px' }}>
           
            <SupervisorWelcomeCard></SupervisorWelcomeCard>
            <h2>Presentation Data</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th className="table-header">Report Type</th>
                                <th className="table-header">Group</th>
                                <th className="table-header">Mark</th>
                                <th className="table-header">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {presentations.length > 0 ? (
                                presentations.map(presentation => (
                                    <tr key={presentation._id} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td>{presentation.reportType}</td>
                                        <td>{presentation.group}</td>
                                        <td>
                                            {presentation.groupMarks.map(mark => (
                                                <div key={mark.rubricID}>{mark.rubricID}</div>
                                            ))}
                                        </td>
                                        <td>
                                            <button onClick={() => handleUpdate(presentation)}>
                                                <i className="fas fa-edit" style={{ color: '#007bff' }}></i>
                                            </button>
                                            <button onClick={() => handleDelete(presentation)}>
                                                <i className="fas fa-trash-alt" style={{ color: '#dc3545' }}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>No data available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

}

export default PresentationTable;
