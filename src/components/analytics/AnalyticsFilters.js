import React from 'react';

/**
 * Analytics Filters component for filtering dashboard data
 */
const AnalyticsFilters = ({ 
  dateRange, 
  setDateRange, 
  location, 
  setLocation, 
  userType, 
  setUserType,
  compareWith,
  setCompareWith,
  onApplyFilters
}) => {
  // Available locations
  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'schwabing', name: 'Schwabing' },
    { id: 'maxvorstadt', name: 'Maxvorstadt' },
    { id: 'bogenhausen', name: 'Bogenhausen' },
    { id: 'garching', name: 'Garching' }
  ];
  
  // Date range options
  const dateRanges = [
    { id: 'last30days', name: 'Last 30 Days' },
    { id: 'last90days', name: 'Last 90 Days' },
    { id: 'lastQuarter', name: 'Last Quarter' },
    { id: 'lastYear', name: 'Last Year' },
    { id: 'yearToDate', name: 'Year to Date' },
    { id: 'custom', name: 'Custom Range' }
  ];
  
  // User type options
  const userTypes = [
    { id: 'all', name: 'All Users' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'startup', name: 'Startup' }
  ];
  
  // Comparison options
  const compareOptions = [
    { id: 'previousPeriod', name: 'Previous Period' },
    { id: 'yearOverYear', name: 'Year Over Year' },
    { id: 'none', name: 'No Comparison' }
  ];
  
  // Handle filter apply
  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters({
        dateRange,
        location,
        userType,
        compareWith
      });
    }
  };
  
  // Show custom date inputs if custom range is selected
  const showCustomDateInputs = dateRange === 'custom';
  
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md p-4 mb-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
          Dashboard Filters
        </h2>
        
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-primary-600 dark:bg-dark-primary-600 text-white text-sm font-medium rounded hover:bg-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200"
        >
          Apply Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range Filter */}
        <div>
          <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1 transition-colors duration-200">
            Date Range
          </label>
          <select
            id="date-range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary sm:text-sm transition-colors duration-200"
          >
            {dateRanges.map((range) => (
              <option key={range.id} value={range.id}>{range.name}</option>
            ))}
          </select>
          
          {showCustomDateInputs && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <label htmlFor="start-date" className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1 transition-colors duration-200">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary sm:text-sm transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1 transition-colors duration-200">
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary sm:text-sm transition-colors duration-200"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Location Filter */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1 transition-colors duration-200">
            Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary sm:text-sm transition-colors duration-200"
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
        </div>
        
        {/* User Type Filter */}
        <div>
          <label htmlFor="user-type" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1 transition-colors duration-200">
            User Type
          </label>
          <select
            id="user-type"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary sm:text-sm transition-colors duration-200"
          >
            {userTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        
        {/* Compare With Filter */}
        <div>
          <label htmlFor="compare-with" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1 transition-colors duration-200">
            Compare With
          </label>
          <select
            id="compare-with"
            value={compareWith}
            onChange={(e) => setCompareWith(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary sm:text-sm transition-colors duration-200"
          >
            {compareOptions.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Additional Filters Toggle */}
      <div className="mt-4 flex justify-between items-center">
        <button
          className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 font-medium flex items-center transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Show Advanced Filters
        </button>
        
        <div className="flex space-x-4">
          <button
            className="text-sm text-gray-600 dark:text-dark-text-secondary hover:text-gray-800 dark:hover:text-dark-text-primary font-medium transition-colors duration-200"
          >
            Reset Filters
          </button>
          <button
            className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 font-medium transition-colors duration-200"
          >
            Save as Preset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsFilters;