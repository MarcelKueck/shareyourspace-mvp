import React from 'react';

/**
 * Comparative Metrics component for displaying period-over-period comparisons
 */
const ComparativeMetrics = ({ data }) => {
  // Calculate percentage changes
  const calculateChange = (current, previous) => {
    if (!previous) return null;
    return Math.round(((current - previous) / previous) * 100);
  };
  
  // Format numbers with proper separators
  const formatNumber = (num, isCurrency = false) => {
    if (isCurrency) {
      return `€${num.toLocaleString()}`;
    }
    return num.toLocaleString();
  };
  
  // Determine color based on change
  const getChangeColor = (change, isInverse = false) => {
    if (change === null) return 'text-gray-500 dark:text-dark-text-muted';
    if (isInverse) {
      return change > 0 
        ? 'text-red-600 dark:text-red-400' 
        : change < 0 
          ? 'text-green-600 dark:text-green-400' 
          : 'text-gray-500 dark:text-dark-text-muted';
    }
    return change > 0 
      ? 'text-green-600 dark:text-green-400' 
      : change < 0 
        ? 'text-red-600 dark:text-red-400' 
        : 'text-gray-500 dark:text-dark-text-muted';
  };
  
  const metrics = [
    { 
      name: 'Total Bookings', 
      current: data.currentPeriod.totalBookings,
      previous: data.previousPeriod.totalBookings,
      yoy: data.yearOverYear.totalBookings,
      format: false
    },
    { 
      name: 'Average Booking Value', 
      current: data.currentPeriod.averageBookingValue,
      previous: data.previousPeriod.averageBookingValue,
      yoy: data.yearOverYear.averageBookingValue,
      format: true
    },
    { 
      name: 'Total Revenue', 
      current: data.currentPeriod.totalRevenue,
      previous: data.previousPeriod.totalRevenue,
      yoy: data.yearOverYear.totalRevenue,
      format: true
    },
    { 
      name: 'Occupancy Rate', 
      current: data.currentPeriod.occupancyRate,
      previous: data.previousPeriod.occupancyRate,
      yoy: data.yearOverYear.occupancyRate,
      format: false,
      isPercentage: true
    },
    { 
      name: 'New Customers', 
      current: data.currentPeriod.newCustomers,
      previous: data.previousPeriod.newCustomers,
      yoy: data.yearOverYear.newCustomers,
      format: false
    },
    { 
      name: 'Repeat Booking Rate', 
      current: data.currentPeriod.repeatBookingRate,
      previous: data.previousPeriod.repeatBookingRate,
      yoy: data.yearOverYear.repeatBookingRate,
      format: false,
      isPercentage: true
    }
  ];
  
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md p-4 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
          Performance Metrics
        </h2>
        
        <div className="flex space-x-4">
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Current Period</p>
            <p className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Last 30 Days</p>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
          <thead className="bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Metric
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Current
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                vs Previous Period
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                vs Year Ago
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-bg-light divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
            {metrics.map((metric) => {
              const previousChange = calculateChange(metric.current, metric.previous);
              const yoyChange = calculateChange(metric.current, metric.yoy);
              
              return (
                <tr key={metric.name} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                    {metric.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                    {metric.format ? formatNumber(metric.current, true) : formatNumber(metric.current)}
                    {metric.isPercentage && '%'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium">
                      <span className={getChangeColor(previousChange)}>
                        {previousChange > 0 ? '+' : ''}{previousChange}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                      {metric.format ? formatNumber(metric.previous, true) : formatNumber(metric.previous)}
                      {metric.isPercentage && '%'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium">
                      <span className={getChangeColor(yoyChange)}>
                        {yoyChange > 0 ? '+' : ''}{yoyChange}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                      {metric.format ? formatNumber(metric.yoy, true) : formatNumber(metric.yoy)}
                      {metric.isPercentage && '%'}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
        <p>
          Overall performance shows 
          {calculateChange(data.currentPeriod.totalRevenue, data.previousPeriod.totalRevenue) > 10 
            ? ' strong growth ' 
            : calculateChange(data.currentPeriod.totalRevenue, data.previousPeriod.totalRevenue) > 0 
              ? ' moderate growth ' 
              : ' a decline '}
          compared to the previous period, with 
          {calculateChange(data.currentPeriod.occupancyRate, data.previousPeriod.occupancyRate) > 0 
            ? ' improving ' 
            : ' declining '}
          occupancy rates.
        </p>
      </div>
    </div>
  );
};

export default ComparativeMetrics;