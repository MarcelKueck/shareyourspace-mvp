import React from 'react';

const MatchingFilters = ({
  userType,
  setUserType,
  interests,
  toggleInterest,
  interestOptions,
  businessGoals,
  toggleBusinessGoal,
  businessGoalOptions,
  technologyFocus,
  toggleTechnologyFocus,
  technologyFocusOptions,
  industryExperience,
  toggleIndustry,
  industryOptions,
  companySize,
  setCompanySize,
  fundingStage,
  setFundingStage
}) => {
  return (
    <div className="space-y-6">
      {/* User Type Selection */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">I am a:</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            className={`px-4 py-3 rounded-md text-sm font-medium ${
              userType === 'startup' 
                ? 'bg-primary-100 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400 border-2 border-primary-500 dark:border-dark-primary-500' 
                : 'bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-bg-light text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-light'
            } transition-colors duration-200`}
            onClick={() => setUserType('startup')}
          >
            B2B SaaS Startup
          </button>
          <button
            className={`px-4 py-3 rounded-md text-sm font-medium ${
              userType === 'corporate' 
                ? 'bg-primary-100 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400 border-2 border-primary-500 dark:border-dark-primary-500' 
                : 'bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-bg-light text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-light'
            } transition-colors duration-200`}
            onClick={() => setUserType('corporate')}
          >
            Corporate Innovation Team
          </button>
        </div>
      </div>
      
      {/* Interest Selection */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
          Select your business interests: <span className="text-red-500 dark:text-red-400">*</span>
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                interests.includes(interest) 
                  ? 'bg-primary-100 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400 border border-primary-500 dark:border-dark-primary-600' 
                  : 'bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-dark-text-secondary border border-gray-300 dark:border-dark-bg-light hover:bg-gray-200 dark:hover:bg-dark-bg-light'
              } transition-colors duration-200`}
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
      
      {/* Business Goals Selection */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
          What are your business goals? <span className="text-red-500 dark:text-red-400">*</span>
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {businessGoalOptions.map((goal) => (
            <button
              key={goal}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                businessGoals.includes(goal) 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400 border border-blue-500 dark:border-blue-600' 
                  : 'bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-dark-text-secondary border border-gray-300 dark:border-dark-bg-light hover:bg-gray-200 dark:hover:bg-dark-bg-light'
              } transition-colors duration-200`}
              onClick={() => toggleBusinessGoal(goal)}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>
      
      {/* Technology Focus Section */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
          Technology focus (optional):
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {technologyFocusOptions.map((tech) => (
            <button
              key={tech}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                technologyFocus.includes(tech) 
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 border border-green-500 dark:border-green-600' 
                  : 'bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-dark-text-secondary border border-gray-300 dark:border-dark-bg-light hover:bg-gray-200 dark:hover:bg-dark-bg-light'
              } transition-colors duration-200`}
              onClick={() => toggleTechnologyFocus(tech)}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
      
      {/* Industry Experience Section */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
          Industry experience (optional):
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {industryOptions.map((industry) => (
            <button
              key={industry}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                industryExperience.includes(industry) 
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-400 border border-purple-500 dark:border-purple-600' 
                  : 'bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-dark-text-secondary border border-gray-300 dark:border-dark-bg-light hover:bg-gray-200 dark:hover:bg-dark-bg-light'
              } transition-colors duration-200`}
              onClick={() => toggleIndustry(industry)}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>
      
      {/* Additional Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Company Size Dropdown */}
        <div>
          <label htmlFor="company-size" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
            Company size (optional):
          </label>
          <select
            id="company-size"
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
          >
            <option value="">Any size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1001+">1001+ employees</option>
          </select>
        </div>
        
        {/* Funding Stage Dropdown (for startup user type) */}
        {userType === 'startup' && (
          <div>
            <label htmlFor="funding-stage" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
              Your funding stage (optional):
            </label>
            <select
              id="funding-stage"
              value={fundingStage}
              onChange={(e) => setFundingStage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
            >
              <option value="">Any stage</option>
              <option value="pre-seed">Pre-seed</option>
              <option value="seed">Seed</option>
              <option value="series-a">Series A</option>
              <option value="series-b">Series B</option>
              <option value="series-c+">Series C or later</option>
              <option value="profitable">Profitable/Bootstrapped</option>
            </select>
          </div>
        )}
        
        {/* Innovation Budget Dropdown (for corporate user type) */}
        {userType === 'corporate' && (
          <div>
            <label htmlFor="innovation-budget" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
              Innovation budget (optional):
            </label>
            <select
              id="innovation-budget"
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
            >
              <option value="">Any budget</option>
              <option value="small">Small (&lt; €100k)</option>
              <option value="medium">Medium (€100k - €500k)</option>
              <option value="large">Large (€500k - €2M)</option>
              <option value="enterprise">Enterprise (&gt; €2M)</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchingFilters;