import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PMemberWelcomeCard from '../../components/PMemberWelcomeCard';
import { validateForm } from '../../validation/SupervisorValidations/SupervisorValidations';
import Sweetalert2 from 'sweetalert2';

function SupervisorReportMarks() {
  const [reportType, setReportType] = useState('');
  const [Mark1, setMark1] = useState('');
  const [Mark2, setMark2] = useState('');
  const [Mark3, setMark3] = useState('');
  const [Mark4, setMark4] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const [formerror, setFormError] = useState({});

  useEffect(() => {
    Axios.get('http://localhost:510/group/get-all-groups')
      .then(res => {
        setGroups(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(reportType, selectedGroup, Mark1, Mark2, Mark3, Mark4);
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }
    const newMark = {
      reportType,
      group: selectedGroup,
      groupMarks: [
        { rubricID: Number(Mark1) },
        { rubricID: Number(Mark2) },
        { rubricID: Number(Mark3) },
        { rubricID: Number(Mark4) }
      ]
    };

    try {
      await Axios.post('http://localhost:510/report/addMark', newMark);
      Sweetalert2.fire('Marks Added!', 'Your record has been Added!.', 'success');
      console.log('Rubrics added successfully');
      console.log(newMark);

      setReportType('');
      setMark1('');
      setMark2('');
      setMark3('');
      setMark4('');
      setSelectedGroup('');
      setFormError({});
    } catch (error) {
      Sweetalert2.fire('Error!', 'Failed to add the record', 'error');
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col bg-white p-4">
      <PMemberWelcomeCard/>
      <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Add Rubrics for Report</h1>
          <form onSubmit={handleSubmit} className="mb-4 md:flex md:flex-wrap md:justify-between">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="reportType">
                  Report Type
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="reportType"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  required
                >
                  <option value="">Select Report Type</option>
                  <option value="proposal">proposal</option>
                  <option value="progress 1">progress 1</option>
                  <option value="report 1">report 1</option>
                  <option value="report 2">report 2</option>
                  <option value="Final">Final</option>
                </select>
                {formerror.reportType && <p className='text-red-600'>{formerror.reportType}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="group">
                  Group
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="group"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    required
                  >
                    <option value="">Select Group</option>
                    {groups.map(group => (
                      <option key={group.groupID} value={group.groupID}>{group.groupID}</option>
                    ))}
                  </select>
                  {formerror.selectedGroup && <p className='text-red-600'>{formerror.selectedGroup}</p>}
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
              <input
                type="number"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="Mark1"
                placeholder="Mark 1"
                value={Mark1}
                onChange={(e) => setMark1(e.target.value)}
                required
              />
              {formerror.Mark1 && <p className='text-red-600'>{formerror.Mark1}</p>}
              <input
                type="number"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="Mark2"
                placeholder="Mark 2"
                value={Mark2}
                onChange={(e) => setMark2(e.target.value)}
                required
              />
              {formerror.Mark2 && <p className='text-red-600'>{formerror.Mark2}</p>}
            </div>
            <div className='flex gap-2 w-full'>
              <input
                type="number"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="Mark3"
                placeholder="Mark 3"
                value={Mark3}
                onChange={(e) => setMark3(e.target.value)}
                required
              />
              {formerror.Mark3 && <p className='text-red-600'>{formerror.Mark3}</p>}
              <input
                type="number"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="Mark4"
                placeholder="Mark 4"
                value={Mark4}
                onChange={(e) => setMark4(e.target.value)}
                required
              />
              {formerror.Mark4 && <p className='text-red-600'>{formerror.Mark4}</p>}
            </div>
            <button
              type="submit" className="w-full text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Submit
            </button>
            <div>
              <p className='text-red-600 text-center'>
                {/* Error message can be displayed here if needed */}
              </p>
            </div>
          </form>
          <div className="text-center text-sm text-grey-dark mt-4">
            {/* Additional information or instructions can be provided here */}
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default SupervisorReportMarks;
