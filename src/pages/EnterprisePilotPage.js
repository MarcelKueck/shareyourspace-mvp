import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles/darkMode';
import PilotApplicationForm from '../components/enterprise/PilotApplicationForm';
import PilotFeaturesList from '../components/enterprise/PilotFeaturesList';
import EnterpriseTestimonials from '../components/enterprise/EnterpriseTestimonials';
import PilotFAQ from '../components/enterprise/PilotFAQ';

const EnterprisePilotPage = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  return (
    <div className="bg-gray-50 dark:bg-dark-bg-light min-h-screen transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-white dark:bg-dark-bg-light transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-dark-text-primary sm:text-5xl md:text-6xl transition-colors duration-200">
                <span className="block">Enterprise Pilot</span>
                <span className="block text-primary-600 dark:text-dark-primary-500 transition-colors duration-200">Program</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-dark-text-secondary sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl transition-colors duration-200">
                Experience the full potential of ShareYourSpace with our tailored enterprise pilot program. Test our platform in your organization with a customized, risk-free implementation.
              </p>
              <div className="mt-8 sm:flex">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => setShowApplicationForm(true)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    Apply for Pilot
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/contact-enterprise"
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-dark-bg text-base font-medium rounded-md text-gray-700 dark:text-dark-text-primary bg-white dark:bg-dark-bg hover:bg-gray-50 dark:hover:bg-dark-bg-light md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="relative mx-auto w-full rounded-lg shadow-lg overflow-hidden lg:max-w-lg">
                <img
                  className="w-full"
                  src="/api/placeholder/600/400"
                  alt="Enterprise workspace collaboration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-dark-bg-light rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full transition-colors duration-200">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="bg-white dark:bg-dark-bg-light rounded-md text-gray-400 dark:text-dark-text-secondary hover:text-gray-500 dark:hover:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 sm:p-10">
                <PilotApplicationForm onCancel={() => setShowApplicationForm(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Pilot Program Overview */}
      <div className="py-16 bg-white dark:bg-dark-bg transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-dark-text-primary sm:text-4xl transition-colors duration-200">
              Enterprise Pilot Program Overview
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-dark-text-secondary sm:mt-4 transition-colors duration-200">
              Our structured 90-day pilot provides a comprehensive evaluation of ShareYourSpace for your organization.
            </p>
          </div>
          
          <div className="mt-12">
            <PilotFeaturesList />
          </div>
        </div>
      </div>
      
      {/* Pilot Phase Timeline */}
      <div className="py-16 bg-gray-50 dark:bg-dark-bg-light transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-dark-text-primary sm:text-4xl transition-colors duration-200">
              Pilot Program Timeline
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-dark-text-secondary sm:mt-4 transition-colors duration-200">
              A structured approach to evaluate ShareYourSpace in your organization
            </p>
          </div>
          
          <div className="mt-12 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300 dark:border-dark-bg"></div>
            </div>
            <div className="relative flex justify-between">
              <div>
                <span className="h-12 w-12 rounded-full bg-primary-600 dark:bg-dark-primary-600 flex items-center justify-center text-white transition-colors duration-200">
                  1
                </span>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Onboarding</h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Days 1-15</p>
                </div>
              </div>
              <div>
                <span className="h-12 w-12 rounded-full bg-primary-600 dark:bg-dark-primary-600 flex items-center justify-center text-white transition-colors duration-200">
                  2
                </span>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Implementation</h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Days 15-45</p>
                </div>
              </div>
              <div>
                <span className="h-12 w-12 rounded-full bg-primary-600 dark:bg-dark-primary-600 flex items-center justify-center text-white transition-colors duration-200">
                  3
                </span>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Evaluation</h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Days 45-75</p>
                </div>
              </div>
              <div>
                <span className="h-12 w-12 rounded-full bg-primary-600 dark:bg-dark-primary-600 flex items-center justify-center text-white transition-colors duration-200">
                  4
                </span>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Decision</h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Days 75-90</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
              <div className="p-6 bg-white dark:bg-dark-bg rounded-lg shadow-sm transition-colors duration-200">
                <h4 className="text-base font-medium text-primary-600 dark:text-dark-primary-500 transition-colors duration-200">Phase 1: Onboarding</h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Needs assessment and pilot goals
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Account setup and configuration
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    User training and documentation
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Success metrics definition
                  </li>
                </ul>
              </div>
              
              <div className="p-6 bg-white dark:bg-dark-bg rounded-lg shadow-sm transition-colors duration-200">
                <h4 className="text-base font-medium text-primary-600 dark:text-dark-primary-500 transition-colors duration-200">Phase 2: Implementation</h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Initial space bookings
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Integration with existing systems
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    User adoption monitoring
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Weekly progress check-ins
                  </li>
                </ul>
              </div>
              
              <div className="p-6 bg-white dark:bg-dark-bg rounded-lg shadow-sm transition-colors duration-200">
                <h4 className="text-base font-medium text-primary-600 dark:text-dark-primary-500 transition-colors duration-200">Phase 3: Evaluation</h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Success metrics measurement
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    User feedback collection
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    ROI analysis
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Feature optimization
                  </li>
                </ul>
              </div>
              
              <div className="p-6 bg-white dark:bg-dark-bg rounded-lg shadow-sm transition-colors duration-200">
                <h4 className="text-base font-medium text-primary-600 dark:text-dark-primary-500 transition-colors duration-200">Phase 4: Decision</h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Results presentation
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Custom deployment plan
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Contract negotiation
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Full deployment transition
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enterprise Testimonials */}
      <div className="py-16 bg-white dark:bg-dark-bg transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-dark-text-primary sm:text-4xl transition-colors duration-200">
              Enterprise Success Stories
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-dark-text-secondary sm:mt-4 transition-colors duration-200">
              See how other enterprises have succeeded with our pilot program
            </p>
          </div>
          
          <div className="mt-12">
            <EnterpriseTestimonials />
          </div>
        </div>
      </div>
      
      {/* FAQs */}
      <div className="py-16 bg-gray-50 dark:bg-dark-bg-light transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-dark-text-primary sm:text-4xl transition-colors duration-200">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-dark-text-secondary sm:mt-4 transition-colors duration-200">
              Everything you need to know about our Enterprise Pilot Program
            </p>
          </div>
          
          <div className="mt-12">
            <PilotFAQ />
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-700 dark:bg-dark-primary-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start your pilot?</span>
            <span className="block text-primary-200 dark:text-dark-primary-200 transition-colors duration-200">Begin your evaluation today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => setShowApplicationForm(true)}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 dark:text-dark-primary-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Apply for Pilot
              </button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterprisePilotPage;