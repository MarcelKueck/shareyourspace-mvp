import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { spaces } from '../data/spaces';
import { profiles } from '../data/profiles';
import ComplianceStatus from '../components/compliance/ComplianceStatus';
import ComplianceOverview from '../components/compliance/ComplianceOverview';
import SpaceClusterInfo from '../components/SpaceClusterInfo';
import ClusterBadge from '../components/ClusterBadge';
import EnhancedBookingTab from '../components/booking/EnhancedBookingTab';
import { calculateComplianceScore } from '../services/complianceService';
import { 
  determineClusterAffiliations,
  findOptimalSpaceClusters,
  calculateBusinessSpaceClusterCompatibility
} from '../services/clusteringService';

const EnhancedSpaceDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('details');
  const [complianceDetailModal, setComplianceDetailModal] = useState(false);
  const [selectedComplianceStandard, setSelectedComplianceStandard] = useState(null);
  const [enhancedSpace, setEnhancedSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Mock user business profile for demo
  const [userBusinessProfile] = useState(() => {
    // For demo purposes, use first startup profile
    return profiles.find(p => p.type === 'Startup');
  });
  
  // Load and enhance space data
  useEffect(() => {
    const loadSpaceData = async () => {
      setLoading(true);
      
      // Find the space by ID
      const space = spaces.find(space => space.id === parseInt(id));
      
      if (!space) {
        setLoading(false);
        return;
      }
      
      // Get all businesses with cluster affiliations
      const businessesWithClusters = profiles.map(profile => ({
        ...profile,
        clusterAffiliations: determineClusterAffiliations(profile)
      }));
      
      // Find optimal space clusters if not already computed
      if (!window.spaceClusters) {
        window.spaceClusters = findOptimalSpaceClusters(businessesWithClusters, spaces);
      }
      
      // Add cluster data to space
      const clusterData = window.spaceClusters.find(sc => sc.spaceId === space.id);
      const spaceWithClusters = {
        ...space,
        clusterData
      };
      
      // Calculate compatibility with user business profile if available
      if (userBusinessProfile) {
        // Add cluster affiliations if not present
        const userProfile = {
          ...userBusinessProfile,
          clusterAffiliations: userBusinessProfile.clusterAffiliations || 
            determineClusterAffiliations(userBusinessProfile)
        };
        
        // Check compatibility with this space
        spaceWithClusters.userCompatibility = calculateBusinessSpaceClusterCompatibility(
          userProfile, 
          spaceWithClusters
        );
      }
      
      setEnhancedSpace(spaceWithClusters);
      setLoading(false);
    };
    
    loadSpaceData();
  }, [id, userBusinessProfile]);
  
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
  
  if (!enhancedSpace) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Space not found</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">The space you're looking for doesn't exist or has been removed.</p>
        <Link to="/explore" className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200">
          Browse Spaces
        </Link>
      </div>
    );
  }
  
  const space = enhancedSpace;
  
  // Calculate compliance score
  const complianceScore = calculateComplianceScore(space);

  // Determine security level text
  const getSecurityLevel = (score) => {
    if (score >= 90) return 'Enterprise+';
    if (score >= 80) return 'Enterprise';
    if (score >= 60) return 'Business';
    if (score >= 40) return 'Basic';
    return 'Minimal';
  };
  
  const securityLevel = getSecurityLevel(complianceScore);
  
  // Handle opening compliance detail modal
  const openComplianceDetailModal = (standardId) => {
    setSelectedComplianceStandard(standardId);
    setComplianceDetailModal(true);
  };
  
  // Render cluster compatibility if available
  const renderClusterCompatibility = () => {
    if (!space.userCompatibility || !space.userCompatibility.primaryCluster) {
      return null;
    }
    
    return (
      <div className="mt-4 flex">
        <div className="flex-1 mr-2">
          <ClusterBadge 
            clusterId={space.userCompatibility.primaryCluster}
            size="lg"
            showLabel={true}
            showCompatibility={true}
            compatibilityScore={space.userCompatibility.score}
          />
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-gray-50 dark:bg-dark-bg-light transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <Link to="/" className="text-gray-400 hover:text-gray-500">
                  Home
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <Link to="/explore" className="ml-4 text-gray-400 hover:text-gray-500">
                  Explore
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <span className="ml-4 text-gray-500 font-medium">
                  {space.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        
        {/* Space Header */}
        <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md overflow-hidden mb-8 transition-colors duration-200">
          <div className="relative h-64 md:h-96">
            <img 
              src={space.imageUrl} 
              alt={space.name} 
              className="w-full h-full object-cover"
            />
            {space.featured && (
              <div className="absolute top-0 right-0 bg-primary-500 dark:bg-dark-primary-500 text-white text-sm font-bold px-3 py-1 m-4 rounded-full transition-colors duration-200">
                Featured
              </div>
            )}
            
            {/* Add security level badge */}
            <div className="absolute top-0 left-0 m-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                complianceScore >= 80 ? 'bg-green-500 dark:bg-green-600' :
                complianceScore >= 60 ? 'bg-blue-500 dark:bg-blue-600' :
                complianceScore >= 40 ? 'bg-yellow-500 dark:bg-yellow-600' :
                'bg-red-500 dark:bg-red-600'
              } text-white transition-colors duration-200`}>
                {securityLevel} Security
              </div>
            </div>
            
            {/* Add business compatibility tag if high score */}
            {space.userCompatibility && space.userCompatibility.score > 0.7 && (
              <div className="absolute bottom-0 right-0 m-4">
                <div className="px-3 py-1 rounded-full text-sm font-medium bg-primary-500 dark:bg-dark-primary-500 text-white transition-colors duration-200">
                  {Math.round(space.userCompatibility.score * 100)}% Business Compatibility
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center text-sm text-gray-500 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {space.location}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary md:text-3xl transition-colors duration-200">{space.name}</h1>
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-2 transition-colors duration-200">
                  Provided by {space.provider.name} · {space.size} sqm · Capacity: {space.capacity} people
                </p>
                
                {/* Show cluster compatibility tag if available */}
                {renderClusterCompatibility()}
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  {space.provider.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 mr-2 transition-colors duration-200">
                      <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Verified Provider
                    </span>
                  )}
                </div>
                <p className="text-primary-600 dark:text-dark-primary-500 font-bold text-2xl mt-2 transition-colors duration-200">€{space.price}</p>
                <p className="text-gray-500 dark:text-dark-text-secondary text-xs transition-colors duration-200">{space.priceUnit}</p>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="border-t border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
            <div className="flex overflow-x-auto">
              <button
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'details'
                    ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                    : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
                } transition-colors duration-200`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'amenities'
                    ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                    : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
                } transition-colors duration-200`}
                onClick={() => setActiveTab('amenities')}
              >
                Amenities
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'compliance'
                    ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                    : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
                } transition-colors duration-200`}
                onClick={() => setActiveTab('compliance')}
              >
                Compliance
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'clustering'
                    ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                    : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
                } transition-colors duration-200`}
                onClick={() => setActiveTab('clustering')}
              >
                Business Clusters
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'availability'
                    ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                    : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
                } transition-colors duration-200`}
                onClick={() => setActiveTab('availability')}
              >
                Book
              </button>
            </div>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md overflow-hidden mb-8 transition-colors duration-200">
          {activeTab === 'details' && (
            <div className="p-6">
              {/* [Existing details tab content] */}
              <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">About this space</h2>
              <p className="text-gray-700 dark:text-dark-text-secondary mb-6 transition-colors duration-200">{space.description}</p>
              
              <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">Provider Information</h3>
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-dark-primary-900 flex items-center justify-center mr-4 transition-colors duration-200">
                  <span className="text-primary-600 dark:text-dark-primary-400 font-bold transition-colors duration-200">
                    {space.provider.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-dark-text-primary font-medium transition-colors duration-200">{space.provider.name}</p>
                  <p className="text-gray-500 dark:text-dark-text-secondary text-sm transition-colors duration-200">{space.provider.type} Provider</p>
                </div>
              </div>
              
              <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">Space Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md transition-colors duration-200">
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Total Area</p>
                  <p className="text-gray-900 dark:text-dark-text-primary font-medium transition-colors duration-200">{space.size} sqm</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md transition-colors duration-200">
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Capacity</p>
                  <p className="text-gray-900 dark:text-dark-text-primary font-medium transition-colors duration-200">{space.capacity} people</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md transition-colors duration-200">
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Location</p>
                  <p className="text-gray-900 dark:text-dark-text-primary font-medium transition-colors duration-200">{space.location}</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md transition-colors duration-200">
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Price</p>
                  <p className="text-gray-900 dark:text-dark-text-primary font-medium transition-colors duration-200">€{space.price} <span className="text-gray-500 dark:text-dark-text-secondary text-xs transition-colors duration-200">({space.priceUnit})</span></p>
                </div>
              </div>
              
              {/* Business clusters and Compliance summary in Details Tab */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {/* Business Clusters */}
                {space.clusterData && space.clusterData.recommendedClusters && space.clusterData.recommendedClusters.length > 0 && (
                  <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-md border border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">Business Clusters</h3>
                        <div className="flex flex-wrap gap-2">
                          {space.clusterData.recommendedClusters.slice(0, 2).map((rc, index) => (
                            <ClusterBadge key={index} clusterId={rc.clusterId} size="sm" showLabel={true} />
                          ))}
                        </div>
                      </div>
                      <button 
                        className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 font-medium transition-colors duration-200"
                        onClick={() => setActiveTab('clustering')}
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Compliance Summary */}
                <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-md border border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">Security & Compliance</h3>
                      <ComplianceStatus space={space} />
                    </div>
                    <button 
                      className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 font-medium transition-colors duration-200"
                      onClick={() => setActiveTab('compliance')}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'amenities' && (
            <div className="p-6">
              {/* [Existing amenities tab content] */}
              <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {space.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-dark-bg rounded-md transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 dark:text-dark-primary-500 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Enhanced Compliance Tab */}
          {activeTab === 'compliance' && (
            <div className="p-6">
              <ComplianceOverview space={space} />
              
              {/* Additional compliance information */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">Compliance Documents</h3>
                <p className="text-gray-500 dark:text-dark-text-secondary mb-4 transition-colors duration-200">
                  You can request access to compliance documentation after booking this space. 
                  All documentation is independently verified by ShareYourSpace.
                </p>
                
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
                  onClick={() => setActiveTab('availability')}
                >
                  Book This Space
                </button>
              </div>
            </div>
          )}
          
          {/* New Clustering Tab */}
          {activeTab === 'clustering' && (
            <div className="p-6">
              <SpaceClusterInfo 
                space={space} 
                userBusinessProfile={userBusinessProfile}
                clusterCompatibility={space.userCompatibility}
              />
            </div>
          )}
          
          {/* Enhanced Booking Tab */}
          {activeTab === 'availability' && (
            <div className="p-6">
              <EnhancedBookingTab space={space} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedSpaceDetailPage;