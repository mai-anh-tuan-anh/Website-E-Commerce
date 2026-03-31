import { useState, useEffect } from 'react';
import './manager-styles.css';
import WebotChatbot from './WebotChatbot';
import TawkChatbot from './TawkChatbot';
import BotLibreChatbot from './BotLibreChatbot';
import RealBotLibreChatbot from './RealBotLibreChatbot';

const ChatbotManager = () => {
    const [activeBot, setActiveBot] = useState('custom'); // 'webot', 'botlibre', 'tawk', 'custom'
    const [showSelector, setShowSelector] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [minimizedBots, setMinimizedBots] = useState({
        webot: false,
        tawk: false
    });

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 768px)');
        const update = () => setIsMobile(mql.matches);

        update();
        if (mql.addEventListener) {
            mql.addEventListener('change', update);
            return () => mql.removeEventListener('change', update);
        }

        // Safari fallback
        mql.addListener(update);
        return () => mql.removeListener(update);
    }, []);

    useEffect(() => {
        // Hide other chatbots when custom bot is active
        const hideExternalBots = () => {
            // On mobile we want absolutely no chatbot widgets.
            if (isMobile) {
                const tawkWidgets = document.querySelectorAll(
                    'iframe[title*="chat widget"], iframe[src*="tawk.to"]'
                );
                tawkWidgets.forEach((widget) => {
                    widget.style.display = 'none';
                });

                const botlibreWidget = document.querySelector('#botlibre-chat');
                if (botlibreWidget) botlibreWidget.style.display = 'none';

                return;
            }

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
    }, [activeBot, isMobile]);

    // Additional effect to handle Tawk.to positioning after it loads
    useEffect(() => {
        if (isMobile) return;
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

    const toggleBotMinimize = (botType) => {
        setMinimizedBots((prev) => ({
            ...prev,
            [botType]: !prev[botType]
        }));
    };

    const switchBot = (botType) => {
        setActiveBot(botType);
        setShowSelector(false);

        // Show notification
        const botNames = {
            webot: 'Webot Chatbot',
            botlibre: 'BotLibre Chatbot',
            tawk: 'Tawk.to Chatbot',
            custom: 'Custom AI Chatbot'
        };

        const handleBotChange = (botType) => {
            const selectedBot = botType;
            const botNames = {
                ai: 'Custom AI Chatbot',
                simple: 'Simple Chatbot',
                advanced: 'Advanced Chatbot'
            };
        };
    };

    if (isMobile) return null;

    return (
        <div className='chatbot-manager'>
            {/* Render the active chatbot */}
            {activeBot === 'webot' && (
                <WebotChatbot
                    isMinimized={minimizedBots.webot}
                    onToggleMinimize={() => toggleBotMinimize('webot')}
                />
            )}
            {activeBot === 'tawk' && (
                <TawkChatbot
                    isMinimized={minimizedBots.tawk}
                    onToggleMinimize={() => toggleBotMinimize('tawk')}
                />
            )}
            {activeBot === 'custom' && <BotLibreChatbot />}
            {activeBot === 'botlibre' && <RealBotLibreChatbot />}

            {/* Bot Selection Button */}
            <button
                className='bot-selector-btn'
                onClick={() => setShowSelector(!showSelector)}
                title='Select chatbot'
            >
                🤖
            </button>

            {/* Bot Selection Panel */}
            {showSelector && (
                <div className='bot-selector-panel'>
                    <h4>Select Chatbot</h4>
                    <div className='bot-options'>
                        <button
                            className={`bot-option ${activeBot === 'webot' ? 'active' : ''}`}
                            onClick={() => switchBot('webot')}
                        >
                            <span className='bot-icon'>🤖</span>
                            <div className='bot-info'>
                                <strong>Webot</strong>
                                <small>Fashion style consultant expert</small>
                            </div>
                        </button>

                        <button
                            className={`bot-option ${activeBot === 'tawk' ? 'active' : ''}`}
                            onClick={() => switchBot('tawk')}
                        >
                            <span className='bot-icon'>💬</span>
                            <div className='bot-info'>
                                <strong>Tawk.to</strong>
                                <small>24/7 customer service</small>
                            </div>
                        </button>

                        <button
                            className={`bot-option ${activeBot === 'botlibre' ? 'active' : ''}`}
                            onClick={() => switchBot('botlibre')}
                        >
                            <span className='bot-icon'>🤖</span>
                            <div className='bot-info'>
                                <strong>BotLibre</strong>
                                <small>Professional AI chatbot</small>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {/* Active Bot Indicator */}
            <div className='active-bot-indicator'>
                <span className='indicator-text'>
                    {activeBot === 'custom' && '🤖 AI Bot'}
                    {activeBot === 'webot' && '� Webot'}
                    {activeBot === 'tawk' && '💬 Tawk.to'}
                    {activeBot === 'botlibre' && '🤖 BotLibre'}
                </span>
            </div>
        </div>
    );
};

export default ChatbotManager;
