import React, { useState } from 'react';
import { complianceStandards } from '../../services/complianceService';

/**
 * Displays and allows interaction with compliance documents
 */
const ComplianceDocument = ({ document, onView, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Default values if document props are missing
  const {
    id = '',
    name = 'Unnamed Document',
    standard = '',
    uploadDate = '',
    status = 'pending',
    fileType = 'pdf'
  } = document || {};
  
  // Get standard info if available
  const standardInfo = complianceStandards[standard] || null;
  
  // Get status styles
  const getStatusStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'verified':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'pending':
      default:
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
    }
  };
  
  // Get icon for file type
  const getFileIcon = (fileType) => {
    switch(fileType.toLowerCase()) {
      case 'pdf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <div 
      className="border border-gray-200 dark:border-dark-bg rounded-md p-4 hover:shadow-md transition-shadow duration-200 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getFileIcon(fileType)}
        </div>
        <div className="ml-4 flex-1">
          <h4 className="text-base font-medium text-gray-900 dark:text-dark-text-primary">{name}</h4>
          
          <div className="flex items-center mt-1">
            {standardInfo && (
              <span className="text-sm text-gray-600 dark:text-dark-text-secondary mr-2">
                {standardInfo.name}
              </span>
            )}
            
            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusStyle(status)}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-dark-text-secondary mt-2">
            Uploaded: {formatDate(uploadDate)}
          </div>
        </div>
      </div>
      
      {/* Action buttons that appear on hover */}
      {isHovered && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button 
            className="p-1 rounded-full bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-dark-bg-light transition-colors duration-200"
            onClick={() => onView && onView(document)}
            title="View document"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          
          <button 
            className="p-1 rounded-full bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-dark-bg-light transition-colors duration-200"
            onClick={() => onDownload && onDownload(document)}
            title="Download document"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ComplianceDocument;