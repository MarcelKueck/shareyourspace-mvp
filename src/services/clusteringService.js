/**
 * Clustering Service - Provides business clustering functionality
 * This service handles cluster definitions, compatibility calculations,
 * and recommendations for optimal space sharing.
 */

// Business categories used for clustering
export const businessCategories = [
  'SaaS', 'Fintech', 'Insurtech', 'AI/ML', 'IoT', 'Cybersecurity', 
  'Mobility', 'Healthtech', 'Cleantech', 'Manufacturing', 'Logistics',
  'Data Security', 'Cloud Infrastructure', 'Enterprise Software',
  'Digital Transformation', 'Workflow Automation', 'Supply Chain',
  'Risk Analysis', 'Sustainability'
];

// Cluster definitions
export const clusterTypes = [
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    categories: ['SaaS', 'AI/ML', 'IoT', 'Digital Transformation', 'Enterprise Software', 'Cloud Infrastructure'],
    description: 'Businesses focused on digitizing traditional processes and operations',
    icon: 'cpu',
    compatibleClusters: ['industry-4'],
    keyBenefits: [
      'Technology knowledge sharing',
      'Digital infrastructure synergies',
      'Innovation cross-pollination'
    ]
  },
  {
    id: 'financial-innovation',
    name: 'Financial Innovation',
    categories: ['Fintech', 'Insurtech', 'Cybersecurity', 'Risk Analysis', 'Data Security'],
    description: 'Companies revolutionizing financial services and security',
    icon: 'chart-bar',
    compatibleClusters: ['digital-transformation'],
    keyBenefits: [
      'Regulatory knowledge sharing',
      'Fintech ecosystem connections',
      'Compliance expertise access'
    ]
  },
  {
    id: 'industry-4',
    name: 'Industry 4.0',
    categories: ['IoT', 'Manufacturing', 'Logistics', 'AI/ML', 'Supply Chain', 'Workflow Automation'],
    description: 'Next-generation industrial technologies and smart manufacturing',
    icon: 'cog',
    compatibleClusters: ['digital-transformation', 'sustainable-tech'],
    keyBenefits: [
      'Manufacturing expertise access',
      'Industrial partnership opportunities',
      'Supply chain integration potential'
    ]
  },
  {
    id: 'sustainable-tech',
    name: 'Sustainable Tech',
    categories: ['Cleantech', 'Mobility', 'IoT', 'Sustainability'],
    description: 'Technologies addressing sustainability challenges',
    icon: 'leaf',
    compatibleClusters: ['industry-4', 'health-wellbeing'],
    keyBenefits: [
      'Sustainability initiative collaboration',
      'Green technology synergies',
      'ESG-focused partnership potential'
    ]
  },
  {
    id: 'health-wellbeing',
    name: 'Health & Wellbeing',
    categories: ['Healthtech', 'AI/ML', 'IoT', 'Data Security'],
    description: 'Technologies improving healthcare and wellness',
    icon: 'heart',
    compatibleClusters: ['digital-transformation', 'sustainable-tech'],
    keyBenefits: [
      'Healthcare regulatory knowledge',
      'Wellness technology integration',
      'Health innovation ecosystem access'
    ]
  }
];

/**
 * Calculate the cluster affiliation scores for a business profile
 * @param {Object} profile - Business profile to analyze
 * @returns {Object} - Scores for each cluster (0-1 range)
 */
export const calculateClusterAffiliationScores = (profile) => {
  const scores = {};
  
  // Initialize all clusters with 0 score
  clusterTypes.forEach(cluster => {
    scores[cluster.id] = 0;
  });
  
  // No profile interests means no scores
  if (!profile.interests || profile.interests.length === 0) {
    return scores;
  }
  
  // Calculate scores based on matching categories
  clusterTypes.forEach(cluster => {
    const matchingInterests = profile.interests.filter(interest => 
      cluster.categories.some(category => 
        category.toLowerCase() === interest.toLowerCase() ||
        category.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(category.toLowerCase())
      )
    );
    
    if (matchingInterests.length > 0) {
      // Calculate score based on percentage of matches and their relevance
      scores[cluster.id] = Math.min(1, (matchingInterests.length / Math.min(cluster.categories.length, profile.interests.length)) * 1.5);
    }
  });
  
  return scores;
};

/**
 * Determine primary cluster affiliations for a business profile
 * @param {Object} profile - Business profile to analyze
 * @param {Number} threshold - Minimum score to be considered affiliated (0-1)
 * @returns {Array} - List of cluster IDs the business is affiliated with
 */
export const determineClusterAffiliations = (profile, threshold = 0.4) => {
  const scores = calculateClusterAffiliationScores(profile);
  
  // Filter clusters that meet the threshold
  return Object.entries(scores)
    .filter(([_, score]) => score >= threshold)
    .map(([clusterId, _]) => clusterId);
};

/**
 * Calculate compatibility score between two businesses
 * @param {Object} businessA - First business profile
 * @param {Object} businessB - Second business profile
 * @returns {Number} - Compatibility score (0-1 range)
 */
export const calculateClusterCompatibility = (businessA, businessB) => {
  // Direct match if in the same cluster
  const sharedClusters = businessA.clusterAffiliations?.filter(
    cluster => businessB.clusterAffiliations?.includes(cluster)
  ) || [];
  
  if (sharedClusters.length > 0) {
    // Higher score for sharing multiple clusters
    return Math.min(1, 0.7 + (sharedClusters.length - 1) * 0.15);
  }
  
  // Check compatible clusters
  let maxCompatibility = 0;
  
  // For each cluster of business A, check if it's compatible with any cluster of business B
  businessA.clusterAffiliations?.forEach(clusterA => {
    businessB.clusterAffiliations?.forEach(clusterB => {
      const clusterAInfo = clusterTypes.find(c => c.id === clusterA);
      const clusterBInfo = clusterTypes.find(c => c.id === clusterB);
      
      if (clusterAInfo?.compatibleClusters?.includes(clusterB) || 
          clusterBInfo?.compatibleClusters?.includes(clusterA)) {
        maxCompatibility = Math.max(maxCompatibility, 0.6);
      }
    });
  });
  
  // If some compatibility through compatible clusters
  if (maxCompatibility > 0) {
    return maxCompatibility;
  }
  
  // Shared interests that suggest potential compatibility
  const sharedInterests = businessA.interests?.filter(
    interest => businessB.interests?.includes(interest)
  ).length || 0;
  
  const totalInterests = Math.max(
    businessA.interests?.length || 0,
    businessB.interests?.length || 0
  );
  
  if (totalInterests > 0 && sharedInterests > 0) {
    // Score based on percentage of shared interests
    return Math.min(0.5, (sharedInterests / totalInterests) * 0.8);
  }
  
  // Default low compatibility
  return 0.1;
};

/**
 * Get recommended businesses to cluster with the given business
 * @param {Object} business - Target business profile
 * @param {Array} allBusinesses - All available businesses
 * @param {Number} limit - Maximum number of recommendations
 * @returns {Array} - List of recommended businesses with compatibility scores
 */
export const getClusterRecommendations = (business, allBusinesses, limit = 5) => {
  // Don't recommend the same business
  const otherBusinesses = allBusinesses.filter(b => b.id !== business.id);
  
  // Calculate compatibility with all other businesses
  const scoredBusinesses = otherBusinesses.map(other => ({
    ...other,
    compatibilityScore: calculateClusterCompatibility(business, other)
  }));
  
  // Sort by compatibility score (descending)
  const sortedBusinesses = [...scoredBusinesses].sort(
    (a, b) => b.compatibilityScore - a.compatibilityScore
  );
  
  // Return top recommendations
  return sortedBusinesses.slice(0, limit);
};

/**
 * Calculate cluster centrality (importance within a cluster) for each business
 * Higher values indicate more central/important position in the cluster
 * @param {Array} businesses - List of business profiles
 * @returns {Array} - Same businesses with centrality scores added
 */
export const calculateClusterCentrality = (businesses) => {
  // For each business, calculate its average compatibility with others in its clusters
  return businesses.map(business => {
    // Find all businesses in the same clusters
    const relatedBusinesses = businesses.filter(other => 
      other.id !== business.id && 
      other.clusterAffiliations?.some(cluster => 
        business.clusterAffiliations?.includes(cluster)
      )
    );
    
    if (relatedBusinesses.length === 0) {
      return {
        ...business,
        clusterCentrality: 0.3 // Base centrality for isolated businesses
      };
    }
    
    // Calculate average compatibility
    const totalCompatibility = relatedBusinesses.reduce(
      (sum, other) => sum + calculateClusterCompatibility(business, other),
      0
    );
    
    const avgCompatibility = totalCompatibility / relatedBusinesses.length;
    
    // Businesses with many interests tend to be more central
    const interestBonus = Math.min(0.2, ((business.interests?.length || 0) / 10) * 0.2);
    
    // Being in multiple clusters increases centrality
    const clusterCountBonus = Math.min(0.2, ((business.clusterAffiliations?.length || 0) - 1) * 0.1);
    
    return {
      ...business,
      clusterCentrality: Math.min(1, avgCompatibility + interestBonus + clusterCountBonus)
    };
  });
};

/**
 * Find optimal space clusters based on businesses and available spaces
 * @param {Array} businesses - List of business profiles
 * @param {Array} spaces - List of available spaces
 * @returns {Array} - Recommended space clusterings
 */
export const findOptimalSpaceClusters = (businesses, spaces) => {
  const recommendations = [];
  
  // Group businesses by cluster
  const businessesByCluster = {};
  
  clusterTypes.forEach(cluster => {
    businessesByCluster[cluster.id] = businesses.filter(
      business => business.clusterAffiliations?.includes(cluster.id)
    );
  });
  
  // For each space, find the best business clusters to place there
  spaces.forEach(space => {
    // For MVP, just match spaces with clusters based on simple criteria
    // In a production system, this would use more sophisticated algorithms
    
    // Calculate space score for each cluster
    const clusterScores = clusterTypes.map(cluster => {
      // Size match - larger spaces better for bigger clusters
      const sizeScore = Math.min(1, (space.capacity / 
        Math.max(businessesByCluster[cluster.id].length * 0.7, 1)) * 0.5);
      
      // Location score - would use actual geo data in production
      const locationScore = space.location.includes('Schwabing') ? 0.8 : 0.6;
      
      // Amenities score - check if space has amenities relevant to the cluster
      let amenitiesScore = 0.5;
      
      if (cluster.id === 'digital-transformation' && 
          space.amenities.some(a => a.includes('internet') || a.includes('tech'))) {
        amenitiesScore = 0.9;
      } else if (cluster.id === 'financial-innovation' && 
                space.amenities.some(a => a.includes('secure') || a.includes('meeting'))) {
        amenitiesScore = 0.9;
      } else if (cluster.id === 'industry-4' && 
                space.amenities.some(a => a.includes('workshop') || a.includes('tools'))) {
        amenitiesScore = 0.9;
      }
      
      // Combine scores
      const totalScore = (sizeScore * 0.4) + (locationScore * 0.3) + (amenitiesScore * 0.3);
      
      return {
        clusterId: cluster.id,
        clusterName: cluster.name,
        score: totalScore,
        businesses: businessesByCluster[cluster.id].length
      };
    });
    
    // Sort clusters by score for this space
    const sortedClusters = [...clusterScores]
      .filter(cs => cs.businesses > 0)
      .sort((a, b) => b.score - a.score);
    
    // Add top recommendations
    recommendations.push({
      spaceId: space.id,
      spaceName: space.name,
      recommendedClusters: sortedClusters.slice(0, 3),
      compatibility: sortedClusters.length > 0 ? sortedClusters[0].score : 0
    });
  });
  
  return recommendations.sort((a, b) => b.compatibility - a.compatibility);
};

/**
 * Calculate compatibility between a business profile and a space
 * based on the space's cluster affiliations
 * @param {Object} businessProfile - The business profile to check
 * @param {Object} space - The space to check compatibility with
 * @returns {Object} - Compatibility score and details
 */
export const calculateBusinessSpaceClusterCompatibility = (businessProfile, space) => {
  // If space has no cluster data, return default score
  if (!space.clusterData || !space.clusterData.recommendedClusters) {
    return { score: 0.5, primaryCluster: null };
  }
  
  // Get business cluster affiliations
  const businessClusters = businessProfile.clusterAffiliations || 
    determineClusterAffiliations(businessProfile);
    
  // Check if any of the business clusters match the space's recommended clusters
  const matchingClusters = space.clusterData.recommendedClusters
    .filter(rc => businessClusters.includes(rc.clusterId));
    
  if (matchingClusters.length > 0) {
    // Found at least one matching cluster
    const bestMatch = matchingClusters.sort((a, b) => b.score - a.score)[0];
    
    return {
      score: Math.min(1, bestMatch.score + 0.2), // Boost score for exact match
      primaryCluster: bestMatch.clusterId,
      clusterName: bestMatch.clusterName
    };
  }
  
  // Check if any business clusters are compatible with space clusters
  let maxCompatibility = 0;
  let compatibleCluster = null;
  
  businessClusters.forEach(businessCluster => {
    const businessClusterInfo = clusterTypes.find(c => c.id === businessCluster);
    
    if (!businessClusterInfo || !businessClusterInfo.compatibleClusters) {
      return;
    }
    
    space.clusterData.recommendedClusters.forEach(spaceCluster => {
      if (businessClusterInfo.compatibleClusters.includes(spaceCluster.clusterId)) {
        // Found a compatible cluster
        if (spaceCluster.score > maxCompatibility) {
          maxCompatibility = spaceCluster.score;
          compatibleCluster = spaceCluster.clusterId;
        }
      }
    });
  });
  
  if (compatibleCluster) {
    const clusterInfo = clusterTypes.find(c => c.id === compatibleCluster);
    
    return {
      score: Math.min(1, maxCompatibility * 0.8), // Slightly lower score for compatible clusters
      primaryCluster: compatibleCluster,
      clusterName: clusterInfo?.name || 'Compatible Cluster'
    };
  }
  
  // No direct or compatible clusters found
  return { 
    score: 0.3, // Base compatibility score
    primaryCluster: null
  };
};

/**
 * Prepare cluster data for visualization
 * @param {Array} businesses - List of business profiles 
 * @returns {Object} - Formatted data for cluster visualization
 */
export const prepareClusterVisualizationData = (businesses) => {
  // Ensure all businesses have cluster affiliations
  const enrichedBusinesses = businesses.map(business => {
    if (!business.clusterAffiliations) {
      business.clusterAffiliations = determineClusterAffiliations(business);
    }
    return business;
  });
  
  // Calculate centrality for all businesses
  const businessesWithCentrality = calculateClusterCentrality(enrichedBusinesses);
  
  return {
    clusters: clusterTypes,
    businesses: businessesWithCentrality
  };
};