import React, { useState } from 'react';

const PilotFAQ = () => {
  const [openItem, setOpenItem] = useState(0);
  
  const faqs = [
    {
      question: "What is included in the enterprise pilot program?",
      answer: "Our enterprise pilot program includes full access to the ShareYourSpace platform with enterprise features, dedicated account management, custom implementation, priority support, integration assistance, comprehensive training, detailed analytics, and a smooth transition path to full deployment if you decide to continue after the pilot."
    },
    {
      question: "How long does the pilot program last?",
      answer: "The standard pilot program runs for 90 days, which we've found is the optimal time for proper evaluation. However, we can adjust the duration based on your specific needs and organizational requirements."
    },
    {
      question: "Is there a cost for the pilot program?",
      answer: "The pilot program has a nominal setup fee that covers implementation, training, and resource allocation. This fee is fully credited toward your subscription if you decide to continue with ShareYourSpace after the pilot. For specific pricing, please contact our enterprise sales team."
    },
    {
      question: "How many users can participate in the pilot?",
      answer: "The pilot program can accommodate up to 100 users from your organization. This provides sufficient scale to properly evaluate the platform across multiple teams and use cases. If you need to include more users, we can create a custom pilot plan."
    },
    {
      question: "What happens to our data after the pilot if we decide not to continue?",
      answer: "If you decide not to continue after the pilot, we provide a complete data export in standard formats and securely delete all your data from our systems within 30 days, in accordance with our data protection policies and compliance with GDPR and other relevant regulations."
    },
    {
      question: "Can we integrate the platform with our existing systems during the pilot?",
      answer: "Yes, the pilot includes integration with key enterprise systems such as SSO providers, HRIS, and calendar applications. Our technical team will work with you to set up these integrations during the onboarding phase of the pilot."
    },
    {
      question: "What kind of support is provided during the pilot?",
      answer: "During the pilot, you receive premium enterprise support with dedicated account management, direct access to technical specialists, weekly check-in meetings, and priority response times for any issues that arise."
    },
    {
      question: "How do we measure the success of the pilot?",
      answer: "At the beginning of the pilot, we work with you to define clear success metrics based on your objectives. Throughout the pilot, we provide detailed analytics and reporting dashboards to track progress against these metrics. At the end of the pilot, we deliver a comprehensive evaluation report."
    },
    {
      question: "What is the process for transitioning from pilot to full deployment?",
      answer: "If you decide to continue after the pilot, we provide a seamless transition plan that includes scaling up user accounts, expanding integrations if needed, additional training for new users, and a customized deployment schedule. All data and configurations from the pilot are preserved."
    },
    {
      question: "Can we customize the platform to match our branding and workflows?",
      answer: "Yes, the enterprise pilot includes basic customization options such as branding, custom fields, and workflow adjustments. More extensive customizations can be discussed and potentially implemented during the pilot based on feasibility and resource requirements."
    }
  ];
  
  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };
  
  return (
    <div className="divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
      {faqs.map((faq, index) => (
        <div key={index} className="py-6">
          <button
            className="flex justify-between items-center w-full text-left focus:outline-none"
            onClick={() => toggleItem(index)}
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
              {faq.question}
            </h3>
            <span className="ml-6 flex-shrink-0">
              {openItem === index ? (
                <svg className="h-6 w-6 text-primary-500 dark:text-dark-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-gray-500 dark:text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </span>
          </button>
          {openItem === index && (
            <div className="mt-3 pr-12">
              <p className="text-base text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PilotFAQ;