/**
 * Webot Chatbot - Fashion Consultant AI
 * Smart fashion consultant
 */
import React, { useState, useEffect } from 'react';

const WebotChatbot = ({ isMinimized = false, onToggleMinimize }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        // Set initial greeting
        setMessages([
            {
                id: 1,
                text:
                    language === 'vi'
                        ? '👋 Xin chào! Tôi là Webot - chuyên gia tư vấn thời trang của shop.\n\nTôi chuyên về:\n👕 Tư vấn phong cách và phối đồ\n👗 Gợi ý trang phục theo vóc dáng\n🎨 Tư vấn màu sắc và xu hướng\n📦 Hỗ trợ chọn size và chất liệu\n\nBạn cần tư vấn thời trang gì hôm nay?'
                        : "👋 Hello! I'm Webot - the shop's fashion consultant expert.\n\nI specialize in:\n👕 Style consultation and outfit coordination\n👗 Outfit suggestions based on body type\n🎨 Color and trend consultation\n📦 Assistance with size and material selection\n\nWhat fashion advice do you need today?",
                isAI: true,
                timestamp: new Date()
            }
        ]);
    }, []);

    const generateSmartResponse = async (userMessage) => {
        const msg = userMessage.toLowerCase().trim();

        // Greeting patterns
        if (
            msg.includes('hello') ||
            msg.includes('hi') ||
            msg.includes('chào') ||
            msg.includes('xin chào')
        ) {
            return language === 'vi'
                ? '👗 Chào bạn! Rất vui được tư vấn thời trang cho bạn. Bạn đang tìm kiếm trang phục gì hay cần gợi ý phong cách gì?'
                : "👗 Hello there! I'm excited to help you with fashion! Are you looking for specific clothing items or need style advice?";
        }

        // Fashion item patterns
        if (
            msg.includes('t-shirt') ||
            msg.includes('áo thun') ||
            msg.includes('cotton')
        ) {
            return language === 'vi'
                ? '👕 **Áo thun - Kiểu dáng đa dạng!**\n\n**Áo thun Cotton cơ bản**:\n• Chất liệu: 100% Cotton\n• Kiểu dáng: Regular fit\n• Màu: Trắng, Đen, Xám, Be\n• Size: S - XL\n• Giá: 299.000đ\n\n**Áo thun Oversize**:\n• Chất liệu: Cotton co giãn\n• Kiểu dáng: Rộng rộng\n• Màu: Pastel tones\n• Size: Free size\n• Giá: 349.000đ\n\nBạn thích kiểu dáng nào? 😊'
                : '👕 **T-Shirts - Versatile styles!**\n\n**Premium Cotton T-Shirt**:\n• Material: 100% Cotton\n• Fit: Regular fit\n• Colors: White, Black, Gray, Beige\n• Size: S - XL\n• Price: $19.99\n\n**Oversize T-Shirt**:\n• Material: Stretch cotton\n• Fit: Loose oversize\n• Colors: Pastel tones\n• Size: Free size\n• Price: $24.99\n\nWhich style interests you? 😊';
        }

        if (
            msg.includes('jean') ||
            msg.includes('quần jean') ||
            msg.includes('denim')
        ) {
            return language === 'vi'
                ? '👖 **Quần jean - Phải có trong tủ đồ!**\n\n**Slim Fit Jeans**:\n• Chất liệu: Denim co giãn\n• Kiểu dáng: Ôm vừa phải\n• Màu: Blue, Black, Grey\n• Size: 28 - 36\n• Giá: 599.000đ\n\n**Baggy Jeans**:\n• Chất liệu: Denim dày\n• Kiểu dáng: Rộng, thụng\n• Màu: Light wash, Dark wash\n• Size: 28 - 36\n• Giá: 649.000đ\n\nBạn muốn kiểu nào? 😊'
                : '👖 **Jeans - Essential wardrobe piece!**\n\n**Slim Fit Jeans**:\n• Material: Stretch denim\n• Fit: Slim fit lightly fitted\n• Colors: Blue, Black, Grey\n• Size: 28 - 36\n• Price: $49.99\n\n**Baggy Jeans**:\n• Material: Heavy weight denim\n• Fit: Loose baggy\n• Colors: Light wash, Dark wash\n• Size: 28 - 36\n• Price: $54.99\n\nWhich style do you prefer? 😊';
        }

        if (
            msg.includes('dress') ||
            msg.includes('váy') ||
            msg.includes('đầm')
        ) {
            return language === 'vi'
                ? '👗 **Váy - Nét nữ tính thanh lịch!**\n\n**Váy hoa Mini**:\n• Chất liệu: Chiffon mềm\n• Kiểu dáng: A-line xòe\n• Họa tiết: Hoa pastel\n• Size: S - L\n• Giá: 799.000đ\n\n**Váy Bodycon**:\n• Chất liệu: Knit co giãn\n• Kiểu dáng: Ôm sát\n• Màu: Đen, Đỏ, Navy\n• Size: XS - M\n• Giá: 699.000đ\n\nBạn thích kiểu váy nào? 💃'
                : '👗 **Dresses - Elegant feminine charm!**\n\n**Floral Mini Dress**:\n• Material: Soft chiffon\n• Style: A-line flared\n• Pattern: Pastel flowers\n• Size: S - L\n• Price: $69.99\n\n**Bodycon Dress**:\n• Material: Stretch knit\n• Style: Body-hugging fit\n• Colors: Black, Red, Navy blue\n• Size: XS - M\n• Price: $59.99\n\nWhich dress style do you love? 💃';
        }

        if (
            msg.includes('size') ||
            msg.includes('kích thước') ||
            msg.includes('đo')
        ) {
            return language === 'vi'
                ? '📏 **Hướng dẫn chọn size hoàn hảo!**\n\n**Size Áo thun**:\n• S: Ngực 92cm, Dài 68cm\n• M: Ngực 96cm, Dài 70cm\n• L: Ngực 100cm, Dài 72cm\n• XL: Ngực 104cm, Dài 74cm\n\n**Size Quần jean**:\n• 28: Eo 72cm, Dài 96cm\n• 29: Eo 74cm, Dài 98cm\n• 30: Eo 76cm, Dài 100cm\n\nBạn cần size cho sản phẩm nào? 😊'
                : '📏 **Perfect size selection guide!**\n\n**T-Shirt Sizes**:\n• S: Chest 92cm, Length 68cm\n• M: Chest 96cm, Length 70cm\n• L: Chest 100cm, Length 72cm\n• XL: Chest 104cm, Length 74cm\n\n**Jean Sizes**:\n• 28: Waist 72cm, Length 96cm\n• 29: Waist 74cm, Length 98cm\n• 30: Waist 76cm, Length 100cm\n\nWhich product needs size advice? 😊';
        }

        // Default smart response
        return language === 'vi'
            ? `🤗 Tôi hiểu bạn muốn hỏi về "${userMessage}". Để tư vấn tốt nhất, bạn có thể cho tôi biết thêm:\n\n• Bạn đang tìm loại trang phục nào?\n• Dịp sử dụng: đi làm, đi chơi, hay dạ tiệc?\n• Sở thích về màu sắc, kiểu dáng?\n• Ngân sách của bạn khoảng bao nhiêu?\n\nTôi sẽ gợi ý những lựa chọn phù hợp nhất! 👗✨`
            : `🤗 I see you're asking about "${userMessage}". To give you the best fashion advice, could you tell me:\n\n• What type of clothing are you looking for?\n• Occasion: work, casual, or party?\n• Color and style preferences?\n• What's your budget range?\n\nI'll recommend the perfect options for you! 👗✨`;
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

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

        setTimeout(async () => {
            const aiResponse = await generateSmartResponse(messageText);

            const aiMessage = {
                id: Date.now() + 1,
                text: aiResponse,
                isAI: true,
                timestamp: new Date()
            };

            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
        }, 800);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleLanguageSwitch = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const getQuickActions = () => {
        if (language === 'vi') {
            return [
                'Gợi ý trang phục',
                'Tư vấn phong cách',
                'Chọn size',
                'Phối đồ',
                'Xu hướng thời trang'
            ];
        }
        return [
            'Outfit suggestions',
            'Style advice',
            'Size help',
            'Fashion trends',
            'Color coordination'
        ];
    };

    const handleQuickAction = (action) => {
        setInputValue(action);
        setTimeout(() => handleSendMessage(), 100);
    };

    return (
        <div className={`webot-chatbot ${isMinimized ? 'minimized' : ''}`}>
            {/* Header */}
            <div className='chat-header fashion'>
                <div className='header-info'>
                    <span className='ai-icon'>👗</span>
                    <div className='header-text'>
                        <h3>Webot Fashion Expert</h3>
                        <p>Professional fashion consultant</p>
                    </div>
                </div>
                <div className='header-controls'>
                    <button
                        className='minimize-btn'
                        onClick={onToggleMinimize}
                        title={isMinimized ? 'Maximize' : 'Minimize'}
                    >
                        {isMinimized ? '📤' : '📥'}
                    </button>
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
                            EN
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages - Hidden when minimized */}
            {!isMinimized && (
                <div className='messages-container'>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.isAI ? 'ai-message fashion' : 'user-message'}`}
                        >
                            <div className='message-content'>
                                {message.text}
                            </div>
                            <div className='message-time'>
                                {new Date(message.timestamp).toLocaleTimeString(
                                    [],
                                    {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className='message ai-message fashion typing'>
                            <div className='typing-indicator'>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Quick Actions - Hidden when minimized */}
            {!isMinimized && (
                <div className='quick-actions'>
                    {getQuickActions().map((action, index) => (
                        <button
                            key={index}
                            onClick={() => handleQuickAction(action)}
                            className='quick-action-btn'
                        >
                            {action}
                        </button>
                    ))}
                </div>
            )}

            {/* Input - Hidden when minimized */}
            {!isMinimized && (
                <div className='input-container'>
                    <div className='input-wrapper'>
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={
                                language === 'vi'
                                    ? 'Hỏi tôi về thời trang hoặc phong cách...'
                                    : 'Ask me about fashion or style...'
                            }
                            rows={1}
                            className='message-input'
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isTyping}
                            className='send-button'
                        >
                            👗
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .webot-chatbot {
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

                .chat-header.fashion {
                    background: linear-gradient(135deg, #e91e63, #c2185b);
                    color: white;
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
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

                .ai-message.fashion {
                    background: #fce4ec;
                    border-left: 3px solid #e91e63;
                    border-radius: 8px;
                    padding: 10px 12px;
                }

                .user-message .message-content {
                    background: #e91e63;
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
                    background: #e91e63;
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
                    background: #fce4ec;
                    border-color: #e91e63;
                    color: #e91e63;
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
                }

                .message-input:focus {
                    border-color: #e91e63;
                }

                .send-button {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: none;
                    background: #e91e63;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    transition: all 0.2s;
                }

                .send-button:hover:not(:disabled) {
                    background: #c2185b;
                }

                .send-button:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                }

                .webot-chatbot.minimized {
                    height: auto;
                    width: 350px;
                }

                .webot-chatbot.minimized .messages-container,
                .webot-chatbot.minimized .quick-actions,
                .webot-chatbot.minimized .input-container {
                    display: none;
                }

                .header-controls {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .minimize-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 4px;
                    color: white;
                    cursor: pointer;
                    padding: 4px 8px;
                    font-size: 12px;
                    transition: all 0.2s;
                }

                .minimize-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
};

export default WebotChatbot;
