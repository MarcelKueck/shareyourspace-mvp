import React from 'react';

/**
 * User Retention Heatmap component for visualizing cohort analysis data
 */
const RetentionHeatmap = ({ data }) => {
  // Get all month keys (month0, month1, etc.)
  const monthKeys = Object.keys(data[0])
    .filter(key => key.startsWith('month'))
    .sort((a, b) => parseInt(a.slice(5)) - parseInt(b.slice(5)));
  
  // Function to get color based on retention value
  const getColor = (value) => {
    // Scale from light blue to dark blue based on retention percentage
    const intensity = Math.floor((value / 100) * 255);
    return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
  };
  
  // Calculate average retention for each month
  const averageRetention = monthKeys.map(month => {
    const values = data
      .filter(row => row[month] !== undefined)
      .map(row => row[month]);
    
    return {
      month: parseInt(month.slice(5)),
      average: values.length > 0
        ? Math.round(values.reduce((sum, val) => sum + val, 0) / values.length)
        : null
    };
  });
  
  // Calculate the overall average retention rate (across all cohorts and months)
  const overallAverage = Math.round(
    averageRetention
      .filter(m => m.month > 0 && m.average !== null)
      .reduce((sum, m) => sum + m.average, 0) / 
    averageRetention.filter(m => m.month > 0 && m.average !== null).length
  );
  
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md p-4 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
          User Retention by Cohort
        </h2>
        
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Average Retention Rate</p>
          <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{overallAverage}%</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border text-left bg-gray-50 dark:bg-dark-bg transition-colors duration-200">Cohort</th>
              <th className="p-2 border text-left bg-gray-50 dark:bg-dark-bg transition-colors duration-200">Users</th>
              {monthKeys.map((month) => (
                <th key={month} className="p-2 border text-center bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
                  Month {month.slice(5)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.cohort}>
                <td className="p-2 border font-medium dark:text-dark-text-primary transition-colors duration-200">{row.cohort}</td>
                <td className="p-2 border text-right dark:text-dark-text-primary transition-colors duration-200">{row.totalUsers.toLocaleString()}</td>
                {monthKeys.map((month) => (
                  <td
                    key={month}
                    className="p-2 border text-center"
                    style={{
                      backgroundColor: row[month] !== undefined ? getColor(row[month]) : 'transparent',
                      color: row[month] > 50 ? 'white' : 'black'
                    }}
                  >
                    {row[month] !== undefined ? `${row[month].toFixed(1)}%` : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text-primary transition-colors duration-200">
              <td colSpan="2" className="p-2 border font-medium">Average Retention</td>
              {averageRetention.map((item) => (
                <td
                  key={`avg-month-${item.month}`}
                  className="p-2 border text-center font-medium"
                >
                  {item.average !== null ? `${item.average}%` : '-'}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
        <p>The heatmap shows user retention rates by cohort over time. Darker blue indicates higher retention.</p>
        <p className="mt-1">Observations: {
          averageRetention[1]?.average && averageRetention[2]?.average ? 
          `Month 1 to Month 2 drop-off is ${averageRetention[1].average - averageRetention[2].average}%, which is ${averageRetention[1].average - averageRetention[2].average < 10 ? 'lower than industry average' : 'higher than desired'}.` : 
          'Retention shows typical declining pattern over time.'
        }</p>
      </div>
    </div>
  );
};

export default RetentionHeatmap;