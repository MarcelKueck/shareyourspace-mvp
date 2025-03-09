import React, { useState } from 'react';
import { spaces } from '../data/spaces';
import SpaceCard from '../components/SpaceCard';
import ComplianceFilter from '../components/compliance/ComplianceFilter';
import { filterSpacesByCompliance, calculateComplianceScore } from '../services/complianceService';
import { styles } from '../styles/darkMode';

const ExplorePage = () => {
  const [filters, setFilters] = useState({
    location: '',
    amenities: [],
    priceRange: [0, 100],
    complianceFilters: {}
  });
  
  const [expandedComplianceFilters, setExpandedComplianceFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Available filter options
  const locations = [...new Set(spaces.map(space => space.location))];
  const amenitiesList = [...new Set(spaces.flatMap(space => space.amenities))];
  
  // Apply filters and search
  const filteredSpaces = spaces.filter(space => {
    // Search query filter
    if (searchQuery && !space.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !space.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Location filter
    if (filters.location && space.location !== filters.location) {
      return false;
    }
    
    // Amenities filter
    if (filters.amenities.length > 0 && !filters.amenities.every(amenity => 
      space.amenities.includes(amenity))) {
      return false;
    }
    
    // Price range filter
    if (space.price < filters.priceRange[0] || space.price > filters.priceRange[1]) {
      return false;
    }
    
    return true;
  });
  
  // Further filter by compliance requirements
  const complianceFilteredSpaces = Object.keys(filters.complianceFilters).length > 0
    ? filterSpacesByCompliance(filteredSpaces, filters.complianceFilters)
    : filteredSpaces;
    
  // Add compliance scores to spaces for display
  const spacesWithScores = complianceFilteredSpaces.map(space => ({
    ...space,
    complianceScore: calculateComplianceScore(space)
  }));
  
  // Sort spaces prioritizing security level
  const sortedSpaces = [...spacesWithScores].sort((a, b) => b.complianceScore - a.complianceScore);
  
  // Handle filter changes
  const handleLocationChange = (e) => {
    setFilters({
      ...filters,
      location: e.target.value
    });
  };
  
  const handleAmenityChange = (amenity) => {
    setFilters({
      ...filters,
      amenities: filters.amenities.includes(amenity)
        ? filters.amenities.filter(a => a !== amenity)
        : [...filters.amenities, amenity]
    });
  };
  
  const handlePriceRangeChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = Number(value);
    setFilters({
      ...filters,
      priceRange: newRange
    });
  };
  
  // Handle compliance filter changes
  const handleComplianceStandardChange = (standardId, isSelected) => {
    if (standardId === '__expanded') {
      setExpandedComplianceFilters(isSelected);
      return;
    }
    
    const updatedFilters = { ...filters.complianceFilters };
    
    if (isSelected) {
      updatedFilters[standardId] = { level: null };
    } else {
      delete updatedFilters[standardId];
    }
    
    setFilters({
      ...filters,
      complianceFilters: updatedFilters
    });
  };
  
  const handleComplianceLevelChange = (standardId, level) => {
    const updatedFilters = { ...filters.complianceFilters };
    
    if (updatedFilters[standardId]) {
      updatedFilters[standardId] = { 
        ...updatedFilters[standardId], 
        level 
      };
    }
    
    setFilters({
      ...filters,
      complianceFilters: updatedFilters
    });
  };
  
  return (
    <div className="bg-gray-50 dark:bg-dark-bg-light min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text-primary transition-colors duration-200">Explore Spaces</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
            Find the perfect workspace for your business needs
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for spaces..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-bg-light rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-dark-text-muted transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Security Level Banner */}
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-medium text-blue-800 dark:text-blue-300 transition-colors duration-200">Enterprise-Grade Security</h2>
              <p className="mt-1 text-sm text-blue-600 dark:text-blue-400 transition-colors duration-200">
                All spaces on ShareYourSpace are verified to ensure they meet German business data protection and security standards.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <a 
                href="/compliance-framework" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-bg-light shadow rounded-lg p-6 transition-colors duration-200">
              <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-4 transition-colors duration-200">Filters</h2>
              
              {/* Location Filter */}
              <div className="mb-6">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
                  Location
                </label>
                <select
                  id="location"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                  value={filters.location}
                  onChange={handleLocationChange}
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Enhanced Compliance Filters - Now at the top of the filters */}
              <ComplianceFilter 
                selectedStandards={filters.complianceFilters}
                onStandardChange={handleComplianceStandardChange}
                onLevelChange={handleComplianceLevelChange}
                expanded={expandedComplianceFilters}
              />
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
                  Price Range (€ per day)
                </label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">€{filters.priceRange[0]}</span>
                  <span className="text-sm text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">€{filters.priceRange[1]}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Amenities Filter */}
              <div>
                <p className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 transition-colors duration-200">
                  Amenities
                </p>
                <div className="space-y-2">
                  {amenitiesList.slice(0, 6).map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <input
                        id={`amenity-${amenity}`}
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 dark:text-dark-primary-600 focus:ring-primary-500 dark:focus:ring-dark-primary-500 border-gray-300 dark:border-dark-bg rounded transition-colors duration-200"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                      />
                      <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700 dark:text-dark-text-secondary transition-colors duration-200">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reset Filters Button */}
              <button
                className="w-full mt-6 px-4 py-2 bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-dark-text-secondary rounded-md hover:bg-gray-200 dark:hover:bg-dark-bg-light transition-colors duration-200"
                onClick={() => setFilters({
                  location: '',
                  amenities: [],
                  priceRange: [0, 100],
                  complianceFilters: {}
                })}
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Space Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
                Showing {sortedSpaces.length} spaces 
                {Object.keys(filters.complianceFilters).length > 0 && (
                  <span>
                    {" "}with compliance requirements
                  </span>
                )}
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mr-2 transition-colors duration-200">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="px-3 py-2 border border-gray-300 dark:border-dark-bg rounded-md shadow-sm focus:ring-primary-500 dark:focus:ring-dark-primary-500 focus:border-primary-500 dark:focus:border-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-200"
                >
                  <option>Security Level</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>
            
            {sortedSpaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {sortedSpaces.map(space => (
                  <SpaceCard key={space.id} space={space} showComplianceScore={true} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-dark-bg-light rounded-lg shadow p-8 text-center transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-dark-text-muted transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">No spaces found</h3>
                <p className="mt-2 text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">Try adjusting your filters to find more spaces.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;