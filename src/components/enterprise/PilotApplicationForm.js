import React, { useState } from 'react';

const PilotApplicationForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    officeLocations: '',
    numTeamMembers: '',
    currentSolution: '',
    primaryGoals: [],
    challengesToSolve: '',
    timeframe: '',
    additionalInfo: '',
    termsAccepted: false
  });
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const goalOptions = [
    'Optimize office space utilization',
    'Reduce real estate costs',
    'Improve team collaboration',
    'Enhance innovation partnerships',
    'Connect with startups',
    'Test flexible workspace model',
    'Implement enterprise security protocols',
    'Other'
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'termsAccepted') {
        setFormData({
          ...formData,
          [name]: checked
        });
      } else {
        // Handle multiple checkboxes for primaryGoals
        const updatedGoals = [...formData.primaryGoals];
        if (checked) {
          updatedGoals.push(value);
        } else {
          const index = updatedGoals.indexOf(value);
          if (index > -1) {
            updatedGoals.splice(index, 1);
          }
        }
        setFormData({
          ...formData,
          primaryGoals: updatedGoals
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Form validation
  const isStep1Valid = formData.companyName && formData.industry && formData.companySize;
  const isStep2Valid = formData.firstName && formData.lastName && formData.jobTitle && 
                      formData.email && formData.phone;
  const isStep3Valid = formData.officeLocations && formData.numTeamMembers && 
                      formData.primaryGoals.length > 0 && formData.timeframe;
  const isStep4Valid = formData.termsAccepted;
  
  // If submission was successful, show success message
  if (submitSuccess) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
          <svg className="h-6 w-6 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-dark-text-primary">Application Submitted Successfully</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">
          Thank you for your interest in our Enterprise Pilot Program. Our enterprise team will review your application and contact you within 2 business days to discuss next steps.
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-5 sm:mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
          Enterprise Pilot Application
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
          Fill out the form below to apply for our 90-day enterprise pilot program.
        </p>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center relative">
            <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 flex items-center justify-center ${
              step > 1 ? 'bg-green-600 dark:bg-green-700' : 'bg-primary-600 dark:bg-dark-primary-600'
            } text-white`}>
              <span className={step > 1 ? 'hidden' : 'block'}>1</span>
              {step > 1 && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
            <div className="absolute top-0 -ml-10 text-center mt-14 w-32 text-xs font-medium uppercase text-primary-600 dark:text-dark-primary-500">
              Company Info
            </div>
          </div>
          <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300 dark:border-dark-bg mx-2"></div>
          <div className="flex items-center relative">
            <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 flex items-center justify-center ${
              step > 2 ? 'bg-green-600 dark:bg-green-700' : step === 2 ? 'bg-primary-600 dark:bg-dark-primary-600' : 'bg-gray-300 dark:bg-dark-bg'
            } text-white`}>
              <span className={step > 2 ? 'hidden' : 'block'}>2</span>
              {step > 2 && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
            <div className="absolute top-0 -ml-10 text-center mt-14 w-32 text-xs font-medium uppercase text-primary-600 dark:text-dark-primary-500">
              Contact Info
            </div>
          </div>
          <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300 dark:border-dark-bg mx-2"></div>
          <div className="flex items-center relative">
            <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 flex items-center justify-center ${
              step > 3 ? 'bg-green-600 dark:bg-green-700' : step === 3 ? 'bg-primary-600 dark:bg-dark-primary-600' : 'bg-gray-300 dark:bg-dark-bg'
            } text-white`}>
              <span className={step > 3 ? 'hidden' : 'block'}>3</span>
              {step > 3 && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
            <div className="absolute top-0 -ml-10 text-center mt-14 w-32 text-xs font-medium uppercase text-primary-600 dark:text-dark-primary-500">
              Requirements
            </div>
          </div>
          <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300 dark:border-dark-bg mx-2"></div>
          <div className="flex items-center relative">
            <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 flex items-center justify-center ${
              step === 4 ? 'bg-primary-600 dark:bg-dark-primary-600' : 'bg-gray-300 dark:bg-dark-bg'
            } text-white`}>
              4
            </div>
            <div className="absolute top-0 -ml-10 text-center mt-14 w-32 text-xs font-medium uppercase text-primary-600 dark:text-dark-primary-500">
              Review
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Company Information */}
        {step === 1 && (
          <div>
            <div className="space-y-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Industry *
                </label>
                <select
                  id="industry"
                  name="industry"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an industry</option>
                  <option value="technology">Technology</option>
                  <option value="financial">Financial Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="professional">Professional Services</option>
                  <option value="education">Education</option>
                  <option value="government">Government</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Company Size *
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                  value={formData.companySize}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select company size</option>
                  <option value="1-50">1-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1,000 employees</option>
                  <option value="1001-5000">1,001-5,000 employees</option>
                  <option value="5001+">5,001+ employees</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="mr-3 bg-white dark:bg-dark-bg py-2 px-4 border border-gray-300 dark:border-dark-bg-light rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStep1Valid}
                className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 ${
                  isStep1Valid ? 'bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700' : 'bg-gray-300 dark:bg-dark-bg cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Contact Information */}
        {step === 2 && (
          <div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-white dark:bg-dark-bg py-2 px-4 border border-gray-300 dark:border-dark-bg-light rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStep2Valid}
                className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 ${
                  isStep2Valid ? 'bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700' : 'bg-gray-300 dark:bg-dark-bg cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Requirements */}
        {step === 3 && (
          <div>
            <div className="space-y-6">
              <div>
                <label htmlFor="officeLocations" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Office Locations *
                </label>
                <input
                  type="text"
                  name="officeLocations"
                  id="officeLocations"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                  value={formData.officeLocations}
                  onChange={handleChange}
                  placeholder="List your office locations"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="numTeamMembers" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Number of Team Members for Pilot *
                </label>
                <select
                  id="numTeamMembers"
                  name="numTeamMembers"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                  value={formData.numTeamMembers}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select number of users</option>
                  <option value="1-5">1-5 users</option>
                  <option value="6-10">6-10 users</option>
                  <option value="11-25">11-25 users</option>
                  <option value="26-50">26-50 users</option>
                  <option value="51-100">51-100 users</option>
                  <option value="100+">100+ users</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="currentSolution" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Current Workspace Solution (if any)
                </label>
                <input
                  type="text"
                  name="currentSolution"
                  id="currentSolution"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                  value={formData.currentSolution}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Primary Goals for the Pilot Program *
                </span>
                <div className="mt-2 space-y-2">
                  {goalOptions.map((goal) => (
                    <div key={goal} className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id={`goal-${goal}`}
                          name={`goal-${goal}`}
                          type="checkbox"
                          value={goal}
                          checked={formData.primaryGoals.includes(goal)}
                          onChange={handleChange}
                          className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 h-4 w-4 text-primary-600 dark:text-dark-primary-600 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor={`goal-${goal}`} className="font-medium text-gray-700 dark:text-dark-text-secondary">
                          {goal}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="challengesToSolve" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Key Challenges You're Looking to Solve
                </label>
                <textarea
                  id="challengesToSolve"
                  name="challengesToSolve"
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                  value={formData.challengesToSolve}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Desired Start Timeframe *
                </label>
                <select
                  id="timeframe"
                  name="timeframe"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                  value={formData.timeframe}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select timeframe</option>
                  <option value="immediate">Immediately</option>
                  <option value="1month">Within 1 month</option>
                  <option value="3months">Within 3 months</option>
                  <option value="6months">Within 6 months</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-white dark:bg-dark-bg py-2 px-4 border border-gray-300 dark:border-dark-bg-light rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStep3Valid}
                className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 ${
                  isStep3Valid ? 'bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700' : 'bg-gray-300 dark:bg-dark-bg cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Step 4: Review and Submit */}
        {step === 4 && (
          <div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary">Review Your Application</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">
                  Please review your information before submitting your application.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 dark:text-dark-text-primary">Company Information</h4>
                <dl className="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">
                  <div className="mt-1 flex justify-between">
                    <dt className="font-medium">Company Name:</dt>
                    <dd>{formData.companyName}</dd>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <dt className="font-medium">Industry:</dt>
                    <dd>{formData.industry}</dd>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <dt className="font-medium">Company Size:</dt>
                    <dd>{formData.companySize}</dd>
                  </div>
                </dl>
              </div>
              
              <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 dark:text-dark-text-primary">Contact Information</h4>
                <dl className="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">
                  <div className="mt-1 flex justify-between">
                    <dt className="font-medium">Name:</dt>
                    <dd>{formData.firstName} {formData.lastName}</dd>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <dt className="font-medium">Job Title:</dt>
                    <dd>{formData.jobTitle}</dd>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <dt className="font-medium">Email:</dt>
                    <dd>{formData.email}</dd>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <dt className="font-medium">Phone:</dt>
                    <dd>{formData.phone}</dd>
                  </div>
                </dl>
              </div>
              
              <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 dark:text-dark-text-primary">Pilot Requirements</h4>
                <dl className="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">
                  <div className="mt-1 flex justify-between">
                    <dt className="font-medium">Office Locations:</dt>
                    <dd>{formData.officeLocations}</dd>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <dt className="font-medium">Team Size:</dt>
                    <dd>{formData.numTeamMembers}</dd>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <dt className="font-medium">Current Solution:</dt>
                    <dd>{formData.currentSolution || "N/A"}</dd>
                  </div>
                  <div className="mt-1 flex flex-col">
                    <dt className="font-medium">Primary Goals:</dt>
                    <dd className="mt-1">
                      <ul className="list-disc pl-5">
                        {formData.primaryGoals.map((goal) => (
                          <li key={goal}>{goal}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className="mt-1 flex flex-col">
                    <dt className="font-medium">Key Challenges:</dt>
                    <dd className="mt-1">{formData.challengesToSolve || "N/A"}</dd>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <dt className="font-medium">Timeframe:</dt>
                    <dd>{formData.timeframe}</dd>
                  </div>
                </dl>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 h-4 w-4 text-primary-600 dark:text-dark-primary-600 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="termsAccepted" className="font-medium text-gray-700 dark:text-dark-text-secondary">
                    I agree to the <a href="#" className="text-primary-600 dark:text-dark-primary-500 hover:underline">Pilot Terms and Conditions</a> *
                  </label>
                  <p className="text-gray-500 dark:text-dark-text-muted">
                    By submitting this application, you agree to our data processing policies and to be contacted by our enterprise team.
                  </p>
                </div>
              </div>
              
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows="2"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm dark:bg-dark-bg dark:text-dark-text-primary"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Any additional information you'd like to share"
                ></textarea>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-white dark:bg-dark-bg py-2 px-4 border border-gray-300 dark:border-dark-bg-light rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={!isStep4Valid || isSubmitting}
                className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 ${
                  isStep4Valid ? 'bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700' : 'bg-gray-300 dark:bg-dark-bg cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : 'Submit Application'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PilotApplicationForm;