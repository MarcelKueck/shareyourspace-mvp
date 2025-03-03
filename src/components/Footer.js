import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary-800 dark:bg-dark-bg text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <span className="text-xl font-bold">ShareYourSpace</span>
            <p className="text-secondary-300 dark:text-dark-text-secondary text-base transition-colors duration-200">
              The Enterprise-Grade Office Sharing Platform connecting corporate innovation teams with B2B SaaS startups.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-secondary-400 dark:text-dark-text-muted hover:text-secondary-300 dark:hover:text-dark-text-secondary transition-colors duration-200">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-secondary-400 dark:text-dark-text-muted hover:text-secondary-300 dark:hover:text-dark-text-secondary transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-secondary-300 dark:text-dark-text-secondary tracking-wider uppercase transition-colors duration-200">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/explore" className="text-base text-secondary-300 dark:text-dark-text-secondary hover:text-white dark:hover:text-white transition-colors duration-200">
                      Find a Space
                    </Link>
                  </li>
                  <li>
                    <Link to="/match" className="text-base text-secondary-300 dark:text-dark-text-secondary hover:text-white dark:hover:text-white transition-colors duration-200">
                      InnovationMatch
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-base text-secondary-300 dark:text-dark-text-secondary hover:text-white dark:hover:text-white transition-colors duration-200">
                      List Your Space
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-secondary-300 dark:text-dark-text-secondary hover:text-white dark:hover:text-white transition-colors duration-200">
                      Enterprise Solutions
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-secondary-300 dark:text-dark-text-secondary tracking-wider uppercase transition-colors duration-200">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-secondary-300 dark:text-dark-text-secondary hover:text-white dark:hover:text-white transition-colors duration-200">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-secondary-300 dark:text-dark-text-secondary hover:text-white dark:hover:text-white transition-colors duration-200">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-secondary-300 dark:text-dark-text-secondary hover:text-white dark:hover:text-white transition-colors duration-200">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-secondary-300 dark:text-dark-text-secondary hover:text-white dark:hover:text-white transition-colors duration-200">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-secondary-300 dark:text-dark-text-secondary tracking-wider uppercase transition-colors duration-200">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-secondary-300 dark:text-dark-text-secondary hover:text-white dark:hover:text-white transition-colors duration-200">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-secondary-300 dark:text-dark-text-secondary hover:text-white dark:hover:text-white transition-colors duration-200">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-secondary-300 dark:text-dark-text-secondary hover:text-white dark:hover:text-white transition-colors duration-200">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-secondary-300 dark:text-dark-text-secondary tracking-wider uppercase transition-colors duration-200">Get Started</h3>
                <div className="mt-4 rounded-md bg-white dark:bg-dark-bg-light p-4 transition-colors duration-200">
                  <p className="text-sm text-secondary-800 dark:text-dark-text-primary font-medium mb-2 transition-colors duration-200">Sign up for our newsletter</p>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Email address" 
                      className="w-full px-3 py-2 text-sm text-gray-700 dark:text-dark-text-primary border border-gray-300 dark:border-dark-bg rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg transition-colors duration-200"
                    />
                    <button className="px-3 py-2 bg-primary-600 dark:bg-dark-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-secondary-700 dark:border-dark-bg-light pt-8 transition-colors duration-200">
          <p className="text-base text-secondary-400 dark:text-dark-text-muted text-center transition-colors duration-200">
            &copy; 2025 ShareYourSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;