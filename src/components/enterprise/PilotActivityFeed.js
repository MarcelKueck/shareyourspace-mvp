import React from 'react';

const PilotActivityFeed = () => {
  // Mock activity data - would come from API in real implementation
  const activities = [
    {
      id: 1,
      user: 'Sarah Johnson',
      type: 'space_booked',
      detail: 'Conference Room A',
      time: '2 hours ago',
      date: '2025-03-08'
    },
    {
      id: 2,
      user: 'Michael Weber',
      type: 'connection_made',
      detail: 'Connected with Digital Ventures Team',
      time: '1 day ago',
      date: '2025-03-07'
    },
    {
      id: 3,
      user: 'Thomas Müller',
      type: 'document_uploaded',
      detail: 'Security Documentation',
      time: '2 days ago',
      date: '2025-03-06'
    },
    {
      id: 4,
      user: 'Anna Schmidt',
      type: 'user_invite',
      detail: 'Invited 3 team members',
      time: '3 days ago',
      date: '2025-03-05'
    },
    {
      id: 5,
      user: 'Robert Fischer',
      type: 'milestone_completed',
      detail: 'SSO Integration',
      time: '1 week ago',
      date: '2025-03-01'
    }
  ];

  // Function to get icon based on activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'space_booked':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        );
      case 'connection_made':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        );
      case 'document_uploaded':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        );
      case 'user_invite':
        return (
          <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        );
      case 'milestone_completed':
        return (
          <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  // Function to get activity label based on type
  const getActivityLabel = (type) => {
    switch (type) {
      case 'space_booked':
        return 'booked a space';
      case 'connection_made':
        return 'made a connection';
      case 'document_uploaded':
        return 'uploaded a document';
      case 'user_invite':
        return 'invited users';
      case 'milestone_completed':
        return 'completed milestone';
      default:
        return 'performed an action';
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span className="absolute top-5 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-dark-bg" aria-hidden="true"></span>
              ) : null}
              <div className="relative flex items-start space-x-3">
                {getActivityIcon(activity.type)}
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                      <span className="font-medium">{activity.user}</span> {getActivityLabel(activity.type)}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                      {activity.time}
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                    <p>{activity.detail}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {/* "View All" button */}
      <div className="mt-6 text-center">
        <button className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-800 dark:hover:text-dark-primary-400 font-medium transition-colors duration-200">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default PilotActivityFeed;