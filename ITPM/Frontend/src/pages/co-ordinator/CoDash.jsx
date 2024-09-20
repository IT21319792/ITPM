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
      <h1 className="text-xl font-semibold text-gray-800">System User Count</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(roleCount).map(([role, count]) => (
              <tr key={role}>
                <td className={`px-6 py-4 border-b border-gray-200 text-sm text-white rounded-full bg-${getRoleColor(role)}`}>
                  {role}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                  {count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      return 'red-500';
    case 'member':
      return 'green-500';
    case 'supervisor':
      return 'yellow-400'; 
    case 'examiner':
      return 'red-500';
    case 'student':
      return 'blue-500';
    default:
      return 'gray-500';
  }
}

export default CoDash;
