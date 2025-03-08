import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useAssistant } from '../../context/AssistantContext';

const ChatInterface = () => {
  const { messages, sendMessage, clearConversation, isTyping } = useAssistant();
  
  return (
    <div className="fixed bottom-24 right-6 w-80 md:w-96 h-96 bg-white dark:bg-dark-bg-light rounded-lg shadow-xl flex flex-col z-50 border border-gray-200 dark:border-dark-bg transition-colors duration-200">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-dark-bg">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-dark-text-primary transition-colors duration-200">ShareYourSpace Assistant</h3>
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary transition-colors duration-200">How can I help you today?</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearConversation}
            className="text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary p-1 rounded-md transition-colors duration-200"
            title="Clear conversation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <MessageList messages={messages} isTyping={isTyping} />
      <MessageInput onSendMessage={sendMessage} isTyping={isTyping} />
    </div>
  );
};

export default ChatInterface;