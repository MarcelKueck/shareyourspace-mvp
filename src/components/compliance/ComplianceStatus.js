import React from 'react';
import { calculateComplianceScore, verificationLevels } from '../../services/complianceService';
import ComplianceBadge from './ComplianceBadge';

/**
 * Displays the overall compliance status of a space with score
 */
const ComplianceStatus = ({ space, detailed = false }) => {
  if (!space || !space.compliance) {
    return (
      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-dark-text-primary">
        No compliance info
      </div>
    );
  }
  
  // Calculate compliance score
  const score = calculateComplianceScore(space);
  
  // Determine status color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'blue';
    if (score >= 40) return 'yellow';
    return 'red';
  };
  
  const scoreColor = getScoreColor(score);
  const scoreColors = {
    green: 'text-green-600 dark:text-green-400',
    blue: 'text-blue-600 dark:text-blue-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    red: 'text-red-600 dark:text-red-400'
  };
  
  // Determine security level text
  const getSecurityLevel = (score) => {
    if (score >= 90) return 'Enterprise+';
    if (score >= 80) return 'Enterprise';
    if (score >= 60) return 'Business';
    if (score >= 40) return 'Basic';
    return 'Minimal';
  };
  
  const securityLevel = getSecurityLevel(score);
  
  // Create list of badges for compliance standards
  const complianceBadges = Object.entries(space.compliance)
    .filter(([standardId, value]) => value) // Filter out false values
    .map(([standardId, value]) => {
      // Determine verification level
      let level = 'self-declared';
      if (typeof value === 'object' && value.level) {
        level = value.level;
      }
      
      return (
        <div key={standardId} className="mr-2 mb-2">
          <ComplianceBadge standardId={standardId} level={level} showTooltip={true} />
        </div>
      );
    });
  
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="text-lg font-medium mr-2">
          Security Level: <span className={scoreColors[scoreColor]}>{securityLevel}</span>
        </div>
        <div className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-dark-bg text-sm font-medium">
          Score: <span className={scoreColors[scoreColor]}>{score}</span>/100
        </div>
      </div>
      
      {detailed && (
        <div className="mt-3">
          <div className="text-sm font-medium mb-2">Compliance Standards:</div>
          <div className="flex flex-wrap">
            {complianceBadges}
          </div>
        </div>
      )}
      
      {detailed && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-dark-bg-light rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                scoreColor === 'green' ? 'bg-green-500 dark:bg-green-600' : 
                scoreColor === 'blue' ? 'bg-blue-500 dark:bg-blue-600' : 
                scoreColor === 'yellow' ? 'bg-yellow-500 dark:bg-yellow-600' : 
                'bg-red-500 dark:bg-red-600'
              }`} 
              style={{ width: `${score}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 dark:text-dark-text-secondary mt-1">
            <span>Basic</span>
            <span>Business</span>
            <span>Enterprise</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceStatus;