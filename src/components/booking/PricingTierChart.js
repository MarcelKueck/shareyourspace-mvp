// Pricing tier chart component to visualize different pricing options
import React from 'react';

const PricingTierChart = ({ priceTiers, basePrice, selectedTier, onChange, bookingType }) => {
  // Filter tiers based on booking type
  const filteredTiers = priceTiers.filter(tier => {
    if (bookingType === 'medium-term') {
      return tier.months >= 3 && tier.months <= 6;
    } else if (bookingType === 'long-term') {
      return tier.months >= 12 && tier.months <= 18;
    }
    return tier;
  });
  
  // Calculate price with discount for each tier
  const calculateDiscountedPrice = (tier) => {
    return (basePrice * (1 - (tier.discount / 100))).toFixed(2);
  };
  
  return (
    <div>
      <div className="mb-4 overflow-x-auto">
        <div className="inline-flex min-w-full">
          {filteredTiers.map((tier) => (
            <div 
              key={tier.months} 
              className={`flex-1 p-4 min-w-[120px] text-center border-2 rounded-lg mx-1 cursor-pointer transition-colors duration-200 ${
                selectedTier && selectedTier.months === tier.months
                  ? 'border-primary-500 dark:border-dark-primary-500 bg-primary-50 dark:bg-dark-primary-900 dark:bg-opacity-20'
                  : 'border-gray-200 dark:border-dark-bg hover:border-primary-300 dark:hover:border-dark-primary-700'
              }`}
              onClick={() => onChange(tier.months)}
            >
              <div className="font-bold text-lg text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                {tier.label}
              </div>
              <div className="text-2xl font-extrabold text-primary-600 dark:text-dark-primary-500 mt-2 transition-colors duration-200">
                €{calculateDiscountedPrice(tier)}
              </div>
              <div className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                per day / workstation
              </div>
              {tier.discount > 0 && (
                <div className="mt-2 inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full transition-colors duration-200">
                  {tier.discount}% OFF
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-3 rounded-md text-sm text-blue-700 dark:text-blue-300 transition-colors duration-200">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <span className="font-medium">Pricing Tiers:</span> Longer commitments offer significant discounts. The standard daily rate is €{basePrice}, with discounts of up to {Math.max(...filteredTiers.map(t => t.discount))}% for longer contracts.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTierChart;