import React from 'react';

const ConnectionMetrics = ({ connections }) => {
  // Calculate metrics
  const totalConnections = connections.length;
  const activeConnections = connections.filter(c => c.status === 'connected').length;
  const pendingConnections = connections.filter(c => c.status === 'pending').length;
  const completedConnections = connections.filter(c => c.status === 'completed').length;
  
  // Calculate average match score (only for non-pending connections)
  const nonPendingConnections = connections.filter(c => c.status !== 'pending');
  const averageMatchScore = nonPendingConnections.length > 0
    ? Math.round(nonPendingConnections.reduce((sum, conn) => sum + conn.matchScore, 0) / nonPendingConnections.length)
    : 0;
  
  // Count outcomes
  const totalOutcomes = connections.reduce((sum, conn) => sum + (conn.outcomes ? conn.outcomes.length : 0), 0);
  
  // Calculate success rate (connections with outcomes / total active or completed connections)
  const connectionsWithOutcomes = connections.filter(c => c.outcomes && c.outcomes.length > 0).length;
  const successRate = nonPendingConnections.length > 0
    ? Math.round((connectionsWithOutcomes / nonPendingConnections.length) * 100)
    : 0;
  
  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-4 transition-colors duration-200">
        Track the progress and success of your business connections
      </p>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-primary-50 dark:bg-dark-primary-900 rounded-lg p-4 transition-colors duration-200">
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary font-medium transition-colors duration-200">Total Connections</p>
          <p className="text-2xl font-bold text-primary-600 dark:text-dark-primary-400 transition-colors duration-200">{totalConnections}</p>
          <div className="flex items-center mt-2">
            <div className="flex items-center text-sm">
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                pendingConnections > 0
                  ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  : 'bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-dark-text-primary'
              } transition-colors duration-200`}>
                {pendingConnections} Pending
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900 bg-opacity-50 dark:bg-opacity-20 rounded-lg p-4 transition-colors duration-200">
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary font-medium transition-colors duration-200">Active Connections</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-200">{activeConnections}</p>
          <div className="flex items-center mt-2">
            <div className="flex items-center text-sm">
              <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 transition-colors duration-200">
                {Math.round((activeConnections / totalConnections) * 100) || 0}% of total
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900 bg-opacity-50 dark:bg-opacity-20 rounded-lg p-4 transition-colors duration-200">
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary font-medium transition-colors duration-200">Success Rate</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 transition-colors duration-200">{successRate}%</p>
          <div className="flex items-center mt-2">
            <div className="flex items-center text-sm">
              <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 transition-colors duration-200">
                {totalOutcomes} Outcomes
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900 bg-opacity-50 dark:bg-opacity-20 rounded-lg p-4 transition-colors duration-200">
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary font-medium transition-colors duration-200">Average Match Quality</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 transition-colors duration-200">{averageMatchScore}%</p>
          <div className="flex items-center mt-2">
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              averageMatchScore >= 80
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : averageMatchScore >= 60
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
            } transition-colors duration-200`}>
              {averageMatchScore >= 80 ? 'Excellent' : averageMatchScore >= 60 ? 'Good' : 'Fair'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Insights section */}
      {totalConnections > 0 && (
        <div className="mt-6 p-4 border border-gray-200 dark:border-dark-bg-light rounded-md bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
          <h3 className="font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">Connection Insights</h3>
          <ul className="text-sm text-gray-600 dark:text-dark-text-secondary space-y-1 transition-colors duration-200">
            {pendingConnections > 0 && (
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 dark:text-yellow-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                You have {pendingConnections} pending connection request{pendingConnections !== 1 ? 's' : ''}
              </li>
            )}
            
            {successRate > 0 && (
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 dark:text-green-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {successRate >= 75 ? 'Excellent' : successRate >= 50 ? 'Good' : 'Fair'} success rate with {successRate}% of connections resulting in positive outcomes
              </li>
            )}
            
            {averageMatchScore > 0 && (
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500 dark:text-purple-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Your matches have an average quality score of {averageMatchScore}%
              </li>
            )}
            
            {completedConnections > 0 && (
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                You've completed {completedConnections} business connection{completedConnections !== 1 ? 's' : ''}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConnectionMetrics;