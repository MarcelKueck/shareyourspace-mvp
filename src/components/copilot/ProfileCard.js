import React from 'react';

const ProfileCard = ({ profile }) => {
  return (
    <div className="flex bg-gray-50 dark:bg-dark-bg rounded-lg overflow-hidden border border-gray-100 dark:border-dark-bg-light transition-colors duration-200">
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center m-3">
        {profile.avatarUrl ? (
          <img 
            src={profile.avatarUrl} 
            alt={profile.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-primary-100 dark:bg-dark-primary-900 flex items-center justify-center transition-colors duration-200">
            <span className="text-primary-600 dark:text-dark-primary-400 font-medium text-sm transition-colors duration-200">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
              {profile.name}
            </h4>
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
              {profile.title} at {profile.company}
            </p>
          </div>
          
          <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium 
                         ${profile.type === 'Corporate' 
                           ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' 
                           : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'} 
                         transition-colors duration-200`}>
            {profile.type}
          </span>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-1">
          {profile.interests && profile.interests.slice(0, 3).map((interest, index) => (
            <span key={index} className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-bg-light text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
              {interest}
            </span>
          ))}
          {profile.interests && profile.interests.length > 3 && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-bg-light text-gray-600 dark:text-dark-text-muted transition-colors duration-200">
              +{profile.interests.length - 3}
            </span>
          )}
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          <button 
            className="text-xs font-medium text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 transition-colors duration-200"
            onClick={() => console.log('View profile:', profile.id)}
          >
            View profile
          </button>
          
          <button 
            className="px-2 py-1 text-xs font-medium bg-primary-50 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400 rounded hover:bg-primary-100 dark:hover:bg-dark-primary-800 transition-colors duration-200"
            onClick={() => console.log('Connect with:', profile.id)}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;