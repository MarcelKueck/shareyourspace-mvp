import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { spaces } from '../data/spaces';
import ComplianceStatus from '../components/compliance/ComplianceStatus';
import ComplianceOverview from '../components/compliance/ComplianceOverview';
import { calculateComplianceScore } from '../services/complianceService';
import EnhancedBookingTab from '../components/booking/EnhancedBookingTab';

const SpaceDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('details');
  const [complianceDetailModal, setComplianceDetailModal] = useState(false);
  const [selectedComplianceStandard, setSelectedComplianceStandard] = useState(null);
  
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
  
  // Calculate compliance score
  const complianceScore = calculateComplianceScore(space);

  // Determine security level text
  const getSecurityLevel = (score) => {
    if (score >= 90) return 'Enterprise+';
    if (score >= 80) return 'Enterprise';
    if (score >= 60) return 'Business';
    if (score >= 40) return 'Basic';
    return 'Minimal';
  };
  
  const securityLevel = getSecurityLevel(complianceScore);
  
  // Handle opening compliance detail modal
  const openComplianceDetailModal = (standardId) => {
    setSelectedComplianceStandard(standardId);
    setComplianceDetailModal(true);
  };
  
  return (
    <div className="bg-gray-50 dark:bg-dark-bg-light transition-colors duration-200">
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
        <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md overflow-hidden mb-8 transition-colors duration-200">
          <div className="relative h-64 md:h-96">
            <img 
              src={space.imageUrl} 
              alt={space.name} 
              className="w-full h-full object-cover"
            />
            {space.featured && (
              <div className="absolute top-0 right-0 bg-primary-500 dark:bg-dark-primary-500 text-white text-sm font-bold px-3 py-1 m-4 rounded-full transition-colors duration-200">
                Featured
              </div>
            )}
            
            {/* Add security level badge */}
            <div className="absolute top-0 left-0 m-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                complianceScore >= 80 ? 'bg-green-500 dark:bg-green-600' :
                complianceScore >= 60 ? 'bg-blue-500 dark:bg-blue-600' :
                complianceScore >= 40 ? 'bg-yellow-500 dark:bg-yellow-600' :
                'bg-red-500 dark:bg-red-600'
              } text-white transition-colors duration-200`}>
                {securityLevel} Security
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center text-sm text-gray-500 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {space.location}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary md:text-3xl transition-colors duration-200">{space.name}</h1>
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-2 transition-colors duration-200">
                  Provided by {space.provider.name} · {space.size} sqm · Capacity: {space.capacity} people
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  {space.provider.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 mr-2 transition-colors duration-200">
                      <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Verified Provider
                    </span>
                  )}
                </div>
                <p className="text-primary-600 dark:text-dark-primary-500 font-bold text-2xl mt-2 transition-colors duration-200">€{space.price}</p>
                <p className="text-gray-500 dark:text-dark-text-secondary text-xs transition-colors duration-200">{space.priceUnit}</p>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="border-t border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
            <div className="flex">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'details'
                    ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                    : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
                } transition-colors duration-200`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'amenities'
                    ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                    : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
                } transition-colors duration-200`}
                onClick={() => setActiveTab('amenities')}
              >
                Amenities
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'compliance'
                    ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                    : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
                } transition-colors duration-200`}
                onClick={() => setActiveTab('compliance')}
              >
                Compliance
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'availability'
                    ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                    : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
                } transition-colors duration-200`}
                onClick={() => setActiveTab('availability')}
              >
                Book
              </button>
            </div>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md overflow-hidden mb-8 transition-colors duration-200">
          {activeTab === 'details' && (
            <div className="p-6">
              {/* [Existing details tab content] */}
              <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">About this space</h2>
              <p className="text-gray-700 dark:text-dark-text-secondary mb-6 transition-colors duration-200">{space.description}</p>
              
              <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">Provider Information</h3>
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-dark-primary-900 flex items-center justify-center mr-4 transition-colors duration-200">
                  <span className="text-primary-600 dark:text-dark-primary-400 font-bold transition-colors duration-200">
                    {space.provider.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-dark-text-primary font-medium transition-colors duration-200">{space.provider.name}</p>
                  <p className="text-gray-500 dark:text-dark-text-secondary text-sm transition-colors duration-200">{space.provider.type} Provider</p>
                </div>
              </div>
              
              <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">Space Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md transition-colors duration-200">
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Total Area</p>
                  <p className="text-gray-900 dark:text-dark-text-primary font-medium transition-colors duration-200">{space.size} sqm</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md transition-colors duration-200">
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Capacity</p>
                  <p className="text-gray-900 dark:text-dark-text-primary font-medium transition-colors duration-200">{space.capacity} people</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md transition-colors duration-200">
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Location</p>
                  <p className="text-gray-900 dark:text-dark-text-primary font-medium transition-colors duration-200">{space.location}</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-md transition-colors duration-200">
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Price</p>
                  <p className="text-gray-900 dark:text-dark-text-primary font-medium transition-colors duration-200">€{space.price} <span className="text-gray-500 dark:text-dark-text-secondary text-xs transition-colors duration-200">({space.priceUnit})</span></p>
                </div>
              </div>
              
              {/* Compliance Summary in Details Tab */}
              <div className="mt-8 p-4 bg-gray-50 dark:bg-dark-bg rounded-md border border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">Security & Compliance</h3>
                    <ComplianceStatus space={space} />
                  </div>
                  <button 
                    className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 font-medium transition-colors duration-200"
                    onClick={() => setActiveTab('compliance')}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'amenities' && (
            <div className="p-6">
              {/* [Existing amenities tab content] */}
              <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {space.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-dark-bg rounded-md transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 dark:text-dark-primary-500 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Enhanced Compliance Tab */}
          {activeTab === 'compliance' && (
            <div className="p-6">
              <ComplianceOverview space={space} />
              
              {/* Additional compliance information */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">Compliance Documents</h3>
                <p className="text-gray-500 dark:text-dark-text-secondary mb-4 transition-colors duration-200">
                  You can request access to compliance documentation after booking this space. 
                  All documentation is independently verified by ShareYourSpace.
                </p>
                
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
                  onClick={() => setActiveTab('availability')}
                >
                  Book This Space
                </button>
              </div>
            </div>
          )}
          
          {/* Enhanced Booking Tab - replaced with new component */}
          {activeTab === 'availability' && (
            <div className="p-6">
              <EnhancedBookingTab space={space} />
            </div>
          )}
        </div>
        
        {/* Compliance Detail Modal */}
        {complianceDetailModal && selectedComplianceStandard && (
          <div className="fixed inset-0 overflow-y-auto z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <div className="inline-block align-bottom bg-white dark:bg-dark-bg-light rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full transition-colors duration-200">
                <div className="bg-white dark:bg-dark-bg-light px-4 pt-5 pb-4 sm:p-6 sm:pb-4 transition-colors duration-200">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200" id="modal-title">
                        {selectedComplianceStandard === 'dataProtection' ? 'Data Protection' :
                         selectedComplianceStandard === 'iso27001' ? 'ISO 27001 Compliance' :
                         selectedComplianceStandard === 'nda' ? 'NDA Support' :
                         selectedComplianceStandard === 'ipProtection' ? 'IP Protection Measures' :
                         selectedComplianceStandard === 'physicalSecurity' ? 'Physical Security' :
                         selectedComplianceStandard === 'networkSecurity' ? 'Network Security' :
                         selectedComplianceStandard}
                      </h3>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                          {selectedComplianceStandard === 'dataProtection' ? 'This space complies with German data protection regulations (DSGVO) and provides:' :
                          selectedComplianceStandard === 'iso27001' ? 'This space meets information security management standards with:' :
                          selectedComplianceStandard === 'nda' ? 'This space offers confidentiality protection through:' :
                          selectedComplianceStandard === 'ipProtection' ? 'This space protects intellectual property with:' :
                          selectedComplianceStandard === 'physicalSecurity' ? 'This space ensures physical security through:' :
                          selectedComplianceStandard === 'networkSecurity' ? 'This space provides network security with:' :
                          'This space offers the following compliance measures:'}
                        </p>
                        
                        <ul className="mt-4 space-y-2">
                          {selectedComplianceStandard === 'dataProtection' ? (
                            <>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Data Processing Agreement (DPA) available for all bookings</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Privacy Policy compliant with DSGVO requirements</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Technical and organizational measures documented</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Data breach notification process in place</span>
                              </li>
                            </>
                          ) : selectedComplianceStandard === 'iso27001' ? (
                            <>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">ISO 27001 certified information security management system</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Risk assessment and treatment processes</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Security awareness training for staff</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Regular security audits and monitoring</span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Standard compliance measures implemented</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Regular verification and auditing</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Documentation available upon request</span>
                              </li>
                            </>
                          )}
                        </ul>
                        
                        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-md transition-colors duration-200">
                          <p className="text-xs text-blue-600 dark:text-blue-400 transition-colors duration-200">
                            <span className="font-medium">Verification Status:</span> {space.compliance[selectedComplianceStandard]?.level === 'certified' ? 'Certified by independent auditor' :
                            space.compliance[selectedComplianceStandard]?.level === 'verified' ? 'Verified by ShareYourSpace' :
                            space.compliance[selectedComplianceStandard]?.level === 'documented' ? 'Documentation provided' :
                            'Self-declared by provider'}
                          </p>
                          {space.compliance[selectedComplianceStandard]?.verifiedDate && (
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 transition-colors duration-200">
                              <span className="font-medium">Last Verification:</span> {new Date(space.compliance[selectedComplianceStandard].verifiedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-dark-bg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse transition-colors duration-200">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 dark:bg-dark-primary-600 text-base font-medium text-white hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                    onClick={() => setComplianceDetailModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceDetailPage;