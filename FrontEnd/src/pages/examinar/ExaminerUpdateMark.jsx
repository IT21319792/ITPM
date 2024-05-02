import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PMemberWelcomeCard from '../../components/PMemberWelcomeCard';
import { useLocation } from 'react-router-dom';
import Sweetalert2 from 'sweetalert2';

function UpdateForm() {
    const location = useLocation();
    const { rowData } = location.state; // Access rowData from location state
    console.log(rowData, 'rowData');

    const [presentationType, setPresentationType] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [Mark1, setMark1] = useState('');
    const [Mark2, setMark2] = useState('');
    const [Mark3, setMark3] = useState('');
    const [Mark4, setMark4] = useState('');


    useEffect(() => {
        if (rowData) {
            setPresentationType(rowData.presentationType);
            setSelectedGroup(rowData.group);
            // Assuming groupMarks is an array of objects with rubricID as properties
            setMark1(rowData.groupMarks[0]?.rubricID || '');
            setMark2(rowData.groupMarks[1]?.rubricID || '');
            setMark3(rowData.groupMarks[2]?.rubricID || '');
            setMark4(rowData.groupMarks[3]?.rubricID || '');
        } else {
            // If no rowData is provided, fetch the data from the backend to populate the form
            fetchData();
        }
    }, [rowData]);



    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:510/presentation/');
            const data = response.data;
            // Assuming data is an array and contains the required rowData
            if (data.length > 0) {
                const firstRowData = data[0]; // Taking the first row's data for demonstration
                setPresentationType(firstRowData.presentationType);
                setSelectedGroup(firstRowData.group);
                // Assuming groupMarks is an array of objects with rubricID as properties
                setMark1(firstRowData.groupMarks[0]?.rubricID || '');
                setMark2(firstRowData.groupMarks[1]?.rubricID || '');
                setMark3(firstRowData.groupMarks[2]?.rubricID || '');
                setMark4(firstRowData.groupMarks[3]?.rubricID || '');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
          const updatedData = {
            presentationType,
            group: selectedGroup,
            groupMarks: [
              { rubricID: Mark1 },
              { rubricID: Mark2 },
              { rubricID: Mark3 },
              { rubricID: Mark4 }
            ]
          };
      
          // Make an axios request to update the data
          const markId = rowData._id; // Assuming rowData contains the ID of the mark to update
          const response = await axios.put(`http://localhost:510/presentation/update/${markId}`, updatedData);
          Sweetalert2.fire(
            'Updated!',
            'Your record has been updated.',
            'success'
        )
          console.log('Presentation mark updated:', response.data);
          // Perform any additional actions, such as showing a success message or redirecting to another page
      
        } catch (error) {
          console.error('Error updating presentation mark:', error);
          Sweetalert2.fire(
            'Not Deleted!',
            'Something want wrong',
            'error'
        )
        }
      };
      
      
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col bg-white p-4">
            <PMemberWelcomeCard />
            <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Update Form</h1>
                    <form onSubmit={handleUpdateSubmit} className="mb-4 md:flex md:flex-wrap md:justify-between">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="presentationType">
                                    Presentation Type
                                </label>
                                <select
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="presentationType"
                                    value={presentationType}
                                    onChange={(e) => setPresentationType(e.target.value)}
                                    required
                                >
                                    <option value="">Select Presentation Type</option>
                                    <option value="Proposal 1">Proposal 1</option>
                                    <option value="Proposal 2">Proposal 2</option>
                                    <option value="Proposal 3">Proposal 3</option>
                                    <option value="Final">Final</option>
                                </select>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="group">
                                    Group Name
                                </label>
                                <div className="relative">
                                    <h1>{selectedGroup}</h1>

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">



                                    </div>
                                </div>
                            </div>
                        </div>
                        <input
                            type="number" // Changed to type number
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="Mark1"
                            placeholder="Mark 1"
                            value={Mark1}
                            onChange={(e) => setMark1(e.target.value)}
                            required
                        />
                        <input
                            type="number" // Changed to type number
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="Mark2"
                            placeholder="Mark 2"
                            value={Mark2}
                            onChange={(e) => setMark2(e.target.value)}
                            required
                        />
                        <input
                            type="number" // Changed to type number
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="Mark3"
                            placeholder="Mark 3"
                            value={Mark3}
                            onChange={(e) => setMark3(e.target.value)}
                            required
                        />
                        <input
                            type="number" // Changed to type number
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="Mark4"
                            placeholder="Mark 4"
                            value={Mark4}
                            onChange={(e) => setMark4(e.target.value)}
                            required
                        />
                        <button
                            type="submit" className="w-full text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Update
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateForm;