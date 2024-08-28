import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import PMemberWelcomeCard from '../../components/PMemberWelcomeCard';

function SchedulePresentationTable() {
    const [schedulePresentations, setSchedulePresentations] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [presentations, setPresentations] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const tableHeaderStyle = {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        whiteSpace: 'nowrap',
    };

    const tableCellStyle = {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        whiteSpace: 'nowrap',
    };

    const handleAddMarks = (rowData1, loggedInUser) => {
        const additionalData = { loggedInUser };
        navigate('/dashboard/marksAssignments', { state: { rowData1, additionalData } }); // Use navigate instead of history.push
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:510/schedule/getSchedules');
                setSchedulePresentations(response.data.data);
                const user = Cookies.get('firstName');
                setLoggedInUser(user);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const filteredSchedulePresentations = schedulePresentations ? schedulePresentations.filter(schedule =>
        schedule.examiners.includes(loggedInUser)
    ) : [];
    console.log('Filtered schedule presentations:', filteredSchedulePresentations);

    const actionButtonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        marginRight: '5px',
    };

    return (


        <div style={{ maxWidth: '100%', overflowX: 'auto', padding: '20px' }}>

            <PMemberWelcomeCard />
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Schedule Presentations</h2>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={tableHeaderStyle}>Schedule ID</th>
                            <th style={tableHeaderStyle}>Group ID</th>
                            <th style={tableHeaderStyle}>Date</th>
                            <th style={tableHeaderStyle}>Time Duration</th>
                            <th style={tableHeaderStyle}>Location</th>
                            <th style={tableHeaderStyle}>Topic</th>
                            <th style={tableHeaderStyle}>Examiners</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSchedulePresentations.map(schedule => (
                            <tr key={schedule._id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={tableCellStyle}>{schedule.ScheduleID}</td>
                                <td style={tableCellStyle}>{schedule.GroupID}</td>
                                <td style={tableCellStyle}>{new Date(schedule.date).toLocaleDateString()}</td>
                                <td style={tableCellStyle}>{schedule.timeDuration}</td>
                                <td style={tableCellStyle}>{schedule.location}</td>
                                <td style={tableCellStyle}>{schedule.topic}</td>
                                <td style={tableCellStyle}>{schedule.examiners.join(', ')}</td>
                                <td style={tableCellStyle}>
                                    <button onClick={() => handleAddMarks(schedule)} style={actionButtonStyle}>
                                        <i className="fas fa-plus" style={{ color: '#28a745' }}></i>
                                    </button>
                                    {/* <button onClick={() => handleUpdate(schedule)} style={actionButtonStyle}>
                                        <i className="fas fa-edit" style={{ color: '#007bff' }}></i>
                                    </button>
                                    <button onClick={() => handleDelete(schedule)} style={actionButtonStyle}>
                                        <i className="fas fa-trash-alt" style={{ color: '#dc3545' }}></i>
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Table to view marks */}
            <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '40px' }}>View Marks</h2>
            <ChildTable groupId={filteredSchedulePresentations.length > 0 ? filteredSchedulePresentations[0].GroupID : null} />
        </div>
    );
}



function ChildTable({ groupId, loggedInUser }) {
    const [presentations, setPresentations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        if (groupId) {
            axios.get(`http://localhost:510/presentation/?groupId=${groupId}`)
                .then(response => {
                    console.log('Fetched presentations:', response.data);
                    setPresentations(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching presentations:', error);
                    setLoading(false);
                });
        }
    }, [groupId]);

    const handleUpdate = (presentation) => {
        try {
            const presentationId = presentation._id;
            // Define a variable to track if the button is disabled
            let isDisabled = false;
            // Check if the presentation ID should be disabled
            if (presentationId === '6647ae7a0464b54ad28b8dc6' || presentationId === 'disableID2') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Update Button Disabled',
                    text: 'The update button is disabled for this presentation.',
                });
                // Set the disabled flag to true
                isDisabled = true;
                // Show a message or perform any action indicating that the update button is disabled for this ID
                console.log('Update button is disabled for this presentation.');
            }
            // If the presentation ID is not in the disabled list, proceed with update
            if (!isDisabled) {
                navigate('/dashboard/updateMarksAssignments', { state: { presentation } });
            }
        } catch (error) {
            // Handle any errors if necessary
            console.error('Error navigating to update marks assignments:', error);
        }
    };

    const handleDelete = async (presentation) => {
        try {
            const presentationId = presentation._id;
            // Check if the presentation ID should be disabled
            if (presentationId === '6647ae7a0464b54ad28b8dc6' || presentationId === '6647bc3c2b55927a2acc6ac3') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Delete Button Disabled',
                    text: 'The delete button is disabled for this presentation.',
                });

                // Show a message or perform any action indicating that the delete button is disabled for this ID
                console.log('Delete button is disabled for this presentation.');
                return;
            }
            // If the presentation ID is not in the disabled list, proceed with deletion
            await axios.delete(`http://localhost:510/presentation/delete/${presentationId}`);
            setPresentations(prevPresentations => prevPresentations.filter(prevPresentation => prevPresentation._id !== presentationId));
            Swal.fire({
                icon: 'success',
                title: 'Presentation Deleted!',
                text: 'The presentation has been deleted successfully.',
            });

            console.log('Presentation deleted successfully.');
        } catch (error) {
            // Show error message using SweetAlert
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
            <h2>Presentation Data</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th className="table-header">Presentation Type</th>
                                <th className="table-header">Group</th>
                                <th className="table-header">Rubric ID</th>
                                <th className="table-header">Mark</th>
                                <th className="table-header">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {presentations.length > 0 ? (
                                presentations.map(presentation => (
                                    <tr key={presentation._id} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td>{presentation.presentationType}</td>
                                        <td>{presentation.group}</td>
                                        <td>
                                            {presentation.groupMarks.map(mark => (
                                                <div key={mark.rubricID}>{mark.rubricID}</div>
                                            ))}
                                        </td>
                                        <td>
                                            {presentation.groupMarks.map(mark => (
                                                <div key={mark.rubricID}>{mark.mark}</div>
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
                                    <td colSpan={5}>No data available for this group.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default SchedulePresentationTable;
