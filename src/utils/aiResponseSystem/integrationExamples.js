/**
 * Integration Examples
 * Shows how to integrate the AI Response System with your existing chatbot components
 */

// Example 1: Integration with BotLibreChatbot.jsx
export const BotLibreIntegration = `
// BotLibreChatbot.jsx - Technical Support AI Integration
import React, { useState, useEffect } from 'react';
import { createTechnicalAI } from '../utils/aiResponseSystem';

const BotLibreChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [aiEngine, setAiEngine] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initialize Technical Support AI
    const technicalAI = createTechnicalAI();
    setAiEngine(technicalAI);
    
    // Start with greeting
    const greeting = technicalAI.startConversation();
    setMessages([{ id: 1, text: greeting, isAI: true }]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !aiEngine) return;

    // Add user message
    const userMessage = { id: Date.now(), text: inputValue, isAI: false };
    setMessages(prev => [...prev, userMessage]);
    
    setInputValue('');
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await aiEngine.processMessage(inputValue);
      
      // Add AI response
      const aiMessage = { 
        id: Date.now() + 1, 
        text: aiResponse, 
        isAI: true 
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 500);
      
    } catch (error) {
      console.error('AI Response Error:', error);
      setIsTyping(false);
    }
  };

  return (
    <div className="botlibre-chatbot">
      <div className="chat-header">
        <span>🔧 TechSupport Pro</span>
        <span>Technical Support</span>
      </div>
      
      <div className="messages-container">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={message.isAI ? 'ai-message' : 'user-message'}
          >
            {message.text}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">AI is typing...</div>}
      </div>
      
      <div className="input-container">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Describe your technical issue..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default BotLibreChatbot;
`;

// Example 2: Integration with TawkChatbot.jsx
export const TawkIntegration = `
// TawkChatbot.jsx - Product Consultant AI Integration
import React, { useState, useEffect } from 'react';
import { createConsultantAI } from '../utils/aiResponseSystem';

const TawkChatbot = ({ userPreferences = {} }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [aiEngine, setAiEngine] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Initialize Product Consultant AI with user preferences
    const consultantAI = createConsultantAI();
    setAiEngine(consultantAI);
    
    // Start with personalized greeting
    const greeting = consultantAI.startConversation(userPreferences);
    setMessages([{ id: 1, text: greeting, isAI: true }]);
  }, [userPreferences]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !aiEngine) return;

    const userMessage = { id: Date.now(), text: inputValue, isAI: false };
    setMessages(prev => [...prev, userMessage]);
    
    setInputValue('');
    setIsTyping(true);

    try {
      // Get AI response with language support
      const aiResponse = await aiEngine.processMessage(inputValue, language);
      
      const aiMessage = { 
        id: Date.now() + 1, 
        text: aiResponse, 
        isAI: true 
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 800);
      
    } catch (error) {
      console.error('AI Response Error:', error);
      setIsTyping(false);
    }
  };

  const handleLanguageSwitch = (newLanguage) => {
    setLanguage(newLanguage);
    if (aiEngine) {
      aiEngine.contextManager.setLanguage(newLanguage);
    }
  };

  return (
    <div className="tawk-chatbot">
      <div className="chat-header">
        <span>🛍️ Shopping Assistant</span>
        <div className="language-switcher">
          <button onClick={() => handleLanguageSwitch('en')} className={language === 'en' ? 'active' : ''}>EN</button>
          <button onClick={() => handleLanguageSwitch('vi')} className={language === 'vi' ? 'active' : ''}>VI</button>
        </div>
      </div>
      
      <div className="messages-container">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={message.isAI ? 'ai-message consultant' : 'user-message'}
          >
            {message.text}
          </div>
        ))}
        {isTyping && <div className="typing-indicator consultant">🛍️ Finding perfect products...</div>}
      </div>
      
      <div className="input-container">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me about products..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default TawkChatbot;
`;

// Example 3: Integration with WebotChatbot.jsx
export const WebotIntegration = `
// WebotChatbot.jsx - Marketing AI Integration
import React, { useState, useEffect } from 'react';
import { createMarketingAI } from '../utils/aiResponseSystem';

const WebotChatbot = ({ promotions = [] }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [aiEngine, setAiEngine] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState(null);

  useEffect(() => {
    // Initialize Marketing AI with promotions
    const marketingAI = createMarketingAI();
    setAiEngine(marketingAI);
    
    // Start with energetic greeting and current deals
    const greeting = marketingAI.startConversation();
    setMessages([{ id: 1, text: greeting, isAI: true }]);
    
    // Show current promotions
    if (promotions.length > 0) {
      setTimeout(() => {
        const promoMessage = { 
          id: Date.now(), 
          text: \`🔥 TODAY'S SPECIAL: \${promotions[0].title} - Save \${promotions[0].discount}%!\`, 
          isAI: true 
        };
        setMessages(prev => [...prev, promoMessage]);
      }, 1500);
    }
  }, [promotions]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !aiEngine) return;

    const userMessage = { id: Date.now(), text: inputValue, isAI: false };
    setMessages(prev => [...prev, userMessage]);
    
    setInputValue('');
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await aiEngine.processMessage(inputValue);
      
      const aiMessage = { 
        id: Date.now() + 1, 
        text: aiResponse, 
        isAI: true 
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        
        // Add urgency message for purchase intents
        if (inputValue.toLowerCase().includes('buy') || inputValue.toLowerCase().includes('purchase')) {
          setTimeout(() => {
            const urgencyMessage = {
              id: Date.now() + 2,
              text: '⏰ This offer expires in 2 hours! Act now to lock in your savings!',
              isAI: true
            };
            setMessages(prev => [...prev, urgencyMessage]);
          }, 1000);
        }
      }, 600);
      
    } catch (error) {
      console.error('AI Response Error:', error);
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action) => {
    setInputValue(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="webot-chatbot">
      <div className="chat-header marketing">
        <span>🎯 Deal Hunter</span>
        <span>Exclusive Offers</span>
      </div>
      
      <div className="messages-container">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={message.isAI ? 'ai-message marketing' : 'user-message'}
          >
            {message.text}
          </div>
        ))}
        {isTyping && <div className="typing-indicator marketing">🎯 Finding amazing deals...</div>}
      </div>
      
      <div className="quick-actions">
        <button onClick={() => handleQuickAction('Show me today\'s deals')}>
          🔥 Today's Deals
        </button>
        <button onClick={() => handleQuickAction('What are the bundle offers?')}>
          💎 Bundle Deals
        </button>
        <button onClick={() => handleQuickAction('I want to buy something')}>
          🛒 Shop Now
        </button>
      </div>
      
      <div className="input-container">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about deals and promotions..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default WebotChatbot;
`;

// Example 4: Unified Chat Manager
export const UnifiedChatManager = `
// UnifiedChatManager.jsx - Manage all three AIs
import React, { useState, createContext, useContext } from 'react';
import { createTechnicalAI, createConsultantAI, createMarketingAI } from '../utils/aiResponseSystem';

// Context for managing AI instances
const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const [aiInstances, setAiInstances] = useState({
    technical: null,
    consultant: null,
    marketing: null
  });
  const [activeAI, setActiveAI] = useState('consultant');

  useEffect(() => {
    // Initialize all AI instances
    setAiInstances({
      technical: createTechnicalAI(),
      consultant: createConsultantAI(),
      marketing: createMarketingAI()
    });
  }, []);

  const switchAI = (aiType) => {
    setActiveAI(aiType);
  };

  const getCurrentAI = () => {
    return aiInstances[activeAI];
  };

  return (
    <AIContext.Provider value={{ aiInstances, activeAI, switchAI, getCurrentAI }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

// Unified Chat Component
const UnifiedChatbot = () => {
  const { aiInstances, activeAI, switchAI, getCurrentAI } = useAI();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentAI = getCurrentAI();

  useEffect(() => {
    if (currentAI) {
      const greeting = currentAI.startConversation();
      setMessages([{ id: 1, text: greeting, isAI: true, aiType: activeAI }]);
    }
  }, [currentAI, activeAI]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !currentAI) return;

    const userMessage = { id: Date.now(), text: inputValue, isAI: false };
    setMessages(prev => [...prev, userMessage]);
    
    setInputValue('');
    setIsTyping(true);

    try {
      const aiResponse = await currentAI.processMessage(inputValue);
      
      const aiMessage = { 
        id: Date.now() + 1, 
        text: aiResponse, 
        isAI: true,
        aiType: activeAI
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 500);
      
    } catch (error) {
      console.error('AI Response Error:', error);
      setIsTyping(false);
    }
  };

  const getAIIcon = (aiType) => {
    const icons = {
      technical: '🔧',
      consultant: '🛍️', 
      marketing: '🎯'
    };
    return icons[aiType] || '🤖';
  };

  const getAIStyle = (aiType) => {
    const styles = {
      technical: 'ai-message technical',
      consultant: 'ai-message consultant',
      marketing: 'ai-message marketing'
    };
    return styles[aiType] || 'ai-message';
  };

  return (
    <div className="unified-chatbot">
      <div className="ai-selector">
        {Object.keys(aiInstances).map(aiType => (
          <button
            key={aiType}
            onClick={() => switchAI(aiType)}
            className={activeAI === aiType ? 'active' : ''}
          >
            {getAIIcon(aiType)} {aiType.charAt(0).toUpperCase() + aiType.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="chat-header">
        <span>{getAIIcon(activeAI)} {activeAI.charAt(0).toUpperCase() + activeAI.slice(1)} AI</span>
      </div>
      
      <div className="messages-container">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={message.isAI ? getAIStyle(message.aiType) : 'user-message'}
          >
            {message.text}
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            {getAIIcon(activeAI)} AI is thinking...
          </div>
        )}
      </div>
      
      <div className="input-container">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default UnifiedChatbot;
`;

// Example 5: CSS Styles for all chatbots
export const ChatbotStyles = `
/* Chatbot Styles - Add to your CSS file */

/* Base Chatbot Styles */
.botlibre-chatbot,
.tawk-chatbot,
.webot-chatbot,
.unified-chatbot {
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 350px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.chat-header {
  padding: 15px;
  background: #f8f9fa;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  background: white;
}

.user-message {
  background: #007bff;
  color: white;
  padding: 10px 15px;
  border-radius: 18px;
  margin-bottom: 10px;
  max-width: 80%;
  margin-left: auto;
  word-wrap: break-word;
}

.ai-message {
  background: #f1f3f4;
  color: #333;
  padding: 10px 15px;
  border-radius: 18px;
  margin-bottom: 10px;
  max-width: 80%;
  margin-right: auto;
  word-wrap: break-word;
}

/* AI-Specific Styles */
.ai-message.technical {
  background: #e8f4fd;
  border-left: 3px solid #2196F3;
}

.ai-message.consultant {
  background: #f0f9ff;
  border-left: 3px solid #4CAF50;
}

.ai-message.marketing {
  background: #fff3e0;
  border-left: 3px solid #FF9800;
  font-weight: 500;
}

.typing-indicator {
  background: #e0e0e0;
  color: #666;
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 80%;
  margin-right: auto;
  font-style: italic;
  margin-bottom: 10px;
}

.input-container {
  padding: 15px;
  border-top: 1px solid #ddd;
  display: flex;
  gap: 10px;
}

.input-container input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
}

.input-container button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
}

.input-container button:hover {
  background: #0056b3;
}

/* Marketing AI Special Styles */
.chat-header.marketing {
  background: linear-gradient(45deg, #FF9800, #F44336);
  color: white;
}

.quick-actions {
  padding: 10px 15px;
  background: #f8f9fa;
  border-top: 1px solid #ddd;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.quick-actions button {
  padding: 6px 12px;
  background: #FF9800;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;
}

/* Language Switcher */
.language-switcher {
  display: flex;
  gap: 5px;
}

.language-switcher button {
  padding: 4px 8px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.language-switcher button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

/* AI Selector for Unified Chat */
.ai-selector {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

.ai-selector button {
  flex: 1;
  padding: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.ai-selector button:hover {
  background: #e9ecef;
}

.ai-selector button.active {
  background: #007bff;
  color: white;
}

/* Responsive Design */
@media (max-width: 480px) {
  .botlibre-chatbot,
  .tawk-chatbot,
  .webot-chatbot,
  .unified-chatbot {
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
}

/* Animation for messages */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.ai-message,
.user-message {
  animation: fadeIn 0.3s ease-out;
}

/* Typing indicator animation */
@keyframes typing {
  0%, 60%, 100% { opacity: 0.3; }
  30% { opacity: 1; }
}

.typing-indicator::after {
  content: '...';
  animation: typing 1.4s infinite;
}
`;

// Export all examples
export const integrationExamples = {
  BotLibreIntegration,
  TawkIntegration,
  WebotIntegration,
  UnifiedChatManager,
  ChatbotStyles
};
