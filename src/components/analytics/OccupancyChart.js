import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OccupancyChart = ({ data, timeRange, showComparison }) => {
  // Generate comparison data (for demo purposes, showing 5-10% lower values for previous period)
  const generateComparisonData = () => {
    return data.map(item => ({
      ...item,
      previousRate: Math.max(item.rate - 5 - Math.random() * 5, 0) // 5-10% lower, but never below 0
    }));
  };

  const chartData = showComparison ? generateComparisonData() : data;

  // Custom tooltip formatter
  const tooltipFormatter = (value, name) => {
    if (name === 'rate') return [`${value}%`, 'Current Period'];
    if (name === 'previousRate') return [`${value.toFixed(1)}%`, 'Previous Period'];
    return [value, name];
  };

  // Get appropriate time interval for X axis based on timeRange
  const getTickInterval = () => {
    switch (timeRange) {
      case 'week':
        return 1; // show every day
      case 'month':
        return 7; // show every week
      case 'quarter':
        return 4; // show every month
      case 'year':
        return 3; // show every quarter
      default:
        return 2; // show every other data point
    }
  };

  return (
    <div className="h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            tickFormatter={tick => `${tick}%`}
            domain={[0, 100]}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <Tooltip formatter={tooltipFormatter} />
          <Legend />
          <Line
            type="monotone"
            dataKey="rate"
            name="Occupancy Rate"
            stroke="#6366F1"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 4 }}
          />
          {showComparison && (
            <Line
              type="monotone"
              dataKey="previousRate"
              name="Previous Period"
              stroke="#94A3B8"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OccupancyChart;