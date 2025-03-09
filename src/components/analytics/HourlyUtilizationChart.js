import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/**
 * Hourly Utilization Chart component for visualizing space usage throughout the day
 */
const HourlyUtilizationChart = ({ data }) => {
  // Find peak utilization hour
  const peakHour = data.reduce((max, item) => 
    item.utilization > max.utilization ? item : max, data[0]);
  
  // Find low utilization hour
  const lowHour = data.reduce((min, item) => 
    item.utilization < min.utilization ? item : min, data[0]);
  
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md p-4 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
          Space Utilization by Time of Day
        </h2>
        
        <div className="flex space-x-4">
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Peak Hour</p>
            <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{peakHour.displayHour} ({peakHour.utilization}%)</p>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Lowest Utilization</p>
            <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{lowHour.displayHour} ({lowHour.utilization}%)</p>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="displayHour" />
            <YAxis
              domain={[0, 100]}
              label={{ value: 'Utilization %', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
                color: '#1a202c'
              }}
              formatter={(value, name) => {
                if (name === 'utilization') return [`${value}%`, 'Total Utilization'];
                if (name === 'corporate') return [`${value}%`, 'Corporate Utilization'];
                if (name === 'startup') return [`${value}%`, 'Startup Utilization'];
                return [value, name];
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="utilization"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
              name="Total Utilization"
            />
            <Area
              type="monotone"
              dataKey="corporate"
              stackId="2"
              stroke="#0088FE"
              fill="#0088FE"
              name="Corporate Utilization"
            />
            <Area
              type="monotone"
              dataKey="startup"
              stackId="2"
              stroke="#00C49F"
              fill="#00C49F"
              name="Startup Utilization"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
        <p>The data shows clear utilization patterns with peak usage at {peakHour.displayHour} ({peakHour.utilization}%) and lowest usage at {lowHour.displayHour} ({lowHour.utilization}%). {peakHour.utilization > 85 ? 'Peak hours are approaching capacity limits.' : ''}</p>
        <p className="mt-1">Recommendation: {peakHour.utilization > 85 ? 'Consider offering incentives for bookings during off-peak hours to balance utilization.' : 'Maintain current scheduling approach as utilization remains well-balanced.'}</p>
      </div>
    </div>
  );
};

export default HourlyUtilizationChart;