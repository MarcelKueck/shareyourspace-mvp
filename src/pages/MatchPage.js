import React, { useState, useEffect } from 'react';
import { profiles } from '../data/profiles';
import ProfileCard from '../components/ProfileCard';
import MatchingDashboard from '../components/MatchingDashboard';
import MatchingFilters from '../components/MatchingFilters';
import { calculateMatchScore, getSortedMatches } from '../services/matchingService';
import { styles } from '../styles/darkMode';

const MatchPage = () => {
  // Enhanced state with more detailed matching criteria
  const [activeTab, setActiveTab] = useState('find'); // 'find' or 'connections'
  const [userType, setUserType] = useState('startup');
  const [interests, setInterests] = useState([]);
  const [businessGoals, setBusinessGoals] = useState([]);
  const [technologyFocus, setTechnologyFocus] = useState([]);
  const [companySize, setCompanySize] = useState('');
  const [fundingStage, setFundingStage] = useState('');
  const [industryExperience, setIndustryExperience] = useState([]);
  
  const [isMatching, setIsMatching] = useState(false);
  const [matches, setMatches] = useState([]);
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [connectionMessage, setConnectionMessage] = useState('');
  
  // Mock user connections data (would come from API/database in a real app)
  const [myConnections, setMyConnections] = useState([
    {
      id: 1,
      profileId: 2,
      profile: profiles.find(p => p.id === 2),
      status: 'pending',
      date: '2025-03-01',
      matchScore: 85,
      lastInteraction: '2025-03-01',
    },
    {
      id: 2,
      profileId: 8,
      profile: profiles.find(p => p.id === 8),
      status: 'connected',
      date: '2025-02-25',
      matchScore: 92,
      lastInteraction: '2025-03-05',
      outcomes: ['Meeting scheduled', 'Potential partnership']
    }
  ]);
  
  // Available options for matching criteria
  const interestOptions = [
    'AI', 'Mobility Tech', 'Industrial IoT', 'Fintech', 'Insurtech', 
    'Data Security', 'Sustainability', 'Supply Chain', 'Cloud Infrastructure',
    'Cybersecurity', 'Digital Transformation', 'Machine Learning'
  ];
  
  const businessGoalOptions = [
    'Strategic Partnership', 'Investment Opportunity', 'Client/Vendor Relationship',
    'Innovation Initiative', 'Market Expansion', 'Technology Integration',
    'R&D Collaboration', 'Pilot Project', 'Knowledge Exchange'
  ];
  
  const technologyFocusOptions = [
    'SaaS', 'Cloud Computing', 'Blockchain', 'IoT', 'Data Analytics', 
    'AI/ML', 'Mobile Solutions', 'Enterprise Software', 'Cybersecurity',
    'Clean Tech', 'Hardware', 'Platform Solutions'
  ];
  
  const industryOptions = [
    'Automotive', 'Financial Services', 'Healthcare', 'Manufacturing',
    'Energy', 'Retail', 'Telecommunications', 'Transportation', 'Insurance'
  ];
  
  // Handle various filter changes
  const toggleInterest = (interest) => {
    setInterests(interests.includes(interest)
      ? interests.filter(i => i !== interest)
      : [...interests, interest]
    );
  };
  
  const toggleBusinessGoal = (goal) => {
    setBusinessGoals(businessGoals.includes(goal)
      ? businessGoals.filter(g => g !== goal)
      : [...businessGoals, goal]
    );
  };
  
  const toggleTechnologyFocus = (tech) => {
    setTechnologyFocus(technologyFocus.includes(tech)
      ? technologyFocus.filter(t => t !== tech)
      : [...technologyFocus, tech]
    );
  };
  
  const toggleIndustry = (industry) => {
    setIndustryExperience(industryExperience.includes(industry)
      ? industryExperience.filter(i => i !== industry)
      : [...industryExperience, industry]
    );
  };
  
  // Find matches based on enhanced criteria
  const findMatches = () => {
    // Determine opposite type for matching
    const oppositeType = userType === 'startup' ? 'Corporate' : 'Startup';
    
    // Filter profiles by type
    const potentialMatches = profiles.filter(profile => profile.type === oppositeType);
    
    // Calculate match score for each potential match using our AI algorithm simulation
    const scoredMatches = potentialMatches.map(profile => {
      const matchScore = calculateMatchScore(
        profile,
        {
          interests,
          businessGoals,
          technologyFocus,
          industryExperience,
          companySize,
          fundingStage,
          userType
        }
      );
      
      return {
        ...profile,
        matchScore
      };
    });
    
    // Filter out low-scoring matches (below 30%)
    const qualifiedMatches = scoredMatches.filter(match => match.matchScore >= 30);
    
    // Sort by match score, descending
    const sortedMatches = getSortedMatches(qualifiedMatches);
    
    setMatches(sortedMatches);
    setIsMatching(true);
  };
  
  // Handle connection request
  const handleConnect = (profileId) => {
    setSelectedProfileId(profileId);
    setConnectionMessage(''); // Reset message
    setShowIntroModal(true);
  };
  
  // Submit connection request
  const submitConnectionRequest = () => {
    const profileToConnect = profiles.find(p => p.id === selectedProfileId);
    
    if (!profileToConnect) return;
    
    const matchScore = calculateMatchScore(
      profileToConnect,
      {
        interests,
        businessGoals,
        technologyFocus,
        industryExperience,
        companySize,
        fundingStage,
        userType
      }
    );
    
    // Create new connection
    const newConnection = {
      id: myConnections.length + 1,
      profileId: selectedProfileId,
      profile: profileToConnect,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      message: connectionMessage,
      matchScore,
      lastInteraction: new Date().toISOString().split('T')[0]
    };
    
    // Add to connections
    setMyConnections([...myConnections, newConnection]);
    setShowIntroModal(false);
    
    // Show success notification (in a real app)
    alert('Connection request sent successfully!');
  };
  
  // Reset the matching process
  const resetMatching = () => {
    setIsMatching(false);
    setMatches([]);
  };
  
  // Update connection status
  const updateConnectionStatus = (connectionId, newStatus, outcome = null) => {
    setMyConnections(myConnections.map(conn => {
      if (conn.id === connectionId) {
        const updatedConn = { 
          ...conn, 
          status: newStatus,
          lastInteraction: new Date().toISOString().split('T')[0]
        };
        
        // Add outcome if provided
        if (outcome) {
          updatedConn.outcomes = conn.outcomes ? [...conn.outcomes, outcome] : [outcome];
        }
        
        return updatedConn;
      }
      return conn;
    }));
  };
  
  // Delete connection
  const deleteConnection = (connectionId) => {
    if (window.confirm('Are you sure you want to remove this connection?')) {
      setMyConnections(myConnections.filter(conn => conn.id !== connectionId));
    }
  };
  
  // Check if all required fields are filled before enabling search
  const canSearch = () => {
    return interests.length > 0 && businessGoals.length > 0;
  };
  
  return (
    <div className="bg-gray-50 dark:bg-dark-bg-light min-h-screen py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text-primary sm:text-4xl transition-colors duration-200">InnovationMatch</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
            Connect with corporate innovation leaders or B2B SaaS founders for valuable business partnerships
          </p>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-dark-bg-light mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`pb-4 px-1 ${
                activeTab === 'find'
                  ? 'border-b-2 border-primary-500 dark:border-dark-primary-500 text-primary-600 dark:text-dark-primary-500'
                  : 'border-b-2 border-transparent text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('find')}
            >
              Find Matches
            </button>
            <button
              className={`pb-4 px-1 ${
                activeTab === 'connections'
                  ? 'border-b-2 border-primary-500 dark:border-dark-primary-500 text-primary-600 dark:text-dark-primary-500'
                  : 'border-b-2 border-transparent text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('connections')}
            >
              My Connections
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-dark-primary-900 text-primary-800 dark:text-dark-primary-300">
                {myConnections.length}
              </span>
            </button>
          </nav>
        </div>
        
        {/* Find Matches Tab */}
        {activeTab === 'find' && (
          <div>
            {!isMatching ? (
              <div className="max-w-4xl mx-auto bg-white dark:bg-dark-bg-light shadow rounded-lg overflow-hidden transition-colors duration-200">
                <div className="px-6 py-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-6 transition-colors duration-200">Find your ideal business match</h2>
                  
                  <MatchingFilters 
                    userType={userType}
                    setUserType={setUserType}
                    interests={interests}
                    toggleInterest={toggleInterest}
                    interestOptions={interestOptions}
                    businessGoals={businessGoals}
                    toggleBusinessGoal={toggleBusinessGoal}
                    businessGoalOptions={businessGoalOptions}
                    technologyFocus={technologyFocus}
                    toggleTechnologyFocus={toggleTechnologyFocus}
                    technologyFocusOptions={technologyFocusOptions}
                    industryExperience={industryExperience}
                    toggleIndustry={toggleIndustry}
                    industryOptions={industryOptions}
                    companySize={companySize}
                    setCompanySize={setCompanySize}
                    fundingStage={fundingStage}
                    setFundingStage={setFundingStage}
                  />
                  
                  {/* Match Score Explanation */}
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-md text-sm text-blue-800 dark:text-blue-100 transition-colors duration-200">
                    <h3 className="font-medium">How our AI matching works:</h3>
                    <p className="mt-1">Our algorithm analyzes multiple factors including business interests, goals, technology focus, and industry experience to find your best potential business partners. The more details you provide, the better your matches will be.</p>
                  </div>
                  
                  {/* Find Matches Button */}
                  <button
                    className="mt-6 w-full px-4 py-3 bg-primary-600 dark:bg-dark-primary-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 disabled:opacity-50 transition-colors duration-200"
                    disabled={!canSearch()}
                    onClick={findMatches}
                  >
                    Find Matches
                  </button>
                  {!canSearch() && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400 text-center transition-colors duration-200">
                      Please select at least one interest and business goal
                    </p>
                  )}
                </div>
                
                <div className="bg-gray-50 dark:bg-dark-bg px-6 py-4 border-t border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                    Your data is secure and will only be shared with your explicit consent. We follow German data protection standards.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                    Your Matches ({matches.length})
                  </h2>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
                      Showing matches with 30%+ compatibility
                    </div>
                    <button
                      className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-dark-primary-500 bg-white dark:bg-dark-bg-light border border-primary-500 dark:border-dark-primary-500 rounded-md hover:bg-primary-50 dark:hover:bg-dark-bg transition-colors duration-200"
                      onClick={resetMatching}
                    >
                      Adjust Criteria
                    </button>
                  </div>
                </div>
                
                {matches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.map(profile => (
                      <ProfileCard
                        key={profile.id}
                        profile={profile}
                        matchScore={profile.matchScore}
                        connectionStatus={myConnections.find(c => c.profileId === profile.id)?.status}
                        onConnect={handleConnect}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow p-8 text-center transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-dark-text-muted transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">No matches found</h3>
                    <p className="mt-2 text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Try adjusting your criteria to find potential business partners.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* My Connections Tab */}
        {activeTab === 'connections' && (
          <MatchingDashboard
            connections={myConnections}
            updateConnectionStatus={updateConnectionStatus}
            deleteConnection={deleteConnection}
          />
        )}
      </div>
      
      {/* Connection Request Modal */}
      {showIntroModal && (
        <div className="fixed inset-0 overflow-y-auto z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-dark-bg-light rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full transition-colors duration-200">
              <div className="bg-white dark:bg-dark-bg-light px-4 pt-5 pb-4 sm:p-6 sm:pb-4 transition-colors duration-200">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-dark-primary-900 sm:mx-0 sm:h-10 sm:w-10 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-dark-primary-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200" id="modal-title">
                      Send Connection Request
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                        Your introduction message will be sent to the recipient. They will receive your contact details only if they accept the connection.
                      </p>
                      <textarea
                        className="mt-4 w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                        rows="4"
                        placeholder="Hello, I'd like to connect because..."
                        value={connectionMessage}
                        onChange={(e) => setConnectionMessage(e.target.value)}
                      ></textarea>
                      
                      {/* Connection tip */}
                      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900 rounded-md">
                        <p className="text-xs text-green-800 dark:text-green-100 transition-colors duration-200">
                          <strong>Pro tip:</strong> Personalize your message with specific reasons for connecting and potential collaboration areas to increase acceptance rates.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-dark-bg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse transition-colors duration-200">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 dark:bg-dark-primary-600 text-base font-medium text-white hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                  onClick={submitConnectionRequest}
                >
                  Send Request
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-bg-light shadow-sm px-4 py-2 bg-white dark:bg-dark-bg-light text-base font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                  onClick={() => setShowIntroModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchPage;