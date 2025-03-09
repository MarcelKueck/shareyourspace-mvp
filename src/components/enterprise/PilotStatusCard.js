import React from 'react';

const PilotStatusCard = ({ pilotData }) => {
  // Helper function to get stage percentage
  const getStagePercentage = (stage) => {
    switch (stage) {
      case 'onboarding':
        return 12.5;
      case 'implementation':
        return 37.5;
      case 'evaluation':
        return 62.5;
      case 'decision':
        return 87.5;
      default:
        return 0;
    }
  };

  // Helper function to get status badge color based on current stage
  const getStatusColor = (stage) => {
    switch (stage) {
      case 'onboarding':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'implementation':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'evaluation':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      case 'decision':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  // Calculate days elapsed
  const startDate = new Date(pilotData.startDate);
  const endDate = new Date(pilotData.endDate);
  const today = new Date();
  const totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.round((today - startDate) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
      <div className="sm:flex sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
          Pilot Status
        </h2>
        <div className="mt-2 sm:mt-0">
          <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${getStatusColor(pilotData.currentStage)}`}>
            {pilotData.currentStage.charAt(0).toUpperCase() + pilotData.currentStage.slice(1)} Phase
          </span>
        </div>
      </div>
      
      {/* Pilot Progress */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
            Pilot Progress
          </h3>
          <span className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
            {pilotData.progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-dark-bg rounded-full h-2.5">
          <div className="bg-primary-600 dark:bg-dark-primary-600 h-2.5 rounded-full transition-colors duration-200" style={{ width: `${pilotData.progress}%` }}></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
          <span>Day {elapsedDays} of {totalDays}</span>
          <span>{pilotData.daysRemaining} days remaining</span>
        </div>
      </div>
      
      {/* Pilot Timeline */}
      <div className="mt-8 mb-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-4 transition-colors duration-200">
          Pilot Timeline
        </h3>
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300 dark:border-dark-bg"></div>
          </div>
          <div className="relative flex justify-between">
            {/* Onboarding Stage */}
            <div className="text-center">
              <div className={`h-7 w-7 rounded-full ${pilotData.currentStage === 'onboarding' ? 'ring-2 ring-primary-600 dark:ring-dark-primary-600' : ''} ${
                ['onboarding', 'implementation', 'evaluation', 'decision'].indexOf(pilotData.currentStage) >= 0 
                  ? 'bg-primary-600 dark:bg-dark-primary-600' 
                  : 'bg-gray-300 dark:bg-dark-bg'
              } flex items-center justify-center transition-colors duration-200`}>
                <span className="text-white text-xs">1</span>
              </div>
              <div className="absolute top-0 -ml-4 mt-8 w-14 text-center text-xs font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                Onboarding
              </div>
            </div>
            
            {/* Implementation Stage */}
            <div className="text-center">
              <div className={`h-7 w-7 rounded-full ${pilotData.currentStage === 'implementation' ? 'ring-2 ring-primary-600 dark:ring-dark-primary-600' : ''} ${
                ['implementation', 'evaluation', 'decision'].indexOf(pilotData.currentStage) >= 0 
                  ? 'bg-primary-600 dark:bg-dark-primary-600' 
                  : 'bg-gray-300 dark:bg-dark-bg'
              } flex items-center justify-center transition-colors duration-200`}>
                <span className="text-white text-xs">2</span>
              </div>
              <div className="absolute top-0 -ml-8 mt-8 w-16 text-center text-xs font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                Implementation
              </div>
            </div>
            
            {/* Evaluation Stage */}
            <div className="text-center">
              <div className={`h-7 w-7 rounded-full ${pilotData.currentStage === 'evaluation' ? 'ring-2 ring-primary-600 dark:ring-dark-primary-600' : ''} ${
                ['evaluation', 'decision'].indexOf(pilotData.currentStage) >= 0 
                  ? 'bg-primary-600 dark:bg-dark-primary-600' 
                  : 'bg-gray-300 dark:bg-dark-bg'
              } flex items-center justify-center transition-colors duration-200`}>
                <span className="text-white text-xs">3</span>
              </div>
              <div className="absolute top-0 -ml-6 mt-8 w-12 text-center text-xs font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                Evaluation
              </div>
            </div>
            
            {/* Decision Stage */}
            <div className="text-center">
              <div className={`h-7 w-7 rounded-full ${pilotData.currentStage === 'decision' ? 'ring-2 ring-primary-600 dark:ring-dark-primary-600' : ''} ${
                ['decision'].indexOf(pilotData.currentStage) >= 0 
                  ? 'bg-primary-600 dark:bg-dark-primary-600' 
                  : 'bg-gray-300 dark:bg-dark-bg'
              } flex items-center justify-center transition-colors duration-200`}>
                <span className="text-white text-xs">4</span>
              </div>
              <div className="absolute top-0 -ml-5 mt-8 w-10 text-center text-xs font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                Decision
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pilot Details */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-bg grid grid-cols-1 md:grid-cols-2 gap-6 transition-colors duration-200">
        <div>
          <h3 className="text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider mb-3 transition-colors duration-200">
            Pilot Information
          </h3>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Company:</dt>
              <dd className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{pilotData.companyName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Start Date:</dt>
              <dd className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{pilotData.startDate}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">End Date:</dt>
              <dd className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{pilotData.endDate}</dd>
            </div>
          </dl>
        </div>
        
        <div>
          <h3 className="text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider mb-3 transition-colors duration-200">
            Current Phase Goals
          </h3>
          <ul className="space-y-2">
            {pilotData.currentStage === 'onboarding' && (
              <>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Complete account setup</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Define success metrics</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Complete user training</span>
                </li>
              </>
            )}
            
            {pilotData.currentStage === 'implementation' && (
              <>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Complete SSO integration</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 flex justify-center items-center mr-2">
                    <div className="h-3 w-3 bg-yellow-500 dark:bg-yellow-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Implement HRIS integration</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 flex justify-center items-center mr-2">
                    <div className="h-3 w-3 bg-blue-500 dark:bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Achieve 80% user adoption</span>
                </li>
              </>
            )}
            
            {pilotData.currentStage === 'evaluation' && (
              <>
                <li className="flex items-start">
                  <div className="h-5 w-5 flex justify-center items-center mr-2">
                    <div className="h-3 w-3 bg-yellow-500 dark:bg-yellow-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Collect user feedback</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 flex justify-center items-center mr-2">
                    <div className="h-3 w-3 bg-yellow-500 dark:bg-yellow-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Complete ROI analysis</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 flex justify-center items-center mr-2">
                    <div className="h-3 w-3 bg-blue-500 dark:bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Prepare evaluation report</span>
                </li>
              </>
            )}
            
            {pilotData.currentStage === 'decision' && (
              <>
                <li className="flex items-start">
                  <div className="h-5 w-5 flex justify-center items-center mr-2">
                    <div className="h-3 w-3 bg-yellow-500 dark:bg-yellow-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Review pilot results</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 flex justify-center items-center mr-2">
                    <div className="h-3 w-3 bg-blue-500 dark:bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Present findings to stakeholders</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 flex justify-center items-center mr-2">
                    <div className="h-3 w-3 bg-blue-500 dark:bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Make deployment decision</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PilotStatusCard;