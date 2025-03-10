import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { spaces } from '../data/spaces';
import { profiles } from '../data/profiles';
import ClusterView from '../components/ClusterView';
import ClusterAnalyticsWidget from '../components/ClusterAnalyticsWidget';
import EnhancedSpaceCard from '../components/EnhancedSpaceCard';
import { styles } from '../styles/darkMode';
import { 
  determineClusterAffiliations,
  findOptimalSpaceClusters,
  calculateBusinessSpaceClusterCompatibility,
  prepareClusterVisualizationData
} from '../services/clusteringService';

const ClusteringDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [clusterVisualizationData, setClusterVisualizationData] = useState(null);
  const [spaceClusters, setSpaceClusters] = useState([]);
  const [enhancedSpaces, setEnhancedSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mock user business profile for demo
  const [userBusinessProfile] = useState(() => {
    // For demo purposes, use first startup profile
    const profile = profiles.find(p => p.type === 'Startup');
    
    // Add cluster affiliations
    if (profile) {
      profile.clusterAffiliations = determineClusterAffiliations(profile);
    }
    
    return profile;
  });
  
  // Load and process data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Get all businesses with cluster affiliations
      const businessesWithClusters = profiles.map(profile => ({
        ...profile,
        clusterAffiliations: determineClusterAffiliations(profile)
      }));
      
      // Find optimal space clusters if not already computed
      let computedSpaceClusters = window.spaceClusters;
      if (!computedSpaceClusters) {
        computedSpaceClusters = findOptimalSpaceClusters(businessesWithClusters, spaces);
        window.spaceClusters = computedSpaceClusters;
      }
      setSpaceClusters(computedSpaceClusters);
      
      // Add cluster data to spaces
      const processedSpaces = spaces.map(space => {
        const clusterData = computedSpaceClusters.find(sc => sc.spaceId === space.id);
        return {
          ...space,
          clusterData
        };
      });
      
      // Calculate compatibility with user business profile if available
      if (userBusinessProfile) {
        processedSpaces.forEach(space => {
          space.userCompatibility = calculateBusinessSpaceClusterCompatibility(
            userBusinessProfile, 
            space
          );
        });
      }
      
      setEnhancedSpaces(processedSpaces);
      
      // Prepare visualization data
      const visualizationData = prepareClusterVisualizationData(businessesWithClusters);
      setClusterVisualizationData(visualizationData);
      
      setLoading(false);
    };
    
    loadData();
  }, [userBusinessProfile]);
  
  // Get spaces that match the selected cluster
  const getMatchingSpaces = () => {
    if (!selectedCluster) return [];
    
    return enhancedSpaces.filter(space => 
      space.clusterData && 
      space.clusterData.recommendedClusters && 
      space.clusterData.recommendedClusters.some(rc => rc.clusterId === selectedCluster)
    );
  };
  
  // Get spaces sorted by compatibility with user profile
  const getCompatibleSpaces = () => {
    if (!userBusinessProfile) return [];
    
    return [...enhancedSpaces]
      .filter(space => space.userCompatibility && space.userCompatibility.score > 0.5)
      .sort((a, b) => b.userCompatibility.score - a.userCompatibility.score)
      .slice(0, 6);
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="animate-pulse flex justify-center">
          <div className="h-8 w-32 bg-gray-200 dark:bg-dark-bg-light rounded"></div>
        </div>
        <div className="mt-4 animate-pulse">
          <div className="h-4 w-48 mx-auto bg-gray-200 dark:bg-dark-bg-light rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 dark:bg-dark-bg-light min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary sm:text-3xl transition-colors duration-200">
              Business Clustering
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
              Visualize and manage optimal business ecosystems within workspaces
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              to="/match"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-bg-light rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-bg-light hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
            >
              Find Businesses
            </Link>
            <Link
              to="/explore?showClusters=true"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
            >
              Explore Spaces
            </Link>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-dark-bg-light mb-6 transition-colors duration-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'visualization'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('visualization')}
            >
              Cluster Visualization
            </button>
            <button
              className={`pb-4 px-1 text-sm font-medium ${
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
        
        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-6">
              {/* Analytics Widget */}
              <ClusterAnalyticsWidget 
                spaceClusters={spaceClusters}
                userBusinessProfile={userBusinessProfile}
              />
              
              {/* Recent Compatible Spaces */}
              <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md overflow-hidden transition-colors duration-200">
                <div className="px-4 py-5 sm:px-6 bg-gray-50 dark:bg-dark-bg-light border-b border-gray-200 dark:border-dark-bg transition-colors duration-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                      Recommended Spaces by Cluster Compatibility
                    </h3>
                    <Link
                      to="/explore?showClusters=true"
                      className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 transition-colors duration-200"
                    >
                      View All
                    </Link>
                  </div>
                </div>
                
                <div className="p-6">
                  {getCompatibleSpaces().length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCompatibleSpaces().map(space => (
                        <EnhancedSpaceCard 
                          key={space.id} 
                          space={space} 
                          showComplianceScore={false}
                          showClusterInfo={true}
                          userBusinessProfile={userBusinessProfile}
                          clusterCompatibility={space.userCompatibility}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                        Complete your business profile to see personalized space recommendations.
                      </p>
                      <Link
                        to="/profile"
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200"
                      >
                        Complete Profile
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'visualization' && (
            <div>
              {clusterVisualizationData ? (
                <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md overflow-hidden transition-colors duration-200 p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
                    Business Cluster Visualization
                  </h2>
                  <ClusterView 
                    clusterData={clusterVisualizationData}
                    activeCluster={selectedCluster}
                    selectedBusinessId={selectedBusinessId}
                    onSelectBusiness={(id) => setSelectedBusinessId(id)}
                    onSelectCluster={(clusterId) => setSelectedCluster(clusterId)}
                    viewMode="standard"
                  />
                  
                  {/* Matching spaces for selected cluster */}
                  {selectedCluster && getMatchingSpaces().length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
                        Spaces optimized for this cluster
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getMatchingSpaces().slice(0, 3).map(space => (
                          <EnhancedSpaceCard 
                            key={space.id} 
                            space={space} 
                            showComplianceScore={false}
                            showClusterInfo={true}
                            userBusinessProfile={userBusinessProfile}
                            clusterCompatibility={space.userCompatibility}
                          />
                        ))}
                      </div>
                      
                      {getMatchingSpaces().length > 3 && (
                        <div className="mt-4 text-center">
                          <Link
                            to={`/explore?cluster=${selectedCluster}`}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-bg-light rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-bg-light hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
                          >
                            View All {getMatchingSpaces().length} Spaces
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md p-6 text-center transition-colors duration-200">
                  <p className="text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                    Loading cluster visualization...
                  </p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'recommendations' && (
            <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md overflow-hidden transition-colors duration-200">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 dark:bg-dark-bg-light border-b border-gray-200 dark:border-dark-bg transition-colors duration-200">
                <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                  Business Clustering Recommendations
                </h3>
              </div>
              
              <div className="p-6">
                <p className="text-gray-500 dark:text-dark-text-secondary mb-6 transition-colors duration-200">
                  Based on your business profile and preferences, we recommend the following clustering opportunities:
                </p>
                
                {userBusinessProfile ? (
                  <div className="space-y-6">
                    {/* Connect with compatible businesses */}
                    <div className="border border-gray-200 dark:border-dark-bg-light rounded-lg p-4 transition-colors duration-200">
                      <h4 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">
                        Connect with compatible businesses
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-4 transition-colors duration-200">
                        Your business profile aligns with {userBusinessProfile.clusterAffiliations.length} business clusters. 
                        Find potential partners and customers in these ecosystems.
                      </p>
                      <Link
                        to="/match"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200"
                      >
                        Find Business Matches
                      </Link>
                    </div>
                    
                    {/* Explore compatible spaces */}
                    <div className="border border-gray-200 dark:border-dark-bg-light rounded-lg p-4 transition-colors duration-200">
                      <h4 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">
                        Explore spaces with high cluster compatibility
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-4 transition-colors duration-200">
                        We've identified {getCompatibleSpaces().length} spaces with high compatibility to your business needs.
                      </p>
                      <Link
                        to="/explore?showClusters=true"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200"
                      >
                        Explore Compatible Spaces
                      </Link>
                    </div>
                    
                    {/* Complete your profile */}
                    <div className="border border-gray-200 dark:border-dark-bg-light rounded-lg p-4 transition-colors duration-200">
                      <h4 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">
                        Enhance your business profile
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-4 transition-colors duration-200">
                        Add more business details to improve cluster matching accuracy and receive better recommendations.
                      </p>
                      <Link
                        to="/profile"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-bg-light rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-bg-light hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors duration-200"
                      >
                        Update Profile
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                      Complete your business profile to see personalized clustering recommendations.
                    </p>
                    <Link
                      to="/profile"
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200"
                    >
                      Complete Profile
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClusteringDashboardPage;