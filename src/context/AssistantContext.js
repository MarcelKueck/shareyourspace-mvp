import React, { createContext, useState, useContext, useEffect } from 'react';
import { getInitialMessages, sendMessage as sendMessageToService } from '../services/assistantService';

const AssistantContext = createContext();

export const AssistantProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Load initial messages when the component mounts
  useEffect(() => {
    const initialMessages = getInitialMessages();
    setMessages(initialMessages);
  }, []);

  // Toggle the assistant open/closed
  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  // Send a message to the assistant
  const sendMessage = async (text) => {
    // Add user message to the chat
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsTyping(true);
    
    try {
      // Get response from the AI service
      const response = await sendMessageToService(text);
      
      // Add assistant message to the chat
      const assistantMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error getting assistant response:', error);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'assistant',
        error: true,
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Clear the conversation history
  const clearConversation = () => {
    const initialMessages = getInitialMessages();
    setMessages(initialMessages);
  };

  // Store conversation in localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('assistantMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Load conversation from localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem('assistantMessages');
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error('Error parsing stored messages:', error);
        setMessages(getInitialMessages());
      }
    }
  }, []);

  return (
    <AssistantContext.Provider
      value={{
        isOpen,
        toggleAssistant,
        messages,
        sendMessage,
        clearConversation,
        isTyping,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => useContext(AssistantContext);