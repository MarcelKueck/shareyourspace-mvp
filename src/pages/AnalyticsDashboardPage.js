import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles/darkMode';
import OccupancyChart from '../components/analytics/OccupancyChart';
import RevenueMetrics from '../components/analytics/RevenueMetrics';
import BookingTrends from '../components/analytics/BookingTrends';
import UserActivityCard from '../components/analytics/UserActivityCard';
import SpacePerformanceTable from '../components/analytics/SpacePerformanceTable';
import MetricCard from '../components/analytics/MetricCard';

// Sample mock data - would come from API in real implementation
const mockAnalyticsData = {
  totalBookings: 347,
  totalRevenue: 28750,
  averageBookingValue: 82.85,
  occupancyRate: 72,
  topPerformingSpaces: [
    { id: 1, name: "BMW Innovation Hub", bookings: 48, revenue: 1680, occupancyRate: 86 },
    { id: 3, name: "Allianz Digital Workspace", bookings: 42, revenue: 2100, occupancyRate: 84 },
    { id: 5, name: "Enterprise Innovation Center", bookings: 38, revenue: 1520, occupancyRate: 76 },
    { id: 2, name: "Siemens Future Lab", bookings: 35, revenue: 1575, occupancyRate: 70 },
    { id: 6, name: "MunichTech Campus", bookings: 34, revenue: 1020, occupancyRate: 68 }
  ],
  occupancyTrend: [
    { month: 'Jan', rate: 65 },
    { month: 'Feb', rate: 68 },
    { month: 'Mar', rate: 72 },
    { month: 'Apr', rate: 75 },
    { month: 'May', rate: 79 },
    { month: 'Jun', rate: 82 },
    { month: 'Jul', rate: 78 },
    { month: 'Aug', rate: 76 },
    { month: 'Sep', rate: 74 },
    { month: 'Oct', rate: 71 },
    { month: 'Nov', rate: 73 },
    { month: 'Dec', rate: 69 }
  ],
  revenueTrend: [
    { month: 'Jan', revenue: 2150 },
    { month: 'Feb', revenue: 2320 },
    { month: 'Mar', revenue: 2450 },
    { month: 'Apr', revenue: 2600 },
    { month: 'May', revenue: 2780 },
    { month: 'Jun', revenue: 2850 },
    { month: 'Jul', revenue: 2700 },
    { month: 'Aug', revenue: 2650 },
    { month: 'Sep', revenue: 2550 },
    { month: 'Oct', revenue: 2420 },
    { month: 'Nov', revenue: 2480 },
    { month: 'Dec', revenue: 2300 }
  ],
  bookingTrend: [
    { month: 'Jan', bookings: 28 },
    { month: 'Feb', bookings: 30 },
    { month: 'Mar', bookings: 32 },
    { month: 'Apr', bookings: 34 },
    { month: 'May', bookings: 36 },
    { month: 'Jun', bookings: 38 },
    { month: 'Jul', bookings: 34 },
    { month: 'Aug', bookings: 32 },
    { month: 'Sep', bookings: 30 },
    { month: 'Oct', bookings: 28 },
    { month: 'Nov', bookings: 29 },
    { month: 'Dec', bookings: 27 }
  ],
  recentActivity: [
    { id: 1, type: 'booking', user: 'John Doe', space: 'BMW Innovation Hub', date: '2025-03-07', action: 'New Booking' },
    { id: 2, type: 'cancellation', user: 'Anna Weber', space: 'Siemens Future Lab', date: '2025-03-06', action: 'Cancellation' },
    { id: 3, type: 'booking', user: 'Michael Wagner', space: 'Allianz Digital Workspace', date: '2025-03-05', action: 'New Booking' },
    { id: 4, type: 'extension', user: 'Sophie Müller', space: 'Enterprise Innovation Center', date: '2025-03-04', action: 'Booking Extension' },
    { id: 5, type: 'booking', user: 'Thomas Becker', space: 'MunichTech Campus', date: '2025-03-03', action: 'New Booking' }
  ]
};

const AnalyticsDashboardPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [comparisonEnabled, setComparisonEnabled] = useState(false);
  const [focusSpace, setFocusSpace] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  // Simulate API data loading
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalyticsData(mockAnalyticsData);
      setIsLoading(false);
    };

    fetchData();
  }, [timeRange, focusSpace]);

  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  // Handle space focus change
  const handleSpaceFocusChange = (e) => {
    setFocusSpace(e.target.value);
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
                  Analytics
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary sm:text-3xl transition-colors duration-200">
              Analytics Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
              Insights and performance metrics for your workspace network
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
            <select
              value={focusSpace}
              onChange={handleSpaceFocusChange}
              className="px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 text-sm dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
            >
              <option value="all">All Spaces</option>
              <option value="1">BMW Innovation Hub</option>
              <option value="2">Siemens Future Lab</option>
              <option value="3">Allianz Digital Workspace</option>
              <option value="4">TechLab Munich</option>
              <option value="5">Enterprise Innovation Center</option>
              <option value="6">MunichTech Campus</option>
            </select>
            <div className="inline-flex rounded-md shadow">
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Time Period Selection */}
        <div className="mb-6 bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-4 transition-colors duration-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex space-x-2 mb-3 sm:mb-0">
              <button
                onClick={() => handleTimeRangeChange('week')}
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  timeRange === 'week'
                    ? 'bg-primary-100 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400'
                    : 'bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg'
                } transition-colors duration-200`}
              >
                Week
              </button>
              <button
                onClick={() => handleTimeRangeChange('month')}
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  timeRange === 'month'
                    ? 'bg-primary-100 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400'
                    : 'bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg'
                } transition-colors duration-200`}
              >
                Month
              </button>
              <button
                onClick={() => handleTimeRangeChange('quarter')}
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  timeRange === 'quarter'
                    ? 'bg-primary-100 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400'
                    : 'bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg'
                } transition-colors duration-200`}
              >
                Quarter
              </button>
              <button
                onClick={() => handleTimeRangeChange('year')}
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  timeRange === 'year'
                    ? 'bg-primary-100 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400'
                    : 'bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg'
                } transition-colors duration-200`}
              >
                Year
              </button>
            </div>
            <div className="flex items-center">
              <label htmlFor="comparison-toggle" className="mr-2 text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                Compare to previous period
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="comparison-toggle"
                  id="comparison-toggle"
                  checked={comparisonEnabled}
                  onChange={() => setComparisonEnabled(!comparisonEnabled)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white dark:bg-dark-text-primary border-4 border-gray-300 dark:border-dark-bg appearance-none cursor-pointer"
                />
                <label
                  htmlFor="comparison-toggle"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-dark-bg cursor-pointer"
                ></label>
              </div>
            </div>
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
                activeTab === 'bookings'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('bookings')}
            >
              Bookings
            </button>
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'revenue'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('revenue')}
            >
              Revenue
            </button>
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'spaces'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('spaces')}
            >
              Spaces
            </button>
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'users'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 dark:border-dark-primary-500"></div>
          </div>
        ) : (
          <>
            {/* Dashboard Content - Overview Tab */}
            {activeTab === 'overview' && analyticsData && (
              <div>
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <MetricCard 
                    title="Total Bookings" 
                    value={analyticsData.totalBookings} 
                    trend={5.2} 
                    trendDirection="up" 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    }
                  />
                  <MetricCard 
                    title="Total Revenue" 
                    value={`€${analyticsData.totalRevenue}`} 
                    trend={7.8} 
                    trendDirection="up" 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />
                  <MetricCard 
                    title="Avg. Booking Value" 
                    value={`€${analyticsData.averageBookingValue}`} 
                    trend={2.3} 
                    trendDirection="up" 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    }
                  />
                  <MetricCard 
                    title="Occupancy Rate" 
                    value={`${analyticsData.occupancyRate}%`} 
                    trend={3.1} 
                    trendDirection="down" 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    }
                  />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
                      Occupancy Trends
                    </h2>
                    <OccupancyChart 
                      data={analyticsData.occupancyTrend} 
                      timeRange={timeRange} 
                      showComparison={comparisonEnabled} 
                    />
                  </div>

                  <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
                      Revenue Metrics
                    </h2>
                    <RevenueMetrics 
                      data={analyticsData.revenueTrend}
                      timeRange={timeRange}
                      showComparison={comparisonEnabled}
                    />
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                        Top Performing Spaces
                      </h2>
                      <Link 
                        to="/analytics/spaces" 
                        className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 transition-colors duration-200"
                      >
                        View All
                      </Link>
                    </div>
                    <SpacePerformanceTable spaces={analyticsData.topPerformingSpaces} />
                  </div>

                  <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                        Recent Activity
                      </h2>
                      <Link 
                        to="/analytics/activity" 
                        className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 transition-colors duration-200"
                      >
                        View All
                      </Link>
                    </div>
                    <UserActivityCard activities={analyticsData.recentActivity} />
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && analyticsData && (
              <div>
                <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200 mb-8">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
                    Booking Trends
                  </h2>
                  <BookingTrends 
                    data={analyticsData.bookingTrend}
                    timeRange={timeRange}
                    showComparison={comparisonEnabled}
                  />
                </div>
                
                {/* Additional booking specific metrics would go here */}
                <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 mb-8 transition-colors duration-200">
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-200">
                    Booking Insights
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-4 transition-colors duration-200">
                    Detailed booking analytics are available in the full version. Upgrade to access advanced insights like booking patterns, cancellation rates, and customer segmentation analysis.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200">
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            )}

            {/* Other tabs would be implemented with similar patterns */}
            {activeTab === 'revenue' && (
              <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
                <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
                  Revenue Analytics
                </h2>
                <p className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                  Detailed revenue analytics content would go here.
                </p>
              </div>
            )}

            {activeTab === 'spaces' && (
              <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
                <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
                  Space Performance
                </h2>
                <p className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                  Detailed space performance analytics content would go here.
                </p>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-sm p-6 transition-colors duration-200">
                <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
                  User Engagement
                </h2>
                <p className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                  Detailed user engagement analytics content would go here.
                </p>
              </div>
            )}
          </>
        )}

        {/* Custom Intelligence Feature Promotion */}
        <div className="mt-8 bg-gradient-to-r from-primary-600 to-blue-600 dark:from-dark-primary-700 dark:to-blue-800 rounded-lg shadow-lg p-6 text-white transition-duration-200">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:flex-1">
              <h2 className="text-xl font-bold mb-2">Custom Intelligence Reports</h2>
              <p className="mb-4 text-blue-100 dark:text-blue-200">
                Need deeper insights? Get custom analytics reports tailored to your specific business questions.
              </p>
              <ul className="list-disc list-inside text-sm text-blue-100 dark:text-blue-200 mb-4">
                <li>Advanced space utilization analysis</li>
                <li>Custom booking pattern reports</li>
                <li>Revenue optimization recommendations</li>
                <li>Competitive benchmark analysis</li>
              </ul>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="px-4 py-2 bg-white text-primary-600 dark:text-dark-primary-600 rounded-md font-medium hover:bg-blue-50 transition-colors duration-200">
                Request Custom Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboardPage;