// Contract terms selector component
import React from 'react';

const ContractTermsSelector = ({ templates, selectedTemplate, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${
            selectedTemplate === template.id
              ? 'border-primary-500 dark:border-dark-primary-500 bg-primary-50 dark:bg-dark-primary-900 dark:bg-opacity-20'
              : 'border-gray-200 dark:border-dark-bg hover:border-primary-300 dark:hover:border-dark-primary-700'
          }`}
          onClick={() => onChange(template.id)}
        >
          <div className="font-bold text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">
            {template.name}
          </div>
          <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4 transition-colors duration-200">
            {template.description}
          </p>
          <ul className="text-sm space-y-2">
            {template.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 dark:text-dark-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ContractTermsSelector;