import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PMemberWelcomeCard from '../../components/PMemberWelcomeCard';
import SupervisorWelcomeCard from '../../components/SupervisorWelcomeard';

function PresentationTable() {
    const [presentations, setPresentations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMark, setNewMark] = useState({ reportType: '', group: '', mark: '' });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:510/report/add', newMark);
            setPresentations(prev => [...prev, response.data]);
            setNewMark({ reportType: '', group: '', mark: '' });
            Swal.fire({
                icon: 'success',
                title: 'Mark Added!',
                text: 'The mark has been added successfully.',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add the mark. Please try again later.',
            });
            console.error('Error adding mark:', error);
        }
    };

    return (
        <div style={{ maxWidth: '100%', overflowX: 'auto', padding: '20px' }}>
            <SupervisorWelcomeCard />
            <h2>Presentation Data</h2>

        

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa', color: '#212529', fontWeight: 'bold' }}>
                                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Report Type</th>
                                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Group</th>
                                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Mark</th>
                                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {presentations.length > 0 ? (
                                presentations.map(presentation => (
                                    <tr key={presentation._id} style={{ borderBottom: '1px solid #dee2e6', backgroundColor: '#ffffff', transition: 'background-color 0.3s' }}>
                                        <td style={{ padding: '10px' }}>{presentation.reportType}</td>
                                        <td style={{ padding: '10px' }}>{presentation.group}</td>
                                        <td style={{ padding: '10px' }}>
                                            {presentation.groupMarks.map(mark => (
                                                <div key={mark.rubricID}>{mark.rubricID}</div>
                                            ))}
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            <button onClick={() => handleUpdate(presentation)} style={{ backgroundColor: '#007bff', border: 'none', color: '#fff', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button onClick={() => handleDelete(presentation)} style={{ backgroundColor: '#dc3545', border: 'none', color: '#fff', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '10px' }}>No data available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

//tyuteyu

export default PresentationTable;
