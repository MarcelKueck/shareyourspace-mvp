import React, { useRef, useEffect } from 'react';
import { useCopilot } from '../../context/CopilotContext';
import MessageDisplay from './MessageDisplay';
import CommandInput from './CommandInput';
import ThinkingIndicator from './ThinkingIndicator';

const CopilotExpanded = () => {
  const { messages, clearConversation, toggleExpanded, isThinking } = useCopilot();
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-dark-bg-light shadow-sm transition-colors duration-200">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-dark-primary-900 mr-3 transition-colors duration-200">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-primary-600 dark:text-dark-primary-400" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">
              ShareYourSpace Copilot
            </h3>
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">
              Your workspace assistant
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <button
            onClick={clearConversation}
            className="p-2 text-gray-400 hover:text-gray-600 dark:text-dark-text-muted dark:hover:text-dark-text-secondary rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors duration-200"
            title="Clear conversation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={toggleExpanded}
            className="ml-2 p-2 text-gray-400 hover:text-gray-600 dark:text-dark-text-muted dark:hover:text-dark-text-secondary rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors duration-200"
            title="Minimize"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
        {messages.map((message) => (
          <MessageDisplay key={message.id} message={message} />
        ))}
        
        {isThinking && <ThinkingIndicator />}
        
        <div ref={messagesEndRef}></div>
      </div>
      
      {/* Input area */}
      <CommandInput />
    </div>
  );
};

export default CopilotExpanded;