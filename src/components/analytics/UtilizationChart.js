import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/**
 * Space Utilization Chart component for visualizing utilization metrics by location
 */
const UtilizationChart = ({ data }) => {
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md p-4 transition-colors duration-200">
      <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
        Space Utilization by Location
      </h2>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#8884d8"
              label={{ value: 'Utilization %', angle: -90, position: 'insideLeft' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#82ca9d"
              label={{ value: 'Capacity', angle: -90, position: 'insideRight' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
                color: '#1a202c'
              }}
              formatter={(value, name) => {
                if (name === 'capacity') return [value, 'Total Capacity'];
                if (name === 'averageUtilization') return [`${value}%`, 'Average Utilization'];
                if (name === 'peakUtilization') return [`${value}%`, 'Peak Utilization'];
                if (name === 'lowUtilization') return [`${value}%`, 'Low Utilization'];
                return [value, name];
              }}
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="averageUtilization"
              fill="#8884d8"
              name="Average Utilization"
              barSize={20}
            />
            <Bar
              yAxisId="left"
              dataKey="peakUtilization"
              fill="#4C1D95"
              name="Peak Utilization"
              barSize={20}
            />
            <Bar
              yAxisId="left"
              dataKey="lowUtilization"
              fill="#C4B5FD"
              name="Low Utilization"
              barSize={20}
            />
            <Bar
              yAxisId="right"
              dataKey="capacity"
              fill="#82ca9d"
              name="Total Capacity"
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
        <p>Analysis shows variation in utilization across locations, with {data.reduce((max, item) => item.averageUtilization > max.averageUtilization ? item : max, data[0]).location} having the highest average utilization at {data.reduce((max, item) => item.averageUtilization > max.averageUtilization ? item : max, data[0]).averageUtilization}%.</p>
      </div>
    </div>
  );
};

export default UtilizationChart;