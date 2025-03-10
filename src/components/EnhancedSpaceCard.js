import React from 'react';
import { Link } from 'react-router-dom';
import { calculateComplianceScore } from '../services/complianceService';
import ClusterBadge from './ClusterBadge';
import { styles } from '../styles/darkMode';

/**
 * Enhanced SpaceCard with cluster information
 */
const EnhancedSpaceCard = ({ 
  space, 
  showComplianceScore = false,
  showClusterInfo = true,
  userBusinessProfile = null,
  clusterCompatibility = null 
}) => {
  // Calculate compliance score if not provided
  const complianceScore = space.complianceScore !== undefined 
    ? space.complianceScore 
    : calculateComplianceScore(space);
  
  // Determine security level text
  const getSecurityLevel = (score) => {
    if (score >= 90) return 'Enterprise+';
    if (score >= 80) return 'Enterprise';
    if (score >= 60) return 'Business';
    if (score >= 40) return 'Basic';
    return 'Minimal';
  };
  
  // Get color for compliance badge
  const getComplianceColor = (score) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
    if (score >= 60) return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
    if (score >= 40) return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
    return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
  };
  
  // Handle cluster info rendering
  const renderClusterInfo = () => {
    if (!showClusterInfo || !space.clusterData || !space.clusterData.recommendedClusters || 
        space.clusterData.recommendedClusters.length === 0) {
      return null;
    }
    
    // If we have a compatibility score from a business profile
    if (clusterCompatibility && clusterCompatibility.primaryCluster) {
      return (
        <div className="mt-2 mb-3">
          <ClusterBadge 
            clusterId={clusterCompatibility.primaryCluster}
            size="sm"
            showLabel={true}
            showCompatibility={true}
            compatibilityScore={clusterCompatibility.score}
          />
        </div>
      );
    }
    
    // Otherwise show recommended clusters
    return (
      <div className="mt-2 mb-3">
        <div className="flex flex-wrap gap-1">
          {space.clusterData.recommendedClusters.slice(0, 2).map((cluster, index) => (
            <ClusterBadge 
              key={index}
              clusterId={cluster.clusterId}
              size="sm"
              showLabel={true}
            />
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-48 overflow-hidden">
        <img 
          className="absolute inset-0 h-full w-full object-cover"
          src={space.imageUrl} 
          alt={space.name} 
        />
        {space.featured && (
          <div className="absolute top-0 right-0 bg-primary-500 dark:bg-dark-primary-500 text-white text-xs font-bold px-3 py-1 m-1 rounded-full transition-colors duration-200">
            Featured
          </div>
        )}
        
        {/* Add compliance badge */}
        {showComplianceScore && (
          <div className="absolute top-0 left-0 m-1">
            <div className={`px-2 py-1 text-xs font-medium rounded-full ${getComplianceColor(complianceScore)} transition-colors duration-200`}>
              {getSecurityLevel(complianceScore)} Security
            </div>
          </div>
        )}
        
        {/* Add cluster compatibility indicator if available */}
        {clusterCompatibility && clusterCompatibility.score > 0.7 && (
          <div className="absolute bottom-0 right-0 m-1">
            <div className="px-2 py-1 text-xs font-medium rounded-full bg-primary-500 dark:bg-dark-primary-500 text-white transition-colors duration-200">
              {Math.round(clusterCompatibility.score * 100)}% Match
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {space.location}
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">{space.name}</h3>
        
        {/* Cluster information */}
        {renderClusterInfo()}
        
        <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-4 line-clamp-2 transition-colors duration-200">{space.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Show compliance badges first */}
          {space.compliance && showComplianceScore && (
            Object.entries(space.compliance)
              .filter(([key, value]) => value)
              .slice(0, 3)
              .map(([key]) => (
                <span key={key} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 transition-colors duration-200">
                  {key === 'dataProtection' ? 'GDPR' :
                   key === 'iso27001' ? 'ISO 27001' :
                   key === 'nda' ? 'NDA Support' :
                   key === 'ipProtection' ? 'IP Protection' :
                   key}
                </span>
              ))
          )}
          
          {/* Show amenities */}
          {space.amenities.slice(0, showComplianceScore ? 1 : 3).map((amenity, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 dark:bg-dark-bg text-secondary-800 dark:text-dark-text-primary transition-colors duration-200">
              {amenity}
            </span>
          ))}
          
          {/* Show "more" indicator if needed */}
          {space.amenities.length > (showComplianceScore ? 1 : 3) && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
              +{space.amenities.length - (showComplianceScore ? 1 : 3)} more
            </span>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <p className="text-primary-600 dark:text-dark-primary-500 font-bold text-lg transition-colors duration-200">€{space.price}</p>
            <p className="text-gray-500 dark:text-dark-text-secondary text-xs transition-colors duration-200">{space.priceUnit}</p>
          </div>
          <Link 
            to={`/space/${space.id}`}
            className="px-3 py-2 bg-primary-500 dark:bg-dark-primary-500 hover:bg-primary-600 dark:hover:bg-dark-primary-600 text-white text-sm font-medium rounded-md transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSpaceCard;