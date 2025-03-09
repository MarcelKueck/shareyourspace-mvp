import React, { useState } from 'react';
import { styles } from '../styles/darkMode';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Mock data for the dashboard
  const mockBookings = [
    {
      id: 1,
      spaceName: "BMW Innovation Hub",
      date: "Mar 10, 2025",
      time: "Morning",
      price: 35,
      status: "Upcoming"
    },
    {
      id: 2,
      spaceName: "Allianz Digital Workspace",
      date: "Mar 15, 2025",
      time: "Afternoon",
      price: 50,
      status: "Upcoming"
    },
    {
      id: 3,
      spaceName: "TechLab Munich",
      date: "Feb 28, 2025",
      time: "Morning",
      price: 25,
      status: "Completed"
    }
  ];
  
  const mockConnections = [
    {
      id: 1,
      name: "Markus Schmidt",
      title: "Innovation Director",
      company: "BMW Group",
      status: "Connected",
      date: "Feb 25, 2025"
    },
    {
      id: 2,
      name: "Julia Weber",
      title: "Digital Ventures Lead",
      company: "Siemens AG",
      status: "Pending",
      date: "Mar 1, 2025"
    }
  ];
  
  return (
    <div className="bg-gray-50 dark:bg-dark-bg-light min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary sm:text-3xl transition-colors duration-200">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
              Manage your bookings, connections, and account settings
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
            >
              New Booking
            </button>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-dark-bg-light mb-6 transition-colors duration-200">
          <div className="flex space-x-8">
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'bookings'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('bookings')}
            >
              My Bookings
            </button>
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'connections'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('connections')}
            >
              My Connections
            </button>
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'settings'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('settings')}
            >
              Account Settings
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div>
          {activeTab === 'bookings' && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Your Bookings</h2>
                <div className="flex items-center">
                  <select className="px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 text-sm dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200">
                    <option>All Bookings</option>
                    <option>Upcoming</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              
              {mockBookings.length > 0 ? (
                <div className="bg-white dark:bg-dark-bg-light shadow overflow-hidden sm:rounded-md transition-colors duration-200">
                  <ul className="divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
                    {mockBookings.map((booking) => (
                      <li key={booking.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-primary-600 dark:text-dark-primary-500 truncate transition-colors duration-200">
                                {booking.spaceName}
                              </p>
                              <p className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.status === 'Upcoming' 
                                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                              } transition-colors duration-200`}>
                                {booking.status}
                              </p>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <div className="flex space-x-2">
                                <button className="px-3 py-1 text-xs text-primary-600 dark:text-dark-primary-500 border border-primary-500 dark:border-dark-primary-500 rounded-md hover:bg-primary-50 dark:hover:bg-dark-bg transition-colors duration-200">
                                  View Details
                                </button>
                                <Link 
                                  to={`/analytics?spaceId=${booking.spaceName.replace(/\s+/g, '_')}`}
                                  className="px-3 py-1 text-xs text-blue-600 dark:text-blue-400 border border-blue-500 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-dark-bg-light transition-colors duration-200"
                                >
                                  Analytics
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-dark-text-muted transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {booking.date}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-dark-text-secondary sm:mt-0 sm:ml-6 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-dark-text-muted transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {booking.time}
                              </p>
                            </div>
                            <p className="mt-2 flex items-center text-sm font-medium text-gray-900 dark:text-dark-text-primary sm:mt-0 transition-colors duration-200">
                              €{booking.price}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-white dark:bg-dark-bg-light shadow sm:rounded-md p-6 text-center transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400 dark:text-dark-text-muted transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">No bookings yet</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Get started by booking your first workspace.</p>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
                    >
                      New Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'connections' && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Your Connections</h2>
                <div className="flex items-center">
                  <select className="px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 text-sm dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200">
                    <option>All Connections</option>
                    <option>Connected</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>
              
              {mockConnections.length > 0 ? (
                <div className="bg-white dark:bg-dark-bg-light shadow overflow-hidden sm:rounded-md transition-colors duration-200">
                  <ul className="divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
                    {mockConnections.map((connection) => (
                      <li key={connection.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-dark-primary-900 flex items-center justify-center transition-colors duration-200">
                                <span className="text-primary-600 dark:text-dark-primary-400 font-medium transition-colors duration-200">
                                  {connection.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                                  {connection.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                                  {connection.title} at {connection.company}
                                </p>
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                connection.status === 'Connected' 
                                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                                  : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                              } transition-colors duration-200`}>
                                {connection.status}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <p className="flex items-center text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                              <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-dark-text-muted transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Connected on {connection.date}
                            </p>
                            <div className="mt-2 flex items-center text-sm sm:mt-0">
                              <button className="text-primary-600 dark:text-dark-primary-500 hover:text-primary-900 dark:hover:text-dark-primary-400 transition-colors duration-200">
                                Send Message
                              </button>
                              <span className="mx-2 text-gray-500 dark:text-dark-text-muted transition-colors duration-200">|</span>
                              <button className="text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary transition-colors duration-200">
                                View Profile
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-white dark:bg-dark-bg-light shadow sm:rounded-md p-6 text-center transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400 dark:text-dark-text-muted transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">No connections yet</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Start connecting with business partners using InnovationMatch.</p>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
                    >
                      Find Connections
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-dark-bg-light shadow overflow-hidden sm:rounded-lg transition-colors duration-200">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Account Settings</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Update your profile and preferences.</p>
              </div>
              <div className="border-t border-gray-200 dark:border-dark-bg px-4 py-5 sm:p-6 transition-colors duration-200">
                <form className="space-y-8">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Profile Information</h3>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          First name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            className="shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 block w-full sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                            defaultValue="John"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          Last name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            className="shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 block w-full sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                            defaultValue="Doe"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 block w-full sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                            defaultValue="john.doe@example.com"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          Company
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="company"
                            id="company"
                            className="shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 block w-full sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                            defaultValue="TechStartup GmbH"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          Job Title
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="title"
                            id="title"
                            className="shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 block w-full sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                            defaultValue="CEO & Founder"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Notification Settings</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="booking-notifications"
                            name="booking-notifications"
                            type="checkbox"
                            className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 h-4 w-4 text-primary-600 dark:text-dark-primary-600 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="booking-notifications" className="font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                            Booking notifications
                          </label>
                          <p className="text-gray-500 dark:text-dark-text-muted transition-colors duration-200">Receive notifications about your upcoming bookings.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="connection-notifications"
                            name="connection-notifications"
                            type="checkbox"
                            className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 h-4 w-4 text-primary-600 dark:text-dark-primary-600 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="connection-notifications" className="font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                            Connection notifications
                          </label>
                          <p className="text-gray-500 dark:text-dark-text-muted transition-colors duration-200">Receive notifications when someone connects with you.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="marketing-notifications"
                            name="marketing-notifications"
                            type="checkbox"
                            className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 h-4 w-4 text-primary-600 dark:text-dark-primary-600 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="marketing-notifications" className="font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                            Marketing emails
                          </label>
                          <p className="text-gray-500 dark:text-dark-text-muted transition-colors duration-200">Receive updates about new features and promotions.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-white dark:bg-dark-bg py-2 px-4 border border-gray-300 dark:border-dark-bg-light rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;