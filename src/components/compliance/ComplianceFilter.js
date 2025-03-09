import React from 'react';
import { complianceStandards, verificationLevels } from '../../services/complianceService';

/**
 * Advanced compliance filtering component for space search
 */
const ComplianceFilter = ({ 
  selectedStandards = {},
  onStandardChange,
  onLevelChange,
  expanded = false
}) => {
  // Get verification level colors
  const getLevelColor = (level) => {
    switch(level) {
      case 'yellow': return 'bg-yellow-50 dark:bg-yellow-900 bg-opacity-30 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700';
      case 'blue': return 'bg-blue-50 dark:bg-blue-900 bg-opacity-30 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700';
      case 'green': return 'bg-green-50 dark:bg-green-900 bg-opacity-30 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700';
      case 'purple': return 'bg-purple-50 dark:bg-purple-900 bg-opacity-30 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700';
      default: return 'bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text-primary border-gray-300 dark:border-dark-bg-light';
    }
  };
  
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3 transition-colors duration-200">
        Security & Compliance
      </p>
      
      {/* Essential compliance standards */}
      <div className="space-y-2">
        {['dataProtection', 'nda', 'iso27001'].map(standardId => {
          const standard = complianceStandards[standardId];
          const isSelected = !!selectedStandards[standardId];
          const selectedLevel = selectedStandards[standardId]?.level || null;
          
          return (
            <div key={standardId} className="flex flex-col">
              <div className="flex items-center">
                <input
                  id={`standard-${standardId}`}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 dark:text-dark-primary-600 focus:ring-primary-500 dark:focus:ring-dark-primary-500 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                  checked={isSelected}
                  onChange={() => onStandardChange(standardId, !isSelected)}
                />
                <label htmlFor={`standard-${standardId}`} className="ml-2 text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                  {standard.name}
                </label>
              </div>
              
              {/* Verification level selectors (visible when standard is checked) */}
              {isSelected && (
                <div className="ml-6 mt-2 flex flex-wrap gap-2">
                  {Object.entries(verificationLevels).map(([level, levelInfo]) => (
                    <button
                      key={level}
                      className={`px-2 py-1 text-xs rounded-full border ${
                        selectedLevel === levelInfo.color 
                          ? getLevelColor(levelInfo.color) 
                          : 'bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary border-gray-300 dark:border-dark-bg'
                      } transition-colors duration-200`}
                      onClick={() => onLevelChange(standardId, selectedLevel === levelInfo.color ? null : levelInfo.color)}
                    >
                      {levelInfo.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Advanced compliance standards (only visible when expanded) */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-bg space-y-2">
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
            Advanced Compliance Standards
          </p>
          
          {['physicalSecurity', 'networkSecurity', 'financialCompliance', 'researchEthics', 'ipProtection'].map(standardId => {
            const standard = complianceStandards[standardId];
            const isSelected = !!selectedStandards[standardId];
            const selectedLevel = selectedStandards[standardId]?.level || null;
            
            return (
              <div key={standardId} className="flex flex-col">
                <div className="flex items-center">
                  <input
                    id={`standard-${standardId}`}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 dark:text-dark-primary-600 focus:ring-primary-500 dark:focus:ring-dark-primary-500 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                    checked={isSelected}
                    onChange={() => onStandardChange(standardId, !isSelected)}
                  />
                  <label htmlFor={`standard-${standardId}`} className="ml-2 text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                    {standard.name}
                  </label>
                </div>
                
                {/* Verification level selectors (visible when standard is checked) */}
                {isSelected && (
                  <div className="ml-6 mt-2 flex flex-wrap gap-2">
                    {Object.entries(verificationLevels).map(([level, levelInfo]) => (
                      <button
                        key={level}
                        className={`px-2 py-1 text-xs rounded-full border ${
                          selectedLevel === levelInfo.color 
                            ? getLevelColor(levelInfo.color) 
                            : 'bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary border-gray-300 dark:border-dark-bg'
                        } transition-colors duration-200`}
                        onClick={() => onLevelChange(standardId, selectedLevel === levelInfo.color ? null : levelInfo.color)}
                      >
                        {levelInfo.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Toggle for expanded view */}
      <button 
        className="mt-3 text-xs text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 font-medium transition-colors duration-200 flex items-center"
        onClick={() => onStandardChange('__expanded', !expanded)}
      >
        {expanded ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            Show Less
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Show Advanced Standards
          </>
        )}
      </button>
    </div>
  );
};

export default ComplianceFilter;