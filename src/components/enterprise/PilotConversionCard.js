import React, { useState } from 'react';

const PilotConversionCard = ({ pilotData }) => {
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  
  // Get the appropriate action based on the current stage
  const getActionByStage = (stage) => {
    switch (stage) {
      case 'onboarding':
        return {
          title: 'Pilot Just Started',
          description: 'Your pilot program has just begun. After completion, you\'ll have the option to convert to a full enterprise subscription.',
          buttonText: 'View Full Pricing',
          buttonAction: () => window.open('/enterprise-pricing', '_blank')
        };
      case 'implementation':
        return {
          title: 'Get Ahead of Schedule',
          description: 'Enjoying the platform? You can request early conversion to a full enterprise subscription.',
          buttonText: 'Request Early Conversion',
          buttonAction: () => setShowRequestDialog(true)
        };
      case 'evaluation':
        return {
          title: 'Ready to Convert?',
          description: 'Your pilot is in the evaluation phase. Request information about converting to a full enterprise subscription.',
          buttonText: 'Request Conversion Info',
          buttonAction: () => setShowRequestDialog(true)
        };
      case 'decision':
        return {
          title: 'Time to Decide',
          description: 'Your pilot is ending soon. Convert now to ensure seamless continuation of service.',
          buttonText: 'Convert to Full Subscription',
          buttonAction: () => setShowRequestDialog(true)
        };
      default:
        return {
          title: 'Learn About Enterprise Plans',
          description: 'Discover the benefits of our enterprise subscription plans.',
          buttonText: 'View Enterprise Plans',
          buttonAction: () => window.open('/enterprise-plans', '_blank')
        };
    }
  };
  
  const currentAction = getActionByStage(pilotData.currentStage);
  
  return (
    <div>
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 dark:from-dark-primary-700 dark:to-dark-primary-900 rounded-lg shadow-md p-6 text-white transition-colors duration-200">
        <h2 className="text-lg font-medium mb-2">{currentAction.title}</h2>
        <p className="text-sm text-primary-100 dark:text-dark-primary-200 mb-6 transition-colors duration-200">
          {currentAction.description}
        </p>
        
        <button
          onClick={currentAction.buttonAction}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-700 dark:text-dark-primary-800 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white transition-colors duration-200"
        >
          {currentAction.buttonText}
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      
      {/* Enterprise Benefits List */}
      <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 mt-6 transition-colors duration-200">
        <h3 className="text-base font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
          Enterprise Subscription Benefits
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Unlimited workspace access</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Advanced security and compliance features</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Custom integrations with your existing systems</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Premium support with dedicated account management</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Advanced analytics and reporting</span>
          </li>
        </ul>
      </div>
      
      {/* Conversion Request Dialog */}
      {showRequestDialog && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-dark-bg-light rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full transition-colors duration-200">
              <div className="bg-white dark:bg-dark-bg-light px-4 pt-5 pb-4 sm:p-6 sm:pb-4 transition-colors duration-200">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-dark-primary-900 sm:mx-0 sm:h-10 sm:w-10 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-dark-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                      Request Subscription Conversion
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                        Please provide the following information to initiate the conversion process from your pilot to a full enterprise subscription.
                      </p>
                    </div>
                    
                    <form className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="plan-type" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          Preferred Plan
                        </label>
                        <select
                          id="plan-type"
                          name="plan-type"
                          className="mt-1 block w-full shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                        >
                          <option value="standard">Standard Enterprise</option>
                          <option value="premium">Premium Enterprise</option>
                          <option value="custom">Custom Enterprise</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="users" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          Number of Users
                        </label>
                        <input
                          type="number"
                          name="users"
                          id="users"
                          min="1"
                          className="mt-1 block w-full shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                          defaultValue="25"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="contract-length" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          Contract Length
                        </label>
                        <select
                          id="contract-length"
                          name="contract-length"
                          className="mt-1 block w-full shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                        >
                          <option value="12">12 Months</option>
                          <option value="24">24 Months</option>
                          <option value="36">36 Months</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="additional-info" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          Additional Requirements
                        </label>
                        <textarea
                          id="additional-info"
                          name="additional-info"
                          rows="3"
                          className="mt-1 block w-full shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                          placeholder="Any specific needs or requests for your subscription"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-dark-bg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse transition-colors duration-200">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 dark:bg-dark-primary-600 text-base font-medium text-white hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                  onClick={() => {
                    alert('Conversion request submitted. Our enterprise team will contact you shortly.');
                    setShowRequestDialog(false);
                  }}
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-bg shadow-sm px-4 py-2 bg-white dark:bg-dark-bg-light text-base font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                  onClick={() => setShowRequestDialog(false)}
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

export default PilotConversionCard;