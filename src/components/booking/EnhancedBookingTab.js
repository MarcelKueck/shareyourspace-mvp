// Enhanced SpaceDetailPage.js components for medium to long-term bookings
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { spaces } from '../../data/spaces';
import ComplianceStatus from '../compliance/ComplianceStatus';
import ComplianceOverview from '../compliance/ComplianceOverview';
import { calculateComplianceScore } from '../../services/complianceService';
import PricingTierChart from './PricingTierChart';
import ContractTermsSelector from './ContractTermsSelector';
import GrowthOptionSelector from './GrowthOptionSelector';

// Contract templates
const contractTemplates = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Basic contract with standard terms and conditions',
    features: [
      'Standard cancellation policy (30 days notice)',
      'Fixed price for contract duration',
      'Basic support',
      'Standard compliance documentation'
    ]
  },
  {
    id: 'flexible',
    name: 'Flexible',
    description: 'Flexible terms with easier modification options',
    features: [
      'Shorter cancellation period (14 days notice)',
      'Monthly price adjustments possible',
      'Priority support',
      'Early termination option (with fee)'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Enterprise-grade contract with comprehensive terms',
    features: [
      'Customized cancellation terms',
      'Service Level Agreement (SLA)',
      'Dedicated account manager',
      'Premium compliance package',
      'Custom integration options'
    ]
  }
];

// Growth options
const growthOptions = [
  {
    id: 'none',
    name: 'No Growth Option',
    description: 'Fixed capacity for the duration of the contract',
    fee: 0,
    expandCapacity: 0
  },
  {
    id: 'moderate',
    name: 'Moderate Growth',
    description: 'Option to expand capacity by up to 30% within contract period',
    fee: 5, // 5% of base price
    expandCapacity: 30 // Up to 30% additional capacity
  },
  {
    id: 'high',
    name: 'High Growth',
    description: 'Option to expand capacity by up to 60% within contract period',
    fee: 8, // 8% of base price
    expandCapacity: 60 // Up to 60% additional capacity
  },
  {
    id: 'unlimited',
    name: 'Unlimited Growth',
    description: 'Option to expand capacity without limits (subject to availability)',
    fee: 12, // 12% of base price
    expandCapacity: 100 // Up to 100% additional capacity
  }
];

// Price tiers for different contract durations
const priceTiers = [
  { months: 1, discount: 0, label: 'Daily/Weekly' }, // Short-term (no discount)
  { months: 3, discount: 10, label: '3 Months' },    // 10% discount
  { months: 6, discount: 15, label: '6 Months' },    // 15% discount
  { months: 12, discount: 25, label: '12 Months' },  // 25% discount
  { months: 18, discount: 30, label: '18 Months' }   // 30% discount
];

// Enhanced booking tab content for SpaceDetailPage
const EnhancedBookingTab = ({ space }) => {
  // State for booking options
  const [bookingType, setBookingType] = useState('short-term');
  const [contractDuration, setContractDuration] = useState(3); // Default to 3 months
  const [contractTemplate, setContractTemplate] = useState('standard');
  const [growthOption, setGrowthOption] = useState('none');
  const [teamSize, setTeamSize] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [customTerms, setCustomTerms] = useState('');
  const [bookingModal, setBookingModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // For short-term booking (existing functionality)
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  
  // Calculate compliance score and security level
  const complianceScore = calculateComplianceScore(space);
  const securityLevel = getSecurityLevel(complianceScore);
  
  // Calculate pricing based on selected options
  const calculatePricing = () => {
    // Base price from space
    const basePrice = space.price;
    
    // Get discount for selected duration
    const tier = priceTiers.find(tier => tier.months === contractDuration) || priceTiers[0];
    const discountRate = tier.discount / 100;
    
    // Calculate discounted price per day/workstation
    const discountedDailyPrice = basePrice * (1 - discountRate);
    
    // Calculate growth option fee
    const growthOptionObj = growthOptions.find(option => option.id === growthOption);
    const growthFeeRate = growthOptionObj ? growthOptionObj.fee / 100 : 0;
    const growthFee = discountedDailyPrice * growthFeeRate;
    
    // Calculate total daily price
    const totalDailyPrice = discountedDailyPrice + growthFee;
    
    // Calculate monthly price (assuming 22 working days per month)
    const monthlyPrice = totalDailyPrice * 22 * teamSize;
    
    // Calculate total contract value
    const totalContractValue = monthlyPrice * contractDuration;
    
    return {
      dailyPrice: totalDailyPrice.toFixed(2),
      monthlyPrice: monthlyPrice.toFixed(2),
      totalContractValue: totalContractValue.toFixed(2),
      discount: tier.discount,
      growthFee: growthFeeRate > 0 ? `${growthFeeRate * 100}%` : 'None',
      originalPrice: basePrice
    };
  };
  
  // Pricing calculations
  const pricing = calculatePricing();
  
  // Generate days for the short-term booking calendar (existing functionality)
  const generateDays = () => {
    const days = [];
    const startDate = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(startDate.getDate() + i);
      
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      days.push({
        date: formattedDate,
        dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }),
        available: space.availability.some(
          avail => avail.day === date.toLocaleDateString('en-US', { weekday: 'long' })
        )
      });
    }
    
    return days;
  };
  
  const days = generateDays();
  
  // Get available slots for selected date (existing functionality)
  const getAvailableSlots = () => {
    if (!selectedDate) return [];
    
    const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
    const availabilityForDay = space.availability.find(avail => avail.day === dayOfWeek);
    
    return availabilityForDay ? availabilityForDay.slots : [];
  };
  
  const availableSlots = getAvailableSlots();
  
  // Handle booking
  const handleBooking = () => {
    setCurrentStep(1);
    setBookingModal(true);
  };
  
  // Handle next step
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  // Handle previous step
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Handle submitting the booking
  const handleSubmitBooking = () => {
    // In a real app, this would make an API call to create a booking
    // For now, we'll just close the modal
    setBookingModal(false);
    setCurrentStep(1);
    setAgreedToTerms(false);
  };
  
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">Book This Space</h2>
      
      {/* Booking Type Selector */}
      <div className="bg-gray-100 dark:bg-dark-bg rounded-lg p-4 mb-6 transition-colors duration-200">
        <div className="flex flex-wrap space-x-4">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              bookingType === 'short-term'
                ? 'bg-primary-500 dark:bg-dark-primary-500 text-white'
                : 'bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg'
            } transition-colors duration-200`}
            onClick={() => setBookingType('short-term')}
          >
            Short-Term (Daily/Weekly)
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              bookingType === 'medium-term'
                ? 'bg-primary-500 dark:bg-dark-primary-500 text-white'
                : 'bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg'
            } transition-colors duration-200`}
            onClick={() => setBookingType('medium-term')}
          >
            Medium-Term (3-6 Months)
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              bookingType === 'long-term'
                ? 'bg-primary-500 dark:bg-dark-primary-500 text-white'
                : 'bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg'
            } transition-colors duration-200 mt-2 sm:mt-0`}
            onClick={() => setBookingType('long-term')}
          >
            Long-Term (12-18 Months)
          </button>
        </div>
        <div className="mt-4 text-sm text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 dark:text-dark-primary-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>
              {bookingType === 'short-term' ? 
                'Daily and weekly bookings for immediate needs. No long-term commitment required.' :
              bookingType === 'medium-term' ? 
                'Medium-term contracts (3-6 months) with flexible terms and moderate discounts.' :
                'Long-term contracts (12-18 months) offering maximum discounts and premium benefits.'}
            </span>
          </div>
        </div>
      </div>
      
      {bookingType === 'short-term' ? (
        /* Short-term booking interface (existing functionality) */
        <>
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">Select a date</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {days.map((day, index) => (
                <button
                  key={index}
                  className={`p-2 text-center rounded-md text-sm ${
                    selectedDate === day.date
                      ? 'bg-primary-100 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400 border border-primary-500 dark:border-dark-primary-500'
                      : day.available
                        ? 'bg-white dark:bg-dark-bg-light border border-gray-300 dark:border-dark-bg text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg'
                        : 'bg-gray-100 dark:bg-dark-bg text-gray-400 dark:text-dark-text-muted cursor-not-allowed'
                  } transition-colors duration-200`}
                  disabled={!day.available}
                  onClick={() => {
                    setSelectedDate(day.date);
                    setSelectedSlot('');
                  }}
                >
                  <div className="font-medium">{day.date.split(',')[0]}</div>
                  <div>{day.date.split(',')[1].trim()}</div>
                </button>
              ))}
            </div>
          </div>
          
          {selectedDate && (
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">Select a time slot</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`p-3 text-center rounded-md border ${
                      selectedSlot === slot
                        ? 'bg-primary-100 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400 border-primary-500 dark:border-dark-primary-500'
                        : 'bg-white dark:bg-dark-bg-light border-gray-300 dark:border-dark-bg text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg'
                    } transition-colors duration-200`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 dark:bg-dark-bg p-4 rounded-md mb-6 transition-colors duration-200">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 dark:text-dark-text-secondary text-sm transition-colors duration-200">Total price</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary transition-colors duration-200">€{space.price}</p>
              <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                per workstation
              </p>
            </div>
            <button
              className={`px-6 py-3 rounded-md text-white font-medium ${
                selectedDate && selectedSlot
                  ? 'bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700'
                  : 'bg-gray-300 dark:bg-dark-bg-light text-gray-500 dark:text-dark-text-muted cursor-not-allowed'
              } transition-colors duration-200`}
              disabled={!selectedDate || !selectedSlot}
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
            <p>By booking, you agree to the terms of service and cancellation policy.</p>
            <p className="mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Try before committing to a longer term contract</span>
            </p>
            <div className="mt-3 border-t border-gray-200 dark:border-dark-bg-light pt-3">
              <Link
                to="#"
                className="text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400"
              >
                Learn about our Try & Connect program
              </Link>
            </div>
          </div>
        </>
      ) : (
        /* Medium to Long-term booking interface */
        <>
          {/* Contract Duration Selection */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">
              Select Contract Duration
            </h3>
            
            <PricingTierChart 
              priceTiers={priceTiers} 
              basePrice={space.price} 
              selectedTier={priceTiers.find(tier => tier.months === contractDuration)} 
              onChange={setContractDuration}
              bookingType={bookingType}
            />
          </div>
          
          {/* Contract Terms Selection */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">
              Select Contract Terms
            </h3>
            
            <ContractTermsSelector 
              templates={contractTemplates} 
              selectedTemplate={contractTemplate}
              onChange={setContractTemplate}
            />
          </div>
          
          {/* Growth Options */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">
              Select Growth Option
            </h3>
            
            <GrowthOptionSelector 
              options={growthOptions} 
              selectedOption={growthOption}
              onChange={setGrowthOption}
            />
          </div>
          
          {/* Team Size and Start Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
                Team Size (Workstations)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  min="1"
                  max={space.capacity}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Math.min(space.capacity, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 block w-full sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-dark-text-secondary sm:text-sm">
                    / {space.capacity}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                Maximum capacity: {space.capacity} workstations
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
                Preferred Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 block w-full sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
              />
            </div>
          </div>
          
          {/* Custom Terms */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
              Additional Contract Requirements (Optional)
            </label>
            <textarea
              rows="3"
              value={customTerms}
              onChange={(e) => setCustomTerms(e.target.value)}
              className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 block w-full sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
              placeholder="Specify any custom requirements or questions..."
            ></textarea>
          </div>
          
          {/* Pricing Summary */}
          <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-4 mb-6 transition-colors duration-200">
            <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">
              Pricing Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-dark-text-secondary">Base price per workstation:</span>
                <span className="text-gray-700 dark:text-dark-text-primary">€{space.price}/day</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-dark-text-secondary">Contract duration:</span>
                <span className="text-gray-700 dark:text-dark-text-primary">{contractDuration} months</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-dark-text-secondary">Duration discount:</span>
                <span className="text-green-600 dark:text-green-400">-{pricing.discount}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-dark-text-secondary">Growth option fee:</span>
                <span className="text-gray-700 dark:text-dark-text-primary">{pricing.growthFee}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-dark-text-secondary">Number of workstations:</span>
                <span className="text-gray-700 dark:text-dark-text-primary">{teamSize}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-dark-bg-light">
                <div className="flex justify-between items-center font-medium">
                  <span className="text-gray-700 dark:text-dark-text-primary">Daily price per workstation:</span>
                  <span className="text-gray-900 dark:text-dark-text-primary">€{pricing.dailyPrice}</span>
                </div>
                <div className="flex justify-between items-center font-medium">
                  <span className="text-gray-700 dark:text-dark-text-primary">Monthly price (team):</span>
                  <span className="text-gray-900 dark:text-dark-text-primary">€{pricing.monthlyPrice}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold mt-2 pt-2 border-t border-gray-200 dark:border-dark-bg-light">
                  <span className="text-gray-900 dark:text-dark-text-primary">Total contract value:</span>
                  <span className="text-primary-600 dark:text-dark-primary-500">€{pricing.totalContractValue}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <button
              className="px-6 py-3 mb-3 md:mb-0 rounded-md text-white font-medium bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200"
              onClick={handleBooking}
              disabled={!startDate}
            >
              Reserve This Space
            </button>
            <button
              className="px-6 py-3 rounded-md border border-gray-300 dark:border-dark-bg-light text-gray-700 dark:text-dark-text-secondary font-medium bg-white dark:bg-dark-bg-light hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors duration-200"
            >
              Request Tour
            </button>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
            <p>By proceeding, you'll initiate the booking process. A team member will contact you to finalize the contract terms.</p>
            <p className="mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 dark:text-dark-primary-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>All contracts include standard NDA and data protection</span>
            </p>
          </div>
        </>
      )}
      
      {/* Try & Connect Promotion Section */}
      {bookingType === 'short-term' && (
        <div className="mt-8 bg-primary-50 dark:bg-dark-primary-900 dark:bg-opacity-20 rounded-lg p-4 border border-primary-100 dark:border-dark-primary-800 transition-colors duration-200">
          <h3 className="text-md font-medium text-primary-800 dark:text-dark-primary-300 mb-2 transition-colors duration-200">
            Try & Connect Program
          </h3>
          <p className="text-sm text-primary-600 dark:text-dark-primary-400 mb-4 transition-colors duration-200">
            Book short-term now and convert to a medium or long-term contract within 30 days to receive:
          </p>
          <ul className="text-sm text-primary-600 dark:text-dark-primary-400 space-y-2 mb-4">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 dark:text-dark-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Credit for your short-term booking applied to your contract</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 dark:text-dark-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Additional 5% discount on your medium or long-term contract</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 dark:text-dark-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Priority access to InnovationMatch business connections</span>
            </li>
          </ul>
          <button
            className="w-full sm:w-auto px-4 py-2 bg-primary-600 dark:bg-dark-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 dark:hover:bg-dark-primary-700 transition-colors duration-200"
            onClick={() => setBookingType('medium-term')}
          >
            Learn More About Medium-Term Options
          </button>
        </div>
      )}
        
      {/* Booking Confirmation Modal */}
      {bookingModal && (
        <div className="fixed inset-0 overflow-y-auto z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-dark-bg-light rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full transition-colors duration-200">
              {/* Modal Header */}
              <div className="bg-primary-600 dark:bg-dark-primary-600 px-4 py-3 sm:px-6 transition-colors duration-200">
                <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                  {bookingType === 'short-term' ? 'Confirm Booking' : 'Reserve Workspace'}
                </h3>
              </div>
              
              {bookingType === 'short-term' ? (
                /* Short-term booking confirmation */
                <div className="bg-white dark:bg-dark-bg-light px-4 pt-5 pb-4 sm:p-6 sm:pb-4 transition-colors duration-200">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 sm:mx-0 sm:h-10 sm:w-10 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200" id="modal-title">
                        Booking Confirmation
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                          Please confirm your booking for {space.name} on {selectedDate} ({selectedSlot}).
                        </p>
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-dark-bg rounded-md transition-colors duration-200">
                          <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Booking Details:</p>
                          <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Space: {space.name}</p>
                          <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Date: {selectedDate}</p>
                          <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Time: {selectedSlot}</p>
                          <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Price: €{space.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Medium/Long-term booking steps */
                <div className="bg-white dark:bg-dark-bg-light px-4 pt-5 pb-4 sm:p-6 sm:pb-4 transition-colors duration-200">
                  {/* Step Indicator */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentStep >= 1 ? 'bg-primary-600 dark:bg-dark-primary-600 text-white' : 'bg-gray-200 dark:bg-dark-bg text-gray-500 dark:text-dark-text-secondary'
                        } transition-colors duration-200`}>
                          1
                        </div>
                        <span className="text-xs mt-1 text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Summary</span>
                      </div>
                      <div className={`h-1 flex-1 mx-2 ${
                        currentStep >= 2 ? 'bg-primary-500 dark:bg-dark-primary-500' : 'bg-gray-200 dark:bg-dark-bg'
                      } transition-colors duration-200`}></div>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentStep >= 2 ? 'bg-primary-600 dark:bg-dark-primary-600 text-white' : 'bg-gray-200 dark:bg-dark-bg text-gray-500 dark:text-dark-text-secondary'
                        } transition-colors duration-200`}>
                          2
                        </div>
                        <span className="text-xs mt-1 text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Review</span>
                      </div>
                      <div className={`h-1 flex-1 mx-2 ${
                        currentStep >= 3 ? 'bg-primary-500 dark:bg-dark-primary-500' : 'bg-gray-200 dark:bg-dark-bg'
                      } transition-colors duration-200`}></div>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentStep >= 3 ? 'bg-primary-600 dark:bg-dark-primary-600 text-white' : 'bg-gray-200 dark:bg-dark-bg text-gray-500 dark:text-dark-text-secondary'
                        } transition-colors duration-200`}>
                          3
                        </div>
                        <span className="text-xs mt-1 text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Confirm</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 1: Booking Summary */}
                  {currentStep === 1 && (
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
                        Booking Summary
                      </h3>
                      <div className="bg-gray-50 dark:bg-dark-bg rounded-md p-4 mb-4 transition-colors duration-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Space:</p>
                            <p className="text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{space.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Location:</p>
                            <p className="text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{space.location}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Contract Duration:</p>
                            <p className="text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{contractDuration} months</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Start Date:</p>
                            <p className="text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{startDate || 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Team Size:</p>
                            <p className="text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{teamSize} workstation(s)</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Contract Type:</p>
                            <p className="text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                              {contractTemplates.find(t => t.id === contractTemplate)?.name || 'Standard'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Growth Option:</p>
                            <p className="text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                              {growthOptions.find(o => o.id === growthOption)?.name || 'None'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Monthly Price:</p>
                            <p className="text-sm text-primary-600 dark:text-dark-primary-500 font-bold transition-colors duration-200">€{pricing.monthlyPrice}</p>
                          </div>
                        </div>
                        
                        {customTerms && (
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
                            <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Additional Requirements:</p>
                            <p className="text-sm text-gray-900 dark:text-dark-text-primary mt-2 transition-colors duration-200">{customTerms}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-md border border-blue-100 dark:border-blue-800 transition-colors duration-200">
                        <p className="text-sm text-blue-600 dark:text-blue-400 transition-colors duration-200">
                          <span className="font-medium">What happens next:</span> After confirming your booking, a team member will contact you within 24 hours to finalize the contract details and answer any questions you may have.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Contract Review */}
                  {currentStep === 2 && (
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">
                        Contract Terms Review
                      </h3>
                      
                      <div className="bg-gray-50 dark:bg-dark-bg rounded-md p-4 mb-4 overflow-y-auto max-h-96 transition-colors duration-200">
                        <h4 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">
                          {contractTemplates.find(t => t.id === contractTemplate)?.name || 'Standard'} Contract
                        </h4>
                        
                        <div className="space-y-4 text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          <p>This document outlines the preliminary terms and conditions for your workspace booking with ShareYourSpace. The final contract will be provided for signature after confirmation.</p>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-dark-text-primary mb-1 transition-colors duration-200">1. Parties</h5>
                            <p>ShareYourSpace GmbH ("Provider") and the Customer ("You")</p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-dark-text-primary mb-1 transition-colors duration-200">2. Workspace</h5>
                            <p>Provider agrees to provide workspace at {space.name}, {space.location} for {teamSize} workstation(s) for a period of {contractDuration} months, starting from [start date to be finalized].</p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-dark-text-primary mb-1 transition-colors duration-200">3. Payment Terms</h5>
                            <p>Monthly payment of €{pricing.monthlyPrice} due on the 1st of each month. First payment due prior to occupancy.</p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-dark-text-primary mb-1 transition-colors duration-200">4. Growth Option</h5>
                            <p>{growthOptions.find(o => o.id === growthOption)?.description || 'No growth option selected.'}</p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-dark-text-primary mb-1 transition-colors duration-200">5. Cancellation Policy</h5>
                            <p>
                              {contractTemplate === 'flexible' ? 
                                '14 days notice required for cancellation. Early termination fee applies as specified in the final contract.' :
                              contractTemplate === 'enterprise' ? 
                                'Customized cancellation terms to be specified in the final contract based on your requirements.' :
                                '30 days notice required for cancellation. Early termination fee applies as specified in the final contract.'}
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-dark-text-primary mb-1 transition-colors duration-200">6. Services Included</h5>
                            <ul className="list-disc pl-5 space-y-1">
                              {space.amenities.map((amenity, index) => (
                                <li key={index}>{amenity}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-dark-text-primary mb-1 transition-colors duration-200">7. Compliance & Security</h5>
                            <p>This workspace meets {securityLevel} security standards including data protection and confidentiality measures. A detailed compliance documentation package will be provided with the final contract.</p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-dark-text-primary mb-1 transition-colors duration-200">8. Additional Terms</h5>
                            <p>Standard NDA protection and compliance with German data protection regulations included. Detailed terms will be provided in the final contract.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-4">
                        <input
                          id="terms-agreement"
                          name="terms-agreement"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 dark:text-dark-primary-600 focus:ring-primary-500 dark:focus:ring-dark-primary-500 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                          checked={agreedToTerms}
                          onChange={() => setAgreedToTerms(!agreedToTerms)}
                        />
                        <label htmlFor="terms-agreement" className="ml-2 block text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          I have reviewed the preliminary contract terms and agree to proceed with the reservation
                        </label>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Confirmation */}
                  {currentStep === 3 && (
                    <div>
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="mt-3 text-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                          Reservation Confirmed
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                            Your reservation for {space.name} has been confirmed. A team member will contact you shortly to finalize the contract.
                          </p>
                          <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-bg rounded-md transition-colors duration-200">
                            <p className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Reservation Summary:</p>
                            <p className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Contract Duration: {contractDuration} months</p>
                            <p className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Contract Type: {contractTemplates.find(t => t.id === contractTemplate)?.name}</p>
                            <p className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Team Size: {teamSize} workstation(s)</p>
                            <p className="text-sm text-primary-600 dark:text-dark-primary-500 font-medium transition-colors duration-200">Monthly Price: €{pricing.monthlyPrice}</p>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                              Reservation Reference: RES-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="bg-gray-50 dark:bg-dark-bg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse transition-colors duration-200">
                {bookingType === 'short-term' ? (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 dark:bg-dark-primary-600 text-base font-medium text-white hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                      onClick={handleSubmitBooking}
                    >
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-bg-light shadow-sm px-4 py-2 bg-white dark:bg-dark-bg-light text-base font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                      onClick={() => setBookingModal(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 dark:bg-dark-primary-600 text-base font-medium text-white hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200 ${
                          currentStep === 2 && !agreedToTerms ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={handleNextStep}
                        disabled={currentStep === 2 && !agreedToTerms}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 dark:bg-dark-primary-600 text-base font-medium text-white hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                        onClick={handleSubmitBooking}
                      >
                        Go to Dashboard
                      </button>
                    )}
                    
                    {currentStep > 1 && currentStep < 3 && (
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-bg-light shadow-sm px-4 py-2 bg-white dark:bg-dark-bg-light text-base font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                        onClick={handlePreviousStep}
                      >
                        Back
                      </button>
                    )}
                    
                    {currentStep < 3 && (
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-bg-light shadow-sm px-4 py-2 bg-white dark:bg-dark-bg-light text-base font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                        onClick={() => setBookingModal(false)}
                      >
                        Cancel
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Calculate security level based on compliance score
const getSecurityLevel = (score) => {
  if (score >= 90) return 'Enterprise+';
  if (score >= 80) return 'Enterprise';
  if (score >= 60) return 'Business';
  if (score >= 40) return 'Basic';
  return 'Minimal';
};

export default EnhancedBookingTab;