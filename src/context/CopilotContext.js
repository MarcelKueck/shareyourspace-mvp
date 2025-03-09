import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getInitialMessages, sendMessage as sendMessageToService, getContextSuggestions } from '../services/copilotService';

const CopilotContext = createContext();

export const CopilotProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showCommands, setShowCommands] = useState(false);
  const location = useLocation();
  const inputRef = useRef(null);

  // Load initial messages when the component mounts
  useEffect(() => {
    const initialMessages = getInitialMessages();
    setMessages(initialMessages);
  }, []);

  // Update suggestions based on current route
  useEffect(() => {
    const pathSuggestions = getContextSuggestions(location.pathname);
    setSuggestions(pathSuggestions);
  }, [location.pathname]);

  // Toggle the copilot expanded/minimized
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    // Focus input when expanded
    if (!isExpanded) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  // Send a message to the copilot
  const sendMessage = async (text, isCommand = false) => {
    // Reset command state
    setShowCommands(false);
    setCurrentCommand('');
    
    // Add user message to the chat
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      isCommand,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsThinking(true);
    
    try {
      // Get response from the AI service
      const response = await sendMessageToService(text, isCommand, location.pathname);
      
      // Add copilot message to the chat
      const copilotMessage = {
        id: Date.now() + 1,
        ...response, // This could include text, cards, actions, etc.
        sender: 'copilot',
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prevMessages) => [...prevMessages, copilotMessage]);
    } catch (error) {
      console.error('Error getting copilot response:', error);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'copilot',
        error: true,
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  // Process command input
  const handleCommandInput = (command) => {
    setCurrentCommand(command);
    if (command === '/') {
      setShowCommands(true);
    } else if (command.startsWith('/')) {
      setShowCommands(true);
    } else {
      setShowCommands(false);
    }
  };

  // Execute a command
  const executeCommand = (command) => {
    if (!command.startsWith('/')) return sendMessage(command);
    
    // Process the command (strip the / prefix)
    const cleanCommand = command.substring(1);
    sendMessage(command, true);
  };

  // Clear the conversation history
  const clearConversation = () => {
    const initialMessages = getInitialMessages();
    setMessages(initialMessages);
  };

  // Store conversation in localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('copilotMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Load conversation from localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem('copilotMessages');
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
    <CopilotContext.Provider
      value={{
        isExpanded,
        toggleExpanded,
        messages,
        sendMessage,
        clearConversation,
        isThinking,
        inputRef,
        currentCommand,
        handleCommandInput,
        executeCommand,
        showCommands,
        suggestions,
      }}
    >
      {children}
    </CopilotContext.Provider>
  );
};

export const useCopilot = () => useContext(CopilotContext);