import React from 'react';
import { Link } from 'react-router-dom';

const SpacePerformanceTable = ({ spaces }) => {
  if (!spaces || spaces.length === 0) {
    return (
      <div className="p-4 text-center bg-gray-50 dark:bg-dark-bg rounded-md transition-colors duration-200">
        <p className="text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">No space performance data available</p>
      </div>
    );
  }

  // Function to get color for occupancy percentage
  const getOccupancyColor = (rate) => {
    if (rate >= 80) return 'text-green-600 dark:text-green-400';
    if (rate >= 60) return 'text-blue-600 dark:text-blue-400';
    if (rate >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Function to render progress bar
  const renderProgressBar = (rate) => {
    const color = rate >= 80 ? 'bg-green-500 dark:bg-green-600' :
                rate >= 60 ? 'bg-blue-500 dark:bg-blue-600' :
                rate >= 40 ? 'bg-yellow-500 dark:bg-yellow-600' :
                'bg-red-500 dark:bg-red-600';

    return (
      <div className="w-full bg-gray-200 dark:bg-dark-bg rounded-full h-2 mt-1 transition-colors duration-200">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${color}`} 
          style={{ width: `${rate}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
        <thead className="bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
              Space
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
              Bookings
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
              Revenue
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
              Occupancy
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-dark-bg-light divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
          {spaces.map((space) => (
            <tr key={space.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                  {space.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                  {space.bookings}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                  €{space.revenue.toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium transition-colors duration-200">
                  <div className="flex items-center">
                    <span className={getOccupancyColor(space.occupancyRate)}>
                      {space.occupancyRate}%
                    </span>
                  </div>
                  {renderProgressBar(space.occupancyRate)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/space/${space.id}`} className="text-primary-600 dark:text-dark-primary-500 hover:text-primary-900 dark:hover:text-dark-primary-300 transition-colors duration-200">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpacePerformanceTable;