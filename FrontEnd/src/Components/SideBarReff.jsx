import React from 'react'

function SideNav() {
    return (

        // me nav bar eka refer karanna.
        //methana idala copy karaganna

        <div className="hidden md:flex flex-col w-64 bg-gray-">

            <div className="flex flex-col flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 py-4 bg-gray-">
                    {/* 1st link  */}
                    <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        Dashboard
                    </a>
                    {/* 2nd link  */}
                    <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Messages
                    </a>
                    {/* 3rd link  */}
                    <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Settings
                    </a>

                    {/* add your links to pages  */}

                </nav>
            </div>
        </div>

    )
}

export default SideNav