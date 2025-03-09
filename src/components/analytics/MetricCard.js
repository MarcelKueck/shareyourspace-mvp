import React from 'react';

const MetricCard = ({ title, value, trend, trendDirection, icon }) => {
  // Determine trend display
  const isTrendUp = trendDirection === 'up';
  const trendColor = isTrendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const trendIcon = isTrendUp ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );

  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200 flex flex-col h-full">
      <div className="flex items-center mb-3">
        <div className="p-2 rounded-md bg-primary-100 dark:bg-dark-primary-900 text-primary-600 dark:text-dark-primary-400 mr-3 transition-colors duration-200">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
          {title}
        </h3>
      </div>
      
      <div className="flex items-baseline mt-2">
        <p className="text-2xl font-semibold text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
          {value}
        </p>
        {trend && (
          <div className={`flex items-center ml-3 ${trendColor} transition-colors duration-200`}>
            <span className="mr-1">
              {trendIcon}
            </span>
            <span className="text-sm">
              {trend}%
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-1 text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
        Compared to previous period
      </div>
    </div>
  );
};

export default MetricCard;