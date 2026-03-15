import { useState, useEffect } from 'react';
import './manager-styles.css';

const ChatbotManager = () => {
    const [activeBot, setActiveBot] = useState('custom'); // 'webot', 'botlibre', 'tawk', 'custom'
    const [showSelector, setShowSelector] = useState(false);

    useEffect(() => {
        // Hide other chatbots when custom bot is active
        const hideExternalBots = () => {
            // Hide Tawk.to
            const tawkWidget = document.querySelector(
                '[style*="bottom: 60px"]'
            );
            if (tawkWidget && activeBot !== 'tawk') {
                tawkWidget.style.display = 'none';
            } else if (tawkWidget && activeBot === 'tawk') {
                tawkWidget.style.display = 'block';
            }

            // Hide BotLibre
            const botlibreWidget = document.querySelector('#botlibre-chat');
            if (botlibreWidget && activeBot !== 'botlibre') {
                botlibreWidget.style.display = 'none';
            } else if (botlibreWidget && activeBot === 'botlibre') {
                botlibreWidget.style.display = 'block';
            }
        };

        hideExternalBots();
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

        console.log(`Đã chuyển sang: ${botNames[botType]}`);
    };

    return (
        <div className='chatbot-manager'>
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
                            className={`bot-option ${activeBot === 'botlibre' ? 'active' : ''}`}
                            onClick={() => switchBot('botlibre')}
                        >
                            <span className='bot-icon'>🤖</span>
                            <div className='bot-info'>
                                <strong>BotLibre</strong>
                                <small>Chatbot AI chuyên nghiệp</small>
                            </div>
                        </button>

                        <button
                            className={`bot-option ${activeBot === 'tawk' ? 'active' : ''}`}
                            onClick={() => switchBot('tawk')}
                        >
                            <span className='bot-icon'>💬</span>
                            <div className='bot-info'>
                                <strong>Tawk.to</strong>
                                <small>Live chat & chatbot</small>
                            </div>
                        </button>

                        <button
                            className={`bot-option ${activeBot === 'webot' ? 'active' : ''}`}
                            onClick={() => switchBot('webot')}
                        >
                            <span className='bot-icon'>🤖</span>
                            <div className='bot-info'>
                                <strong>Webot</strong>
                                <small>Chatbot tự động</small>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {/* Active Bot Indicator */}
            <div className='active-bot-indicator'>
                <span className='indicator-text'>
                    {activeBot === 'custom' && '🤖 AI Bot'}
                    {activeBot === 'botlibre' && '🤖 BotLibre'}
                    {activeBot === 'tawk' && '💬 Tawk.to'}
                    {activeBot === 'webot' && '🤖 Webot'}
                </span>
            </div>
        </div>
    );
};

export default ChatbotManager;
