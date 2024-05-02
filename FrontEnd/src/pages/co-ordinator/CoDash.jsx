import React, { useState, useEffect } from 'react';
import CoordinatorWelcomeCard from '../../components/CoordinatorWelcomeCard';

function CoDash() {
  const [roleCount, setRoleCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from backend API
    fetch('http://localhost:510/user') // Replace 'http://localhost:510/user' with your actual backend API URL
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        // Count occurrences of each role
        const count = data.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});
        setRoleCount(count);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <CoordinatorWelcomeCard />
      <div className="overflow-x-auto">
      <h1 className="text-xl font-semibold text-gray-800">System user Count</h1>
        <div className="flex flex-wrap">
         
          {Object.entries(roleCount).map(([role, count]) => (
            <div key={role} className="flex items-center justify-center border rounded p-4 mb-2 mr-2">
              <div className={`text-white p-2 rounded-full bg-${getRoleColor(role)}`}>{role}</div>
              <div className="ml-2">Count: {count}</div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}

// Function to get role-specific color
function getRoleColor(role) {
  switch (role) {
    case 'admin':
      return 'red-500';
    case 'coordinator':
      return 'blue-500';
    case 'member':
      return 'green-500';
    case 'supervisor':
      return 'yellow-400'; // Change to 'yellow-400' for better visibility
    case 'examiner':
      return 'indigo-500';
    case 'student':
      return 'purple-400'; // Change to 'purple-400' for better visibility
    default:
      return 'gray-500';
  }
}

export default CoDash;