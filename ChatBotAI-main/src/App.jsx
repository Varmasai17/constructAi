import React, { useState, useEffect } from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import { processChatMessage, getWelcomeMessage } from './lib/chatService';
import './App.css';

/**
 * Main App component for the Construction Chatbot
 * Manages conversation state, message handling, and UI coordination
 */
function App() {
  // State for managing conversations and UI
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with welcome message on first load
  useEffect(() => {
    const welcomeMessage = getWelcomeMessage();
    setCurrentMessages([{
      role: 'assistant',
      content: welcomeMessage.response,
      source: welcomeMessage.source,
      timestamp: welcomeMessage.timestamp
    }]);
  }, []);

  /**
   * Generate a unique ID for conversations
   * @returns {string} - Unique conversation ID
   */
  const generateConversationId = () => {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  /**
   * Create a conversation title from the first user message
   * @param {string} firstMessage - The first message in the conversation
   * @returns {string} - Generated title
   */
  const generateConversationTitle = (firstMessage) => {
    if (!firstMessage) return 'New Conversation';
    
    // Extract key construction-related terms for better titles
    const constructionTerms = [
      'concrete', 'steel', 'construction', 'building', 'project',
      'safety', 'materials', 'cost', 'design', 'engineering'
    ];
    
    const words = firstMessage.toLowerCase().split(' ');
    const relevantWords = words.filter(word => 
      constructionTerms.some(term => word.includes(term)) || word.length > 4
    );
    
    if (relevantWords.length > 0) {
      return relevantWords.slice(0, 4).join(' ').substr(0, 50);
    }
    
    return firstMessage.substr(0, 50);
  };

  /**
   * Handle sending a new message
   * @param {string} message - The user's message
   */
  const handleSendMessage = async (message) => {
    if (!message.trim() || isLoading) return;

    // Add user message to current conversation
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...currentMessages, userMessage];
    setCurrentMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Process the message through our chat service
      const response = await processChatMessage(message);
      
      // Add assistant response
      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        source: response.source,
        timestamp: response.timestamp
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setCurrentMessages(finalMessages);

      // Update or create conversation
      if (activeConversationId) {
        // Update existing conversation
        setConversations(prev => prev.map(conv => 
          conv.id === activeConversationId 
            ? {
                ...conv,
                messages: finalMessages,
                lastActivity: new Date().toISOString()
              }
            : conv
        ));
      } else {
        // Create new conversation (first message in a new chat)
        const newConversation = {
          id: generateConversationId(),
          title: generateConversationTitle(message),
          messages: finalMessages,
          createdAt: new Date().toISOString(),
          lastActivity: new Date().toISOString()
        };

        setConversations(prev => [newConversation, ...prev]);
        setActiveConversationId(newConversation.id);
      }

    } catch (error) {
      console.error('Error processing message:', error);
      
      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: "I apologize, but I encountered an error while processing your message. Please try again or rephrase your construction-related question.",
        source: 'error',
        timestamp: new Date().toISOString()
      };

      setCurrentMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle selecting a conversation from the sidebar
   * @param {string} conversationId - ID of the conversation to select
   */
  const handleSelectConversation = (conversationId) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      setActiveConversationId(conversationId);
      setCurrentMessages(conversation.messages);
    }
  };

  /**
   * Handle starting a new conversation
   */
  const handleNewConversation = () => {
    setActiveConversationId(null);
    const welcomeMessage = getWelcomeMessage();
    setCurrentMessages([{
      role: 'assistant',
      content: welcomeMessage.response,
      source: welcomeMessage.source,
      timestamp: welcomeMessage.timestamp
    }]);
  };

  return (
    <div className="app">
      <ChatSidebar
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        activeConversationId={activeConversationId}
      />
      
      <div className="main-content">
        <ChatWindow
          messages={currentMessages}
          isLoading={isLoading}
        />
        
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
