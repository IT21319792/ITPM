import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MarksTable() {
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:510/api/presentation/marks');
                setMarks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching marks:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light border-collapse">
                <thead className="border-b bg-white font-medium">
                    <tr>
                        <th className="px-6 py-3">Presentation Type</th>
                        <th className="px-6 py-3">User ID</th>
                        <th className="px-6 py-3">Mark 1</th>
                        <th className="px-6 py-3">Mark 2</th>
                        <th className="px-6 py-3">Mark 3</th>
                        <th className="px-6 py-3">Rubric Index</th>
                        <th className="px-6 py-3">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {marks.map((mark, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="px-6 py-4">{mark.presentationType}</td>
                            <td className="px-6 py-4">{mark.userId}</td>
                            {mark.marks.map((singleMark, markIndex) => (
                                <td key={markIndex} className="px-6 py-4">{singleMark}</td>
                            ))}
                            <td className="px-6 py-4">{mark.rubricIndex}</td>
                            <td className="px-6 py-4">{new Date(mark.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MarksTable;
