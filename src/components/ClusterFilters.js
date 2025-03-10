import React, { useState } from 'react';
import { clusterTypes, determineClusterAffiliations } from '../services/clusteringService';
import { styles } from '../styles/darkMode';
import ClusterBadge from './ClusterBadge';

/**
 * ClusterFilters component - Provides UI for filtering spaces by business clusters
 */
const ClusterFilters = ({ 
  selectedClusters = [], 
  onClusterChange = () => {}, 
  userBusinessProfile = null 
}) => {
  // Get recommended clusters based on user's business profile
  const getRecommendedClusters = () => {
    if (!userBusinessProfile || !userBusinessProfile.interests) {
      return [];
    }
    
    // Calculate which clusters align with the user's business interests
    return clusterTypes
      .filter(cluster => 
        cluster.categories.some(category => 
          userBusinessProfile.interests.some(interest => 
            category.toLowerCase() === interest.toLowerCase() ||
            category.toLowerCase().includes(interest.toLowerCase()) ||
            interest.toLowerCase().includes(category.toLowerCase())
          )
        )
      )
      .map(cluster => cluster.id);
  };
  
  const recommendedClusters = getRecommendedClusters();
  
  // Render cluster tags with visual indicators
  const renderClusterTag = (cluster) => {
    const isSelected = selectedClusters.includes(cluster.id);
    const isRecommended = recommendedClusters.includes(cluster.id);
    
    return (
      <div key={cluster.id} className="mb-2">
        <button
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200
            ${isSelected 
              ? 'bg-primary-50 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400 border-primary-500 dark:border-dark-primary-500' 
              : 'bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary border-gray-300 dark:border-dark-bg-light hover:bg-gray-50 dark:hover:bg-dark-bg'}`}
          onClick={() => onClusterChange(cluster.id)}
        >
          {cluster.name}
          
          {/* Recommended indicator */}
          {isRecommended && !isSelected && (
            <span className="ml-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary-400 dark:bg-dark-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500 dark:bg-dark-primary-500"></span>
            </span>
          )}
        </button>
        
        {/* Description that shows on selection */}
        {isSelected && (
          <p className="mt-1 ml-2 text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
            {cluster.description}
          </p>
        )}
      </div>
    );
  };
  
  // Determine the benefits section
  const renderBenefitsSection = () => {
    // If no clusters selected, show general message
    if (selectedClusters.length === 0) {
      return (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-dark-bg rounded-md text-xs text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
          <p className="font-medium mb-1">Business clustering benefits:</p>
          <ul className="space-y-1">
            <li>• Find complementary businesses</li>
            <li>• Create strategic partnerships</li>
            <li>• Enhance innovation potential</li>
          </ul>
        </div>
      );
    }
    
    // Get selected cluster
    const selectedCluster = clusterTypes.find(c => c.id === selectedClusters[0]);
    
    if (!selectedCluster) return null;
    
    // Show specific benefits for the selected cluster
    return (
      <div className="mt-4 p-3 bg-primary-50 dark:bg-dark-primary-900 dark:bg-opacity-20 rounded-md text-xs text-primary-700 dark:text-dark-primary-400 transition-colors duration-200">
        <p className="font-medium mb-1">{selectedCluster.name} cluster benefits:</p>
        <ul className="space-y-1">
          {selectedCluster.keyBenefits.map((benefit, index) => (
            <li key={index}>• {benefit}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  return (
    <div className="cluster-filters">
      <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3 transition-colors duration-200">
        Business Clusters
      </p>
      
      {/* Cluster selection */}
      <div className="space-y-1">
        {clusterTypes.map(cluster => renderClusterTag(cluster))}
      </div>
      
      {/* Benefits section */}
      {renderBenefitsSection()}
      
      {/* Show compatibility note if user has a business profile */}
      {userBusinessProfile && (
        <div className="mt-4 flex items-center">
          <div className="h-4 w-4 rounded-full bg-primary-100 dark:bg-dark-primary-900 flex items-center justify-center mr-2 transition-colors duration-200">
            <span className="text-primary-600 dark:text-dark-primary-500 text-xs">i</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
            Spaces are filtered based on compatibility with your business profile.
          </p>
        </div>
      )}
    </div>
  );
};

export default ClusterFilters;