import React, { useState } from 'react';

const PilotTeamMembers = () => {
  // Mock team members data - would come from API in real implementation
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'Pilot Lead',
      department: 'Innovation',
      status: 'active',
      lastActive: '2 hours ago',
      permissions: 'admin'
    },
    {
      id: 2,
      name: 'Michael Weber',
      email: 'michael.weber@example.com',
      role: 'Department Head',
      department: 'Digital Ventures',
      status: 'active',
      lastActive: '1 day ago',
      permissions: 'manager'
    },
    {
      id: 3,
      name: 'Thomas Müller',
      email: 'thomas.muller@example.com',
      role: 'IT Specialist',
      department: 'IT',
      status: 'active',
      lastActive: '3 hours ago',
      permissions: 'standard'
    },
    {
      id: 4,
      name: 'Anna Schmidt',
      email: 'anna.schmidt@example.com',
      role: 'Project Manager',
      department: 'Innovation',
      status: 'active',
      lastActive: '5 hours ago',
      permissions: 'standard'
    },
    {
      id: 5,
      name: 'Robert Fischer',
      email: 'robert.fischer@example.com',
      role: 'Security Officer',
      department: 'Security',
      status: 'pending',
      lastActive: 'Never',
      permissions: 'standard'
    }
  ]);
  
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    permissions: 'standard'
  });
  
  // Function to handle status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'inactive':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };
  
  // Function to handle permissions badge color
  const getPermissionBadgeColor = (permissions) => {
    switch (permissions) {
      case 'admin':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      case 'manager':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'standard':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };
  
  // Function to handle member removal
  const handleRemoveMember = (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };
  
  // Function to handle new member form change
  const handleNewMemberChange = (e) => {
    const { name, value } = e.target;
    setNewMember({
      ...newMember,
      [name]: value
    });
  };
  
  // Function to handle adding a new member
  const handleAddMember = (e) => {
    e.preventDefault();
    
    const newId = Math.max(...teamMembers.map(member => member.id)) + 1;
    const memberToAdd = {
      ...newMember,
      id: newId,
      status: 'pending',
      lastActive: 'Never'
    };
    
    setTeamMembers([...teamMembers, memberToAdd]);
    setNewMember({
      name: '',
      email: '',
      role: '',
      department: '',
      permissions: 'standard'
    });
    setShowAddMemberModal(false);
  };
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-1 transition-colors duration-200">
            Team Members
          </h2>
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
            Manage users with access to the pilot program
          </p>
        </div>
        <button
          onClick={() => setShowAddMemberModal(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Add Team Member
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            className="shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 block w-full sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
            placeholder="Search team members..."
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <select className="block w-full max-w-[140px] shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200">
            <option value="all">All Roles</option>
            <option value="lead">Pilot Lead</option>
            <option value="department">Department Head</option>
            <option value="it">IT Specialist</option>
            <option value="project">Project Manager</option>
            <option value="security">Security Officer</option>
          </select>
          
          <select className="block w-full max-w-[140px] shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      {/* Team Members Table */}
      <div className="overflow-x-auto shadow border-b border-gray-200 dark:border-dark-bg rounded-lg transition-colors duration-200">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
          <thead className="bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Last Active
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider transition-colors duration-200">
                Permissions
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-bg-light divide-y divide-gray-200 dark:divide-dark-bg transition-colors duration-200">
            {teamMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-dark-primary-900 flex items-center justify-center transition-colors duration-200">
                      <span className="text-primary-600 dark:text-dark-primary-400 font-medium transition-colors duration-200">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                        {member.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{member.role}</div>
                  <div className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">{member.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(member.status)}`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                  {member.lastActive}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPermissionBadgeColor(member.permissions)}`}>
                    {member.permissions.charAt(0).toUpperCase() + member.permissions.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary-600 dark:text-dark-primary-500 hover:text-primary-900 dark:hover:text-dark-primary-400 mr-3 transition-colors duration-200">
                    Edit
                  </button>
                  <button 
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Add Team Member Modal */}
      {showAddMemberModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-dark-bg-light rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full transition-colors duration-200">
              <form onSubmit={handleAddMember}>
                <div className="bg-white dark:bg-dark-bg-light px-4 pt-5 pb-4 sm:p-6 sm:pb-4 transition-colors duration-200">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-dark-primary-900 sm:mx-0 sm:h-10 sm:w-10 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-dark-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200" id="modal-title">
                        Add Team Member
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
                          Add a new team member to the pilot program.
                        </p>
                      </div>
                      <div className="mt-6 space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={newMember.name}
                            onChange={handleNewMemberChange}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={newMember.email}
                            onChange={handleNewMemberChange}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                            Role
                          </label>
                          <input
                            type="text"
                            name="role"
                            id="role"
                            required
                            value={newMember.role}
                            onChange={handleNewMemberChange}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                            Department
                          </label>
                          <input
                            type="text"
                            name="department"
                            id="department"
                            required
                            value={newMember.department}
                            onChange={handleNewMemberChange}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <label htmlFor="permissions" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                            Permissions
                          </label>
                          <select
                            name="permissions"
                            id="permissions"
                            required
                            value={newMember.permissions}
                            onChange={handleNewMemberChange}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 sm:text-sm border-gray-300 dark:border-dark-bg rounded-md dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                          >
                            <option value="standard">Standard</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                          </select>
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
                    Add Member
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddMemberModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-bg shadow-sm px-4 py-2 bg-white dark:bg-dark-bg-light text-base font-medium text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
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

export default PilotTeamMembers;