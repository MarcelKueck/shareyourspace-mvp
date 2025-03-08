import React from 'react';
import { useAssistant } from '../../context/AssistantContext';

const ChatBubble = () => {
  const { toggleAssistant, isOpen } = useAssistant();
  
  return (
    <button
      onClick={toggleAssistant}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 
                 ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary-600 dark:bg-dark-primary-600 hover:bg-primary-700 dark:hover:bg-dark-primary-700'} 
                 transition-colors duration-200`}
      aria-label={isOpen ? "Close assistant" : "Open assistant"}
    >
      {isOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )}
    </button>
  );
};

export default ChatBubble;