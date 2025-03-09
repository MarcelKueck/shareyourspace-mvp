import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Explore Spaces', href: '/explore' },
  { name: 'InnovationMatch', href: '/match' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Analytics', href: '/analytics' },
]

export default function Navbar() {
  const [isLoggedIn] = useState(false);
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Disclosure as="nav" className="bg-white dark:bg-dark-bg-light shadow transition-colors duration-200">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <span className="text-primary-600 dark:text-dark-primary-500 text-xl font-bold transition-colors duration-200">ShareYourSpace</span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => {
                    // Check if this is the current page (exact match or starts with for nested routes)
                    const isActive = 
                      (item.href === '/' && location.pathname === '/') || 
                      (item.href !== '/' && location.pathname.startsWith(item.href));
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`${
                          isActive
                            ? 'border-primary-500 dark:border-dark-primary-500 text-primary-600 dark:text-dark-primary-500'
                            : 'border-transparent text-gray-500 dark:text-dark-text-secondary hover:border-primary-500 dark:hover:border-dark-primary-500 hover:text-primary-600 dark:hover:text-dark-primary-500'
                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Dark mode toggle */}
                <button 
                  onClick={toggleDarkMode}
                  className="p-2 mr-2 rounded-md text-gray-500 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-bg focus:outline-none transition-colors duration-200"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <SunIcon className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>
              
                {isLoggedIn ? (
                  <Link
                    to="/profile"
                    className="text-gray-500 dark:text-dark-text-secondary hover:text-primary-600 dark:hover:text-dark-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    My Profile
                  </Link>
                ) : (
                  <div className="flex space-x-4">
                    <button className="border border-primary-500 dark:border-dark-primary-500 text-primary-500 dark:text-dark-primary-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-50 dark:hover:bg-dark-bg-light transition-colors duration-200">
                      Sign In
                    </button>
                    <button className="bg-primary-500 dark:bg-dark-primary-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-600 dark:hover:bg-dark-primary-600 transition-colors duration-200">
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                // Check if this is the current page (exact match or starts with for nested routes)
                const isActive = 
                  (item.href === '/' && location.pathname === '/') || 
                  (item.href !== '/' && location.pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive
                        ? 'border-primary-500 dark:border-dark-primary-500 text-primary-700 dark:text-dark-primary-400 bg-primary-50 dark:bg-dark-bg-light'
                        : 'border-transparent text-gray-500 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-light hover:border-gray-300 dark:hover:border-dark-text-muted hover:text-gray-700 dark:hover:text-dark-text-primary'
                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-dark-bg-light">
              {/* Dark mode toggle for mobile */}
              <div className="flex items-center justify-between px-4 py-2">
                <div className="text-sm text-gray-500 dark:text-dark-text-secondary">Dark Mode</div>
                <button 
                  onClick={toggleDarkMode}
                  className="p-2 rounded-md text-gray-500 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-bg-light focus:outline-none"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <SunIcon className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              {isLoggedIn ? (
                <div className="flex items-center px-4 mt-2">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-dark-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 dark:text-dark-primary-700 font-medium">JD</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-dark-text-primary">John Doe</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">john@example.com</div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-4 mt-2">
                  <button className="border border-primary-500 dark:border-dark-primary-500 text-primary-500 dark:text-dark-primary-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-50 dark:hover:bg-dark-bg-light w-full transition-colors duration-200">
                    Sign In
                  </button>
                  <button className="bg-primary-500 dark:bg-dark-primary-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-600 dark:hover:bg-dark-primary-600 w-full transition-colors duration-200">
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}