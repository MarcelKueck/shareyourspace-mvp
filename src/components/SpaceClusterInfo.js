import React from 'react';
import { Link } from 'react-router-dom';
import ClusterBadge from './ClusterBadge';
import { clusterTypes } from '../services/clusteringService';
import { styles } from '../styles/darkMode';

/**
 * SpaceClusterInfo component - Displays business clustering information for a space
 */
const SpaceClusterInfo = ({ 
  space, 
  userBusinessProfile = null,
  clusterCompatibility = null 
}) => {
  // Guard for spaces without cluster data
  if (!space.clusterData || !space.clusterData.recommendedClusters || 
      space.clusterData.recommendedClusters.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
          Business clustering information not available for this space.
        </p>
      </div>
    );
  }
  
  // Get detailed information for each cluster
  const clusterDetails = space.clusterData.recommendedClusters.map(rc => {
    const clusterInfo = clusterTypes.find(c => c.id === rc.clusterId);
    return {
      ...rc,
      ...clusterInfo,
      formattedScore: Math.round(rc.score * 100)
    };
  });
  
  // Get user compatibility status
  const getUserCompatibilityStatus = () => {
    if (!userBusinessProfile || !clusterCompatibility) {
      return null;
    }
    
    return (
      <div className="mb-6 p-4 rounded-lg bg-primary-50 dark:bg-dark-primary-900 dark:bg-opacity-20 transition-colors duration-200">
        <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">
          Your Business Compatibility
        </h3>
        
        {clusterCompatibility.primaryCluster ? (
          <div>
            <div className="flex items-center mb-2">
              <div className="flex-grow">
                <p className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                  Your {userBusinessProfile.company} business profile is
                  {clusterCompatibility.score > 0.8 ? ' highly compatible' : 
                   clusterCompatibility.score > 0.6 ? ' compatible' : 
                   clusterCompatibility.score > 0.4 ? ' moderately compatible' : ' somewhat compatible'}
                  {clusterCompatibility.clusterName ? ` with the ${clusterCompatibility.clusterName} cluster` : ''} at this space.
                </p>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-primary-600 dark:text-dark-primary-500 transition-colors duration-200">
                  {Math.round(clusterCompatibility.score * 100)}%
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <Link 
                to="/match"
                className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 transition-colors duration-200"
              >
                Find compatible businesses in this cluster →
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
              Your business profile has limited compatibility with the clusters at this space. Consider spaces with clusters more aligned to your business focus.
            </p>
            <Link
              to="/explore?showClusters=true"
              className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 transition-colors duration-200"
            >
              Find more compatible spaces →
            </Link>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div>
      {/* User compatibility section if available */}
      {getUserCompatibilityStatus()}
      
      <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
        Business Clusters
      </h3>
      
      <p className="text-gray-500 dark:text-dark-text-secondary mb-6 transition-colors duration-200">
        This space is optimized for the following business clusters:
      </p>
      
      <div className="space-y-4 mb-6">
        {clusterDetails.map((cluster, index) => (
          <div key={index} className="p-4 border border-gray-200 dark:border-dark-bg-light rounded-lg transition-colors duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <ClusterBadge clusterId={cluster.clusterId} size="md" showLabel={true} />
                <div className="ml-2 bg-gray-100 dark:bg-dark-bg rounded-full px-2 py-0.5 text-xs text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
                  {cluster.formattedScore}% optimized
                </div>
              </div>
              <Link
                to={`/match?cluster=${cluster.clusterId}`}
                className="text-xs text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 transition-colors duration-200"
              >
                Find businesses in this cluster
              </Link>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-3 transition-colors duration-200">
              {cluster.description}
            </p>
            
            <div>
              <p className="text-xs font-medium text-gray-700 dark:text-dark-text-primary mb-1 transition-colors duration-200">
                Business Categories:
              </p>
              <div className="flex flex-wrap gap-1">
                {cluster.categories.slice(0, 5).map((category, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-dark-text-secondary text-xs rounded-full transition-colors duration-200">
                    {category}
                  </span>
                ))}
                {cluster.categories.length > 5 && (
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-dark-text-secondary text-xs rounded-full transition-colors duration-200">
                    +{cluster.categories.length - 5} more
                  </span>
                )}
              </div>
            </div>
            
            {cluster.keyBenefits && (
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-700 dark:text-dark-text-primary mb-1 transition-colors duration-200">
                  Key Benefits:
                </p>
                <ul className="text-xs text-gray-600 dark:text-dark-text-secondary space-y-1 transition-colors duration-200">
                  {cluster.keyBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary-500 dark:text-dark-primary-500 mr-1 transition-colors duration-200">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Link
          to="/explore?showClusters=true"
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-bg-light shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-bg-light hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
        >
          Explore All Business Clusters
        </Link>
      </div>
    </div>
  );
};

export default SpaceClusterInfo;