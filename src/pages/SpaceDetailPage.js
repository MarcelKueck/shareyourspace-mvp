import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { spaces } from '../data/spaces';

const SpaceDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('details');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookingModal, setBookingModal] = useState(false);
  
  // Find the space by ID
  const space = spaces.find(space => space.id === parseInt(id));
  
  if (!space) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Space not found</h1>
        <p className="mt-4 text-lg text-gray-500">The space you're looking for doesn't exist or has been removed.</p>
        <Link to="/explore" className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
          Browse Spaces
        </Link>
      </div>
    );
  }
  
  // Generate days for the booking calendar
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
  
  // Get available slots for selected date
  const getAvailableSlots = () => {
    if (!selectedDate) return [];
    
    const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
    const availabilityForDay = space.availability.find(avail => avail.day === dayOfWeek);
    
    return availabilityForDay ? availabilityForDay.slots : [];
  };
  
  const availableSlots = getAvailableSlots();
  
  // Handle booking
  const handleBooking = () => {
    // In a real app, this would make an API call to create a booking
    setBookingModal(true);
  };
  
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <Link to="/" className="text-gray-400 hover:text-gray-500">
                  Home
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <Link to="/explore" className="ml-4 text-gray-400 hover:text-gray-500">
                  Explore
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <span className="ml-4 text-gray-500 font-medium">
                  {space.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        
        {/* Space Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <img 
              src={space.imageUrl} 
              alt={space.name} 
              className="w-full h-full object-cover"
            />
            {space.featured && (
              <div className="absolute top-0 right-0 bg-primary-500 text-white text-sm font-bold px-3 py-1 m-4 rounded-full">
                Featured
              </div>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {space.location}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{space.name}</h1>
                <p className="text-sm text-gray-500 mt-2">
                  Provided by {space.provider.name} · {space.size} sqm · Capacity: {space.capacity} people
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  {space.provider.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                      <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Verified Provider
                    </span>
                  )}
                </div>
                <p className="text-primary-600 font-bold text-2xl mt-2">€{space.price}</p>
                <p className="text-gray-500 text-xs">{space.priceUnit}</p>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="border-t border-gray-200">
            <div className="flex">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'details'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'amenities'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('amenities')}
              >
                Amenities
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'compliance'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('compliance')}
              >
                Compliance
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'availability'
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('availability')}
              >
                Book
              </button>
            </div>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {activeTab === 'details' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">About this space</h2>
              <p className="text-gray-700 mb-6">{space.description}</p>
              
              <h3 className="text-md font-medium text-gray-900 mb-3">Provider Information</h3>
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-bold">
                    {space.provider.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{space.provider.name}</p>
                  <p className="text-gray-500 text-sm">{space.provider.type} Provider</p>
                </div>
              </div>
              
              <h3 className="text-md font-medium text-gray-900 mb-3">Space Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Total Area</p>
                  <p className="text-gray-900 font-medium">{space.size} sqm</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Capacity</p>
                  <p className="text-gray-900 font-medium">{space.capacity} people</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900 font-medium">{space.location}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-gray-900 font-medium">€{space.price} <span className="text-gray-500 text-xs">({space.priceUnit})</span></p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'amenities' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {space.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'compliance' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Compliance & Security</h2>
              <p className="text-gray-600 mb-6">
                This space meets the following compliance standards and security measures:
              </p>
              
              <div className="space-y-4">
                {space.compliance.dataProtection && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">German Data Protection Standards</h3>
                      <p className="mt-1 text-sm text-gray-500">Complies with German GDPR implementation and data protection regulations.</p>
                    </div>
                  </div>
                )}
                
                {space.compliance.nda && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">NDA Support</h3>
                      <p className="mt-1 text-sm text-gray-500">Standard NDA templates available for all users of this space.</p>
                    </div>
                  </div>
                )}
                
                {space.compliance.ipProtection && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">IP Protection Measures</h3>
                      <p className="mt-1 text-sm text-gray-500">Enhanced intellectual property protection protocols in place.</p>
                    </div>
                  </div>
                )}
                
                {space.compliance.iso27001 && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">ISO 27001 Certified</h3>
                      <p className="mt-1 text-sm text-gray-500">Meets international standards for information security management.</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
                <p className="text-sm text-gray-500">
                  All spaces on ShareYourSpace are verified to ensure they meet German business standards. Additional documentation can be requested during the booking process.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'availability' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Book This Space</h2>
              
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">Select a date</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                  {days.map((day, index) => (
                    <button
                      key={index}
                      className={`p-2 text-center rounded-md text-sm ${
                        selectedDate === day.date
                          ? 'bg-primary-100 text-primary-700 border border-primary-500'
                          : day.available
                            ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
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
                  <h3 className="text-md font-medium text-gray-900 mb-3">Select a time slot</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        className={`p-3 text-center rounded-md border ${
                          selectedSlot === slot
                            ? 'bg-primary-100 text-primary-700 border-primary-500'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 p-4 rounded-md mb-6">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-500 text-sm">Total price</p>
                  <p className="text-2xl font-bold text-gray-900">€{space.price}</p>
                </div>
                <button
                  className={`px-6 py-3 rounded-md text-white font-medium ${
                    selectedDate && selectedSlot
                      ? 'bg-primary-600 hover:bg-primary-700'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  disabled={!selectedDate || !selectedSlot}
                  onClick={handleBooking}
                >
                  Book Now
                </button>
              </div>
              
              <div className="text-sm text-gray-500">
                <p>By booking, you agree to the terms of service and cancellation policy.</p>
                <p className="mt-1">All bookings include standard NDA protection and compliance with German data protection regulations.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Booking Confirmation Modal */}
      {bookingModal && (
        <div className="fixed inset-0 overflow-y-auto z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Booking Confirmed
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your booking for {space.name} has been confirmed for {selectedDate} ({selectedSlot}).
                      </p>
                      <div className="mt-4 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm font-medium text-gray-700">Booking Details:</p>
                        <p className="text-sm text-gray-500">Space: {space.name}</p>
                        <p className="text-sm text-gray-500">Date: {selectedDate}</p>
                        <p className="text-sm text-gray-500">Time: {selectedSlot}</p>
                        <p className="text-sm text-gray-500">Price: €{space.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setBookingModal(false)}
                >
                  View Booking
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setBookingModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceDetailPage;