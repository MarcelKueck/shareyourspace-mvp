import React, { useState, useEffect } from 'react';
import { useCopilot } from '../../context/CopilotContext';
import { availableCommands } from '../../services/copilotService';

const CommandInput = () => {
  const { 
    sendMessage, 
    isThinking, 
    inputRef,
    handleCommandInput,
    currentCommand,
    executeCommand,
    showCommands,
    suggestions 
  } = useCopilot();
  
  const [inputValue, setInputValue] = useState('');
  const [filteredCommands, setFilteredCommands] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    handleCommandInput(value);
    
    // Filter commands if we're showing them
    if (value.startsWith('/')) {
      const searchTerm = value.substring(1).toLowerCase();
      const filtered = availableCommands.filter(cmd => 
        cmd.command.toLowerCase().includes(searchTerm) || 
        cmd.description.toLowerCase().includes(searchTerm)
      );
      setFilteredCommands(filtered);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputValue.trim() && !isThinking) {
      executeCommand(inputValue);
      setInputValue('');
      setShowSuggestions(false);
    }
  };
  
  // Handle command selection
  const selectCommand = (command) => {
    setInputValue(command);
    inputRef.current.focus();
  };
  
  // Handle suggestion selection
  const selectSuggestion = (suggestion) => {
    executeCommand(suggestion);
    setInputValue('');
    setShowSuggestions(false);
  };

  return (
    <div className="mt-auto">
      {/* Suggestions */}
      {!showCommands && !isThinking && suggestions.length > 0 && (
        <div className="p-3 border-t border-gray-100 dark:border-dark-bg">
          <p className="text-xs text-gray-500 dark:text-dark-text-muted mb-2 transition-colors duration-200">
            Try asking:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm bg-gray-50 dark:bg-dark-bg text-gray-700 dark:text-dark-text-secondary rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-light transition-colors duration-200"
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Command palette */}
      {showCommands && (
        <div className="border-t border-gray-100 dark:border-dark-bg max-h-48 overflow-y-auto transition-colors duration-200">
          {filteredCommands.map((cmd, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-50 dark:hover:bg-dark-bg cursor-pointer transition-colors duration-200"
              onClick={() => selectCommand(cmd.command)}
            >
              <div className="flex items-center">
                <span className="text-primary-600 dark:text-dark-primary-500 font-mono text-sm transition-colors duration-200">
                  {cmd.command}
                </span>
                <span className="ml-2 text-sm text-gray-600 dark:text-dark-text-secondary transition-colors duration-200">
                  {cmd.description}
                </span>
              </div>
              <div className="text-xs text-gray-400 dark:text-dark-text-muted mt-1 transition-colors duration-200">
                Example: {cmd.example}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-dark-bg-light transition-colors duration-200">
        <div className="flex items-center relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder={isThinking ? "Thinking..." : "Message ShareYourSpace Copilot..."}
            className="w-full py-2 px-4 text-gray-800 dark:text-dark-text-primary bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-bg-light rounded-full focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-dark-primary-500 transition-colors duration-200"
            disabled={isThinking}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isThinking}
            className={`absolute right-2 p-1.5 rounded-full ${
              !inputValue.trim() || isThinking
                ? 'text-gray-300 dark:text-dark-text-muted'
                : 'text-primary-600 dark:text-dark-primary-500 hover:bg-primary-50 dark:hover:bg-dark-primary-900'
            } transition-colors duration-200`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between mt-2">
          <div className="text-xs text-gray-400 dark:text-dark-text-muted transition-colors duration-200">
            Type / to use commands
          </div>
          {isThinking && (
            <div className="text-xs text-primary-600 dark:text-dark-primary-500 flex items-center transition-colors duration-200">
              <div className="h-1.5 w-1.5 rounded-full bg-primary-600 dark:bg-dark-primary-500 mr-1 animate-pulse delay-0"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-primary-600 dark:bg-dark-primary-500 mr-1 animate-pulse delay-150"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-primary-600 dark:bg-dark-primary-500 animate-pulse delay-300"></div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommandInput;