import React, { useState } from 'react';
import { styles } from '../styles/darkMode';

const ProfileCard = ({ profile, matchScore, connectionStatus, onConnect }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Format match score
  const formattedMatchScore = matchScore ? Math.round(matchScore) : null;
  
  // Determine match quality label
  const getMatchQualityLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Very Good';
    if (score >= 60) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Basic';
  };
  
  // Get color class based on match score
  const getMatchScoreColorClass = (score) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
    if (score >= 70) return 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200';
    if (score >= 60) return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
    if (score >= 50) return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
    return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
  };
  
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Match Score Banner (if available) */}
      {matchScore && (
        <div className={`w-full py-1 px-3 text-center text-sm font-medium ${getMatchScoreColorClass(matchScore)} transition-colors duration-200`}>
          {getMatchQualityLabel(matchScore)} Match ({formattedMatchScore}%)
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-dark-primary-900 flex items-center justify-center overflow-hidden mr-4 transition-colors duration-200">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-primary-600 dark:text-dark-primary-400 text-xl font-bold transition-colors duration-200">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{profile.name}</h3>
              {profile.verified && (
                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 transition-colors duration-200">
                  <svg className="h-3 w-3 mr-0.5 text-blue-500 dark:text-blue-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">{profile.title} at {profile.company}</p>
            
            {/* Connection Status Tag (if available) */}
            {connectionStatus && (
              <span className={`mt-1 inline-block px-2 py-1 text-xs rounded-full ${
                connectionStatus === 'connected'
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : connectionStatus === 'pending'
                  ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
              } transition-colors duration-200`}>
                {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
              </span>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-2 transition-colors duration-200">{profile.bio}</p>
          
          {/* Interests Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs font-medium text-gray-500 dark:text-dark-text-muted transition-colors duration-200">Interests:</span>
            {profile.interests.slice(0, expanded ? profile.interests.length : 3).map((interest, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 dark:bg-dark-bg text-secondary-800 dark:text-dark-text-primary transition-colors duration-200">
                {interest}
              </span>
            ))}
            {!expanded && profile.interests.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
                +{profile.interests.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        {/* Expanded section with additional details */}
        {expanded && (
          <div className="mb-4 pt-3 border-t border-gray-200 dark:border-dark-bg transition-colors duration-200">
            {/* Company Type */}
            <div className="flex items-center mb-2">
              <span className="text-xs font-medium text-gray-500 dark:text-dark-text-muted mr-2 transition-colors duration-200">Company Type:</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 transition-colors duration-200">
                {profile.type}
              </span>
            </div>
            
            {/* Match Analysis (if score is available) */}
            {matchScore && (
              <div className="mt-3">
                <h4 className="text-xs font-medium text-gray-700 dark:text-dark-text-primary mb-2 transition-colors duration-200">Match Analysis</h4>
                <div className="bg-gray-100 dark:bg-dark-bg rounded-md p-2 transition-colors duration-200">
                  <div className="flex justify-between items-center text-xs text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
                    <span>Common Interests</span>
                    <span className="font-medium">{Math.round(matchScore * 0.4)}%</span>
                  </div>
                  <div className="w-full bg-gray-300 dark:bg-dark-bg-light rounded-full h-1.5 mt-1 transition-colors duration-200">
                    <div className="bg-primary-500 dark:bg-dark-primary-500 h-1.5 rounded-full transition-colors duration-200" style={{ width: `${Math.round(matchScore * 0.4)}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-600 dark:text-dark-text-secondary mt-2 transition-colors duration-200">
                    <span>Business Alignment</span>
                    <span className="font-medium">{Math.round(matchScore * 0.6)}%</span>
                  </div>
                  <div className="w-full bg-gray-300 dark:bg-dark-bg-light rounded-full h-1.5 mt-1 transition-colors duration-200">
                    <div className="bg-primary-500 dark:bg-dark-primary-500 h-1.5 rounded-full transition-colors duration-200" style={{ width: `${Math.round(matchScore * 0.6)}%` }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="pt-3 border-t border-gray-200 dark:border-dark-bg transition-colors duration-200">
          <h4 className="text-sm font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">Looking for:</h4>
          <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4 transition-colors duration-200">{profile.lookingFor}</p>
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-primary-600 dark:text-dark-primary-500 text-sm hover:text-primary-700 dark:hover:text-dark-primary-400 transition-colors duration-200"
            >
              {expanded ? 'Show less' : 'Show more'}
            </button>
            
            <button
              onClick={() => onConnect(profile.id)}
              disabled={connectionStatus === 'connected' || connectionStatus === 'pending'}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                connectionStatus === 'connected' || connectionStatus === 'pending'
                  ? 'bg-gray-200 dark:bg-dark-bg text-gray-500 dark:text-dark-text-muted cursor-not-allowed'
                  : 'bg-primary-500 dark:bg-dark-primary-500 hover:bg-primary-600 dark:hover:bg-dark-primary-600 text-white'
              } transition-colors duration-200`}
            >
              {connectionStatus === 'connected' 
                ? 'Connected' 
                : connectionStatus === 'pending' 
                  ? 'Pending'
                  : 'Connect'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;