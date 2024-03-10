import React from 'react'
import Sidebar from '../../Components/SideBar';



function ExaminerDash() {
    return (
        <div className="flex h-screen  bg-gray-100">
            <Sidebar>
                <div className="hidden md:flex flex-col w-64 bg-gray-">

                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <nav className="flex-1 px-2 py-4 bg-gray-">
                            {/* Home link  */}
                            <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                Student presentation marks
                            </a>
                            {/* 2nd link  */}
                            <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Add presentation marks
                            </a>
                            {/* 3rd link  */}
                            <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Reports
                            </a>




                            {/* add your links to pages  */}

                        </nav>
                    </div>
                </div>

            </Sidebar>
            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
                    <div >
                        {/* Header Component */}
                    </div>

                </div>
                <div className="p-4">
                    <h1 className="text-2xl font-bold">Welcome Examiner!</h1>
                    <p className="mt-2 text-gray-600">Cordinator dashboard dummy</p>
                </div>
            </div>
        </div>

    )
}

export default ExaminerDash;