/**
 * BotLibre Chatbot - General Purpose AI
 * Can handle both marketing/promotions and general support
 */
import React, { useState, useEffect } from 'react';
import { setupBotlibreChatbot } from '../../utils/aiResponseSystem/chatbotMapping.js';

const BotlibreChatbot = ({ promotions = [] }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [ai, setAi] = useState(null);
    const [config, setConfig] = useState(null);
    const [language, setLanguage] = useState('en'); // Default English for English website
    const [currentMode, setCurrentMode] = useState('general'); // 'general', 'marketing', 'technical'
    const [showPromotions, setShowPromotions] = useState(false);

    useEffect(() => {
        // Initialize BotLibre with General Purpose AI
        const { ai: botlibreAI, config: botlibreConfig } =
            setupBotlibreChatbot();
        setAi(botlibreAI);
        setConfig(botlibreConfig);

        // Start with general greeting
        const greeting = botlibreAI.startConversation();
        setMessages([
            {
                id: 1,
                text: greeting,
                isAI: true,
                timestamp: new Date()
            }
        ]);

        // Show promotions after a short delay
        if (promotions.length > 0) {
            setTimeout(() => {
                const promoMessage = {
                    id: Date.now(),
                    text:
                        language === 'vi'
                            ? `🔥 ƯU ĐÃI HÔM NAY: ${promotions[0].title} - Giảm ${promotions[0].discount}%!`
                            : `🔥 TODAY'S SPECIAL: ${promotions[0].title} - ${promotions[0].discount}% OFF!`,
                    isAI: true,
                    timestamp: new Date()
                };
                setMessages((prev) => [...prev, promoMessage]);
                setShowPromotions(true);
            }, 2000);
        }
    }, [promotions, language]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || !ai) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            text: inputValue,
            isAI: false,
            timestamp: new Date()
        };
        setMessages((prev) => [...prev, userMessage]);

        const messageText = inputValue;
        setInputValue('');
        setIsTyping(true);

        try {
            // Detect message type and update mode
            const technicalKeywords = [
                'lỗi',
                'vấn đề',
                'hỏng',
                'không hoạt động',
                'đơn hàng',
                'thanh toán',
                'hoàn tiền',
                'error',
                'problem',
                'broken'
            ];
            const marketingKeywords = [
                'khuyến mãi',
                'giảm giá',
                'ưu đãi',
                'mua',
                'giá',
                'deal',
                'discount',
                'promotion',
                'buy',
                'price'
            ];

            if (
                technicalKeywords.some((keyword) =>
                    messageText.toLowerCase().includes(keyword)
                )
            ) {
                setCurrentMode('technical');
            } else if (
                marketingKeywords.some((keyword) =>
                    messageText.toLowerCase().includes(keyword)
                )
            ) {
                setCurrentMode('marketing');
            } else {
                setCurrentMode('general');
            }

            // Get AI response (BotLibre can switch between modes)
            const aiResponse = await ai.processMessage(messageText, language);

            // Add AI response
            const aiMessage = {
                id: Date.now() + 1,
                text: aiResponse,
                isAI: true,
                timestamp: new Date(),
                mode: currentMode
            };

            setTimeout(() => {
                setMessages((prev) => [...prev, aiMessage]);

                // Show urgency for purchase intents
                if (
                    messageText.toLowerCase().includes('mua') ||
                    messageText.toLowerCase().includes('buy')
                ) {
                    setTimeout(() => {
                        const urgencyMessage = {
                            id: Date.now() + 2,
                            text:
                                language === 'vi'
                                    ? '⏰ Ưu đãi này kết thúc sau 2 giờ! Hãy hành động ngay!'
                                    : '⏰ This offer expires in 2 hours! Act now!',
                            isAI: true,
                            timestamp: new Date(),
                            mode: 'marketing'
                        };
                        setMessages((prev) => [...prev, urgencyMessage]);
                    }, 1000);
                }

                setIsTyping(false);
            }, 700);
        } catch (error) {
            console.error('BotLibre AI Error:', error);
            const errorMessage = {
                id: Date.now() + 1,
                text:
                    language === 'vi'
                        ? 'Xin lỗi, tôi đang xử lý yêu cầu của bạn. Vui lòng thử lại.'
                        : "Sorry, I'm processing your request. Please try again.",
                isAI: true,
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, errorMessage]);
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleLanguageSwitch = (newLanguage) => {
        setLanguage(newLanguage);
        if (ai && ai.contextManager) {
            ai.contextManager.setLanguage(newLanguage);
        }
    };

    const getQuickActions = () => {
        if (language === 'vi') {
            return [
                'Hỗ trợ chung',
                'Xem khuyến mãi',
                'Tìm sản phẩm',
                'Vấn đề kỹ thuật'
            ];
        }
        return [
            'General help',
            'View promotions',
            'Find products',
            'Technical support'
        ];
    };

    const handleQuickAction = (action) => {
        setInputValue(action);
        setTimeout(() => handleSendMessage(), 100);
    };

    const getModeIcon = () => {
        switch (currentMode) {
            case 'technical':
                return '🔧';
            case 'marketing':
                return '🎯';
            default:
                return '🤖';
        }
    };

    const getModeColor = () => {
        switch (currentMode) {
            case 'technical':
                return '#2196F3';
            case 'marketing':
                return '#FF9800';
            default:
                return '#9C27B0';
        }
    };

    const getSamplePromotions = () => {
        return language === 'vi'
            ? [
                  {
                      title: 'Flash Sale Điện tử',
                      discount: '30%',
                      time: '2h 15m'
                  },
                  {
                      title: 'Bundle Thời Trang',
                      discount: '25%',
                      time: '5h 30m'
                  },
                  {
                      title: 'Giảm Giá Săn Sale',
                      discount: '40%',
                      time: '1h 45m'
                  }
              ]
            : [
                  {
                      title: 'Electronics Flash Sale',
                      discount: '30%',
                      time: '2h 15m'
                  },
                  {
                      title: 'Fashion Bundle Deal',
                      discount: '25%',
                      time: '5h 30m'
                  },
                  {
                      title: 'Mega Sale Discount',
                      discount: '40%',
                      time: '1h 45m'
                  }
              ];
    };
    return [
        'General help',
        'View promotions',
        'Find products',
        'Technical support'
    ];
};

const handleQuickAction = (action) => {
    setInputValue(action);
    setTimeout(() => handleSendMessage(), 100);
};

const getModeIcon = () => {
    switch (currentMode) {
        case 'technical':
            return '🔧';
        case 'marketing':
            return '🎯';
        default:
            return '🤖';
    }
};

const getModeColor = () => {
    switch (currentMode) {
        case 'technical':
            return '#2196F3';
        case 'marketing':
            return '#FF9800';
        default:
            return '#9C27B0';
    }
};

const getSamplePromotions = () => {
    return language === 'vi'
        ? [
              {
                  title: 'Flash Sale Điện tử',
                  discount: '30%',
                  time: '2h 15m'
              },
              {
                  title: 'Bundle Thời Trang',
                  discount: '25%',
                  time: '5h 30m'
              },
              {
                  title: 'Giảm Giá Săn Sale',
                  discount: '40%',
                  time: '1h 45m'
              }
          ]
        : [
              {
                  title: 'Electronics Flash Sale',
                  discount: '30%',
                  time: '2h 15m'
              },
              {
                  title: 'Fashion Bundle Deal',
                  discount: '25%',
                  time: '5h 30m'
              },
              {
                  title: 'Mega Sale Discount',
                  discount: '40%',
                  time: '1h 45m'
              }
          ];
};

if (!ai || !config) {
    return (
        <div className='botlibre-chatbot loading'>
            <div className="loading-spinner">🤖 Loading assistant...</div>
        </div>
    );
}

return (
    <div className='botlibre-chatbot'>
        {/* Header */}
        <div
            className='chat-header general'
            style={{
                background: `linear-gradient(135deg, ${getModeColor()}, ${getModeColor()}dd)`
            }}
        >
            <div className='header-info'>
                <span className='ai-icon'>{getModeIcon()}</span>
                <div className='header-text'>
                    <h3>{config.name}</h3>
                    <p>{config.description}</p>
                    <div className='mode-indicator'>
                        {language === 'vi' 
                            ? `Chế độ: ${currentMode === 'technical' ? 'Kỹ thuật' : currentMode === 'marketing' ? 'Marketing' : 'Tổng quát'}` 
                            : `Mode: ${currentMode.charAt(0).toUpperCase() + currentMode.slice(1)}`
                        }
                    </div>
                </div>
            </div>
            <div className='language-switcher'>
                <button
                    onClick={() => handleLanguageSwitch('vi')}
                    className={language === 'vi' ? 'active' : ''}
                >
                    VI
                </button>
                <button
                    onClick={() => handleLanguageSwitch('en')}
                    className={language === 'en' ? 'active' : ''}
                >
                    EN</button>
            </div>
        </div>

        {/* Messages */}
        <div className='messages-container'>
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`message ${message.isAI ? 'ai-message general' : 'user-message'}`}
                    style={
                        message.isAI && message.mode
                            ? {
                                borderLeftColor:
                                    message.mode === 'technical'
                                        ? '#2196F3'
                                        : message.mode === 'marketing'
                                        ? '#FF9800'
                                        : '#9C27B0'
                            }
                            : {}
                    }
                >
                    <div className='message-content'>{message.text}</div>
                    <div className='message-time'>
                        {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </div>
            ))}
            {isTyping && (
                <div className='message ai-message general typing'>
                    <div className='typing-indicator'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            )}

            {/* Promotions Panel */}
            {showPromotions && currentMode === 'marketing' && (
                <div className='promotions-panel'>
                    <div className='promotions-header'>
                        {language === 'vi' ? '🔥 Ưu đãi hot:' : '🔥 Hot Deals:'}
                    </div>
                    {getSamplePromotions().map((promo, index) => (
                        <div key={index} className='promo-card'>
                            <div className='promo-info'>
                                <div className='promo-title'>{promo.title}</div>
                                <div className='promo-discount'>-{promo.discount}</div>
                            </div>
                            <div className='promo-time'>⏰ {promo.time}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Quick Actions */}
        <div className='quick-actions'>
            {getQuickActions().map((action, index) => (
                <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className='quick-action-btn'
                    style={{
                        borderColor: getModeColor(),
                        color: getModeColor()
                    }}
                >
                    {action}
                </button>
            ))}
        </div>

        {/* Input */}
        <div className='input-container'>
            <div className='input-wrapper'>
                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                        language === 'vi'
                            ? 'Tôi có thể giúp gì cho bạn hôm nay?'
                            : 'How can I help you today?'
                    }
                    rows={1}
                    className='message-input'
                    style={{ borderColor: getModeColor() }}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className='send-button'
                    style={{ background: getModeColor() }}
                >
                    {getModeIcon()}
                </button>
            </div>
        </div>

    <style jsx>{`
                .botlibre-chatbot {
                    display: flex;
                    flex-direction: column;
                    height: 500px;
                    width: 350px;
                    border: 1px solid #e1e5e9;
                    border-radius: 12px;
                    overflow: hidden;
                    background: white;
                    font-family:
                        -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                        sans-serif;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .loading {
                    align-items: center;
                    justify-content: center;
                }

                .loading-spinner {
                    color: #9c27b0;
                    font-weight: 500;
                }

                .chat-header.general {
                    color: white;
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: background 0.3s ease;
                }

                .header-info {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .ai-icon {
                    font-size: 24px;
                }

                .header-text h3 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                }

                .header-text p {
                    margin: 0;
                    font-size: 12px;
                    opacity: 0.9;
                }

                .mode-indicator {
                    font-size: 10px;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 2px 6px;
                    border-radius: 10px;
                    margin-top: 4px;
                    display: inline-block;
                }

                .language-switcher {
                    display: flex;
                    gap: 5px;
                }

                .language-switcher button {
                    padding: 4px 8px;
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 4px;
                    color: white;
                    cursor: pointer;
                    font-size: 11px;
                    transition: all 0.2s;
                }

                .language-switcher button.active {
                    background: rgba(255, 255, 255, 0.3);
                    border-color: white;
                }

                .messages-container {
                    flex: 1;
                    overflow-y: auto;
                    padding: 15px;
                    background: #f8f9fa;
                }

                .message {
                    margin-bottom: 12px;
                    max-width: 85%;
                }

                .user-message {
                    margin-left: auto;
                }

                .ai-message.general {
                    background: #f3e5f5;
                    border-left: 3px solid #9c27b0;
                    border-radius: 8px;
                    padding: 10px 12px;
                    transition: border-color 0.3s ease;
                }

                .user-message .message-content {
                    background: #9c27b0;
                    color: white;
                    border-radius: 8px;
                    padding: 10px 12px;
                }

                .message-content {
                    font-size: 14px;
                    line-height: 1.4;
                }

                .message-time {
                    font-size: 11px;
                    color: #666;
                    margin-top: 4px;
                    text-align: right;
                }

                .ai-message .message-time {
                    text-align: left;
                }

                .typing-indicator {
                    display: flex;
                    gap: 4px;
                    padding: 8px 0;
                }

                .typing-indicator span {
                    width: 6px;
                    height: 6px;
                    background: #9c27b0;
                    border-radius: 50%;
                    animation: typing 1.4s infinite;
                }

                .typing-indicator span:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .typing-indicator span:nth-child(3) {
                    animation-delay: 0.4s;
                }

                @keyframes typing {
                    0%,
                    60%,
                    100% {
                        opacity: 0.3;
                    }
                    30% {
                        opacity: 1;
                    }
                }

                .promotions-panel {
                    margin: 15px 0;
                    padding: 12px;
                    background: white;
                    border-radius: 8px;
                    border: 1px solid #e1e5e9;
                }

                .promotions-header {
                    font-weight: 600;
                    margin-bottom: 10px;
                    color: #ff9800;
                }

                .promo-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                    border-bottom: 1px solid #f0f0f0;
                }

                .promo-card:last-child {
                    border-bottom: none;
                }

                .promo-info {
                    flex: 1;
                }

                .promo-title {
                    font-weight: 500;
                    font-size: 13px;
                    color: #333;
                }

                .promo-discount {
                    color: #ff9800;
                    font-weight: 600;
                    font-size: 12px;
                }

                .promo-time {
                    font-size: 11px;
                    color: #666;
                }

                .quick-actions {
                    padding: 10px 15px;
                    background: white;
                    border-top: 1px solid #e1e5e9;
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .quick-action-btn {
                    padding: 6px 12px;
                    background: #f1f3f4;
                    border: 1px solid #e1e5e9;
                    border-radius: 16px;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .quick-action-btn:hover {
                    background: #f3e5f5;
                    transform: translateY(-1px);
                }

                .input-container {
                    padding: 15px;
                    background: white;
                    border-top: 1px solid #e1e5e9;
                }

                .input-wrapper {
                    display: flex;
                    gap: 10px;
                    align-items: flex-end;
                }

                .message-input {
                    flex: 1;
                    border: 1px solid #e1e5e9;
                    border-radius: 20px;
                    padding: 10px 15px;
                    font-size: 14px;
                    resize: none;
                    outline: none;
                    font-family: inherit;
                    min-height: 40px;
                    max-height: 100px;
                    transition: border-color 0.3s ease;
                }

                .message-input:focus {
                    box-shadow: 0 0 0 2px rgba(156, 39, 176, 0.2);
                }

                .send-button {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: none;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    transition: all 0.2s;
                }

                .send-button:hover:not(:disabled) {
                    transform: scale(1.05);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                }

                .send-button:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                    transform: scale(1);
                }
            `}</style>
        </div>
    );
};

export default BotlibreChatbot;
