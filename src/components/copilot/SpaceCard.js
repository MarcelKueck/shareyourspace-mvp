import React from 'react';
import { Link } from 'react-router-dom';

const SpaceCard = ({ space }) => {
  return (
    <div className="flex bg-gray-50 dark:bg-dark-bg rounded-lg overflow-hidden border border-gray-100 dark:border-dark-bg-light transition-colors duration-200">
      <div className="w-24 h-20 flex-shrink-0">
        <img 
          src={space.imageUrl} 
          alt={space.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-2 flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-sm text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
            {space.name}
          </h4>
          
          <span className="text-primary-600 dark:text-dark-primary-500 font-medium text-sm transition-colors duration-200">
            €{space.price}
          </span>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-dark-text-muted mt-1 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {space.location}
        </div>
        
        <div className="flex space-x-1 mt-2">
          {space.amenities && space.amenities.slice(0, 2).map((amenity, index) => (
            <span key={index} className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-bg-light text-gray-800 dark:text-dark-text-secondary transition-colors duration-200">
              {amenity}
            </span>
          ))}
          {space.amenities && space.amenities.length > 2 && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-bg-light text-gray-600 dark:text-dark-text-muted transition-colors duration-200">
              +{space.amenities.length - 2} more
            </span>
          )}
        </div>
        
        <div className="mt-2 text-right">
          <Link 
            to={`/space/${space.id}`} 
            className="text-xs font-medium text-primary-600 dark:text-dark-primary-500 hover:text-primary-700 dark:hover:text-dark-primary-400 transition-colors duration-200"
          >
            View details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;