/**
 * Simulated AI Matching Service for InnovationMatch
 * 
 * This service provides AI-powered matching functionality for connecting
 * corporate innovation teams with B2B SaaS startups based on multiple
 * factors including interests, business goals, and more.
 */

/**
 * Calculate a match score between a profile and a set of user criteria
 * @param {Object} profile - The profile to evaluate
 * @param {Object} criteria - The matching criteria
 * @returns {number} - Match score (0-100)
 */
export const calculateMatchScore = (profile, criteria) => {
  // Define weights for different matching factors
  const weights = {
    interests: 35,
    businessGoals: 30,
    technologyFocus: 15,
    industryExperience: 10,
    companySize: 5,
    fundingStage: 5
  };
  
  // Calculate interest match (35%)
  const interestScore = calculateInterestScore(profile, criteria.interests);
  
  // Simulate business goals matching (30%)
  const businessGoalScore = simulateBusinessGoalScore(criteria.businessGoals);
  
  // Calculate technology focus match (15%)
  const technologyScore = calculateTechnologyScore(profile, criteria.technologyFocus);
  
  // Calculate industry experience match (10%)
  const industryScore = calculateIndustryScore(profile, criteria.industryExperience);
  
  // Company size compatibility (5%)
  const sizeScore = simulateCompanySizeScore(criteria.companySize);
  
  // Funding stage alignment (5%)
  const fundingScore = simulateFundingStageScore(criteria.fundingStage);
  
  // Calculate weighted average
  const weightedScore = (
    (interestScore * weights.interests) +
    (businessGoalScore * weights.businessGoals) +
    (technologyScore * weights.technologyFocus) +
    (industryScore * weights.industryExperience) +
    (sizeScore * weights.companySize) +
    (fundingScore * weights.fundingStage)
  ) / 100;
  
  // Add a slight random factor to simulate AI variability (±5%)
  const randomFactor = 0.95 + (Math.random() * 0.1);
  
  // Return final score capped between 0-100
  return Math.min(100, Math.max(0, Math.round(weightedScore * randomFactor)));
};

/**
 * Calculate interest match score based on overlapping interests
 */
const calculateInterestScore = (profile, userInterests) => {
  if (!userInterests || userInterests.length === 0) return 50; // Default score
  
  let matchCount = 0;
  
  // Count exact matches
  for (const interest of userInterests) {
    if (profile.interests.some(i => i.toLowerCase().includes(interest.toLowerCase()) || 
                               interest.toLowerCase().includes(i.toLowerCase()))) {
      matchCount++;
    }
  }
  
  // Calculate score based on percentage of matches
  const maxPossibleMatches = Math.max(userInterests.length, profile.interests.length);
  const matchPercentage = (matchCount / maxPossibleMatches) * 100;
  
  // Apply non-linear scaling to reward more matches
  return Math.min(100, matchPercentage * 1.2);
};

/**
 * Simulate business goal score based on provided goals
 * In a real implementation, this would compare with actual profile goals
 */
const simulateBusinessGoalScore = (businessGoals) => {
  if (!businessGoals || businessGoals.length === 0) return 50; // Default score
  
  // More specific business goals get higher base scores
  const specificGoals = ['Pilot Project', 'R&D Collaboration', 'Technology Integration'];
  const hasSpecificGoals = businessGoals.some(goal => specificGoals.includes(goal));
  
  // Base score depends on number of goals and their specificity
  const baseScore = 60 + (businessGoals.length * 5) + (hasSpecificGoals ? 10 : 0);
  
  // Cap at 100
  return Math.min(100, baseScore);
};

/**
 * Calculate technology focus match
 */
const calculateTechnologyScore = (profile, technologyFocus) => {
  if (!technologyFocus || technologyFocus.length === 0) return 70; // Default score
  
  // In a real implementation, this would use profile's actual technology focus
  // For this simulation, we'll create a simulated focus from the profile interests
  const simulatedProfileTech = profile.interests
    .filter(interest => ['AI', 'SaaS', 'Cloud', 'Data', 'IoT', 'Mobile'].some(
      tech => interest.toLowerCase().includes(tech.toLowerCase())
    ));
  
  // Check for matches
  const matchCount = technologyFocus.filter(tech => 
    simulatedProfileTech.some(profileTech => 
      profileTech.toLowerCase().includes(tech.toLowerCase()) ||
      tech.toLowerCase().includes(profileTech.toLowerCase())
    )
  ).length;
  
  if (matchCount === 0) return 50;
  
  // Calculate score based on match percentage
  const maxPossible = Math.max(technologyFocus.length, simulatedProfileTech.length || 1);
  return Math.min(100, 60 + ((matchCount / maxPossible) * 40));
};

/**
 * Calculate industry experience match
 */
const calculateIndustryScore = (profile, industryExperience) => {
  if (!industryExperience || industryExperience.length === 0) return 70; // Default score
  
  // For simulation, extract industries from profile info
  const profileIndustries = [];
  
  // Check if profile bio mentions industries
  const commonIndustries = [
    'Automotive', 'Financial', 'Healthcare', 'Manufacturing',
    'Energy', 'Retail', 'Telecom', 'Transport', 'Insurance'
  ];
  
  for (const industry of commonIndustries) {
    if (profile.bio.toLowerCase().includes(industry.toLowerCase()) ||
        profile.lookingFor.toLowerCase().includes(industry.toLowerCase())) {
      profileIndustries.push(industry);
    }
  }
  
  // Add company-specific industries
  if (profile.company === 'BMW Group') profileIndustries.push('Automotive');
  if (profile.company === 'Allianz SE') profileIndustries.push('Insurance', 'Financial Services');
  if (profile.company === 'Siemens AG') profileIndustries.push('Manufacturing', 'Energy');
  
  // Calculate matches
  const matches = industryExperience.filter(industry => 
    profileIndustries.some(profileIndustry => 
      profileIndustry.toLowerCase().includes(industry.toLowerCase()) ||
      industry.toLowerCase().includes(profileIndustry.toLowerCase())
    )
  ).length;
  
  if (matches === 0) return 50;
  
  // Calculate score
  return Math.min(100, 60 + ((matches / industryExperience.length) * 40));
};

/**
 * Simulate company size compatibility
 */
const simulateCompanySizeScore = (companySize) => {
  if (!companySize) return 75; // Default score if no preference
  
  // In a real app, this would compare with actual company size data
  return 65 + (Math.random() * 35); // Random score between 65-100
};

/**
 * Simulate funding stage alignment
 */
const simulateFundingStageScore = (fundingStage) => {
  if (!fundingStage) return 75; // Default score if no preference
  
  // In a real app, this would compare with actual funding data
  return 65 + (Math.random() * 35); // Random score between 65-100
};

/**
 * Sort matches by match score (descending)
 * @param {Array} matches - Array of profiles with matchScore
 * @returns {Array} - Sorted matches
 */
export const getSortedMatches = (matches) => {
  return [...matches].sort((a, b) => b.matchScore - a.matchScore);
};