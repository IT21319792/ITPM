// Sidebar.js
import React from 'react';

const Sidebar = ({ children }) => {
    return (
        <div className="sidebar">
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <span className="text-white font-bold uppercase">ITPM{ /*nama dynamically change wenna hadanna*/}</span >
            </div>
            {/* Dynamic Sidebar content */}
            {children}
        </div>
    );
};

export default Sidebar;
