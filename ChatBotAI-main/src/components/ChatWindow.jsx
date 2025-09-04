import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatWindow.css';

/**
 * Chat window component for displaying conversation messages
 * @param {Object} props - Component props
 * @param {Array} props.messages - Array of message objects
 * @param {boolean} props.isLoading - Whether a response is being generated
 */
const ChatWindow = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);
  
  // Initialize state from localStorage, default to true for new users
  const [showExampleQuestions, setShowExampleQuestions] = useState(() => {
    const saved = localStorage.getItem('constructbot-show-examples');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  /**
   * Handle closing the example questions and save preference
   */
  const handleCloseExamples = () => {
    setShowExampleQuestions(false);
    localStorage.setItem('constructbot-show-examples', 'false');
  };

  /**
   * Reset example questions visibility (for testing or user preference reset)
   */
  const handleShowExamples = () => {
    setShowExampleQuestions(true);
    localStorage.setItem('constructbot-show-examples', 'true');
  };

  /**
   * Format timestamp for display
   * @param {string} timestamp - ISO timestamp string
   * @returns {string} - Formatted time string
   */
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  /**
   * Get source indicator for message
   * @param {string} source - Message source
   * @returns {Object} - Source info with icon and label
   */
  const getSourceInfo = (source) => {
    switch (source) {
      case 'open_source_llm':
        return { icon: '🤖', label: 'Local AI' };
      case 'gemini_fallback':
        return { icon: '🧠', label: 'Gemini AI' };
      case 'welcome':
        return { icon: '👋', label: 'Welcome' };
      case 'domain_restriction':
        return { icon: '⚠️', label: 'Domain Check' };
      default:
        return { icon: '💬', label: 'Assistant' };
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h1 className="chat-title">
          <span className="title-icon">🏗️</span>
          ConstructBot Professional
        </h1>
        <p className="chat-subtitle">
          Expert construction industry consultation • Licensed PE guidance • Code compliance • Best practices
        </p>
      </div>

      <div className="messages-container">
        {messages.length === 0 && !isLoading && (
          <div className="empty-state">
            <div className="empty-icon">🏗️</div>
            <h3>Professional Construction Consultation</h3>
            <p>Expert technical guidance for construction industry professionals, engineers, and project managers.</p>
            {showExampleQuestions && (
              <div className="example-questions">
                <div className="example-questions-header">
                  <h4>Professional Consultation Areas:</h4>
                  <button 
                    className="close-button"
                    onClick={handleCloseExamples}
                    aria-label="Close example questions"
                    title="Hide example questions"
                  >
                    ✕
                  </button>
                </div>
                <ul>
                  <li>"ACI 318 concrete mix design for high-rise construction"</li>
                  <li>"OSHA requirements for excavation safety programs"</li>
                  <li>"CPM scheduling for multi-phase commercial projects"</li>
                  <li>"Structural steel connection design per AISC 360"</li>
                  <li>"Building envelope systems for energy efficiency"</li>
                  <li>"Cost estimation for sustainable construction materials"</li>
                </ul>
              </div>
            )}
            {!showExampleQuestions && (
              <div className="show-examples-hint">
                <button 
                  className="show-examples-button"
                  onClick={handleShowExamples}
                  title="Show example questions"
                >
                  💡 Show example questions
                </button>
              </div>
            )}
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">
              {message.role === 'assistant' && (
                <div className="message-header">
                  <div className="source-info">
                    <span className="source-icon">
                      {getSourceInfo(message.source).icon}
                    </span>
                    <span className="source-label">
                      {getSourceInfo(message.source).label}
                    </span>
                  </div>
                  {message.timestamp && (
                    <span className="message-time">
                      {formatTime(message.timestamp)}
                    </span>
                  )}
                </div>
              )}
              
              <div className="message-bubble">
                {message.role === 'user' ? (
                  <p>{message.content}</p>
                ) : (
                  <ReactMarkdown
                    components={{
                      // Custom rendering for code blocks
                      code: ({ node, inline, className, children, ...props }) => {
                        return inline ? (
                          <code className="inline-code" {...props}>
                            {children}
                          </code>
                        ) : (
                          <pre className="code-block">
                            <code {...props}>{children}</code>
                          </pre>
                        );
                      },
                      // Custom rendering for lists
                      ul: ({ children }) => (
                        <ul className="custom-list">{children}</ul>
                      ),
                      // Custom rendering for headings
                      h3: ({ children }) => (
                        <h3 className="message-heading">{children}</h3>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>

              {message.role === 'user' && (
                <div className="message-time user-time">
                  {formatTime(message.timestamp)}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message assistant">
            <div className="message-content">
              <div className="message-header">
                <div className="source-info">
                  <span className="source-icon">🤔</span>
                  <span className="source-label">Thinking...</span>
                </div>
              </div>
              <div className="message-bubble">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
