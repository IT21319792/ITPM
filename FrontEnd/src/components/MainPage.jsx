import React from 'react';
import TopNav from './TopNav';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';

function MainPage() {
    const userRole = Cookies.get('role');
    if (userRole === 'staff') {
        Cookies.set('OriginalRole', userRole);
    }


    const level = Cookies.get('level');
    const staffPost = Cookies.get('staffPost');
    const firstName = Cookies.get('firstName');
   

    const navigate = useNavigate();


// checking users in the databases
//-----------------------------------------------------------------------------------------------------------------------

const findPrMemberByName = async (firstName) => {
    try {
        const response = await axios.get(`http://localhost:510/prmember/${firstName}`);
        if (!response.data) {
            return false; 
        }
        return true;
    } catch (error) {
       
        console.error('Error finding PR member by name:', error);
        return false; r
    }
};

const findExaminerByName = async (firstName) => {
    try {
        const response = await axios.get(`http://localhost:510/schedule/getSchedules`);

        // Assuming the response contains an array of schedules
        const schedules = response.data.data;

        console.log('Schedules:', schedules);

        // Initialize arrays to store schedule and group names
        const scheduleNames = [];
        const groupNames = [];

        // Iterate over each schedule
        schedules.forEach(schedule => {
            console.log('Checking schedule:', schedule);

            // Check if the provided first name is present in any examiner's name within the schedule
            const examinerFound = schedule.examiners.includes(firstName);

            console.log('Examiner found in this schedule:', examinerFound);

            // If the examiner is found in this schedule, add schedule and group names to arrays
            if (examinerFound) {
                console.log(`Examiner ${firstName} found in schedule ${schedule.ScheduleID}`);
                scheduleNames.push(schedule.ScheduleID);
                groupNames.push(schedule.GroupID);
            }
        });

        console.log('Schedule Names:', scheduleNames);
        console.log('Group Names:', groupNames);

        // If the examiner is not found in any schedule, return { found: false }
        if (scheduleNames.length === 0) {
            console.log(`Examiner ${firstName} not found in any schedule`);
            return { found: false };
        }

        // Return found status, schedule names, and group names
        return { found: true, scheduleNames, groupNames };
    } catch (error) {
        console.error('Error finding examiner by name:', error);
        return { found: false, error: error.message }; // Return error if encountered
    }
};

const findSupervisorByName = async (firstName) => {
    try {
        const response = await axios.get(`http://localhost:510/supervisor/`);

        // Assuming the response contains an array of supervisors
        const supervisors = response.data;

        console.log('Supervisors:', supervisors);

        // Initialize arrays to store tittle and group names
        const tittleNames = [];
        const groupNames = [];

        // Iterate over each supervisor
        supervisors.forEach(supervisor => {
            console.log('Checking supervisor:', supervisor);

            // Check if the provided first name is present in the supervisor's name
            const supervisorName = `${supervisor.firstName} ${supervisor.lastName}`;
            const supervisorFound = supervisorName.includes(firstName);

            console.log('Supervisor found:', supervisorFound);

            // If the supervisor is found, add tittle and group names to arrays
            if (supervisorFound) {
                console.log(`Supervisor ${firstName} found`);
                tittleNames.push(...supervisor.tittles);
                groupNames.push(...supervisor.groups);
            }
        });

        console.log('Tittle Names:', tittleNames);
        console.log('Group Names:', groupNames);

        // If the supervisor is not found in any supervisor, return { found: false }
        if (tittleNames.length === 0) {
            console.log(`Supervisor ${firstName} not found `);
            return { found: false };
        }

        // Return found status, tittle names, and group names
        return { found: true, tittleNames, groupNames };
    } catch (error) {
        console.error('Error finding supervisor by name:', error);
        return { found: false, error: error.message }; // Return error if encountered
    }
};


// handling the button click for userdashboards
//-----------------------------------------------------------------------------------------------------------------------

const handleButtonClickCoordinator = () => {
    const role = Cookies.get('OriginalRole');
    console.log(role);
    if (role === 'staff' && (level === '1')) {
        const expirationTime = new Date();
        expirationTime.setSeconds(expirationTime.getSeconds() + 10);
        Cookies.set('role', 'coordinator', { expires: expirationTime });
        navigate('/dashboard');
    } else {
       
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You are not authorized to access this page as a ' + staffPost + ' with level ' + level + 'access',
        });
    }
};


const handleButtonClickPMember = async () => {
    const role = Cookies.get('OriginalRole');
    console.log(role);
    if (role === 'staff' && (level === '1' || level === '2')) {
        const userExists = await findPrMemberByName(firstName); 
        if (userExists) {
            Cookies.set('role', 'member');
            navigate('/dashboard/pMemberDash');
        } else {
            if (level === '1') {
                Swal.fire({
                    icon: 'question',
                    title: 'You are not assigned as a project member!',
                    text: 'Do you want to go to the dashboard as a project member?',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Cookies.set('role', 'member');
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Welcome to the project member dashboard!',
                        });
                        navigate('/dashboard/pMemberDash');
                    }
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Seems like you have not been assigned as a project member!',
                });
            }
            
          
        }
    } else {
       
        Swal.fire({
            icon: 'warning',
            title: 'Access Denied',
            text: 'You are not authorized to access this page as a ' + staffPost + ' with level ' + level + 'access',
        });
    }
};

    const handleButtonClickSupervisor = async () => {
        const role = Cookies.get('OriginalRole');
        if (role === 'staff' && (level === '1' || level === '2')) {
            const result = await findSupervisorByName(firstName); // Get supervisor details
            if (result.found) {
                Cookies.set('role', 'supervisor');
                navigate('/dashboard/supervisorDash', {
                    state: { tittleNames: result.tittleNames, groupNames: result.groupNames }

                })
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'You have been assigned as a supervisor to the following schedules: ' + result.scheduleNames+
                    'and to the following groups: ' + result.groupNames.join(', '), // Display group names
                });
                
            }else{
                console.error('Supervisor not found in any schedule');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You have not been assigned as a supervisor!',
                });
            }
          
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Access Denied',
                text: 'You are not authorized to access this page as a ' + staffPost + ' with level ' + level + 'access',
            });

        }
    };

    const handleButtonClickExaminer = async () => {
        const role = Cookies.get('OriginalRole');
        if (role === 'staff' && (level === '1' || level === '2' || level === '3')) {
            const result = await findExaminerByName(firstName); // Get examiner details

            if (result.found) {
                // If examiner is found, navigate to examiner dashboard along with group details and schedule names
                Cookies.set('role', 'examinar');
                navigate('/dashboard/examinerDash', {
                    state: { scheduleNames: result.scheduleNames, groupNames: result.groupNames }

                });
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'You have been assigned as an examiner to the following schedules: ' + result.scheduleNames.join(', ')+
                    'and to the following groups: ' + result.groupNames.join(', '), // Display group names
                });
            } else {
                    console.error('Examiner not found in any schedule');
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'You have not been assigned as an examiner!',
                    });              
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'You are not authorized to access this page as a ' + staffPost + ' with level ' + level + 'access',
            });
        }
    };


// handling the logout button
//-----------------------------------------------------------------------------------------------------------------------

    const handleLogout = () => {

        Cookies.remove('role', { path: '/' });
        Cookies.remove('token', { path: '/' });
        Cookies.remove('pvt', { path: '/' });
        toast.warning('Logout Success!')
        navigate('/');
    };
    return (
        <div>
            <TopNav />
            <button onClick={handleLogout}>LogOut</button>
            <section className="w-full px-6 pb-12 antialiased bg-white flex items-center justify-center">

                <div className="container max-w-full px-4 py-32 text-center flex gap-7 justify-center">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg" src="./../src/img/1.jpg" alt="Technology Acquisition" />
                        </a>
                        <div className="p-5">
                            <a href="#" >
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Cordinator </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <a href="#" onClick={handleButtonClickCoordinator} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Visit
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>


                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg" src="./../src/img/1.jpg" alt="Technology Acquisition" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project Member</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <a href="#" onClick={handleButtonClickPMember} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Visit
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg" src="./../src/img/1.jpg" alt="Technology Acquisition" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Supervisor</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <a href="#" onClick={handleButtonClickSupervisor} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Visit
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg" src="./../src/img/1.jpg" alt="Technology Acquisition" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Examiner</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <a href="#"  onClick={handleButtonClickExaminer}  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Visit
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainPage;