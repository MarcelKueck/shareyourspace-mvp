import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/**
 * Forecast Chart component for visualizing historical data and future predictions
 */
const ForecastChart = ({ data }) => {
  // Find current month for highlighting
  const currentMonth = data.find(item => item.actual !== null && item.forecast !== null);
  
  // Calculate average actual value for historical data
  const historicalData = data.filter(item => item.isHistorical);
  const avgHistorical = Math.round(
    historicalData.reduce((sum, item) => sum + (item.actual || 0), 0) / 
    historicalData.filter(item => item.actual !== null).length
  );
  
  // Calculate average forecasted value for future data
  const futureData = data.filter(item => !item.isHistorical);
  const avgForecast = Math.round(
    futureData.reduce((sum, item) => sum + (item.forecast || 0), 0) / futureData.length
  );
  
  // Calculate growth percentage
  const growthPercentage = Math.round(
    ((avgForecast - avgHistorical) / avgHistorical) * 100
  );
  
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md p-4 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
          Booking Forecast
        </h2>
        
        <div className="flex space-x-4">
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Projected Growth</p>
            <p className={`text-lg font-medium ${growthPercentage >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} transition-colors duration-200`}>
              {growthPercentage >= 0 ? '+' : ''}{growthPercentage}%
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
                color: '#1a202c'
              }}
              formatter={(value, name) => [value, name === 'actual' ? 'Actual Bookings' : 
                                                name === 'forecast' ? 'Forecast Bookings' : 
                                                name === 'forecastLow' ? 'Forecast (Low)' : 
                                                name === 'forecastHigh' ? 'Forecast (High)' : name]}
            />
            <Legend />
            
            {/* Historical data */}
            <Bar 
              dataKey="actual" 
              barSize={20} 
              fill="#8884d8"
              name="Actual Bookings"
            />
            
            {/* Forecast line */}
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="#ff7300" 
              strokeWidth={2}
              name="Forecast Bookings"
            />
            
            {/* Forecast range */}
            <Area 
              type="monotone" 
              dataKey="forecastHigh" 
              stroke="transparent"
              fill="#82ca9d" 
              fillOpacity={0.2}
              name="Forecast (High)"
            />
            <Area 
              type="monotone" 
              dataKey="forecastLow" 
              stroke="transparent" 
              fill="#82ca9d" 
              fillOpacity={0.2}
              name="Forecast (Low)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
        <p>This forecast combines historical booking data with predictive modeling to project future bookings. The shaded area represents the confidence interval for our forecast.</p>
        <p className="mt-1">
          Our model predicts {growthPercentage >= 0 ? 'growth' : 'a decline'} of approximately {Math.abs(growthPercentage)}% in booking volume over the next 6 months
          {growthPercentage >= 10 ? ', suggesting we should prepare for increased capacity demands.' : 
            growthPercentage >= 0 ? ', indicating stable business conditions.' : 
            ', suggesting we should implement strategies to boost bookings.'}
        </p>
      </div>
    </div>
  );
};

export default ForecastChart;