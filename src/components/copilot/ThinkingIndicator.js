import React from 'react';

const ThinkingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[90%] bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-3 border border-gray-100 dark:border-dark-bg-light transition-colors duration-200">
        <div className="flex items-center">
          <div className="mr-3 w-6 h-6 bg-primary-50 dark:bg-dark-primary-900 rounded-full flex items-center justify-center transition-colors duration-200">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-primary-600 dark:text-dark-primary-400 animate-pulse" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 10V3L4 14h7v7l9-11h-7z" 
              />
            </svg>
          </div>
          
          <div className="relative w-24 h-4">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 dark:bg-dark-bg rounded transition-colors duration-200"></div>
            <div className="absolute top-1/2 left-0 h-0.5 bg-primary-500 dark:bg-dark-primary-500 rounded transition-colors duration-200 animate-thinking"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this CSS class in your index.css
// @keyframes thinking {
//   0% { width: 0%; }
//   50% { width: 100%; }
//   100% { width: 0%; }
// }
// .animate-thinking {
//   animation: thinking 2s ease-in-out infinite;
// }

export default ThinkingIndicator;