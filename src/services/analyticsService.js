/**
 * Analytics Service
 * 
 * Provides data for analytics dashboard and visualizations.
 * Currently uses mock data. Will be replaced with API calls in production.
 */

import { spaces } from '../data/spaces';

// Get monthly booking data for the past 12 months
export const getMonthlyBookings = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  // Current month and past 11 months
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  
  // Generate last 12 months in chronological order
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const monthIndex = (currentMonth - 11 + i) % 12;
    return months[monthIndex < 0 ? monthIndex + 12 : monthIndex];
  });
  
  // Generate mock data for each month
  return last12Months.map((month, index) => {
    // Gradually increase trend with seasonal pattern and some randomness
    const baseValue = 75 + (index * 8); // Upward trend
    const seasonalFactor = Math.sin((index / 11) * Math.PI * 2) * 15; // Seasonal pattern
    const randomFactor = Math.random() * 20 - 10; // Random noise
    
    const totalBookings = Math.round(baseValue + seasonalFactor + randomFactor);
    const corporateBookings = Math.round(totalBookings * (0.4 + Math.random() * 0.2));
    const startupBookings = totalBookings - corporateBookings;
    
    return {
      month,
      total: totalBookings,
      corporate: corporateBookings,
      startup: startupBookings,
      revenue: Math.round(totalBookings * (35 + Math.random() * 15))
    };
  });
};

// Get space utilization data by location
export const getSpaceUtilizationByLocation = () => {
  const locations = [...new Set(spaces.map(space => space.location))];
  
  return locations.map(location => {
    const spacesInLocation = spaces.filter(space => space.location === location);
    const totalCapacity = spacesInLocation.reduce((sum, space) => sum + space.capacity, 0);
    
    // Calculate mock utilization metrics
    const averageUtilization = 45 + Math.random() * 40; // 45-85% utilization
    const peakUtilization = Math.min(95, averageUtilization + 10 + Math.random() * 15); // Peak is higher
    const lowUtilization = Math.max(20, averageUtilization - 15 - Math.random() * 15); // Low is lower
    
    return {
      location,
      spaces: spacesInLocation.length,
      capacity: totalCapacity,
      averageUtilization: Math.round(averageUtilization),
      peakUtilization: Math.round(peakUtilization),
      lowUtilization: Math.round(lowUtilization)
    };
  });
};

// Get booking duration distribution
export const getBookingDurationDistribution = () => {
  return [
    { duration: 'Hourly', count: 124, percentage: 8 },
    { duration: 'Half Day', count: 245, percentage: 16 },
    { duration: 'Full Day', count: 312, percentage: 21 },
    { duration: '2-3 Days', count: 189, percentage: 13 },
    { duration: 'Weekly', count: 223, percentage: 15 },
    { duration: 'Monthly', count: 278, percentage: 19 },
    { duration: 'Quarterly', count: 118, percentage: 8 }
  ];
};

// Get space utilization by time of day (hourly breakdown)
export const getHourlyUtilization = () => {
  // Business hours from 6AM to 10PM
  const hours = Array.from({ length: 17 }, (_, i) => ({
    hour: `${i + 6}:00`,
    displayHour: i + 6 > 12 ? `${i + 6 - 12}PM` : i + 6 === 12 ? '12PM' : `${i + 6}AM`,
  }));
  
  return hours.map(({ hour, displayHour }) => {
    // Create utilization pattern: low in early morning, peaks mid-morning and afternoon
    let baseUtilization;
    const hourNum = parseInt(hour.split(':')[0]);
    
    if (hourNum < 8) baseUtilization = 20 + hourNum * 5; // Early morning ramp up
    else if (hourNum < 12) baseUtilization = 60 + (hourNum - 8) * 10; // Morning peak
    else if (hourNum < 14) baseUtilization = 80 - (hourNum - 12) * 5; // Lunch dip
    else if (hourNum < 18) baseUtilization = 70 + (hourNum - 14) * 5; // Afternoon 
    else baseUtilization = 90 - (hourNum - 18) * 15; // Evening decline
    
    // Add some randomness
    const randomFactor = Math.random() * 10 - 5;
    const utilization = Math.max(0, Math.min(100, Math.round(baseUtilization + randomFactor)));
    
    return {
      hour,
      displayHour,
      utilization,
      corporate: Math.round(utilization * (0.4 + Math.random() * 0.2)),
      startup: Math.round(utilization * (0.3 + Math.random() * 0.2))
    };
  });
};

// Get booking type breakdown
export const getBookingTypeBreakdown = () => {
  return [
    { type: 'Meeting Room', value: 35 },
    { type: 'Desk Space', value: 25 },
    { type: 'Project Room', value: 20 },
    { type: 'Event Space', value: 10 },
    { type: 'Workshop Area', value: 10 }
  ];
};

// Get popular amenities data
export const getPopularAmenities = () => {
  return [
    { name: 'High-speed internet', count: 876, percentage: 94 },
    { name: 'Meeting rooms', count: 812, percentage: 87 },
    { name: 'Coffee bar', count: 756, percentage: 81 },
    { name: '24/7 access', count: 689, percentage: 74 },
    { name: 'Presentation equipment', count: 645, percentage: 69 },
    { name: 'Smart office tech', count: 589, percentage: 63 },
    { name: 'Workshop area', count: 502, percentage: 54 },
    { name: 'Catering options', count: 467, percentage: 50 },
    { name: 'Parking', count: 423, percentage: 45 },
    { name: 'Bike storage', count: 354, percentage: 38 }
  ];
};

// Get user retention data (cohort analysis)
export const getUserRetentionData = () => {
  const cohorts = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  
  return cohorts.map((cohort, index) => {
    // The newer the cohort, the fewer months we have data for
    const monthsActive = 12 - index;
    
    // Create retention data with typical drop-off pattern
    const retentionData = {
      cohort,
      month0: 100, // Initial month is always 100%
      totalUsers: Math.round(100 + Math.random() * 150)
    };
    
    // Generate retention for subsequent months with realistic decay pattern
    for (let i = 1; i <= monthsActive; i++) {
      // More recent months have less drop-off
      const baseRetention = 90 - (i * 5); // Starts at 85% for month 1, then drops by ~5% each month
      const randomVariation = Math.random() * 6 - 3; // +/- 3% random variation
      
      retentionData[`month${i}`] = Math.max(Math.round(baseRetention + randomVariation), 30);
    }
    
    return retentionData;
  });
};

// Get predicted peak times
export const getPredictedPeakTimes = () => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const predictions = [];
  
  weekdays.forEach(day => {
    // Morning peak (9-11 AM)
    const morningPeakStart = 9 + Math.floor(Math.random() * 2);
    const morningPeakEnd = morningPeakStart + 1 + Math.floor(Math.random());
    
    // Afternoon peak (2-4 PM)
    const afternoonPeakStart = 14 + Math.floor(Math.random() * 2);
    const afternoonPeakEnd = afternoonPeakStart + 1 + Math.floor(Math.random());
    
    predictions.push({
      day,
      peaks: [
        {
          time: `${morningPeakStart}:00-${morningPeakEnd}:00`, 
          utilization: 75 + Math.floor(Math.random() * 20),
          confidence: 80 + Math.floor(Math.random() * 15)
        },
        {
          time: `${afternoonPeakStart}:00-${afternoonPeakEnd}:00`, 
          utilization: 70 + Math.floor(Math.random() * 25),
          confidence: 75 + Math.floor(Math.random() * 20)
        }
      ]
    });
  });
  
  return predictions;
};

// Get recommended optimizations
export const getRecommendedOptimizations = () => {
  return [
    {
      id: 1,
      location: 'Schwabing',
      type: 'Capacity Adjustment',
      recommendation: 'Increase meeting room capacity by 15%',
      impact: 'High',
      potentialRevenue: '€4,200/month',
      confidenceScore: 87
    },
    {
      id: 2,
      location: 'Maxvorstadt',
      type: 'Pricing Optimization',
      recommendation: 'Increase weekday afternoon pricing by 8%',
      impact: 'Medium',
      potentialRevenue: '€2,800/month',
      confidenceScore: 82
    },
    {
      id: 3,
      location: 'All Locations',
      type: 'Amenity Addition',
      recommendation: 'Add premium catering options to enterprise packages',
      impact: 'Medium',
      potentialRevenue: '€5,100/month',
      confidenceScore: 76
    },
    {
      id: 4,
      location: 'Bogenhausen',
      type: 'Space Reconfiguration',
      recommendation: 'Convert 30% of open desk space to project rooms',
      impact: 'High',
      potentialRevenue: '€6,500/month',
      confidenceScore: 81
    },
    {
      id: 5,
      location: 'Schwabing',
      type: 'Operating Hours',
      recommendation: 'Extend operating hours to 11PM on Thursdays',
      impact: 'Low',
      potentialRevenue: '€1,900/month',
      confidenceScore: 73
    }
  ];
};

// Get data for forecast chart
export const getBookingForecast = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Generate past 6 months and forecasted 6 months
  const data = [];
  
  for (let i = -6; i <= 6; i++) {
    const dataMonth = new Date(currentYear, currentMonth + i, 1);
    const month = dataMonth.toLocaleString('default', { month: 'short' });
    const year = dataMonth.getFullYear();
    const label = `${month} ${year}`;
    
    // Historic data for past months
    if (i < 0) {
      // Base value with some randomness
      const baseValue = 300 + (6 + i) * 20; // Upward trend in history
      const randomFactor = Math.random() * 40 - 20;
      const actual = Math.round(baseValue + randomFactor);
      
      data.push({
        month: label,
        actual,
        forecast: null,
        isHistorical: true
      });
    } 
    // Current month has both actual and forecast
    else if (i === 0) {
      const actual = Math.round(420 + Math.random() * 30);
      const forecast = Math.round(actual * (0.9 + Math.random() * 0.2));
      
      data.push({
        month: label,
        actual,
        forecast,
        isHistorical: true
      });
    } 
    // Future months only have forecasts
    else {
      // Forecast follows trend with increasing confidence interval
      const baseValue = 440 + i * 25; // Continued growth
      const randomFactor = Math.random() * 50 - 25;
      const forecast = Math.round(baseValue + randomFactor);
      
      data.push({
        month: label,
        actual: null,
        forecast,
        forecastLow: Math.round(forecast * 0.9),
        forecastHigh: Math.round(forecast * 1.1),
        isHistorical: false
      });
    }
  }
  
  return data;
};

// Get space efficiency scores
export const getSpaceEfficiencyScores = () => {
  return spaces.map(space => {
    // Calculate a mock efficiency score
    const utilizationScore = 50 + Math.random() * 40;
    const revenueScore = 40 + Math.random() * 50;
    const feedbackScore = 60 + Math.random() * 35;
    
    // Calculate weighted average score
    const efficiencyScore = Math.round(
      (utilizationScore * 0.4) + (revenueScore * 0.4) + (feedbackScore * 0.2)
    );
    
    return {
      id: space.id,
      name: space.name,
      location: space.location,
      efficiencyScore,
      utilizationScore: Math.round(utilizationScore),
      revenueScore: Math.round(revenueScore),
      feedbackScore: Math.round(feedbackScore),
      trend: Math.random() > 0.7 ? 'down' : Math.random() > 0.4 ? 'up' : 'stable',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
  });
};

// Get comparative metrics
export const getComparativeMetrics = () => {
  return {
    currentPeriod: {
      totalBookings: 547,
      averageBookingValue: 42,
      totalRevenue: 22974,
      occupancyRate: 72,
      newCustomers: 83,
      repeatBookingRate: 64
    },
    previousPeriod: {
      totalBookings: 489,
      averageBookingValue: 39,
      totalRevenue: 19071,
      occupancyRate: 68,
      newCustomers: 76,
      repeatBookingRate: 58
    },
    yearOverYear: {
      totalBookings: 423,
      averageBookingValue: 36,
      totalRevenue: 15228,
      occupancyRate: 63,
      newCustomers: 94,
      repeatBookingRate: 51
    }
  };
};