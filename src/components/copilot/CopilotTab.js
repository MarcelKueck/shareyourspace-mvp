import React from 'react';

const CopilotTab = ({ toggleExpanded }) => {
  return (
    <div 
      className="h-full w-full flex flex-col items-center justify-center cursor-pointer bg-white dark:bg-dark-bg-light border-l border-gray-200 dark:border-dark-bg transition-colors duration-200"
      onClick={toggleExpanded}
    >
      <div className="rotate-90 flex items-center justify-center h-40">
        <span className="text-primary-600 dark:text-dark-primary-500 font-medium text-sm uppercase tracking-wider transition-colors duration-200">Copilot</span>
      </div>
      <div className="mt-6 mb-2 flex items-center justify-center p-2 rounded-full bg-primary-50 dark:bg-dark-primary-900 transition-colors duration-200">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-primary-600 dark:text-dark-primary-400" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default CopilotTab;