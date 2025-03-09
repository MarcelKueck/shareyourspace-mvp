import React from 'react';
import { useCopilot } from '../context/CopilotContext';
import CopilotTab from './copilot/CopilotTab';
import CopilotExpanded from './copilot/CopilotExpanded';

const Copilot = () => {
  const { isExpanded, toggleExpanded } = useCopilot();
  
  return (
    <div 
      className={`fixed right-0 top-1/4 h-3/5 transition-all duration-300 ease-in-out z-40 
                ${isExpanded ? 'w-96' : 'w-12'} 
                bg-white dark:bg-dark-bg-light shadow-lg border-l border-gray-200 dark:border-dark-bg-light`}
    >
      {isExpanded ? (
        <CopilotExpanded />
      ) : (
        <CopilotTab toggleExpanded={toggleExpanded} />
      )}
    </div>
  );
};

export default Copilot;