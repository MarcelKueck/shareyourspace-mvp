import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  // Mock profile data
  const profile = {
    name: "John Doe",
    title: "CEO & Founder",
    company: "TechStartup GmbH",
    email: "john.doe@example.com",
    bio: "Founder of a B2B SaaS startup specializing in enterprise workflow automation. Looking to connect with corporate innovation teams in manufacturing and finance.",
    interests: ["Cloud Infrastructure", "Workflow Automation", "Enterprise Software", "AI", "Data Security"],
    lookingFor: "Partnerships with corporate innovation teams for pilot projects and proof-of-concept implementations."
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  Profile
                </span>
              </div>
            </li>
          </ol>
        </nav>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and business interests.</p>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Back to Dashboard
            </Link>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-6">
                <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 text-2xl font-bold">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                  <p className="text-gray-600">{profile.title} at {profile.company}</p>
                </div>
              </div>
              
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 mb-8">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profile.name}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profile.email}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Company</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profile.company}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Job title</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profile.title}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Bio</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profile.bio}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Business Interests</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Looking for</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profile.lookingFor}</dd>
                </div>
              </dl>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Profile Visibility</h3>
                  <div className="flex items-center">
                    <span className="mr-3 text-sm font-medium text-gray-900">Private</span>
                    <button
                      type="button"
                      className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-600"
                      role="switch"
                      aria-checked="true"
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-5"
                      ></span>
                    </button>
                    <span className="ml-3 text-sm font-medium text-gray-900">Public</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  When your profile is public, your details are visible to other users for potential business connections through InnovationMatch.
                </p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-3"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow sm:rounded-lg mt-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Delete profile</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Permanently remove your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
              >
                Delete profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;