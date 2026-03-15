import { useState, useEffect, useRef } from 'react';
import './styles.css';

const RealBotLibreChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isBotLibreLoaded, setIsBotLibreLoaded] = useState(false);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        // Check if BotLibre SDK is loaded
        const checkBotLibre = () => {
            if (window.Botlibre && window.Botlibre.Chatbot) {
                setIsBotLibreLoaded(true);
                initializeBotLibre();
            }
        };

        // Initial check
        checkBotLibre();

        // Set up interval to check if BotLibre loads
        const interval = setInterval(checkBotLibre, 1000);

        return () => clearInterval(interval);
    }, []);

    const initializeBotLibre = () => {
        try {
            // Initialize BotLibre chatbot if not already initialized
            if (!window.botlibreInstance) {
                window.botlibreInstance = new window.Botlibre.Chatbot({
                    id: '6',
                    domain: 'https://www.botlibre.com',
                    floating: false, // We'll control positioning ourselves
                    title: 'BotLibre AI Assistant',
                    send: 'Gửi',
                    placeholder: 'Nhập tin nhắn...'
                });
            }
        } catch (error) {
            console.error('Error initializing BotLibre:', error);
        }
    };

    const handleToggleChat = () => {
        setIsOpen(!isOpen);
        
        // If opening and BotLibre is loaded, show the widget
        if (!isOpen && isBotLibreLoaded && window.botlibreInstance) {
            setTimeout(() => {
                // Try to find and show BotLibre widget
                const botlibreElements = document.querySelectorAll('[id*="botlibre"], .botlibre-chat, iframe[src*="botlibre"]');
                botlibreElements.forEach(element => {
                    element.style.display = 'block';
                    element.style.position = 'fixed';
                    element.style.bottom = '10px';
                    element.style.right = 'auto';
                    element.style.left = '-370px';
                    element.style.zIndex = '9999';
                });
            }, 100);
        } else if (isOpen) {
            // Hide BotLibre widget when closing
            const botlibreElements = document.querySelectorAll('[id*="botlibre"], .botlibre-chat, iframe[src*="botlibre"]');
            botlibreElements.forEach(element => {
                element.style.display = 'none';
            });
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className='botlibre-chatbot'>
            <button
                className='chat-button botlibre-style'
                onClick={handleToggleChat}
                aria-label='Chat with BotLibre'
            >
                {isOpen ? '✕' : '🤖'}
            </button>

            {isOpen && !isBotLibreLoaded && (
                <div className='chat-window botlibre-theme'>
                    <div className='chat-header botlibre-header'>
                        <h3>🤖 BotLibre AI Assistant</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className='close-btn'
                        >
                            ✕
                        </button>
                    </div>
                    <div className='chat-messages'>
                        <div className='message bot-message botlibre-bot'>
                            <div className='message-text'>
                                Đang tải BotLibre AI... Vui lòng đợi.
                            </div>
                            <div className='message-time'>
                                {formatTime(new Date())}
                            </div>
                        </div>
                        <div className='message bot-message botlibre-bot'>
                            <div className='message-text'>
                                Nếu không tải được, BotLibre có thể đang bảo trì hoặc có lỗi kết nối.
                            </div>
                            <div className='message-time'>
                                {formatTime(new Date())}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isOpen && isBotLibreLoaded && (
                <div className='chat-window botlibre-theme'>
                    <div className='chat-header botlibre-header'>
                        <h3>🤖 BotLibre AI Assistant</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className='close-btn'
                        >
                            ✕
                        </button>
                    </div>
                    <div className='chat-messages'>
                        <div className='message bot-message botlibre-bot'>
                            <div className='message-text'>
                                BotLibre AI đã sẵn sàng! Đây là chatbot AI thực sự từ BotLibre.com.
                            </div>
                            <div className='message-time'>
                                {formatTime(new Date())}
                            </div>
                        </div>
                        <div className='message bot-message botlibre-bot'>
                            <div className='message-text'>
                                Chat widget sẽ xuất hiện bên trái. Nếu không thấy, vui lòng làm mới trang.
                            </div>
                            <div className='message-time'>
                                {formatTime(new Date())}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RealBotLibreChatbot;
