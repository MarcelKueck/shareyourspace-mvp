import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ComplianceStatus from '../components/compliance/ComplianceStatus';
import ComplianceBadge from '../components/compliance/ComplianceBadge';
import ComplianceDocument from '../components/compliance/ComplianceDocument';
import { complianceStandards, verificationLevels, getEnhancedComplianceData } from '../services/complianceService';

const ComplianceDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [documentPreview, setDocumentPreview] = useState(null);
  
  // Get mock data for the sample space
  // In a real implementation, this would fetch from an API
  const sampleSpace = {
    id: 1,
    name: "BMW Innovation Hub",
    compliance: {
      dataProtection: {
        level: 'certified',
        verifiedDate: '2025-01-15',
        verifiedBy: 'TÜV Süd',
        documents: ['doc-123']
      },
      nda: {
        level: 'verified',
        verifiedDate: '2024-11-20',
        verifiedBy: 'ShareYourSpace',
        documents: []
      },
      iso27001: {
        level: 'verified',
        verifiedDate: '2024-11-20',
        verifiedBy: 'ShareYourSpace',
        documents: ['doc-124']
      },
      networkSecurity: {
        level: 'documented',
        verifiedDate: null,
        verifiedBy: null,
        documents: ['doc-125']
      },
      physicalSecurity: {
        level: 'self-declared',
        verifiedDate: null,
        verifiedBy: null,
        documents: []
      }
    }
  };
  
  // Get enhanced compliance data
  const complianceData = getEnhancedComplianceData(sampleSpace.id);
  
  // Handle file selection for document upload
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setDocumentFile(file);
    
    // Create a preview URL for the document if it's an image
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDocumentPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setDocumentPreview(null);
    }
    
    // Use the filename as default document name
    if (!documentName) {
      setDocumentName(file.name);
    }
  };
  
  // Handle document upload submission
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    
    // In a real implementation, this would upload the file to a server
    console.log('Uploading document:', {
      name: documentName,
      file: documentFile,
      standard: selectedStandard
    });
    
    // Reset form and close modal
    setDocumentFile(null);
    setDocumentName('');
    setDocumentPreview(null);
    setSelectedStandard('');
    setUploadModalOpen(false);
    
    // Show success notification
    alert('Document uploaded successfully!');
  };
  
  // Handle document view
  const handleViewDocument = (document) => {
    // In a real implementation, this would open a document viewer
    console.log('Viewing document:', document);
    alert(`Viewing document: ${document.name}`);
  };
  
  // Handle document download
  const handleDownloadDocument = (document) => {
    // In a real implementation, this would download the document
    console.log('Downloading document:', document);
    alert(`Downloading document: ${document.name}`);
  };
  
  return (
    <div className="bg-gray-50 dark:bg-dark-bg-light min-h-screen transition-colors duration-200">
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
                <Link to="/dashboard" className="ml-4 text-gray-400 hover:text-gray-500">
                  Dashboard
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <span className="ml-4 text-gray-500 font-medium">
                  Compliance Dashboard
                </span>
              </div>
            </li>
          </ol>
        </nav>
        
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary sm:text-3xl transition-colors duration-200">
              Compliance Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
              Manage, monitor, and verify compliance for your workspaces
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => setUploadModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
              </svg>
              Upload Documentation
            </button>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-dark-bg-light mb-6 transition-colors duration-200">
          <div className="flex space-x-8">
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'documents'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'verifications'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('verifications')}
            >
              Verification History
            </button>
            <button
              className={`pb-4 px-1 text-sm font-medium ${
                activeTab === 'settings'
                  ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                  : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
              } transition-colors duration-200`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white dark:bg-dark-bg-light shadow-md rounded-lg overflow-hidden transition-colors duration-200">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Compliance Summary */}
                <div className="lg:col-span-2">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">Compliance Summary</h2>
                  
                  <div className="mb-6">
                    <ComplianceStatus space={sampleSpace} detailed={true} />
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-dark-bg rounded-md p-4 mb-6 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Compliance Status</h3>
                      <span className="px-2 py-1 text-xs rounded-md bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 transition-colors duration-200">
                        Enterprise-Verified
                      </span>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Last Audit</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{complianceData.lastAudit}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Next Audit</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{complianceData.nextAudit}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3 transition-colors duration-200">Your Compliance Standards</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(sampleSpace.compliance).map(([standardId, value]) => {
                      const standard = complianceStandards[standardId];
                      if (!standard) return null;
                      
                      return (
                        <div key={standardId} className="flex items-center p-3 bg-gray-50 dark:bg-dark-bg rounded-md border border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
                          <ComplianceBadge standardId={standardId} level={value.level} />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{standard.name}</p>
                            <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                              {value.level === 'certified' ? 'Certified' :
                              value.level === 'verified' ? 'Verified' :
                              value.level === 'documented' ? 'Documented' :
                              'Self-Declared'}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Recent Activity & Contact */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">Recent Activity</h2>
                  
                  <div className="border border-gray-200 dark:border-dark-bg rounded-md mb-6 transition-colors duration-200">
                    <div className="divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
                      {complianceData.verificationHistory.map((activity, index) => (
                        <div key={index} className="p-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <ComplianceBadge standardId={activity.standard} level={activity.level} size="sm" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                                {activity.standard === 'dataProtection' ? 'Data Protection' :
                                 activity.standard === 'iso27001' ? 'ISO 27001' :
                                 activity.standard === 'networkSecurity' ? 'Network Security' :
                                 activity.standard}
                                <span className="font-medium"> {activity.level === 'certified' ? 'certified' :
                                                                  activity.level === 'verified' ? 'verified' :
                                                                  activity.level === 'documented' ? 'documentation submitted' :
                                                                  'self-declared'}</span>
                              </p>
                              <p className="text-xs text-gray-500 dark:text-dark-text-secondary mt-1 transition-colors duration-200">
                                {activity.date} • {activity.verifier}
                              </p>
                              {activity.notes && (
                                <p className="text-xs text-gray-600 dark:text-dark-text-secondary mt-1 transition-colors duration-200">
                                  {activity.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-3 bg-gray-50 dark:bg-dark-bg border-t border-gray-200 dark:border-dark-bg-light text-center transition-colors duration-200">
                      <button className="text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 font-medium transition-colors duration-200">
                        View All Activity
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3 transition-colors duration-200">Compliance Contact</h3>
                  
                  <div className="bg-gray-50 dark:bg-dark-bg rounded-md p-4 border border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
                    <h4 className="font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{complianceData.complianceContact.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">{complianceData.complianceContact.title}</p>
                    <div className="mt-3 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                      <p className="flex items-center mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400 dark:text-dark-text-muted transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {complianceData.complianceContact.email}
                      </p>
                      <p className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400 dark:text-dark-text-muted transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {complianceData.complianceContact.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-md border border-blue-200 dark:border-blue-800 transition-colors duration-200">
                  <h3 className="text-base font-medium text-blue-800 dark:text-blue-300 transition-colors duration-200">Request Verification</h3>
                  <p className="mt-1 text-sm text-blue-600 dark:text-blue-400 transition-colors duration-200">
                    Upgrade your compliance status with official verification from our compliance team.
                  </p>
                  <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                    Start Verification →
                  </button>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-4 rounded-md border border-green-200 dark:border-green-800 transition-colors duration-200">
                  <h3 className="text-base font-medium text-green-800 dark:text-green-300 transition-colors duration-200">Compliance Badge</h3>
                  <p className="mt-1 text-sm text-green-600 dark:text-green-400 transition-colors duration-200">
                    Download your verified compliance badge to use on your website and marketing materials.
                  </p>
                  <button className="mt-3 text-sm text-green-600 dark:text-green-400 font-medium hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200">
                    Get Badge →
                  </button>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 p-4 rounded-md border border-purple-200 dark:border-purple-800 transition-colors duration-200">
                  <h3 className="text-base font-medium text-purple-800 dark:text-purple-300 transition-colors duration-200">Compliance Report</h3>
                  <p className="mt-1 text-sm text-purple-600 dark:text-purple-400 transition-colors duration-200">
                    Generate a detailed compliance report to share with your customers and partners.
                  </p>
                  <button className="mt-3 text-sm text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200">
                    Generate Report →
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Compliance Documents</h2>
                
                <button
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
                  onClick={() => setUploadModalOpen(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Upload Document
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex space-x-2 mb-4">
                  <button className="px-3 py-1 bg-primary-100 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400 text-sm font-medium rounded-md transition-colors duration-200">
                    All Documents
                  </button>
                  <button className="px-3 py-1 bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-dark-bg border border-gray-300 dark:border-dark-bg transition-colors duration-200">
                    Verified
                  </button>
                  <button className="px-3 py-1 bg-white dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-dark-bg border border-gray-300 dark:border-dark-bg transition-colors duration-200">
                    Pending
                  </button>
                </div>
                
                {/* Document list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {complianceData.documents.map((document) => (
                    <ComplianceDocument 
                      key={document.id} 
                      document={document} 
                      onView={handleViewDocument}
                      onDownload={handleDownloadDocument}
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-dark-bg rounded-md p-4 border border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
                <h3 className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">Required Documents</h3>
                
                <div className="space-y-2">
                  {['Privacy Policy', 'Data Processing Agreement', 'ISO 27001 Certificate'].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {/* Status icon */}
                        {index < 2 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        
                        <span className="ml-2 text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">{doc}</span>
                      </div>
                      
                      {/* Upload button (if missing) */}
                      {index >= 2 && (
                        <button 
                          className="text-xs text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 font-medium transition-colors duration-200"
                          onClick={() => {
                            setSelectedStandard(index === 2 ? 'iso27001' : 'dataProtection');
                            setUploadModalOpen(true);
                          }}
                        >
                          Upload
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Verification History Tab */}
          {activeTab === 'verifications' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">Verification History</h2>
              
              <div className="bg-white dark:bg-dark-bg-light border border-gray-200 dark:border-dark-bg rounded-md overflow-hidden transition-colors duration-200">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
                  <thead className="bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                        Standard
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                        Level
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                        Verifier
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {complianceData.verificationHistory.map((history, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-dark-bg-light' : 'bg-gray-50 dark:bg-dark-bg'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                          {history.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <ComplianceBadge standardId={history.standard} level={history.level} size="sm" />
                            <span className="ml-2 text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                              {complianceStandards[history.standard]?.name || history.standard}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            history.level === 'certified' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                            history.level === 'verified' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                            history.level === 'documented' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                            'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          } transition-colors duration-200`}>
                            {history.level.charAt(0).toUpperCase() + history.level.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                          {history.verifier}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                          {history.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">Request New Verification</h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4 transition-colors duration-200">
                  Need to upgrade your compliance level or verify a new standard? Request a verification from our compliance team.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="standard" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1 transition-colors duration-200">
                      Compliance Standard
                    </label>
                    <select
                      id="standard"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary sm:text-sm transition-colors duration-200"
                    >
                      <option value="">Select a standard</option>
                      {Object.entries(complianceStandards).map(([id, standard]) => (
                        <option key={id} value={id}>{standard.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1 transition-colors duration-200">
                      Verification Level
                    </label>
                    <select
                      id="level"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary sm:text-sm transition-colors duration-200"
                    >
                      <option value="">Select a level</option>
                      {Object.entries(verificationLevels).map(([level, info]) => (
                        <option key={level} value={level}>{info.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200">
                    Request Verification
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">Compliance Settings</h2>
              
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">Compliance Contact</h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-4 transition-colors duration-200">
                    This person will receive all compliance-related communications and verification requests.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                        Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        className="mt-1 block w-full border border-gray-300 dark:border-dark-bg rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary sm:text-sm transition-colors duration-200"
                        defaultValue={complianceData.complianceContact.name}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contact-title" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                        Title
                      </label>
                      <input
                        type="text"
                        id="contact-title"
                        className="mt-1 block w-full border border-gray-300 dark:border-dark-bg rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary sm:text-sm transition-colors duration-200"
                        defaultValue={complianceData.complianceContact.title}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                        Email
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        className="mt-1 block w-full border border-gray-300 dark:border-dark-bg rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary sm:text-sm transition-colors duration-200"
                        defaultValue={complianceData.complianceContact.email}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                        Phone
                      </label>
                      <input
                        type="text"
                        id="contact-phone"
                        className="mt-1 block w-full border border-gray-300 dark:border-dark-bg rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary sm:text-sm transition-colors duration-200"
                        defaultValue={complianceData.complianceContact.phone}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Notification Preferences */}
                <div className="border-t border-gray-200 dark:border-dark-bg pt-6 transition-colors duration-200">
                  <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="verification-notifications"
                          name="verification-notifications"
                          type="checkbox"
                          className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 h-4 w-4 text-primary-600 dark:text-dark-primary-600 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="verification-notifications" className="font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          Verification status updates
                        </label>
                        <p className="text-gray-500 dark:text-dark-text-muted transition-colors duration-200">
                          Receive notifications about changes to your compliance verification status.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="document-notifications"
                          name="document-notifications"
                          type="checkbox"
                          className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 h-4 w-4 text-primary-600 dark:text-dark-primary-600 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="document-notifications" className="font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          Document status updates
                        </label>
                        <p className="text-gray-500 dark:text-dark-text-muted transition-colors duration-200">
                          Receive notifications when your compliance documents are approved or rejected.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="expiration-notifications"
                          name="expiration-notifications"
                          type="checkbox"
                          className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 h-4 w-4 text-primary-600 dark:text-dark-primary-600 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="expiration-notifications" className="font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          Certification expiration reminders
                        </label>
                        <p className="text-gray-500 dark:text-dark-text-muted transition-colors duration-200">
                          Receive reminders when your compliance certifications are about to expire.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Privacy Settings */}
                <div className="border-t border-gray-200 dark:border-dark-bg pt-6 transition-colors duration-200">
                  <h3 className="text-md font-medium text-gray-900 dark:text-dark-text-primary mb-3 transition-colors duration-200">Privacy Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="public-compliance"
                          name="public-compliance"
                          type="checkbox"
                          className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 h-4 w-4 text-primary-600 dark:text-dark-primary-600 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="public-compliance" className="font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          Public compliance information
                        </label>
                        <p className="text-gray-500 dark:text-dark-text-muted transition-colors duration-200">
                          Allow your compliance status and certifications to be visible to other users.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="verification-details"
                          name="verification-details"
                          type="checkbox"
                          className="focus:ring-primary-500 dark:focus:ring-dark-primary-500 h-4 w-4 text-primary-600 dark:text-dark-primary-600 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="verification-details" className="font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                          Show verification details
                        </label>
                        <p className="text-gray-500 dark:text-dark-text-muted transition-colors duration-200">
                          Display detailed information about your verification status and history.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-5 border-t border-gray-200 dark:border-dark-bg transition-colors duration-200">
                  <div className="flex justify-end">
                    <button type="button" className="bg-white dark:bg-dark-bg py-2 px-4 border border-gray-300 dark:border-dark-bg-light rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200">
                      Cancel
                    </button>
                    <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Document Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-dark-bg-light rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full transition-colors duration-200">
              <form onSubmit={handleUploadSubmit}>
                <div className="bg-white dark:bg-dark-bg-light px-4 pt-5 pb-4 sm:p-6 sm:pb-4 transition-colors duration-200">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-dark-primary-900 sm:mx-0 sm:h-10 sm:w-10 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-dark-primary-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200" id="modal-title">
                        Upload Compliance Document
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                          Upload documentation to support your compliance verification.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="document-standard" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                        Compliance Standard
                      </label>
                      <select
                        id="document-standard"
                        className="mt-1 block w-full bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-bg rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm transition-colors duration-200"
                        value={selectedStandard}
                        onChange={(e) => setSelectedStandard(e.target.value)}
                        required
                      >
                        <option value="">Select a standard</option>
                        {Object.entries(complianceStandards).map(([id, standard]) => (
                          <option key={id} value={id}>{standard.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="document-name" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                        Document Name
                      </label>
                      <input
                        type="text"
                        id="document-name"
                        className="mt-1 block w-full border border-gray-300 dark:border-dark-bg rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary sm:text-sm transition-colors duration-200"
                        placeholder="e.g., Data Processing Agreement"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                        Document File
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-dark-bg border-dashed rounded-md transition-colors duration-200">
                        <div className="space-y-1 text-center">
                          {documentPreview ? (
                            <div className="flex flex-col items-center">
                              <img src={documentPreview} alt="Document preview" className="h-24 object-cover mb-2" />
                              <p className="text-sm text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
                                {documentFile.name}
                              </p>
                            </div>
                          ) : (
                            <>
                              <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-dark-text-muted transition-colors duration-200" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <div className="flex text-sm text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-dark-bg rounded-md font-medium text-primary-600 dark:text-dark-primary-500 hover:text-primary-500 dark:hover:text-dark-primary-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 dark:focus-within:ring-dark-primary-500 transition-colors duration-200">
                                  <span>Upload a file</span>
                                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileSelect} required />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-dark-text-muted transition-colors duration-200">
                                PDF, DOC, DOCX, JPG, PNG up to 10MB
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-dark-bg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse transition-colors duration-200">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 dark:bg-dark-primary-600 text-base font-medium text-white hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-bg-light shadow-sm px-4 py-2 bg-white dark:bg-dark-bg-light text-base font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                    onClick={() => setUploadModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceDashboardPage;