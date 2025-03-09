import React from 'react';

const UserActivityCard = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="p-4 text-center bg-gray-50 dark:bg-dark-bg rounded-md transition-colors duration-200">
        <p className="text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">No recent activity to display</p>
      </div>
    );
  }

  // Function to get appropriate icon and color for each activity type
  const getActivityStyles = (type) => {
    switch (type) {
      case 'booking':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
          bgColor: 'bg-green-100 dark:bg-green-900',
          textColor: 'text-green-800 dark:text-green-200'
        };
      case 'cancellation':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
          bgColor: 'bg-red-100 dark:bg-red-900',
          textColor: 'text-red-800 dark:text-red-200'
        };
      case 'extension':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          ),
          bgColor: 'bg-blue-100 dark:bg-blue-900',
          textColor: 'text-blue-800 dark:text-blue-200'
        };
      default:
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          bgColor: 'bg-purple-100 dark:bg-purple-900',
          textColor: 'text-purple-800 dark:text-purple-200'
        };
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    
    // Calculate the difference in days
    const diffTime = today - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const { icon, bgColor, textColor } = getActivityStyles(activity.type);
        
        return (
          <div key={activity.id} className="flex items-start p-3 bg-gray-50 dark:bg-dark-bg rounded-md transition-colors duration-200">
            <div className={`p-2 rounded-full ${bgColor} ${textColor} mr-3 flex-shrink-0 transition-colors duration-200`}>
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                {activity.user}
              </p>
              <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                {activity.action} - {activity.space}
              </p>
            </div>
            <div className="text-xs text-gray-500 dark:text-dark-text-secondary whitespace-nowrap transition-colors duration-200">
              {formatDate(activity.date)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserActivityCard;