import React from 'react';
import { complianceStandards, getSpaceVerificationStatus } from '../../services/complianceService';
import ComplianceBadge from './ComplianceBadge';
import ComplianceStatus from './ComplianceStatus';

/**
 * Provides an overview of all compliance measures for a space
 */
const ComplianceOverview = ({ space }) => {
  if (!space || !space.compliance) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-md">
        <p className="text-gray-500 dark:text-dark-text-secondary">No compliance information available for this space.</p>
      </div>
    );
  }
  
  // Get detailed verification status for the space
  const verificationStatus = getSpaceVerificationStatus(space);
  
  return (
    <div className="space-y-6">
      {/* Compliance Score and Status Summary */}
      <div className="p-4 bg-white dark:bg-dark-bg-light shadow-sm rounded-md border border-gray-200 dark:border-dark-bg-light">
        <ComplianceStatus space={space} detailed={true} />
      </div>
      
      {/* Detailed Compliance Standards */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4">Compliance Standards</h3>
        
        <div className="space-y-4">
          {Object.keys(verificationStatus).map(standardId => {
            const standard = complianceStandards[standardId];
            const status = verificationStatus[standardId];
            
            if (!standard) return null;
            
            return (
              <div key={standardId} className="bg-white dark:bg-dark-bg-light shadow-sm rounded-md border border-gray-200 dark:border-dark-bg-light p-4">
                <div className="flex items-start">
                  <ComplianceBadge standardId={standardId} level={status.level || 'self-declared'} size="lg" />
                  
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary">{standard.name}</h4>
                      
                      {/* Verification Level Badge */}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        status.level === 'certified' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                        status.level === 'verified' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                        status.level === 'documented' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                        'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      }`}>
                        {status.level === 'certified' ? 'Certified' :
                         status.level === 'verified' ? 'Verified' :
                         status.level === 'documented' ? 'Documented' :
                         'Self-Declared'}
                      </span>
                    </div>
                    
                    <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">{standard.description}</p>
                    
                    {/* Verification details if available */}
                    {(status.verifiedDate || status.verifiedBy) && (
                      <div className="mt-2 text-xs text-gray-500 dark:text-dark-text-secondary">
                        {status.verifiedDate && (
                          <span className="inline-block mr-4">
                            Verified: {new Date(status.verifiedDate).toLocaleDateString()}
                          </span>
                        )}
                        {status.verifiedBy && (
                          <span className="inline-block">
                            By: {status.verifiedBy}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Requirements list */}
                    <div className="mt-3">
                      <div className="flex items-center">
                        <button className="flex items-center text-xs text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          View Requirements
                        </button>
                        
                        {status.documents && status.documents.length > 0 && (
                          <button className="flex items-center text-xs text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View Documents ({status.documents.length})
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Compliance Certification Request */}
      <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-md p-4 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">Need Higher Compliance Verification?</h3>
        <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
          Request a compliance verification or certification for this space to enhance trust with your clients.
        </p>
        <button 
          className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600"
        >
          Request Verification
        </button>
      </div>
    </div>
  );
};

export default ComplianceOverview;