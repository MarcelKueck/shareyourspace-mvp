import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueMetrics = ({ data, timeRange, showComparison }) => {
  // Generate comparison data (for demo purposes)
  const generateComparisonData = () => {
    return data.map(item => ({
      ...item,
      previousRevenue: Math.max(item.revenue * 0.9, 0) // 10% lower than current period
    }));
  };

  const chartData = showComparison ? generateComparisonData() : data;

  // Format tooltip values
  const tooltipFormatter = (value, name) => {
    if (name === 'revenue') return [`€${value.toLocaleString()}`, 'Current Period'];
    if (name === 'previousRevenue') return [`€${value.toLocaleString()}`, 'Previous Period'];
    return [value, name];
  };

  // Get appropriate time interval for X axis based on timeRange
  const getTickInterval = () => {
    switch (timeRange) {
      case 'week':
        return 0; // show every data point
      case 'month':
        return 6; // show every week
      case 'quarter':
        return 2; // show every month
      case 'year':
        return 1; // show every quarter
      default:
        return 1; // show every other data point
    }
  };

  // Calculate average revenue trend
  const calculateAverage = () => {
    const sum = data.reduce((acc, curr) => acc + curr.revenue, 0);
    return sum / data.length;
  };

  // Calculate year-to-date revenue
  const calculateYTD = () => {
    return data.reduce((acc, curr) => acc + curr.revenue, 0);
  };

  const average = calculateAverage();
  const ytd = calculateYTD();

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-3 transition-colors duration-200">
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Average Revenue</p>
          <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">€{average.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-3 transition-colors duration-200">
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Year to Date</p>
          <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">€{ytd.toLocaleString()}</p>
        </div>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              interval={getTickInterval()} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={tick => `€${tick}`}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
            <Bar 
              dataKey="revenue" 
              name="Revenue" 
              fill="#6366F1" 
              radius={[4, 4, 0, 0]} 
            />
            {showComparison && (
              <Bar 
                dataKey="previousRevenue" 
                name="Previous Period" 
                fill="#94A3B8" 
                radius={[4, 4, 0, 0]} 
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueMetrics;