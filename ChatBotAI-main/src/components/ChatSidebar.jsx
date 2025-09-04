import React from 'react';
import './ChatSidebar.css';

/**
 * Sidebar component for displaying conversation history
 * @param {Object} props - Component props
 * @param {Array} props.conversations - Array of conversation objects
 * @param {Function} props.onSelectConversation - Callback for selecting a conversation
 * @param {Function} props.onNewConversation - Callback for starting a new conversation
 * @param {string} props.activeConversationId - ID of the currently active conversation
 */
const ChatSidebar = ({ 
  conversations, 
  onSelectConversation, 
  onNewConversation, 
  activeConversationId 
}) => {
  /**
   * Truncate conversation title for display
   * @param {string} text - The text to truncate
   * @param {number} maxLength - Maximum length before truncation
   * @returns {string} - Truncated text
   */
  const truncateText = (text, maxLength = 30) => {
    if (!text) return 'New Conversation';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <aside className="chat-sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <span className="construction-icon">🏗️</span>
          ConstructBot
        </h2>
        <button 
          className="new-chat-btn"
          onClick={onNewConversation}
          title="Start new conversation"
        >
          <span>+</span> New Chat
        </button>
      </div>

      <div className="conversations-section">
        <h3 className="section-title">Recent Conversations</h3>
        <ul className="conversations-list">
          {conversations.length === 0 ? (
            <li className="no-conversations">
              No conversations yet. Start by asking a construction question!
            </li>
          ) : (
            conversations.map((conversation) => (
              <li 
                key={conversation.id}
                className={`conversation-item ${
                  activeConversationId === conversation.id ? 'active' : ''
                }`}
                onClick={() => onSelectConversation(conversation.id)}
                title={conversation.title}
              >
                <div className="conversation-title">
                  {truncateText(conversation.title)}
                </div>
                <div className="conversation-meta">
                  <span className="message-count">
                    {conversation.messages?.length || 0} messages
                  </span>
                  <span className="conversation-date">
                    {new Date(conversation.lastActivity).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="sidebar-footer">
        <div className="footer-info">
          <p className="footer-text">
            🏗️ Specialized for construction industry
          </p>
          <p className="footer-version">
            v1.0 | Built with React & Vite
          </p>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
