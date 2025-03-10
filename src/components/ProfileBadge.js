import React from 'react';
import { styles } from '../styles/darkMode';

/**
 * ProfileBadge component - Renders a circular badge for a business profile
 * Used in cluster visualizations and other places that need compact profile representation
 */
const ProfileBadge = ({ 
  profile, 
  size = 14, 
  showInfo = false, 
  clusterColors = [] 
}) => {
  // Calculate ring segments for multiple cluster affiliations
  const renderClusterRings = () => {
    if (clusterColors.length === 0) return null;
    
    // If only one cluster, render a simple border
    if (clusterColors.length === 1) {
      return (
        <div 
          className={`absolute -inset-1 rounded-full ${clusterColors[0]} opacity-70 dark:opacity-80 transition-colors duration-200`}
          style={{ padding: size * 0.1 + 'px' }}
        ></div>
      );
    }
    
    // For multiple clusters, we'll render a segmented ring
    // This is a simplified version - in a production app you might use SVG for better control
    return (
      <div className="absolute -inset-1 rounded-full overflow-hidden">
        {clusterColors.map((color, index) => {
          const segmentSize = 100 / clusterColors.length;
          const startPercent = index * segmentSize;
          const endPercent = (index + 1) * segmentSize;
          
          return (
            <div 
              key={index}
              className={`absolute inset-0 ${color} opacity-70 dark:opacity-80 transition-colors duration-200`}
              style={{
                clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * startPercent / 100)}% ${50 + 50 * Math.sin(2 * Math.PI * startPercent / 100)}%, ${50 + 50 * Math.cos(2 * Math.PI * endPercent / 100)}% ${50 + 50 * Math.sin(2 * Math.PI * endPercent / 100)}%)`
              }}
            ></div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="profile-badge relative">
      {/* Cluster affiliation rings */}
      {renderClusterRings()}
      
      {/* The actual badge */}
      <div 
        className={`relative flex items-center justify-center rounded-full bg-white dark:bg-dark-bg-light text-primary-600 dark:text-dark-primary-500 font-bold border border-gray-200 dark:border-dark-bg transition-colors duration-200 ${showInfo ? 'z-10' : ''}`}
        style={{ 
          width: size * 4 + 'px', 
          height: size * 4 + 'px', 
          fontSize: size + 'px' 
        }}
      >
        {profile.avatarUrl ? (
          <img 
            src={profile.avatarUrl} 
            alt={profile.name} 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span>{profile.name.split(' ').map(n => n[0]).join('')}</span>
        )}
      </div>
      
      {/* Info tooltip on hover/select */}
      {showInfo && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white dark:bg-dark-bg-light rounded-md shadow-lg z-20 border border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
          <div className="p-3">
            <p className="font-medium text-gray-900 dark:text-dark-text-primary text-sm truncate transition-colors duration-200">{profile.name}</p>
            <p className="text-gray-500 dark:text-dark-text-secondary text-xs truncate transition-colors duration-200">{profile.title} at {profile.company}</p>
            
            {/* For detailed view, show cluster compatibility info */}
            {profile.clusterCentrality && (
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Cluster Centrality</span>
                  <span className="font-medium text-gray-700 dark:text-dark-text-primary transition-colors duration-200">{Math.round(profile.clusterCentrality * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-bg-light rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-primary-500 dark:bg-dark-primary-500 h-1.5 rounded-full transition-colors duration-200" 
                    style={{ width: `${profile.clusterCentrality * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBadge;