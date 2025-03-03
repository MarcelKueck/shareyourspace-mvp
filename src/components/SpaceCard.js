import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles/darkMode';

const SpaceCard = ({ space }) => {
  return (
    <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-48 overflow-hidden">
        <img 
          className="absolute inset-0 h-full w-full object-cover"
          src={space.imageUrl} 
          alt={space.name} 
        />
        {space.featured && (
          <div className="absolute top-0 right-0 bg-primary-500 dark:bg-dark-primary-500 text-white text-xs font-bold px-3 py-1 m-1 rounded-full transition-colors duration-200">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {space.location}
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-2 transition-colors duration-200">{space.name}</h3>
        <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-4 line-clamp-2 transition-colors duration-200">{space.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {space.amenities.map((amenity, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 dark:bg-dark-bg text-secondary-800 dark:text-dark-text-primary transition-colors duration-200">
              {amenity}
            </span>
          ))}
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <p className="text-primary-600 dark:text-dark-primary-500 font-bold text-lg transition-colors duration-200">€{space.price}</p>
            <p className="text-gray-500 dark:text-dark-text-secondary text-xs transition-colors duration-200">{space.priceUnit}</p>
          </div>
          <Link 
            to={`/space/${space.id}`}
            className="px-3 py-2 bg-primary-500 dark:bg-dark-primary-500 hover:bg-primary-600 dark:hover:bg-dark-primary-600 text-white text-sm font-medium rounded-md transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;