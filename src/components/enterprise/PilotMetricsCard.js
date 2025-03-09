import React from 'react';

const PilotMetricsCard = ({ title, value, icon, change, target, progressColor = 'blue' }) => {
  // Calculate percentage progress towards target
  const progress = target ? Math.min(Math.round((parseInt(value) / target) * 100), 100) : 0;
  
  // Determine progress color
  const getProgressColorClass = (color) => {
    switch (color) {
      case 'green':
        return 'bg-green-500 dark:bg-green-600';
      case 'blue':
        return 'bg-blue-500 dark:bg-blue-600';
      case 'purple':
        return 'bg-purple-500 dark:bg-purple-600';
      case 'yellow':
        return 'bg-yellow-500 dark:bg-yellow-600';
      case 'red':
        return 'bg-red-500 dark:bg-red-600';
      default:
        return 'bg-primary-500 dark:bg-dark-primary-600';
    }
  };
  
  // Determine if the change is positive or negative
  const isPositiveChange = change > 0;
  const changeColorClass = isPositiveChange 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-red-600 dark:text-red-400';
  
  return (
    <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-lg shadow-sm border border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-3 flex-shrink-0 p-1.5 rounded-md bg-white dark:bg-dark-bg-light shadow-sm">
            <div className="h-5 w-5 text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
              {icon}
            </div>
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
            {title}
          </p>
        </div>
        
        {/* Change indicator */}
        {change !== undefined && change !== null && (
          <div className={`text-xs font-medium ${changeColorClass} transition-colors duration-200`}>
            {isPositiveChange ? '+' : ''}{change}%
          </div>
        )}
      </div>
      
      <div className="mt-2 flex justify-between items-end">
        <div className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
          {value}
        </div>
        
        {target && (
          <div className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
            Target: {target}
          </div>
        )}
      </div>
      
      {/* Progress bar */}
      {target && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 dark:bg-dark-bg-light rounded-full h-1.5 transition-colors duration-200">
            <div 
              className={`${getProgressColorClass(progressColor)} h-1.5 rounded-full transition-all duration-500`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-right text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
            {progress}% of target
          </div>
        </div>
      )}
    </div>
  );
};

export default PilotMetricsCard;