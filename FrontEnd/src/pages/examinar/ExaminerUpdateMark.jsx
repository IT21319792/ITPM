import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Sweetalert2 from 'sweetalert2';
import PMemberWelcomeCard from '../../components/PMemberWelcomeCard';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

function ExaminerPresentationMarks({ rowData }) {
    const [presentationType, setPresentationType] = useState('');
    const [Mark1, setMark1] = useState('');
    const [Mark2, setMark2] = useState('');
    const [Mark3, setMark3] = useState('');
    const [Mark4, setMark4] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [groups, setGroups] = useState([]);
    const location = useLocation();
    const { presentation } = location.state || {};
    const [rubrics, setRubrics] = useState([]);
    const [criteriaCount, setCriteriaCount] = useState(0);


    const loggedUser = Cookies.get('firstName');


    useEffect(() => {
        async function fetchRubricData() {
            try {
                const response = await Axios.get('http://localhost:510/rubric/getRubrics');
                setRubrics(response.data.data);
            } catch (error) {
                console.error('Error fetching rubric data:', error);
            }
        }
        fetchRubricData();
    }, [presentationType]); // Include presentationType as a dependency

    useEffect(() => {
        if (presentation) {
            setPresentationType(presentation.presentationType);
            const marksArray = presentation.groupMarks.map(mark => mark.mark);
            setMarks(marksArray);
            setSelectedGroup(presentation.group);
        }
    }, [presentation]);

    const id = presentation._id;
    console.log(id, 'id is this')
    const handleSubmit = async (e) => {
        e.preventDefault();

        const marks = [];
        for (let i = 1; i <= criteriaCount; i++) {
            const markInput = e.target.elements[`mark${i}`];
            const mark = markInput ? markInput.value : '';
            marks.push({ rubricID: `Rubric ${i}`, mark: Number(mark) });
        }

        const updatedMark = {
            loggedUser,
            presentationType,
            group: presentation.group, // Assuming the group ID is in the 'group' property of the presentation object
            groupMarks: marks
        };

        console.log("Updating mark with ID:", id);
        console.log("Updated mark data:", updatedMark);

        try {
            // Replace 'id' with the correct variable that holds the ID of the presentation you want to update
            const response = await Axios.put(`http://localhost:510/presentation/update/${id}`, updatedMark);
            console.log("Update response:", response.data);
            Sweetalert2.fire('Data Updated!', 'Your record has been updated successfully.', 'success');
            e.target.reset();
        } catch (error) {
            Sweetalert2.fire('Error!', 'Failed to update the record', 'error');
            console.error(error);
        }
    };



    const filteredRubrics = rubrics.filter(rubric => rubric.type === presentationType);
    console.log(filteredRubrics);
    console.log(presentationType);


    useEffect(() => {
        // Find the rubric for the selected presentation type
        const selectedRubric = rubrics.find(rubric => rubric.type === presentationType);
        // Set criteria count to the number of criteria in the rubric + 1 (for the marks input)
        if (selectedRubric) {
            setCriteriaCount(selectedRubric.criteriaDetails.length);
        } else {
            setCriteriaCount(0); // If rubric is not found, set criteria count to 0
        }
    }, [presentationType, rubrics]);


    const [marks, setMarks] = useState(Array.from({ length: criteriaCount }, () => ''));

    const setMarkValue = (index, value) => {
        const newMarks = [...marks];
        newMarks[index] = value;
        setMarks(newMarks);
    };
    // Function to get the mark value based on index
    const getMarkValue = (index) => {
        return marks[index] || ''; // Return the mark value at the specified index or an empty string if it's undefined
    };

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col bg-white p-4">
            <PMemberWelcomeCard />
            <div className="container max-w-full mx-auto flex flex-col md:flex-row items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full md:w-1/2 md:mr-4">
                    <h1 className="mb-8 text-3xl text-center font-semibold">Add Marks</h1>
                    <form onSubmit={handleSubmit} className="mb-4">
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
                                    Group
                                </label>
                                <div className="relative">
                                    <input
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="group"
                                        placeholder={selectedGroup}
                                        value={selectedGroup}
                                        onChange={(e) => setSelectedGroup(e.target.value)}
                                        readOnly
                                    >
                                    </input>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-2 w-full'>
                            {[...Array(criteriaCount)].map((_, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name={`mark${index + 1}`}
                                    placeholder={`Mark ${index + 1}`}
                                    value={marks[index] || ''}
                                    onChange={(e) => setMarkValue(index, e.target.value)}
                                    max={filteredRubrics.length > 0 ? filteredRubrics[0].criteriaDetails[index].marks : 100}
                                    required
                                />
                            ))}
                        </div>
                        <button
                            type="submit" className="w-full text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" >
                            Submit
                        </button>
                        <div>
                            <p className='text-red-600 text-center'>
                                {/* Error message can be displayed here if needed */}
                            </p>
                        </div>
                    </form>
                </div>
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full md:w-1/2 md:ml-4 mt-8 md:mt-0">
                    <h1 className="mb-8 text-3xl text-center font-semibold">Rubric Data</h1>
                    {filteredRubrics.length > 0 ? (
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Rubric ID</th>
                                    <th className="px-4 py-2 text-left">Topic</th>
                                    <th className="px-4 py-2 text-left">Criteria Details</th>
                                    <th className="px-4 py-2 text-left">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRubrics.map(rubric => (
                                    <tr key={rubric._id} className="border-b">
                                        <td className="px-4 py-2">{rubric.rubricID}</td>
                                        <td className="px-4 py-2">{rubric.topic}</td>
                                        <td className="px-4 py-2">
                                            <ul>
                                                {rubric.criteriaDetails.map((criteria, index) => (
                                                    <li key={index}>{criteria.criteria}: {criteria.marks}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="px-4 py-2">{rubric.type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center">No rubric data found.</p>
                    )}
                </div>
            </div>
        </div>

    );




};

export default ExaminerPresentationMarks;
