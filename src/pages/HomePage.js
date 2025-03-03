import React from 'react';
import { Link } from 'react-router-dom';
import { spaces } from '../data/spaces';
import SpaceCard from '../components/SpaceCard';
import { styles } from '../styles/darkMode';

const HomePage = () => {
  // Get featured spaces for the homepage
  const featuredSpaces = spaces.filter(space => space.featured).slice(0, 3);
  
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-pattern dark:bg-dark-bg-light dark:bg-opacity-10 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-dark-text-primary sm:text-5xl md:text-6xl transition-colors duration-200">
                <span className="block">The Enterprise-Grade</span>
                <span className="block text-primary-600 dark:text-dark-primary-500 transition-colors duration-200">Office Sharing Platform</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-dark-text-secondary sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 transition-colors duration-200">
                Connect corporate innovation teams with B2B SaaS startups in Munich's most secure and professional workspace network.
              </p>
              <div className="mt-8 sm:flex">
                <div className="rounded-md shadow">
                  <Link
                    to="/explore"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    Find a Space
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/match"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 dark:text-dark-primary-400 bg-primary-100 dark:bg-dark-primary-900 hover:bg-primary-200 dark:hover:bg-dark-primary-800 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    InnovationMatch
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="relative mx-auto w-full rounded-lg shadow-lg overflow-hidden lg:max-w-lg">
                <img
                  className="w-full"
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                  alt="Corporate and startup business networking"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Spaces Section */}
      <div className="py-16 bg-white dark:bg-dark-bg transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-dark-text-primary sm:text-4xl transition-colors duration-200">
              Featured Spaces
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-dark-text-secondary sm:mt-4 transition-colors duration-200">
              Premium workspace solutions from Munich's leading enterprises
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredSpaces.map(space => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/explore"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200"
            >
              View All Spaces
            </Link>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="py-16 bg-gray-50 dark:bg-dark-bg-light transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-dark-text-primary sm:text-4xl transition-colors duration-200">
              Why ShareYourSpace?
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-dark-text-secondary sm:mt-4 transition-colors duration-200">
              Creating powerful connections beyond just workspace
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary-500 dark:bg-dark-primary-500 text-white transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Enterprise-Grade Security</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-dark-text-secondary text-center transition-colors duration-200">
                  All spaces meet German data protection standards and enterprise security requirements
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary-500 dark:bg-dark-primary-500 text-white transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">InnovationMatch</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-dark-text-secondary text-center transition-colors duration-200">
                  Connect with corporate innovation leaders and B2B founders for valuable business partnerships
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary-500 dark:bg-dark-primary-500 text-white transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Growth Flexibility</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-dark-text-secondary text-center transition-colors duration-200">
                  Scalable solutions that grow with your business needs, from single desks to entire team spaces
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700 dark:bg-dark-primary-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-200 dark:text-dark-primary-200 transition-colors duration-200">Find your perfect workspace today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/explore"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 dark:text-dark-primary-700 bg-white dark:bg-white hover:bg-gray-50 dark:hover:bg-gray-100 transition-colors duration-200"
              >
                Find Spaces
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200"
              >
                List Your Space
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;