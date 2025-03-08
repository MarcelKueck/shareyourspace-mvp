import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, isTyping }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-dark-bg-light">
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 dark:border-dark-bg rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-bg dark:text-dark-text-primary"
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={!message.trim() || isTyping}
          className={`p-2 rounded-r-md ${
            !message.trim() || isTyping
              ? 'bg-gray-300 dark:bg-dark-bg-light text-gray-500 dark:text-dark-text-muted'
              : 'bg-primary-600 dark:bg-dark-primary-600 text-white hover:bg-primary-700 dark:hover:bg-dark-primary-700'
          } transition-colors duration-200`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;