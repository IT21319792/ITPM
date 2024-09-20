import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SameSemesterSpecializationStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch same semester and specialization students
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:510/student/get-same-semester-specialization-students');
                setStudents(response.data.students);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching students:', error);
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div>
            <h2>Students with Same Semester and Specialization</h2>
            {loading ? (
                <p>Loading...</p>
            ) : students.length === 0 ? (
                <p>No students found with same semester and specialization.</p>
            ) : (
                <ul>
                    {students.map(student => (
                        <li key={student._id}>
                            <strong>Name:</strong> {student.firstName} {student.lastName}, <strong>Email:</strong> {student.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SameSemesterSpecializationStudents;
