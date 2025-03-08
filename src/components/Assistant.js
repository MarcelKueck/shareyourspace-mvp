import React from 'react';
import { useAssistant } from '../context/AssistantContext';
import ChatBubble from './assistant/ChatBubble';
import ChatInterface from './assistant/ChatInterface';

const Assistant = () => {
  const { isOpen } = useAssistant();
  
  return (
    <>
      <ChatBubble />
      {isOpen && <ChatInterface />}
    </>
  );
};

export default Assistant;