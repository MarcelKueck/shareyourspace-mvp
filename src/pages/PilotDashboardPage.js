import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PilotStatusCard from '../components/enterprise/PilotStatusCard';
import PilotMetricsCard from '../components/enterprise/PilotMetricsCard';
import PilotActivityFeed from '../components/enterprise/PilotActivityFeed';
import PilotTeamMembers from '../components/enterprise/PilotTeamMembers';
import PilotConversionCard from '../components/enterprise/PilotConversionCard';

const PilotDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock pilot data - would come from backend in real implementation
  const pilotData = {
    companyName: 'BMW Group',
    pilotName: 'Innovation Team Workspace Pilot',
    startDate: '2025-01-15',
    endDate: '2025-04-15',
    currentStage: 'implementation', // onboarding, implementation, evaluation, decision
    daysRemaining: 45,
    progress: 50, // percentage of pilot completed
    accountManager: {
      name: 'Anna Weber',
      email: 'anna.weber@shareyourspace.com',
      phone: '+49 123 4567890'
    },
    metrics: {
      teamAdoption: 78, // percentage
      spacesBooked: 24,
      totalHoursUsed: 186,
      connectionsMade: 7,
      documentsUploaded: 15
    },
    nextMilestones: [
      {
        name: 'Mid-pilot review meeting',
        date: '2025-03-01',
        completed: false
      },
      {
        name: 'Integration with HRIS',
        date: '2025-02-28',
        completed: false
      },
      {
        name: 'User feedback survey',
        date: '2025-03-15',
        completed: false
      }
    ],
    completedMilestones: [
      {
        name: 'Kickoff meeting',
        date: '2025-01-15',
        completed: true
      },
      {
        name: 'User training sessions',
        date: '2025-01-22',
        completed: true
      },
      {
        name: 'SSO Integration',
        date: '2025-02-05',
        completed: true
      }
    ]
  };
  
  return (
    <div className="bg-gray-50 dark:bg-dark-bg-light min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <Link to="/" className="text-gray-400 hover:text-gray-500">
                  Home
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <Link to="/dashboard" className="ml-4 text-gray-400 hover:text-gray-500">
                  Dashboard
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <span className="ml-4 text-gray-500 font-medium">
                  Pilot Dashboard
                </span>
              </div>
            </li>
          </ol>
        </nav>
        
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary sm:text-3xl transition-colors duration-200">
              Enterprise Pilot Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
              Track the progress and performance of your {pilotData.pilotName}
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Download Pilot Report
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-dark-bg-light mb-6 transition-colors duration-200">
          <div className="flex space-x-8">
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'metrics'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('metrics')}
            >
              Detailed Metrics
            </button>
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'team'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('team')}
            >
              Team Management
            </button>
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'settings'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('settings')}
            >
              Pilot Settings
            </button>
          </div>
        </div>
        
        {/* Dashboard Content - Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pilot Status Card */}
              <div className="lg:col-span-2">
                <PilotStatusCard pilotData={pilotData} />
              </div>
              
              {/* Account Manager Card */}
              <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
                <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
                  Your Pilot Team
                </h2>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-dark-primary-900 flex items-center justify-center">
                      <span className="text-primary-600 dark:text-dark-primary-400 font-medium">AW</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-dark-text-primary">{pilotData.accountManager.name}</p>
                      <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Dedicated Account Manager</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700 dark:text-dark-text-secondary">{pilotData.accountManager.email}</span>
                    </div>
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-700 dark:text-dark-text-secondary">{pilotData.accountManager.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-dark-bg pt-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3">Need assistance?</h3>
                  <div className="space-y-3">
                    <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Message Account Manager
                    </button>
                    <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-dark-bg shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-bg-light hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Schedule Meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Middle Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Key Metrics */}
              <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                    Key Metrics
                  </h2>
                  <Link to="#" className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-800 dark:hover:text-dark-primary-400 transition-colors duration-200">
                    View Full Analytics
                  </Link>
                </div>
                
                <div className="space-y-4">
                  <PilotMetricsCard 
                    title="Team Adoption" 
                    value={`${pilotData.metrics.teamAdoption}%`} 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    }
                    change={8}
                    target={85}
                    progressColor="blue"
                  />
                  
                  <PilotMetricsCard 
                    title="Spaces Booked" 
                    value={pilotData.metrics.spacesBooked} 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    }
                    change={5}
                    target={40}
                    progressColor="green"
                  />
                  
                  <PilotMetricsCard 
                    title="Connections Made" 
                    value={pilotData.metrics.connectionsMade} 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    }
                    change={2}
                    target={15}
                    progressColor="purple"
                  />
                  
                  <div className="text-center mt-4">
                    <button className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-800 dark:hover:text-dark-primary-400 font-medium transition-colors duration-200">
                      View All Metrics
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Activity Feed */}
              <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
                <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
                  Recent Activity
                </h2>
                <PilotActivityFeed />
              </div>
              
              {/* Conversion Card */}
              <div>
                <PilotConversionCard pilotData={pilotData} />
              </div>
            </div>
            
            {/* Bottom Row - Milestones */}
            <div className="mt-6">
              <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                    Pilot Milestones
                  </h2>
                  <button className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-800 dark:hover:text-dark-primary-400 font-medium transition-colors duration-200">
                    Add Milestone
                  </button>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3">Upcoming Milestones</h3>
                  <div className="space-y-4">
                    {pilotData.nextMilestones.map((milestone, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full border-2 border-gray-300 dark:border-dark-bg flex items-center justify-center">
                            <span className="text-gray-500 dark:text-dark-text-secondary text-sm">{index + 1}</span>
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-dark-text-primary">{milestone.name}</p>
                              <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{milestone.date}</p>
                            </div>
                            <button className="text-xs text-primary-600 dark:text-dark-primary-500 hover:text-primary-800 dark:hover:text-dark-primary-400 font-medium transition-colors duration-200">
                              Complete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-bg">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3">Completed Milestones</h3>
                  <div className="space-y-4">
                    {pilotData.completedMilestones.map((milestone, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 border-2 border-green-400 dark:border-green-700 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-dark-text-primary">{milestone.name}</p>
                              <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Completed on {milestone.date}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Other tabs would have similar patterns for detailed metrics, team management, and settings */}
        {activeTab === 'metrics' && (
          <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
            <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
              Detailed Metrics
            </h2>
            <p className="text-gray-500 dark:text-dark-text-secondary">
              Detailed metrics content will go here, including usage analytics, user adoption rates, and success KPIs.
            </p>
          </div>
        )}
        
        {activeTab === 'team' && (
          <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                Pilot Team Management
              </h2>
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Add Team Member
              </button>
            </div>
            <PilotTeamMembers />
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
            <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
              Pilot Settings
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary">Pilot Information</h3>
                <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="pilot-name" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                      Pilot Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="pilot-name"
                        id="pilot-name"
                        className="shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 block w-full sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                        defaultValue={pilotData.pilotName}
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                      Company Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="company-name"
                        id="company-name"
                        className="shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 block w-full sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                        defaultValue={pilotData.companyName}
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                      Start Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="start-date"
                        id="start-date"
                        className="shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 block w-full sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                        defaultValue={pilotData.startDate}
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                      End Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="end-date"
                        id="end-date"
                        className="shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 block w-full sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                        defaultValue={pilotData.endDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-5 border-t border-gray-200 dark:border-dark-bg">
                <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary">Notification Preferences</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="milestone-notifications"
                        name="milestone-notifications"
                        type="checkbox"
                        className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 h-4 w-4 text-primary-600 dark:text-dark-primary-600 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="milestone-notifications" className="font-medium text-gray-700 dark:text-dark-text-secondary">
                        Milestone notifications
                      </label>
                      <p className="text-gray-500 dark:text-dark-text-muted">Receive notifications about upcoming and completed milestones.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="report-notifications"
                        name="report-notifications"
                        type="checkbox"
                        className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 h-4 w-4 text-primary-600 dark:text-dark-primary-600 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="report-notifications" className="font-medium text-gray-700 dark:text-dark-text-secondary">
                        Weekly report emails
                      </label>
                      <p className="text-gray-500 dark:text-dark-text-muted">Receive weekly progress reports by email.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="team-notifications"
                        name="team-notifications"
                        type="checkbox"
                        className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 h-4 w-4 text-primary-600 dark:text-dark-primary-600 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="team-notifications" className="font-medium text-gray-700 dark:text-dark-text-secondary">
                        Team activity alerts
                      </label>
                      <p className="text-gray-500 dark:text-dark-text-muted">Get notified about team member activity during the pilot.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-5 border-t border-gray-200 dark:border-dark-bg">
                <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary">Pilot Extension</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">
                  If you need more time to evaluate the platform, you can request an extension of your pilot period.
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-bg shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-bg-light hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
                  >
                    Request Extension
                  </button>
                </div>
              </div>
              
              <div className="pt-5 border-t border-gray-200 dark:border-dark-bg">
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
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PilotDashboardPage;