import React, { useState } from 'react';
import ConnectionMetrics from './ConnectionMetrics';

const MatchingDashboard = ({ connections, updateConnectionStatus, deleteConnection }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [outcomeInput, setOutcomeInput] = useState('');
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [selectedConnectionId, setSelectedConnectionId] = useState(null);
  
  // Filter connections based on status
  const filteredConnections = connections.filter(connection => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return connection.status === 'pending';
    if (activeTab === 'connected') return connection.status === 'connected';
    if (activeTab === 'completed') return connection.status === 'completed';
    return true;
  });
  
  // Get counts for each status
  const statusCounts = {
    all: connections.length,
    pending: connections.filter(c => c.status === 'pending').length,
    connected: connections.filter(c => c.status === 'connected').length,
    completed: connections.filter(c => c.status === 'completed').length
  };
  
  // Open the outcome modal
  const openOutcomeModal = (connectionId) => {
    setSelectedConnectionId(connectionId);
    setOutcomeInput('');
    setShowOutcomeModal(true);
  };
  
  // Submit the outcome
  const submitOutcome = () => {
    if (outcomeInput.trim()) {
      updateConnectionStatus(selectedConnectionId, 'connected', outcomeInput.trim());
      setShowOutcomeModal(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md overflow-hidden transition-colors duration-200">
      {/* Metrics Section */}
      <div className="p-6 border-b border-gray-200 dark:border-dark-bg transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">My Connections</h2>
        
        <ConnectionMetrics connections={connections} />
      </div>
      
      {/* Tabs */}
      <div className="px-6 pt-4 border-b border-gray-200 dark:border-dark-bg transition-colors duration-200">
        <div className="flex space-x-8">
          <button
            className={`pb-4 px-1 text-sm font-medium ${
              activeTab === 'all'
                ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('all')}
          >
            All
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-dark-text-primary">
              {statusCounts.all}
            </span>
          </button>
          <button
            className={`pb-4 px-1 text-sm font-medium ${
              activeTab === 'pending'
                ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
              {statusCounts.pending}
            </span>
          </button>
          <button
            className={`pb-4 px-1 text-sm font-medium ${
              activeTab === 'connected'
                ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('connected')}
          >
            Active
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
              {statusCounts.connected}
            </span>
          </button>
          <button
            className={`pb-4 px-1 text-sm font-medium ${
              activeTab === 'completed'
                ? 'text-primary-600 dark:text-dark-primary-500 border-b-2 border-primary-500 dark:border-dark-primary-500'
                : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary hover:border-gray-300 dark:hover:border-dark-text-muted'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {statusCounts.completed}
            </span>
          </button>
        </div>
      </div>
      
      {/* Connection List */}
      <div className="divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
        {filteredConnections.length > 0 ? (
          filteredConnections.map(connection => (
            <div key={connection.id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="h-14 w-14 rounded-full bg-primary-100 dark:bg-dark-primary-900 flex items-center justify-center overflow-hidden mr-4 transition-colors duration-200">
                  {connection.profile.avatarUrl ? (
                    <img src={connection.profile.avatarUrl} alt={connection.profile.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-primary-600 dark:text-dark-primary-400 text-xl font-bold transition-colors duration-200">
                      {connection.profile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                    {connection.profile.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                    {connection.profile.title} at {connection.profile.company}
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200 mr-2">
                        Match quality:
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          connection.matchScore >= 80
                            ? 'text-green-600 dark:text-green-400'
                            : connection.matchScore >= 60
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-orange-600 dark:text-orange-400'
                        } transition-colors duration-200`}
                      >
                        {connection.matchScore}%
                      </span>
                    </div>
                    <span className="mx-2 text-gray-300 dark:text-dark-bg-light transition-colors duration-200">•</span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        connection.status === 'pending'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : connection.status === 'connected'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      } transition-colors duration-200`}
                    >
                      {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                {/* Status-specific actions */}
                {connection.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateConnectionStatus(connection.id, 'connected')}
                      className="px-3 py-1 bg-green-600 dark:bg-green-700 text-white text-sm rounded hover:bg-green-700 dark:hover:bg-green-800 transition-colors duration-200"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => deleteConnection(connection.id)}
                      className="px-3 py-1 bg-red-600 dark:bg-red-700 text-white text-sm rounded hover:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200"
                    >
                      Decline
                    </button>
                  </div>
                )}
                
                {connection.status === 'connected' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openOutcomeModal(connection.id)}
                      className="px-3 py-1 bg-blue-600 dark:bg-blue-700 text-white text-sm rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200"
                    >
                      Add Outcome
                    </button>
                    <button
                      onClick={() => updateConnectionStatus(connection.id, 'completed')}
                      className="px-3 py-1 bg-purple-600 dark:bg-purple-700 text-white text-sm rounded hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors duration-200"
                    >
                      Mark Complete
                    </button>
                  </div>
                )}
                
                {connection.status === 'completed' && (
                  <button
                    onClick={() => updateConnectionStatus(connection.id, 'connected')}
                    className="px-3 py-1 bg-gray-600 dark:bg-gray-700 text-white text-sm rounded hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    Reactivate
                  </button>
                )}
                
                {/* Connection details button */}
                <button
                  className="px-3 py-1 text-sm text-primary-600 dark:text-dark-primary-500 hover:text-primary-800 dark:hover:text-dark-primary-400 transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-dark-text-muted transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">No connections found</h3>
            <p className="mt-2 text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
              {activeTab === 'all' 
                ? "You haven't connected with anyone yet. Use InnovationMatch to find potential business partners."
                : `You don't have any ${activeTab} connections.`}
            </p>
          </div>
        )}
      </div>
      
      {/* Add Outcome Modal */}
      {showOutcomeModal && (
        <div className="fixed inset-0 overflow-y-auto z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-dark-bg-light rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full transition-colors duration-200">
              <div className="bg-white dark:bg-dark-bg-light px-4 pt-5 pb-4 sm:p-6 sm:pb-4 transition-colors duration-200">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 sm:mx-0 sm:h-10 sm:w-10 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200" id="modal-title">
                      Add Connection Outcome
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                        Record a positive outcome or progress from this business connection.
                      </p>
                      <input
                        type="text"
                        className="mt-4 w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                        placeholder="e.g., 'Initial meeting scheduled', 'Started pilot project'"
                        value={outcomeInput}
                        onChange={(e) => setOutcomeInput(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-dark-bg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse transition-colors duration-200">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-blue-700 text-base font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                  onClick={submitOutcome}
                >
                  Add Outcome
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-bg-light shadow-sm px-4 py-2 bg-white dark:bg-dark-bg-light text-base font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                  onClick={() => setShowOutcomeModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchingDashboard;