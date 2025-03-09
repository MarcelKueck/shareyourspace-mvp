import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BookingTrends = ({ data, timeRange, showComparison }) => {
  // Generate comparison data (for demo purposes)
  const generateComparisonData = () => {
    return data.map(item => ({
      ...item,
      previousBookings: Math.max(Math.floor(item.bookings * 0.85), 0) // 15% lower than current period
    }));
  };

  const chartData = showComparison ? generateComparisonData() : data;

  // Format tooltip values
  const tooltipFormatter = (value, name) => {
    if (name === 'bookings') return [value, 'Current Period'];
    if (name === 'previousBookings') return [value, 'Previous Period'];
    return [value, name];
  };

  // Calculate booking statistics
  const calculateStats = () => {
    const total = data.reduce((acc, curr) => acc + curr.bookings, 0);
    const max = Math.max(...data.map(item => item.bookings));
    const min = Math.min(...data.map(item => item.bookings));
    const avg = total / data.length;

    return {
      total,
      max,
      min,
      avg: avg.toFixed(1)
    };
  };

  const stats = calculateStats();

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-3 transition-colors duration-200">
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Total Bookings</p>
          <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{stats.total}</p>
        </div>
        <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-3 transition-colors duration-200">
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Average</p>
          <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{stats.avg}</p>
        </div>
        <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-3 transition-colors duration-200">
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Maximum</p>
          <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{stats.max}</p>
        </div>
        <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-3 transition-colors duration-200">
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Minimum</p>
          <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{stats.min}</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="bookings" 
              name="Bookings" 
              stroke="#6366F1" 
              fill="#6366F180" 
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            {showComparison && (
              <Area 
                type="monotone" 
                dataKey="previousBookings" 
                name="Previous Period" 
                stroke="#94A3B8" 
                fill="#94A3B860" 
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors duration-200">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium transition-colors duration-200">Booking Pattern Insights:</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 transition-colors duration-200">
              Peak booking periods occur during Q2, with a seasonal decline during summer months. Consider implementing promotional rates during slower periods to maintain consistent occupancy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTrends;