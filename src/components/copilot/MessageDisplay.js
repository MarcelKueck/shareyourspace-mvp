import React from 'react';
import SpaceCard from './SpaceCard';
import ProfileCard from './ProfileCard';
import { Link } from 'react-router-dom';

const MessageDisplay = ({ message }) => {
  const { sender, text, timestamp, cards, profiles, commands, bulletPoints, actions, isCommand, error } = message;
  
  const isCopilot = sender === 'copilot';
  
  return (
    <div className={`flex mb-4 ${isCopilot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[90%] ${isCopilot ? 'bg-white dark:bg-dark-bg-light' : 'bg-primary-600 dark:bg-dark-primary-600 text-white'} 
                        ${error ? 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800 text-red-800 dark:text-red-100' : ''}
                        rounded-lg shadow-sm p-4 border border-gray-100 dark:border-dark-bg transition-colors duration-200`}>
        
        {/* Command indication */}
        {isCommand && (
          <div className="text-xs font-mono text-gray-400 dark:text-dark-text-muted mb-1 transition-colors duration-200">
            {text}
          </div>
        )}
        
        {/* Main message text */}
        {text && (
          <p className={`text-base leading-relaxed ${isCopilot ? 'text-gray-800 dark:text-dark-text-primary' : 'text-white'} transition-colors duration-200`}>
            {text}
          </p>
        )}
        
        {/* Bullet points */}
        {bulletPoints && bulletPoints.length > 0 && (
          <ul className="mt-2 space-y-1 pl-5 list-disc">
            {bulletPoints.map((point, index) => (
              <li key={index} className="text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                {point}
              </li>
            ))}
          </ul>
        )}
        
        {/* Space cards */}
        {cards && cards.length > 0 && (
          <div className="mt-3 space-y-3">
            {cards.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        )}
        
        {/* Profile cards */}
        {profiles && profiles.length > 0 && (
          <div className="mt-3 space-y-3">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}
        
        {/* Commands */}
        {commands && commands.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">Available commands:</p>
            {commands.map((cmd, index) => (
              <div key={index} className="flex flex-col py-1 px-2 bg-gray-50 dark:bg-dark-bg rounded-md transition-colors duration-200">
                <code className="text-sm font-mono text-primary-700 dark:text-dark-primary-400 transition-colors duration-200">
                  {cmd.command}
                </code>
                <span className="text-xs text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
                  {cmd.description}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {/* Action buttons */}
        {actions && actions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {actions.map((action, index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm font-medium bg-primary-50 dark:bg-dark-primary-900 text-primary-700 dark:text-dark-primary-400 rounded-md hover:bg-primary-100 dark:hover:bg-dark-primary-800 transition-colors duration-200"
                onClick={() => console.log('Action clicked:', action.action, action.data)}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
        
        {/* Timestamp */}
        <div className="mt-2 text-xs text-gray-400 dark:text-dark-text-muted transition-colors duration-200">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;