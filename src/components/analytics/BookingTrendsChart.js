import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

/**
 * Booking Trends Chart component for visualizing monthly booking data
 */
const BookingTrendsChart = ({ data }) => {
  // Calculate average bookings to display reference line
  const avgBookings = Math.round(
    data.reduce((sum, item) => sum + item.total, 0) / data.length
  );
  
  // Calculate total revenue
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  
  // Calculate growth: compare last month to first month
  const growth = Math.round(
    ((data[data.length - 1].total - data[0].total) / data[0].total) * 100
  );
  
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md p-4 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
          Monthly Booking Trends
        </h2>
        
        <div className="flex space-x-4">
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Total Revenue</p>
            <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">€{totalRevenue.toLocaleString()}</p>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">12-Month Growth</p>
            <p className={`text-lg font-medium ${growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} transition-colors duration-200`}>
              {growth >= 0 ? '+' : ''}{growth}%
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
                color: '#1a202c'
              }}
              formatter={(value, name) => {
                if (name === 'revenue') return [`€${value}`, 'Revenue'];
                return [value, name];
              }}
            />
            <Legend />
            <ReferenceLine
              y={avgBookings}
              yAxisId="left"
              label="Average"
              stroke="#ff7300"
              strokeDasharray="3 3"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="total"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Total Bookings"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="corporate"
              stroke="#0088FE"
              name="Corporate Bookings"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="startup"
              stroke="#00C49F"
              name="Startup Bookings"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#FFBB28"
              name="Revenue (€)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
        <p>Bookings show an overall {growth >= 0 ? 'upward' : 'downward'} trend with {growth}% change over the last 12 months. {data.slice(-3).every(month => month.total > avgBookings) ? 'Recent months have been above average.' : ''}</p>
      </div>
    </div>
  );
};

export default BookingTrendsChart;