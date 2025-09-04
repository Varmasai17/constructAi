import React, { useState, useRef } from 'react';
import './ChatInput.css';

/**
 * Chat input component for sending messages
 * @param {Object} props - Component props
 * @param {Function} props.onSendMessage - Callback for sending a message
 * @param {boolean} props.isLoading - Whether a response is being generated
 */
const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  /**
   * Handle textarea input changes and auto-resize
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  /**
   * Handle key press events (Enter to send, Shift+Enter for new line)
   * @param {Event} e - Keydown event
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  /**
   * Insert example question into input
   * @param {string} question - The example question to insert
   */
  const insertExampleQuestion = (question) => {
    setMessage(question);
    textareaRef.current?.focus();
  };

  // Professional example questions for construction industry
  const exampleQuestions = [
    "What are the ACI 318 requirements for high-strength concrete mix design?",
    "How do I develop a CPM schedule for a 30-story commercial building?",
    "What OSHA fall protection requirements apply to structural steel erection?",
    "Compare foundation systems for high-rise construction in seismic zones"
  ];

  return (
    <div className="chat-input-container">
      {/* Example questions (show when input is empty) */}
      {message.length === 0 && (
        <div className="example-questions-bar">
          <span className="example-label">💡 Try asking:</span>
          <div className="example-buttons">
            {exampleQuestions.map((question, index) => (
              <button
                key={index}
                type="button"
                className="example-button"
                onClick={() => insertExampleQuestion(question)}
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={
              isLoading 
                ? "Analyzing construction requirements..." 
                : "Ask about structural engineering, materials, safety codes, project management, cost estimation..."
            }
            disabled={isLoading}
            className="message-input"
            rows={1}
            maxLength={2000}
          />
          
          <div className="input-actions">
            <div className="character-count">
              <span className={message.length > 1800 ? 'warning' : ''}>
                {message.length}/2000
              </span>
            </div>
            
            <button
              type="submit"
              className={`send-button ${isLoading ? 'loading' : ''}`}
              disabled={!message.trim() || isLoading}
              title={isLoading ? 'Generating response...' : 'Send message'}
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
              ) : (
                <span className="send-icon">➤</span>
              )}
            </button>
          </div>
        </div>

        <div className="input-footer">
          <div className="footer-info">
            <span className="keyboard-hint">
              <kbd>Enter</kbd> to send • <kbd>Shift</kbd> + <kbd>Enter</kbd> for new line
            </span>
            <span className="domain-notice">
              🏗️ Professional construction industry consultation • ACI • AISC • OSHA • ICC certified guidance
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
