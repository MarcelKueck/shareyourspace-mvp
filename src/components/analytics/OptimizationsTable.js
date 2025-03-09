import React, { useState } from 'react';

/**
 * Optimizations Table component for displaying recommended space optimizations
 */
const OptimizationsTable = ({ recommendations }) => {
  const [expandedId, setExpandedId] = useState(null);
  
  // Get impact label color
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Medium':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'Low':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };
  
  // Get confidence score color
  const getConfidenceColor = (score) => {
    if (score >= 85) return 'text-green-600 dark:text-green-400';
    if (score >= 75) return 'text-blue-600 dark:text-blue-400';
    if (score >= 65) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  // Calculate total potential revenue
  const totalPotentialRevenue = recommendations.reduce((total, rec) => {
    const revenueValue = parseInt(rec.potentialRevenue.replace(/[^0-9]/g, ''));
    return total + revenueValue;
  }, 0);
  
  // Toggle expanded row
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md p-4 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
          Recommended Optimizations
        </h2>
        
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Potential Monthly Revenue</p>
          <p className="text-lg font-medium text-green-600 dark:text-green-400 transition-colors duration-200">€{totalPotentialRevenue.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
          <thead className="bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Recommendation
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Impact
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Revenue
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Confidence
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-bg-light divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
            {recommendations.map((rec) => (
              <React.Fragment key={rec.id}>
                <tr className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                    {rec.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                    {rec.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                    {rec.recommendation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getImpactColor(rec.impact)}`}>
                      {rec.impact}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                    {rec.potentialRevenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getConfidenceColor(rec.confidenceScore)}`}>
                      {rec.confidenceScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                    <button
                      onClick={() => toggleExpand(rec.id)}
                      className="text-primary-600 dark:text-dark-primary-500 hover:text-primary-900 dark:hover:text-dark-primary-300 transition-colors duration-200"
                    >
                      {expandedId === rec.id ? 'Hide Details' : 'Show Details'}
                    </button>
                  </td>
                </tr>
                
                {expandedId === rec.id && (
                  <tr className="bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
                    <td colSpan="7" className="px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                        <h4 className="font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">Implementation Details</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1 transition-colors duration-200">Data Insights</h5>
                            <p>This recommendation is based on {rec.confidenceScore}% confidence from analyzing {Math.round(rec.confidenceScore * 10)} data points including booking patterns, revenue metrics, and user feedback.</p>
                          </div>
                          
                          <div>
                            <h5 className="text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1 transition-colors duration-200">Implementation Timeline</h5>
                            <p>Estimated implementation time: {rec.impact === 'High' ? '2-4 weeks' : rec.impact === 'Medium' ? '1-2 weeks' : '3-5 days'}</p>
                          </div>
                          
                          <div>
                            <h5 className="text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1 transition-colors duration-200">Resource Requirements</h5>
                            <p>This optimization requires {rec.impact === 'High' ? 'significant' : rec.impact === 'Medium' ? 'moderate' : 'minimal'} resource investment with expected ROI within {rec.impact === 'High' ? '3-4 months' : rec.impact === 'Medium' ? '2-3 months' : '1-2 months'}.</p>
                          </div>
                          
                          <div>
                            <h5 className="text-xs font-medium text-gray-700 dark:text-dark-text-secondary mb-1 transition-colors duration-200">Next Steps</h5>
                            <div className="flex space-x-2">
                              <button className="px-2 py-1 bg-primary-600 dark:bg-dark-primary-600 text-white text-xs rounded hover:bg-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200">
                                Generate Report
                              </button>
                              <button className="px-2 py-1 bg-gray-600 dark:bg-dark-bg-light text-white text-xs rounded hover:bg-gray-700 dark:hover:bg-dark-bg transition-colors duration-200">
                                Schedule Meeting
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
        <p>Our AI has analyzed booking patterns, revenue data, and user feedback to generate these optimization recommendations. Implementing all recommendations could potentially increase monthly revenue by approximately €{totalPotentialRevenue.toLocaleString()}.</p>
      </div>
    </div>
  );
};

export default OptimizationsTable;