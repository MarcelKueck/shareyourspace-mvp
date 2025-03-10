import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { clusterTypes } from '../services/clusteringService';
import ClusterBadge from './ClusterBadge';
import { styles } from '../styles/darkMode';

/**
 * ClusterAnalyticsWidget - A dashboard widget for visualizing cluster analytics
 */
const ClusterAnalyticsWidget = ({ 
  spaceClusters, 
  userBusinessProfile = null,
  condensed = false 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Calculate some analytics from the space clusters data
  const calculateAnalytics = () => {
    // If no data, return empty analytics
    if (!spaceClusters || spaceClusters.length === 0) {
      return {
        clusterCounts: [],
        topClusters: [],
        userClusterMatch: null,
        businessOpportunities: 0
      };
    }
    
    // Count spaces by cluster
    const clusterMap = {};
    
    spaceClusters.forEach(sc => {
      if (sc.recommendedClusters && sc.recommendedClusters.length > 0) {
        sc.recommendedClusters.forEach(rc => {
          if (!clusterMap[rc.clusterId]) {
            clusterMap[rc.clusterId] = {
              id: rc.clusterId,
              name: rc.clusterName || clusterTypes.find(c => c.id === rc.clusterId)?.name || 'Unknown Cluster',
              count: 0,
              avgScore: 0,
              totalScore: 0
            };
          }
          
          clusterMap[rc.clusterId].count += 1;
          clusterMap[rc.clusterId].totalScore += rc.score;
        });
      }
    });
    
    // Calculate average score for each cluster
    Object.values(clusterMap).forEach(cluster => {
      cluster.avgScore = cluster.totalScore / cluster.count;
    });
    
    // Sort clusters by count
    const clusterCounts = Object.values(clusterMap)
      .sort((a, b) => b.count - a.count);
      
    // Top clusters by score
    const topClusters = Object.values(clusterMap)
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 3);
      
    // User's best cluster match if profile is available
    let userClusterMatch = null;
    if (userBusinessProfile && userBusinessProfile.clusterAffiliations && userBusinessProfile.clusterAffiliations.length > 0) {
      const userClusters = userBusinessProfile.clusterAffiliations;
      
      // Find clusters that match user affiliations with highest average score
      const matches = Object.values(clusterMap)
        .filter(cluster => userClusters.includes(cluster.id))
        .sort((a, b) => b.avgScore - a.avgScore);
        
      if (matches.length > 0) {
        userClusterMatch = matches[0];
      }
    }
    
    // Business opportunities count - simplified for demo
    const businessOpportunities = Math.floor(
      Object.values(clusterMap).reduce((sum, cluster) => sum + (cluster.count * cluster.avgScore), 0)
    );
    
    return {
      clusterCounts,
      topClusters,
      userClusterMatch,
      businessOpportunities
    };
  };
  
  const {
    clusterCounts,
    topClusters,
    userClusterMatch,
    businessOpportunities
  } = calculateAnalytics();
  
  // Render the overview tab
  const renderOverview = () => {
    if (clusterCounts.length === 0) {
      return (
        <div className="text-center py-6">
          <p className="text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
            No cluster data available yet.
          </p>
        </div>
      );
    }
    
    return (
      <div>
        {/* User cluster match section */}
        {userClusterMatch && (
          <div className="mb-6 p-4 bg-primary-50 dark:bg-dark-primary-900 dark:bg-opacity-20 rounded-lg transition-colors duration-200">
            <h4 className="text-sm font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">
              Your Best Cluster Match
            </h4>
            <div className="flex items-center justify-between">
              <ClusterBadge 
                clusterId={userClusterMatch.id}
                size="md"
                showLabel={true}
              />
              <div className="text-2xl font-bold text-primary-600 dark:text-dark-primary-500 transition-colors duration-200">
                {userClusterMatch.count}
                <span className="text-sm font-normal text-gray-500 dark:text-dark-text-secondary ml-1 transition-colors duration-200">spaces</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Opportunity summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md text-center transition-colors duration-200">
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary mb-1 transition-colors duration-200">
              Business Clusters
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
              {clusterCounts.length}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md text-center transition-colors duration-200">
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary mb-1 transition-colors duration-200">
              Clustering Opportunities
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
              {businessOpportunities}
            </p>
          </div>
        </div>
        
        {/* Cluster distribution */}
        <h4 className="text-sm font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">
          Cluster Distribution
        </h4>
        <div className="space-y-3 mb-6">
          {clusterCounts.slice(0, condensed ? 3 : undefined).map((cluster) => (
            <div key={cluster.id} className="flex items-center">
              <div className="w-32 mr-4">
                <ClusterBadge clusterId={cluster.id} size="sm" showLabel={true} />
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 dark:bg-dark-bg-light rounded-full h-2.5 transition-colors duration-200">
                  <div 
                    className="h-2.5 rounded-full bg-primary-500 dark:bg-dark-primary-500 transition-colors duration-200"
                    style={{ width: `${(cluster.count / clusterCounts[0].count) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="ml-4 text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200 min-w-[40px] text-right">
                {cluster.count}
              </div>
            </div>
          ))}
        </div>
        
        {/* Top clusters */}
        <h4 className="text-sm font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">
          Top Compatibility Clusters
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {topClusters.map((cluster) => (
            <div key={cluster.id} className="bg-gray-50 dark:bg-dark-bg p-3 rounded-md transition-colors duration-200">
              <ClusterBadge clusterId={cluster.id} size="sm" showLabel={true} />
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                  Avg. Compatibility
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                  {Math.round(cluster.avgScore * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render a mini chart for the condensed view
  const renderMiniChart = () => {
    if (clusterCounts.length === 0) {
      return null;
    }
    
    // Simple mini bar chart for cluster counts
    return (
      <div className="space-y-2 mt-4">
        {clusterCounts.slice(0, 3).map(cluster => (
          <div key={cluster.id} className="flex items-center">
            <div className="w-20">
              <span className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                {cluster.name.split(' ')[0]}
              </span>
            </div>
            <div className="flex-1">
              <div className="h-2 rounded-full bg-primary-100 dark:bg-dark-primary-900 dark:bg-opacity-40 transition-colors duration-200">
                <div 
                  className="h-2 rounded-full bg-primary-500 dark:bg-dark-primary-500 transition-colors duration-200"
                  style={{ width: `${(cluster.count / clusterCounts[0].count) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Condensed view for dashboard widgets
  if (condensed) {
    return (
      <div className="bg-white dark:bg-dark-bg-light p-4 rounded-lg shadow transition-colors duration-200">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Business Clusters</h3>
          <Link 
            to="/analytics?view=clusters"
            className="text-xs text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 transition-colors duration-200"
          >
            View All
          </Link>
        </div>
        
        {userClusterMatch ? (
          <div className="mt-2 mb-3">
            <span className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
              Your best match:
            </span>
            <div className="mt-1">
              <ClusterBadge clusterId={userClusterMatch.id} size="sm" showLabel={true} />
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-3 transition-colors duration-200">
            {clusterCounts.length} active business clusters
          </p>
        )}
        
        {renderMiniChart()}
      </div>
    );
  }
  
  // Full-sized widget view
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md overflow-hidden transition-colors duration-200">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 dark:bg-dark-bg-light border-b border-gray-200 dark:border-dark-bg transition-colors duration-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
            Business Clustering Analytics
          </h3>
          <Link 
            to="/explore?showClusters=true"
            className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 transition-colors duration-200"
          >
            Explore Clusters
          </Link>
        </div>
      </div>
      
      <div className="border-b border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
        <nav className="-mb-px flex space-x-6 px-6">
          <button
            className={`py-4 px-1 text-sm font-medium ${
              activeTab === 'overview'
                ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-4 px-1 text-sm font-medium ${
              activeTab === 'compatibility'
                ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('compatibility')}
          >
            Compatibility
          </button>
          <button
            className={`py-4 px-1 text-sm font-medium ${
              activeTab === 'recommendations'
                ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('recommendations')}
          >
            Recommendations
          </button>
        </nav>
      </div>
      
      <div className="px-6 py-5">
        {activeTab === 'overview' && renderOverview()}
        
        {activeTab === 'compatibility' && (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
              Compatibility analytics will be available in the next release.
            </p>
          </div>
        )}
        
        {activeTab === 'recommendations' && (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
              Cluster recommendations will be available in the next release.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClusterAnalyticsWidget;