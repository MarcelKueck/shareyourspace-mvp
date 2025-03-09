import React from 'react';

/**
 * Predicted Peaks component for displaying AI-predicted peak utilization times
 */
const PredictedPeaks = ({ predictions }) => {
  // Get highest confidence prediction
  const highestConfidence = predictions.reduce((highest, day) => {
    const dayHighest = day.peaks.reduce((p1, p2) => p1.confidence > p2.confidence ? p1 : p2);
    return dayHighest.confidence > highest.confidence ? { ...dayHighest, day: day.day } : highest;
  }, { confidence: 0 });
  
  // Get highest utilization prediction
  const highestUtilization = predictions.reduce((highest, day) => {
    const dayHighest = day.peaks.reduce((p1, p2) => p1.utilization > p2.utilization ? p1 : p2);
    return dayHighest.utilization > highest.utilization ? { ...dayHighest, day: day.day } : highest;
  }, { utilization: 0 });
  
  // Get confidence class based on confidence value
  const getConfidenceClass = (confidence) => {
    if (confidence >= 90) return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
    if (confidence >= 80) return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
    if (confidence >= 70) return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
    return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
  };
  
  // Get utilization class based on utilization value
  const getUtilizationClass = (utilization) => {
    if (utilization >= 90) return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
    if (utilization >= 80) return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
    if (utilization >= 70) return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
    return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
  };
  
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md p-4 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
          AI-Predicted Peak Times
        </h2>
        
        <div className="flex space-x-4">
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Highest Predicted Utilization</p>
            <p className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
              {highestUtilization.day}, {highestUtilization.time} ({highestUtilization.utilization}%)
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {predictions.map((day) => (
          <div key={day.day} className="border border-gray-200 dark:border-dark-bg rounded-lg p-3 transition-colors duration-200">
            <h3 className="text-md font-medium text-gray-800 dark:text-dark-text-primary mb-2 transition-colors duration-200">
              {day.day}
            </h3>
            
            <div className="space-y-3">
              {day.peaks.map((peak, index) => (
                <div key={index} className="bg-gray-50 dark:bg-dark-bg rounded-md p-2 transition-colors duration-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                      {peak.time}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getUtilizationClass(peak.utilization)}`}>
                      {peak.utilization}%
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 dark:text-dark-text-secondary mr-2 transition-colors duration-200">
                      Confidence:
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getConfidenceClass(peak.confidence)}`}>
                      {peak.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
        <p>Our AI predicts peak utilization times based on historical booking patterns and seasonality factors.</p>
        <p className="mt-1">Recommendation: {
          highestUtilization.utilization > 90 
            ? `Consider adding additional capacity during ${highestUtilization.day} ${highestUtilization.time} as utilization is predicted to reach ${highestUtilization.utilization}%.` 
            : `Prepare staff for busy periods on ${highestUtilization.day} at ${highestUtilization.time}.`
        }</p>
      </div>
    </div>
  );
};

export default PredictedPeaks;