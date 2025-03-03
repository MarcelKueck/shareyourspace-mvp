import React, { useState } from 'react';
import { profiles } from '../data/profiles';
import ProfileCard from '../components/ProfileCard';
import { styles } from '../styles/darkMode';

const MatchPage = () => {
  const [userType, setUserType] = useState('startup');
  const [interests, setInterests] = useState([]);
  const [isMatching, setIsMatching] = useState(false);
  const [matches, setMatches] = useState([]);
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  
  // Available interests for matching
  const interestOptions = [
    'AI', 'Mobility Tech', 'Industrial IoT', 'Fintech', 'Insurtech', 
    'Data Security', 'Sustainability', 'Supply Chain', 'Cloud Infrastructure',
    'Cybersecurity', 'Digital Transformation', 'Machine Learning'
  ];
  
  // Handle interest selection
  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };
  
  // Find matches based on userType and interests
  const findMatches = () => {
    // In a real implementation, this would be a more sophisticated algorithm
    // For now, we'll filter based on opposite type and shared interests
    const oppositeType = userType === 'startup' ? 'Corporate' : 'Startup';
    
    const filteredProfiles = profiles.filter(profile => {
      if (profile.type !== oppositeType) return false;
      
      // Check if there's at least one matching interest
      return interests.some(interest => 
        profile.interests.some(profileInterest => 
          profileInterest.toLowerCase().includes(interest.toLowerCase())
        )
      );
    });
    
    setMatches(filteredProfiles);
    setIsMatching(true);
  };
  
  // Handle connection request
  const handleConnect = (profileId) => {
    setSelectedProfileId(profileId);
    setShowIntroModal(true);
  };
  
  // Reset the matching process
  const resetMatching = () => {
    setIsMatching(false);
    setMatches([]);
  };
  
  return (
    <div className="bg-gray-50 dark:bg-dark-bg-light min-h-screen py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text-primary sm:text-4xl transition-colors duration-200">InnovationMatch</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
            Connect with corporate innovation leaders or B2B SaaS founders for valuable business partnerships
          </p>
        </div>
        
        {!isMatching ? (
          <div className="max-w-3xl mx-auto bg-white dark:bg-dark-bg-light shadow rounded-lg overflow-hidden transition-colors duration-200">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-6 transition-colors duration-200">Find your ideal business match</h2>
              
              {/* User Type Selection */}
              <div className="mb-8">
                <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">I am a:</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`px-4 py-3 rounded-md text-sm font-medium ${
                      userType === 'startup' 
                        ? 'bg-primary-100 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400 border-2 border-primary-500 dark:border-dark-primary-500' 
                        : 'bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-bg-light text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-light'
                    } transition-colors duration-200`}
                    onClick={() => setUserType('startup')}
                  >
                    B2B SaaS Startup
                  </button>
                  <button
                    className={`px-4 py-3 rounded-md text-sm font-medium ${
                      userType === 'corporate' 
                        ? 'bg-primary-100 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400 border-2 border-primary-500 dark:border-dark-primary-500' 
                        : 'bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-bg-light text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-light'
                    } transition-colors duration-200`}
                    onClick={() => setUserType('corporate')}
                  >
                    Corporate Innovation Team
                  </button>
                </div>
              </div>
              
              {/* Interest Selection */}
              <div className="mb-8">
                <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">Select your business interests:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        interests.includes(interest) 
                          ? 'bg-primary-100 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400 border border-primary-500 dark:border-dark-primary-600' 
                          : 'bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-dark-text-secondary border border-gray-300 dark:border-dark-bg-light hover:bg-gray-200 dark:hover:bg-dark-bg-light'
                      } transition-colors duration-200`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                {interests.length === 0 && (
                  <p className="text-sm text-red-500 dark:text-red-400 mt-2 transition-colors duration-200">Please select at least one interest</p>
                )}
              </div>
              
              {/* Find Matches Button */}
              <button
                className="w-full px-4 py-3 bg-primary-600 dark:bg-dark-primary-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 disabled:opacity-50 transition-colors duration-200"
                disabled={interests.length === 0}
                onClick={findMatches}
              >
                Find Matches
              </button>
            </div>
            
            <div className="bg-gray-50 dark:bg-dark-bg px-6 py-4 border-t border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
              <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                Your data is secure and will only be shared with your explicit consent. We follow German data protection standards.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                Your Matches ({matches.length})
              </h2>
              <button
                className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-dark-primary-500 bg-white dark:bg-dark-bg-light border border-primary-500 dark:border-dark-primary-500 rounded-md hover:bg-primary-50 dark:hover:bg-dark-bg transition-colors duration-200"
                onClick={resetMatching}
              >
                Adjust Criteria
              </button>
            </div>
            
            {matches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map(profile => (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
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
                <p className="mt-2 text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Try adjusting your interests to find potential business partners.</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Connection Modal */}
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
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-dark-bg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse transition-colors duration-200">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 dark:bg-dark-primary-600 text-base font-medium text-white hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                  onClick={() => setShowIntroModal(false)}
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