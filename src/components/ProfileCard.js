import React from 'react';
import { styles } from '../styles/darkMode';

const ProfileCard = ({ profile, onConnect }) => {
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-dark-primary-900 flex items-center justify-center overflow-hidden mr-4 transition-colors duration-200">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-primary-600 dark:text-dark-primary-400 text-xl font-bold transition-colors duration-200">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">{profile.name}</h3>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">{profile.title} at {profile.company}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-2 transition-colors duration-200">{profile.bio}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.interests.map((interest, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 dark:bg-dark-bg text-secondary-800 dark:text-dark-text-primary transition-colors duration-200">
                {interest}
              </span>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-dark-bg transition-colors duration-200">
          <h4 className="text-sm font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">Looking for:</h4>
          <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4 transition-colors duration-200">{profile.lookingFor}</p>
          
          <button
            onClick={() => onConnect(profile.id)}
            className="w-full px-4 py-2 bg-primary-500 dark:bg-dark-primary-500 hover:bg-primary-600 dark:hover:bg-dark-primary-600 text-white text-sm font-medium rounded-md transition-colors duration-200"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;