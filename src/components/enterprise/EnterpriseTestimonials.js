import React, { useState } from 'react';

const EnterpriseTestimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "ShareYourSpace's enterprise pilot program allowed us to thoroughly evaluate the platform before committing. The customized implementation perfectly addressed our needs for secure, flexible project spaces for our innovation teams.",
      author: "Maria Schneider",
      title: "Chief Innovation Officer",
      company: "BMW Group",
      image: "/api/placeholder/100/100"
    },
    {
      quote: "The pilot program exceeded our expectations. Not only did we validate the space sharing capabilities, but the InnovationMatch feature connected us with several startups that are now strategic partners.",
      author: "Thomas Weber",
      title: "Head of Digital Transformation",
      company: "Allianz SE",
      image: "/api/placeholder/100/100"
    },
    {
      quote: "Implementing ShareYourSpace through the enterprise pilot gave us the confidence to roll out the platform company-wide. The dedicated support team ensured a seamless transition from pilot to full deployment.",
      author: "Sarah Müller",
      title: "VP of Corporate Development",
      company: "Siemens AG",
      image: "/api/placeholder/100/100"
    }
  ];
  
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-white dark:bg-dark-bg relative overflow-hidden rounded-xl shadow-md transition-colors duration-200">
      {/* Navigation Arrows */}
      <button 
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary z-10 p-2 rounded-r-md shadow-md hover:bg-gray-100 dark:hover:bg-dark-bg focus:outline-none"
        aria-label="Previous testimonial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary z-10 p-2 rounded-l-md shadow-md hover:bg-gray-100 dark:hover:bg-dark-bg focus:outline-none"
        aria-label="Next testimonial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Testimonial Carousel */}
      <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full flex-shrink-0 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                  <img
                    className="h-24 w-24 rounded-full object-cover border-4 border-primary-100 dark:border-dark-primary-900"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                </div>
                <div>
                  <div className="relative">
                    <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-3 h-8 w-8 text-primary-200 dark:text-dark-primary-900" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <blockquote className="text-xl font-medium text-gray-900 dark:text-dark-text-primary md:pl-4">
                      <p>"{testimonial.quote}"</p>
                    </blockquote>
                  </div>
                  <div className="mt-4 md:pl-4">
                    <div className="text-base font-semibold text-gray-900 dark:text-dark-text-primary">{testimonial.author}</div>
                    <div className="text-sm text-gray-500 dark:text-dark-text-secondary">
                      {testimonial.title}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Dots Navigation */}
      <div className="absolute bottom-5 left-0 right-0">
        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`h-2 w-2 rounded-full ${
                index === activeTestimonial 
                  ? 'bg-primary-600 dark:bg-dark-primary-500' 
                  : 'bg-gray-300 dark:bg-dark-bg'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnterpriseTestimonials;