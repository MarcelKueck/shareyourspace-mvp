import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileBadge from './ProfileBadge';
import { calculateClusterCompatibility } from '../services/clusteringService';
import { styles } from '../styles/darkMode';

/**
 * ClusterView component - Visualizes business clusters and compatibility
 */
const ClusterView = ({ 
  clusterData, 
  activeCluster = null, 
  selectedBusinessId = null,
  onSelectBusiness = () => {},
  onSelectCluster = () => {},
  viewMode = 'standard' // 'standard', 'compact', 'detailed'
}) => {
  const [hoveredBusiness, setHoveredBusiness] = useState(null);
  const [expandedCluster, setExpandedCluster] = useState(activeCluster);
  
  useEffect(() => {
    setExpandedCluster(activeCluster);
  }, [activeCluster]);

  // Helper to get appropriate size based on view mode
  const getNodeSize = (business) => {
    const isSelected = selectedBusinessId === business.id;
    const isHovered = hoveredBusiness === business.id;
    
    // Base size
    let size = viewMode === 'compact' ? 10 : 14;
    
    // Increase size for central/important businesses
    if (business.clusterCentrality > 0.7) size += 4;
    else if (business.clusterCentrality > 0.4) size += 2;
    
    // Increase for selected or hovered
    if (isSelected) size += 6;
    else if (isHovered) size += 3;
    
    return size;
  };

  const getClusterColor = (clusterId) => {
    const colorMap = {
      'digital-transformation': 'bg-blue-500 dark:bg-blue-600',
      'financial-innovation': 'bg-green-500 dark:bg-green-600',
      'industry-4': 'bg-purple-500 dark:bg-purple-600',
      'sustainable-tech': 'bg-teal-500 dark:bg-teal-600',
      'health-wellbeing': 'bg-red-500 dark:bg-red-600',
      'default': 'bg-gray-500 dark:bg-gray-600'
    };
    
    return colorMap[clusterId] || colorMap.default;
  };

  const getClusterBgColor = (clusterId) => {
    const colorMap = {
      'digital-transformation': 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20',
      'financial-innovation': 'bg-green-50 dark:bg-green-900 dark:bg-opacity-20',
      'industry-4': 'bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20',
      'sustainable-tech': 'bg-teal-50 dark:bg-teal-900 dark:bg-opacity-20',
      'health-wellbeing': 'bg-red-50 dark:bg-red-900 dark:bg-opacity-20',
      'default': 'bg-gray-50 dark:bg-gray-900 dark:bg-opacity-20'
    };
    
    return colorMap[clusterId] || colorMap.default;
  };

  const renderClusterLegend = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      {clusterData.clusters.map(cluster => (
        <button
          key={cluster.id}
          className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
            expandedCluster === cluster.id 
              ? `${getClusterBgColor(cluster.id)} border-2 border-${cluster.id === 'financial-innovation' ? 'green' : cluster.id === 'digital-transformation' ? 'blue' : cluster.id === 'industry-4' ? 'purple' : cluster.id === 'sustainable-tech' ? 'teal' : cluster.id === 'health-wellbeing' ? 'red' : 'gray'}-500`
              : 'bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-dark-text-secondary border-gray-300 dark:border-dark-bg-light hover:bg-gray-200 dark:hover:bg-dark-bg-light'
          }`}
          onClick={() => {
            setExpandedCluster(expandedCluster === cluster.id ? null : cluster.id);
            onSelectCluster(expandedCluster === cluster.id ? null : cluster.id);
          }}
        >
          <span className={`h-3 w-3 rounded-full mr-2 ${getClusterColor(cluster.id)}`}></span>
          {cluster.name} 
          <span className="ml-1.5 text-gray-500 dark:text-dark-text-muted text-xs">
            ({clusterData.businesses.filter(b => b.clusterAffiliations.includes(cluster.id)).length})
          </span>
        </button>
      ))}
    </div>
  );

  const renderClusterVisualization = () => {
    // Filter businesses by active cluster if one is selected
    const businessesToShow = expandedCluster 
      ? clusterData.businesses.filter(b => b.clusterAffiliations.includes(expandedCluster))
      : clusterData.businesses;
      
    return (
      <div className="relative border border-gray-200 dark:border-dark-bg-light rounded-lg p-6 bg-white dark:bg-dark-bg-light transition-colors duration-200">
        {/* Cluster name if a specific cluster is shown */}
        {expandedCluster && (
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${getClusterBgColor(expandedCluster)} transition-colors duration-200`}>
            {clusterData.clusters.find(c => c.id === expandedCluster)?.name || 'Unknown Cluster'}
          </div>
        )}
        
        {/* Back button if a specific cluster is shown */}
        {expandedCluster && (
          <button 
            className="absolute top-4 right-4 text-sm text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary transition-colors duration-200"
            onClick={() => {
              setExpandedCluster(null);
              onSelectCluster(null);
            }}
          >
            View All Clusters
          </button>
        )}
        
        {/* Visualization - Either a D3 visual or a simpler grid layout for MVP */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 pt-4">
          {businessesToShow.map(business => (
            <div 
              key={business.id}
              className={`relative transition-all duration-200 cursor-pointer ${
                selectedBusinessId === business.id 
                  ? 'scale-110 z-10'
                  : 'hover:scale-105'
              }`}
              onMouseEnter={() => setHoveredBusiness(business.id)}
              onMouseLeave={() => setHoveredBusiness(null)}
              onClick={() => onSelectBusiness(business.id)}
            >
              <ProfileBadge 
                profile={business} 
                size={getNodeSize(business)}
                showInfo={hoveredBusiness === business.id || selectedBusinessId === business.id}
                clusterColors={business.clusterAffiliations.map(cId => getClusterColor(cId))}
              />
              
              {/* Connection lines - to be enhanced with actual visualization library */}
              {(hoveredBusiness === business.id || selectedBusinessId === business.id) && 
                businessesToShow
                  .filter(b => b.id !== business.id)
                  .filter(b => calculateClusterCompatibility(business, b) > 0.6)
                  .map(connectedBusiness => (
                    <div key={`connection-${business.id}-${connectedBusiness.id}`}
                         className="absolute inset-0 pointer-events-none">
                      {/* Placeholder for actual connection lines */}
                      <div className="absolute w-full h-full opacity-0">
                        Connection to {connectedBusiness.name}
                      </div>
                    </div>
                  ))
              }
            </div>
          ))}
        </div>
        
        {/* Selected business details */}
        {selectedBusinessId && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
            <BusinessClusterDetails 
              business={clusterData.businesses.find(b => b.id === selectedBusinessId)}
              clusters={clusterData.clusters}
              getClusterBgColor={getClusterBgColor}
            />
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="cluster-view w-full">
      {renderClusterLegend()}
      {renderClusterVisualization()}
    </div>
  );
};

// Helper component to display selected business details
const BusinessClusterDetails = ({ business, clusters, getClusterBgColor }) => {
  if (!business) return null;
  
  const businessClusters = clusters.filter(c => business.clusterAffiliations.includes(c.id));
  
  return (
    <div className="business-cluster-details">
      <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">{business.name}</h3>
      <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-4 transition-colors duration-200">
        {business.title} at {business.company}
      </p>
      
      {businessClusters.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
            Cluster Affiliations:
          </p>
          <div className="flex flex-wrap gap-2">
            {businessClusters.map(cluster => (
              <span 
                key={cluster.id}
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${getClusterBgColor(cluster.id)} transition-colors duration-200`}
              >
                {cluster.name}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
          Business Categories:
        </p>
        <div className="flex flex-wrap gap-2">
          {business.interests.map((interest, index) => (
            <span 
              key={index}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-dark-text-secondary transition-colors duration-200"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <Link 
          to={`/match?profile=${business.id}`}
          className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 font-medium transition-colors duration-200"
        >
          View Full Profile & Connection Options →
        </Link>
      </div>
    </div>
  );
};

export default ClusterView;