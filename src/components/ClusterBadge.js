import React from 'react';
import { clusterTypes } from '../services/clusteringService';
import { styles } from '../styles/darkMode';

/**
 * ClusterBadge component - Displays a visual badge for a business cluster
 * Used on space cards, details pages, and cluster visualizations
 */
const ClusterBadge = ({ 
  clusterId, 
  size = 'md', // 'sm', 'md', 'lg'
  showLabel = true,
  showDescription = false,
  showCompatibility = false,
  compatibilityScore = null
}) => {
  const cluster = clusterTypes.find(c => c.id === clusterId);
  
  if (!cluster) return null;
  
  // Determine appropriate colors based on cluster ID
  const getClusterColor = () => {
    const colorMap = {
      'digital-transformation': 'bg-blue-500 dark:bg-blue-600 text-white',
      'financial-innovation': 'bg-green-500 dark:bg-green-600 text-white',
      'industry-4': 'bg-purple-500 dark:bg-purple-600 text-white',
      'sustainable-tech': 'bg-teal-500 dark:bg-teal-600 text-white',
      'health-wellbeing': 'bg-red-500 dark:bg-red-600 text-white',
      'default': 'bg-gray-500 dark:bg-gray-600 text-white'
    };
    
    return colorMap[clusterId] || colorMap.default;
  };
  
  const getClusterBgColor = () => {
    const colorMap = {
      'digital-transformation': 'bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20 text-blue-800 dark:text-blue-200',
      'financial-innovation': 'bg-green-100 dark:bg-green-900 dark:bg-opacity-20 text-green-800 dark:text-green-200',
      'industry-4': 'bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20 text-purple-800 dark:text-purple-200',
      'sustainable-tech': 'bg-teal-100 dark:bg-teal-900 dark:bg-opacity-20 text-teal-800 dark:text-teal-200',
      'health-wellbeing': 'bg-red-100 dark:bg-red-900 dark:bg-opacity-20 text-red-800 dark:text-red-200',
      'default': 'bg-gray-100 dark:bg-gray-900 dark:bg-opacity-20 text-gray-800 dark:text-gray-200'
    };
    
    return colorMap[clusterId] || colorMap.default;
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs rounded-full',
    md: 'px-3 py-1 text-sm rounded-full',
    lg: 'px-4 py-1.5 text-sm rounded-lg'
  };
  
  // Render a simple badge for the cluster
  if (!showDescription && !showCompatibility) {
    return (
      <span className={`inline-flex items-center font-medium ${sizeClasses[size]} ${getClusterBgColor()} transition-colors duration-200`}>
        <span className={`h-2 w-2 rounded-full ${getClusterColor()} mr-1.5`}></span>
        {showLabel ? cluster.name : ''}
      </span>
    );
  }
  
  // Render a more detailed badge with description and/or compatibility
  return (
    <div className={`cluster-badge ${getClusterBgColor()} rounded-md p-2 transition-colors duration-200`}>
      <div className="flex items-center">
        <span className={`h-2.5 w-2.5 rounded-full ${getClusterColor()} mr-1.5`}></span>
        <span className="font-medium">{cluster.name}</span>
      </div>
      
      {/* Description when requested */}
      {showDescription && (
        <p className="mt-1 text-xs opacity-80">
          {cluster.description}
        </p>
      )}
      
      {/* Compatibility score when requested */}
      {showCompatibility && compatibilityScore !== null && (
        <div className="mt-2">
          <div className="flex justify-between items-center text-xs">
            <span>Compatibility</span>
            <span className="font-medium">{Math.round(compatibilityScore * 100)}%</span>
          </div>
          <div className="w-full bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-20 rounded-full h-1.5 mt-1">
            <div 
              className={`${getClusterColor()} h-1.5 rounded-full`} 
              style={{ width: `${compatibilityScore * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClusterBadge;