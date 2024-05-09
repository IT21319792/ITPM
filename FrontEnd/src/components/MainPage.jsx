import React from 'react';
import TopNav from './TopNav';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function MainPage() {
    const userRole = Cookies.get('role');
    if (userRole === 'staff') {
        Cookies.set('OriginalRole', userRole);
    }


    const level = Cookies.get('level');
    const staffPost = Cookies.get('staffPost');

    const navigate = useNavigate();
    const handleButtonClickCoordinator = () => {
        const role = Cookies.get('OriginalRole');
        if (role === 'staff' && (level === '1' || level === '2')) {
            const expirationTime = new Date();
            expirationTime.setSeconds(expirationTime.getSeconds() + 10);
            Cookies.set('role', 'coordinator', { expires: expirationTime });
            navigate('/dashboard');
        } else {
            alert('You are not authorized to access this page as a ' + staffPost + ' with level ' + level + 'access');
        }
    };

    const handleButtonClickPMember = () => {
        const role = Cookies.get('OriginalRole');
        if (role === 'staff' && (level === '1' || level === '2')) {
            Cookies.set('role', 'member');
            navigate('/dashboard/pMemberDash');
        } else {
            alert('You are not authorized to access this page as a ' + staffPost + ' with level ' + level + 'access');

        }
    };

    const handleButtonClickSupervisor = () => {
        const role = Cookies.get('OriginalRole');
        if (role === 'staff' && (level === '1' || level === '2')) {
            Cookies.set('role', 'supervisor');
            navigate('/dashboard/supervisorDash');
        } else {
            alert('You are not authorized to access this page as a ' + staffPost + ' with level ' + level + 'access');

        }
    };

    const handleButtonClickExaminer = () => {
        const role = Cookies.get('OriginalRole');
        if (role === 'staff' && (level === '1' || level === '2' || level === '3')) {
            Cookies.set('role', 'examinar');
            navigate('/dashboard/examinerDash');
        } else {
            alert('You are not authorized to access this page as a ' + staffPost + ' with level ' + level + 'access');

        }
    };

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
                            <a href="#" onClick={handleButtonClickExaminer} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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