import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

/**
 * Booking Duration Chart component for visualizing duration distribution
 */
const BookingDurationChart = ({ data }) => {
  // Define colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];
  
  // Calculate total bookings
  const totalBookings = data.reduce((total, item) => total + item.count, 0);
  
  // Find most popular duration
  const mostPopular = data.reduce((max, item) => 
    item.count > max.count ? item : max, data[0]);
  
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md p-4 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
          Booking Duration Distribution
        </h2>
        
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Total Bookings</p>
          <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{totalBookings.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="duration"
                label={({duration, percentage}) => `${duration}: ${percentage}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [`${value} (${props.payload.percentage}%)`, name]}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '0.375rem',
                  border: '1px solid #e2e8f0',
                  color: '#1a202c'
                }}
              />
              <Legend 
                formatter={(value, entry, index) => (
                  <span style={{ color: entry.color }}>
                    {value} ({data[index].percentage}%)
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-col justify-center">
          <h3 className="text-md font-medium text-gray-800 dark:text-dark-text-primary mb-2 transition-colors duration-200">
            Duration Insights
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
                Most Popular Duration
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                {mostPopular.duration} ({mostPopular.percentage}%)
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
                Short-term Bookings (≤ Full Day)
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                {data.filter(d => ['Hourly', 'Half Day', 'Full Day'].includes(d.duration))
                  .reduce((sum, item) => sum + item.percentage, 0)}%
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
                Long-term Bookings (≥ Weekly)
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                {data.filter(d => ['Weekly', 'Monthly', 'Quarterly'].includes(d.duration))
                  .reduce((sum, item) => sum + item.percentage, 0)}%
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
        <p>Analysis shows a preference for {mostPopular.duration} bookings, which account for {mostPopular.percentage}% of all bookings. {data.find(d => d.duration === 'Monthly')?.percentage > 15 ? 'Monthly bookings represent a significant portion, indicating strong demand for medium-term arrangements.' : ''}</p>
      </div>
    </div>
  );
};

export default BookingDurationChart;