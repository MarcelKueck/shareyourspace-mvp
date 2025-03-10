import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { spaces } from '../data/spaces';
import EnhancedSpaceCard from '../components/EnhancedSpaceCard';
import ClusterFilters from '../components/ClusterFilters';
import ComplianceFilter from '../components/compliance/ComplianceFilter';
import ClusterView from '../components/ClusterView';
import { filterSpacesByCompliance, calculateComplianceScore } from '../services/complianceService';
import { 
  determineClusterAffiliations, 
  findOptimalSpaceClusters,
  calculateBusinessSpaceClusterCompatibility,
  prepareClusterVisualizationData
} from '../services/clusteringService';
import { profiles } from '../data/profiles';
import { styles } from '../styles/darkMode';

const EnhancedExplorePage = () => {
  // Get query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showClustersParam = queryParams.get('showClusters');
  
  // State for filters
  const [filters, setFilters] = useState({
    location: '',
    amenities: [],
    priceRange: [0, 100],
    complianceFilters: {},
    clusterFilters: []
  });
  
  const [expandedComplianceFilters, setExpandedComplianceFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState(showClustersParam === 'true' ? 'clusters' : 'standard');
  const [clusterVisualizationData, setClusterVisualizationData] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  
  // Mock user business profile for demo - in a real app, this would come from user authentication
  const [userBusinessProfile, setUserBusinessProfile] = useState(() => {
    // For demo purposes, use first startup profile
    return profiles.find(p => p.type === 'Startup');
  });
  
  // Preprocess spaces with cluster data
  useEffect(() => {
    // Get all businesses with cluster affiliations
    const businessesWithClusters = profiles.map(profile => ({
      ...profile,
      clusterAffiliations: determineClusterAffiliations(profile)
    }));
    
    // Find optimal space clusters
    const spaceClusters = findOptimalSpaceClusters(businessesWithClusters, spaces);
    
    // Add cluster data to spaces
    const spacesWithClusters = spaces.map(space => {
      const clusterData = spaceClusters.find(sc => sc.spaceId === space.id);
      return {
        ...space,
        clusterData
      };
    });
    
    // Calculate spaces compatibility with user business profile if available
    if (userBusinessProfile) {
      // Add cluster affiliations if not present
      if (!userBusinessProfile.clusterAffiliations) {
        userBusinessProfile.clusterAffiliations = determineClusterAffiliations(userBusinessProfile);
      }
      
      // Check compatibility with all spaces
      spacesWithClusters.forEach(space => {
        space.userCompatibility = calculateBusinessSpaceClusterCompatibility(
          userBusinessProfile, 
          space
        );
      });
    }
    
    // Update spaces
    window.enhancedSpaces = spacesWithClusters;
    
    // Prepare visualization data
    const visualizationData = prepareClusterVisualizationData(businessesWithClusters);
    setClusterVisualizationData(visualizationData);
    
  }, [userBusinessProfile]);
  
  // Enhanced spaces with cluster data
  const enhancedSpaces = window.enhancedSpaces || spaces;
  
  // Available filter options
  const locations = [...new Set(enhancedSpaces.map(space => space.location))];
  const amenitiesList = [...new Set(enhancedSpaces.flatMap(space => space.amenities))];
  
  // Apply filters and search
  const filteredSpaces = enhancedSpaces.filter(space => {
    // Search query filter
    if (searchQuery && !space.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !space.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Location filter
    if (filters.location && space.location !== filters.location) {
      return false;
    }
    
    // Amenities filter
    if (filters.amenities.length > 0 && !filters.amenities.every(amenity => 
      space.amenities.includes(amenity))) {
      return false;
    }
    
    // Price range filter
    if (space.price < filters.priceRange[0] || space.price > filters.priceRange[1]) {
      return false;
    }
    
    // Cluster filter
    if (filters.clusterFilters.length > 0 && space.clusterData && space.clusterData.recommendedClusters) {
      const spaceClusterIds = space.clusterData.recommendedClusters.map(rc => rc.clusterId);
      if (!filters.clusterFilters.some(clusterId => spaceClusterIds.includes(clusterId))) {
        return false;
      }
    }
    
    return true;
  });
  
  // Further filter by compliance requirements
  const complianceFilteredSpaces = Object.keys(filters.complianceFilters).length > 0
    ? filterSpacesByCompliance(filteredSpaces, filters.complianceFilters)
    : filteredSpaces;
    
  // Sort spaces based on different criteria
  const getSortedSpaces = () => {
    // Start with the filtered spaces
    let spacesToSort = [...complianceFilteredSpaces];
    
    // If user has a business profile, sort by compatibility
    if (userBusinessProfile) {
      return spacesToSort.sort((a, b) => {
        // First sort by compatibility if available
        if (a.userCompatibility && b.userCompatibility) {
          return b.userCompatibility.score - a.userCompatibility.score;
        }
        
        // Fall back to compliance score
        const aCompliance = a.complianceScore || calculateComplianceScore(a);
        const bCompliance = b.complianceScore || calculateComplianceScore(b);
        return bCompliance - aCompliance;
      });
    }
    
    // Default sort by compliance score
    return spacesToSort.sort((a, b) => {
      const aScore = a.complianceScore || calculateComplianceScore(a);
      const bScore = b.complianceScore || calculateComplianceScore(b);
      return bScore - aScore;
    });
  };
  
  const sortedSpaces = getSortedSpaces();
  
  // Handle filter changes
  const handleLocationChange = (e) => {
    setFilters({
      ...filters,
      location: e.target.value
    });
  };
  
  const handleAmenityChange = (amenity) => {
    setFilters({
      ...filters,
      amenities: filters.amenities.includes(amenity)
        ? filters.amenities.filter(a => a !== amenity)
        : [...filters.amenities, amenity]
    });
  };
  
  const handlePriceRangeChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = Number(value);
    setFilters({
      ...filters,
      priceRange: newRange
    });
  };
  
  // Handle compliance filter changes
  const handleComplianceStandardChange = (standardId, isSelected) => {
    if (standardId === '__expanded') {
      setExpandedComplianceFilters(isSelected);
      return;
    }
    
    const updatedFilters = { ...filters.complianceFilters };
    
    if (isSelected) {
      updatedFilters[standardId] = { level: null };
    } else {
      delete updatedFilters[standardId];
    }
    
    setFilters({
      ...filters,
      complianceFilters: updatedFilters
    });
  };
  
  const handleComplianceLevelChange = (standardId, level) => {
    const updatedFilters = { ...filters.complianceFilters };
    
    if (updatedFilters[standardId]) {
      updatedFilters[standardId] = { 
        ...updatedFilters[standardId], 
        level 
      };
    }
    
    setFilters({
      ...filters,
      complianceFilters: updatedFilters
    });
  };
  
  // Handle cluster filter changes
  const handleClusterChange = (clusterId) => {
    setFilters({
      ...filters,
      clusterFilters: filters.clusterFilters.includes(clusterId)
        ? filters.clusterFilters.filter(id => id !== clusterId)
        : [...filters.clusterFilters, clusterId]
    });
    
    // Update selected cluster for visualization mode
    if (viewMode === 'clusters') {
      setSelectedCluster(filters.clusterFilters.includes(clusterId) ? null : clusterId);
    }
  };
  
  // Toggle between standard and cluster view modes
  const toggleViewMode = () => {
    setViewMode(viewMode === 'standard' ? 'clusters' : 'standard');
  };
  
  // Render cluster visualization view
  const renderClusterView = () => {
    if (!clusterVisualizationData) {
      return (
        <div className="p-8 text-center">
          <p className="text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
            Loading cluster data...
          </p>
        </div>
      );
    }
    
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">
            Business Cluster Visualization
          </h2>
          <p className="text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
            Explore how businesses cluster together and find compatible workspace solutions.
          </p>
        </div>
        
        <ClusterView 
          clusterData={clusterVisualizationData}
          activeCluster={selectedCluster}
          selectedBusinessId={selectedBusinessId}
          onSelectBusiness={(id) => setSelectedBusinessId(id)}
          onSelectCluster={(clusterId) => {
            setSelectedCluster(clusterId);
            
            // Update filters to match selected cluster
            if (clusterId) {
              setFilters({
                ...filters,
                clusterFilters: [clusterId]
              });
            } else {
              setFilters({
                ...filters,
                clusterFilters: []
              });
            }
          }}
          viewMode="standard"
        />
        
        {/* Matching spaces section */}
        {selectedCluster && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
              Spaces optimized for {clusterVisualizationData.clusters.find(c => c.id === selectedCluster)?.name || 'this cluster'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedSpaces
                .filter(space => 
                  space.clusterData && 
                  space.clusterData.recommendedClusters && 
                  space.clusterData.recommendedClusters.some(rc => rc.clusterId === selectedCluster)
                )
                .slice(0, 4)
                .map(space => (
                  <EnhancedSpaceCard 
                    key={space.id} 
                    space={space} 
                    showComplianceScore={true}
                    showClusterInfo={true}
                    userBusinessProfile={userBusinessProfile}
                    clusterCompatibility={space.userCompatibility}
                  />
                ))
              }
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-gray-50 dark:bg-dark-bg-light min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Explore Spaces</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
            Find the perfect workspace for your business needs
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for spaces..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-bg-light rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-dark-text-muted transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Toggle View Mode */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={toggleViewMode}
            className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors duration-200 ${
              viewMode === 'clusters'
                ? 'bg-primary-600 dark:bg-dark-primary-600 text-white border-transparent hover:bg-primary-700 dark:hover:bg-dark-primary-700'
                : 'bg-white dark:bg-dark-bg-light border-gray-300 dark:border-dark-bg text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg'
            }`}
          >
            {viewMode === 'clusters' ? 'Standard View' : 'Cluster View'}
          </button>
        </div>
        
        {/* Security Level Banner */}
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-medium text-blue-800 dark:text-blue-300 transition-colors duration-200">Enterprise-Grade Security</h2>
              <p className="mt-1 text-sm text-blue-600 dark:text-blue-400 transition-colors duration-200">
                All spaces on ShareYourSpace are verified to ensure they meet German business data protection and security standards.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <a 
                href="/compliance-framework" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        
        {/* Cluster View Mode */}
        {viewMode === 'clusters' ? (
          renderClusterView()
        ) : (
          /* Standard View Mode */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-bg-light shadow rounded-lg p-6 transition-colors duration-200">
                <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">Filters</h2>
                
                {/* Location Filter */}
                <div className="mb-6">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
                    Location
                  </label>
                  <select
                    id="location"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                    value={filters.location}
                    onChange={handleLocationChange}
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Business Cluster Filters */}
                <div className="mb-6">
                  <ClusterFilters 
                    selectedClusters={filters.clusterFilters}
                    onClusterChange={handleClusterChange}
                    userBusinessProfile={userBusinessProfile}
                  />
                </div>
                
                {/* Compliance Filters */}
                <div className="mb-6">
                  <ComplianceFilter 
                    selectedStandards={filters.complianceFilters}
                    onStandardChange={handleComplianceStandardChange}
                    onLevelChange={handleComplianceLevelChange}
                    expanded={expandedComplianceFilters}
                  />
                </div>
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
                    Price Range (€ per day)
                  </label>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">€{filters.priceRange[0]}</span>
                    <span className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">€{filters.priceRange[1]}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Amenities Filter */}
                <div>
                  <p className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
                    Amenities
                  </p>
                  <div className="space-y-2">
                    {amenitiesList.slice(0, 6).map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <input
                          id={`amenity-${amenity}`}
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 dark:text-dark-primary-600 focus:ring-primary-500 dark:focus:ring-dark-primary-500 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                          checked={filters.amenities.includes(amenity)}
                          onChange={() => handleAmenityChange(amenity)}
                        />
                        <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Reset Filters Button */}
                <button
                  className="w-full mt-6 px-4 py-2 bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-dark-text-secondary rounded-md hover:bg-gray-200 dark:hover:bg-dark-bg-light transition-colors duration-200"
                  onClick={() => setFilters({
                    location: '',
                    amenities: [],
                    priceRange: [0, 100],
                    complianceFilters: {},
                    clusterFilters: []
                  })}
                >
                  Reset Filters
                </button>
              </div>
            </div>
            
            {/* Space Grid */}
            <div className="lg:col-span-3">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
                  Showing {sortedSpaces.length} spaces 
                  {filters.clusterFilters.length > 0 && (
                    <span>
                      {" "}with cluster filter
                    </span>
                  )}
                  {Object.keys(filters.complianceFilters).length > 0 && (
                    <span>
                      {" "}with compliance requirements
                    </span>
                  )}
                </p>
                <div className="flex items-center">
                  <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mr-2 transition-colors duration-200">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    className="px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                  >
                    <option>Compatibility</option>
                    <option>Security Level</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Popular</option>
                  </select>
                </div>
              </div>
              
              {sortedSpaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sortedSpaces.map(space => (
                    <EnhancedSpaceCard 
                      key={space.id} 
                      space={space} 
                      showComplianceScore={true}
                      showClusterInfo={true}
                      userBusinessProfile={userBusinessProfile}
                      clusterCompatibility={space.userCompatibility}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow p-8 text-center transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-dark-text-muted transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">No spaces found</h3>
                  <p className="mt-2 text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Try adjusting your filters to find more spaces.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedExplorePage;