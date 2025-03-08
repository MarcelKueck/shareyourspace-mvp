import React, { useRef, useEffect } from 'react';

const MessageList = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
              message.sender === 'user'
                ? 'bg-primary-500 dark:bg-dark-primary-500 text-white'
                : 'bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-dark-text-primary'
            } ${message.error ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' : ''}`}
          >
            <p className="text-sm">{message.text}</p>
            <p className="text-xs mt-1 opacity-70">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-dark-text-primary max-w-xs md:max-w-md rounded-lg px-4 py-2">
            <div className="flex space-x-1 items-center">
              <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-dark-text-secondary animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-dark-text-secondary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-dark-text-secondary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessageList;