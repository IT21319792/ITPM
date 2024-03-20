import React from 'react';
import { useLocation } from 'react-router-dom';

function StudentMarksTable() {
    const location = useLocation();
    const rowData = location.state?.rowData;

    // Simulated data for testing
    const simulatedMarksData = [
        { subject: 'Math', marks: 90 },
        { subject: 'Science', marks: 85 },
        { subject: 'History', marks: 88 },
        // Add more subjects and marks as needed
    ];

    if (!rowData || !Array.isArray(rowData.marks)) {
        return (
            <div className="p-4">
                <p>Error: Unable to fetch student data or marks.</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Student Marks: {rowData.firstName} {rowData.lastName}</h1>
            <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                        <th scope="col" className="px-6 py-4">Subject</th>
                        <th scope="col" className="px-6 py-4">Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {rowData.marks.map((mark, index) => (
                        <tr key={index} className="border- dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{mark.subject}</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{mark.marks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentMarksTable;
