// Growth option selector component
import React from 'react';

const GrowthOptionSelector = ({ options, selectedOption, onChange }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {options.map((option) => (
          <div
            key={option.id}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${
              selectedOption === option.id
                ? 'border-primary-500 dark:border-dark-primary-500 bg-primary-50 dark:bg-dark-primary-900 dark:bg-opacity-20'
                : 'border-gray-200 dark:border-dark-bg hover:border-primary-300 dark:hover:border-dark-primary-700'
            }`}
            onClick={() => onChange(option.id)}
          >
            <div className="flex justify-between items-start">
              <div className="font-bold text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">
                {option.name}
              </div>
              {option.fee > 0 && (
                <div className="text-xs font-medium text-gray-500 dark:text-dark-text-secondary bg-gray-100 dark:bg-dark-bg px-2 py-1 rounded-md transition-colors duration-200">
                  +{option.fee}%
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4 transition-colors duration-200">
              {option.description}
            </p>
            {option.expandCapacity > 0 && (
              <div className="mt-2">
                <div className="bg-gray-200 dark:bg-dark-bg h-2 rounded-full overflow-hidden transition-colors duration-200">
                  <div
                    className="bg-primary-500 dark:bg-dark-primary-500 h-full transition-colors duration-200"
                    style={{ width: `${Math.min(100, option.expandCapacity)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-dark-text-secondary mt-1 transition-colors duration-200">
                  <span>Initial</span>
                  <span>+{option.expandCapacity}% Growth</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 p-3 rounded-md text-sm text-yellow-700 dark:text-yellow-300 transition-colors duration-200">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            Growth options provide flexibility to expand your team size during the contract period. The higher the growth allowance, the higher the additional fee on the base rate.
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthOptionSelector;