import { useState, useEffect } from 'react';
import './manager-styles.css';
import WebotChatbot from './WebotChatbot';
import TawkChatbot from './TawkChatbot';
import BotLibreChatbot from './BotLibreChatbot';
import RealBotLibreChatbot from './RealBotLibreChatbot';

const ChatbotManager = () => {
    const [activeBot, setActiveBot] = useState('custom'); // 'webot', 'botlibre', 'tawk', 'custom'
    const [showSelector, setShowSelector] = useState(false);

    useEffect(() => {
        // Hide other chatbots when custom bot is active
        const hideExternalBots = () => {
            // Hide Tawk.to iframe
            const tawkWidgets = document.querySelectorAll(
                'iframe[title*="chat widget"], iframe[src*="tawk.to"]'
            );
            tawkWidgets.forEach((widget) => {
                if (activeBot !== 'tawk') {
                    widget.style.display = 'none';
                } else {
                    widget.style.display = 'block';
                    // Force position to bottom-right
                    widget.style.position = 'fixed';
                    widget.style.bottom = '20px';
                    widget.style.right = '20px';
                    widget.style.zIndex = '9998';
                }
            });

            // Hide BotLibre
            const botlibreWidget = document.querySelector('#botlibre-chat');
            if (
                botlibreWidget &&
                activeBot !== 'botlibre' &&
                activeBot !== 'custom'
            ) {
                botlibreWidget.style.display = 'none';
            } else if (
                botlibreWidget &&
                (activeBot === 'botlibre' || activeBot === 'custom')
            ) {
                botlibreWidget.style.display = 'block';
            }
        };

        hideExternalBots();
    }, [activeBot]);

    // Additional effect to handle Tawk.to positioning after it loads
    useEffect(() => {
        if (activeBot === 'tawk') {
            const positionTawkWidget = () => {
                const tawkWidgets = document.querySelectorAll(
                    'iframe[title*="chat widget"], iframe[src*="tawk.to"]'
                );
                tawkWidgets.forEach((widget) => {
                    widget.style.position = 'fixed';
                    widget.style.bottom = '20px';
                    widget.style.right = '20px';
                    widget.style.zIndex = '9998';
                });
            };

            // Try positioning immediately and then after a delay
            positionTawkWidget();
            const timer = setTimeout(positionTawkWidget, 1000);

            return () => clearTimeout(timer);
        }
    }, [activeBot]);

    const switchBot = (botType) => {
        setActiveBot(botType);
        setShowSelector(false);

        // Show notification
        const botNames = {
            webot: 'Webot Chatbot',
            botlibre: 'BotLibre Chatbot',
            tawk: 'Tawk.to Chatbot',
            custom: 'AI Chatbot Tùy chỉnh'
        };

        const handleBotChange = (botType) => {
            const selectedBot = botType;
            const botNames = {
                ai: 'AI Chatbot Tùy chỉnh',
                simple: 'Simple Chatbot',
                advanced: 'Advanced Chatbot'
            };
        };
    };

    return (
        <div className='chatbot-manager'>
            {/* Render the active chatbot */}
            {activeBot === 'webot' && <WebotChatbot />}
            {activeBot === 'tawk' && <TawkChatbot />}
            {activeBot === 'custom' && <BotLibreChatbot />}
            {activeBot === 'botlibre' && <RealBotLibreChatbot />}

            {/* Bot Selection Button */}
            <button
                className='bot-selector-btn'
                onClick={() => setShowSelector(!showSelector)}
                title='Chọn chatbot'
            >
                🤖
            </button>

            {/* Bot Selection Panel */}
            {showSelector && (
                <div className='bot-selector-panel'>
                    <h4>Chọn Chatbot</h4>
                    <div className='bot-options'>
                        <button
                            className={`bot-option ${activeBot === 'custom' ? 'active' : ''}`}
                            onClick={() => switchBot('custom')}
                        >
                            <span className='bot-icon'>🤖</span>
                            <div className='bot-info'>
                                <strong>AI Chatbot Tùy chỉnh</strong>
                                <small>Thông minh, đa ngôn ngữ</small>
                            </div>
                        </button>

                        <button
                            className={`bot-option ${activeBot === 'webot' ? 'active' : ''}`}
                            onClick={() => switchBot('webot')}
                        >
                            <span className='bot-icon'>🔧</span>
                            <div className='bot-info'>
                                <strong>Webot</strong>
                                <small>Chuyên gia kỹ thuật công nghệ</small>
                            </div>
                        </button>

                        <button
                            className={`bot-option ${activeBot === 'tawk' ? 'active' : ''}`}
                            onClick={() => switchBot('tawk')}
                        >
                            <span className='bot-icon'>💬</span>
                            <div className='bot-info'>
                                <strong>Tawk.to</strong>
                                <small>Chăm sóc khách hàng 24/7</small>
                            </div>
                        </button>

                        <button
                            className={`bot-option ${activeBot === 'botlibre' ? 'active' : ''}`}
                            onClick={() => switchBot('botlibre')}
                        >
                            <span className='bot-icon'>🤖</span>
                            <div className='bot-info'>
                                <strong>BotLibre</strong>
                                <small>Chatbot AI chuyên nghiệp</small>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {/* Active Bot Indicator */}
            <div className='active-bot-indicator'>
                <span className='indicator-text'>
                    {activeBot === 'custom' && '🤖 AI Bot'}
                    {activeBot === 'webot' && '🔧 Webot'}
                    {activeBot === 'tawk' && '💬 Tawk.to'}
                    {activeBot === 'botlibre' && '🤖 BotLibre'}
                </span>
            </div>
        </div>
    );
};

export default ChatbotManager;
