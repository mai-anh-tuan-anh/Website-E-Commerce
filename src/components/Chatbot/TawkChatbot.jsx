/**
 * Tawk Chatbot - Product Consultant AI
 * Smart shopping assistant
 */
import React, { useState, useEffect } from 'react';

const TawkChatbot = ({
    userPreferences = {},
    isMinimized = false,
    onToggleMinimize
}) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [language, setLanguage] = useState('en');
    const [showRecommendations, setShowRecommendations] = useState(false);

    useEffect(() => {
        // Set initial greeting
        setMessages([
            {
                id: 1,
                text:
                    language === 'vi'
                        ? '💝 Chào bạn! Tôi là Tawk - trợ lý mua sắm 24/7 của shop!\n\nTôi luôn sẵn sàng giúp bạn:\n🛒 Tư vấn mua sắm nhiệt tình\n📦 Theo dõi đơn hàng nhanh\n🔄 Hỗ trợ đổi trả linh hoạt\n💬 Lắng nghe và trả lời mọi câu hỏi\n\nBạn cần giúp gì hôm nay? Tôi luôn ở đây! 😊'
                        : "💝 Hello! I'm Tawk - your 24/7 customer service assistant!\n\nI'm always ready to help you:\n🛒 Enthusiastic shopping consultation\n📦 Quick order tracking\n🔄 Flexible return support\n💬 Listen and answer questions\n\nWhat do you need help with today? I'm always here! 😊",
                isAI: true,
                timestamp: new Date()
            }
        ]);
    }, [language]);

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
                ? '💖 Rất vui được phục vụ bạn!\n\nTôi là Tawk - trợ lý chăm sóc khách hàng của shop.\n\n🌟 **Cam kết của tôi**:\n• Luôn lắng nghe chân thành\n• Giải quyết vấn đề nhanh chóng\n• Cung cấp giải pháp tốt nhất\n• Luôn có mặt khi bạn cần\n\nBạn đang tìm sản phẩm hay cần giúp gì? 🤗'
                : "💖 Happy to serve you!\n\nI'm Tawk - the shop's customer care assistant.\n\n🌟 **My commitment**:\n• Always listen sincerely\n• Resolve issues quickly\n• Provide the best solutions\n• Always available when you need me\n\nAre you looking for products or need help with anything? 🤗";
        }

        // Shopping consultation
        if (
            msg.includes('tư vấn') ||
            msg.includes('giúp chọn') ||
            msg.includes('nên mua') ||
            msg.includes('consult')
        ) {
            return language === 'vi'
                ? "🎯 **Tư vấn chuyên sâu - Tawk giúp bạn chọn!**\n\nĐể tư vấn tốt nhất, tôi cần biết:\n\n💰 **Ngân sách**: Bạn dự định chi bao nhiêu?\n🎁 **Mục đích**: Dùng cho ai? Dùng làm gì?\n🎨 **Sở thích**: Bạn thích màu sắc, kiểu dáng nào?\n📱 **Thương hiệu**: Bạn có ưu thích thương hiệu nào?\n\n💡 **Ví dụ**:\n• 'Tư vấn laptop 15 triệu cho sinh viên IT'\n• 'Giúp chọn điện thoại 10 triệu cho mẹ'\n• 'Tìm tai nghe 500k để nghe nhạc'\n\nHãy chia sẻ thêm thông tin để tôi tư vấn chính xác! ✨"
                : "🎯 **Dedicated consultation - Tawk helps you choose!**\n\nFor the best consultation, I need to know:\n\n💰 **Budget**: How much are you planning to spend?\n🎁 **Purpose**: Who is it for? What will it be used for?\n🎨 **Preferences**: What colors, styles do you like?\n📱 **Brand**: Do you prefer any particular brand?\n\n💡 **Examples**:\n• 'Consult on 15 million laptop for IT student'\n• 'Help choose 10 million phone for mom'\n• 'Find 500k headphones for music'\n\nPlease share more details so I can consult accurately! ✨";
        }

        // Order tracking
        if (
            msg.includes('đơn hàng') ||
            msg.includes('theo dõi') ||
            msg.includes('shipping') ||
            msg.includes('giao hàng') ||
            msg.includes('order')
        ) {
            return language === 'vi'
                ? '📦 **Theo dõi đơn hàng - Tawk kiểm tra cho bạn!**\n\n**Cách kiểm tra đơn hàng**:\n\n🔍 **Theo mã đơn hàng**:\n• Nhập mã đơn: #XXXXX\n• Kiểm tra ngay trên website\n• Hoặc gọi hotline: 1900-1234\n\n📱 **Theo dõi tự động**:\n• SMS thông báo cập nhật\n• Email xác nhận mỗi bước\n• Zalo gửi tin trạng thái\n\n⏰ **Thời gian xử lý**:\n• Xác nhận đơn: 1-2 tiếng\n• Đóng gói: 4-6 tiếng\n• Giao hàng: 1-3 ngày\n\nBạn có mã đơn hàng để tôi kiểm tra không? 🕵️‍♀️'
                : '📦 **Order Tracking - Let Tawk check for you!**\n\n**How to check your order**:\n\n🔍 **By order number**:\n• Enter order number: #XXXXX\n• Check immediately on website\n• Or call hotline: 1900-1234\n\n📱 **Automatic tracking**:\n• SMS notifications for updates\n• Email confirmation for each step\n• Zalo sends status messages\n\n⏰ **Processing time**:\n• Order confirmation: 1-2 hours\n• Packaging: 4-6 hours\n• Delivery: 1-3 days\n\nDo you have an order number for me to check? 🕵️‍♀️';
        }

        // Returns and refunds
        if (
            msg.includes('đổi trả') ||
            msg.includes('hoàn tiền') ||
            msg.includes('refund') ||
            msg.includes('return')
        ) {
            return language === 'vi'
                ? '🔄 **Chính sách đổi trả - Tawk hỗ trợ bạn!**\n\n**Điều kiện đổi trả**:\n✅ Trong 30 ngày kể từ ngày nhận hàng\n✅ Sản phẩm còn tag, hộp, nhãn nguyên vẹn\n✅ Chưa sử dụng, không trầy xước\n✅ Đầy đủ phụ kiện đi kèm\n\n**Quy trình đổi trả**:\n1️⃣ Liên hệ Tawk yêu cầu đổi trả\n2️⃣ Gửi sản phẩm về shop\n3️⃣ Shop kiểm tra trong 2-3 ngày\n4️⃣ Xử lý đổi trả/hoàn tiền\n\n💰 **Chi phí**:\n• Đổi hàng: Miễn phí 1 lần\n• Trả hàng: 30k phí vận chuyển\n• Hoàn tiền: 3-5 ngày làm việc\n\nBạn muốn đổi trả sản phẩm nào? Tôi sẽ hướng dẫn chi tiết! 🤝'
                : "🔄 **Return Policy - Tawk supports you!**\n\n**Return conditions**:\n✅ Within 30 days from delivery date\n✅ Products with original tags, box, labels\n✅ Unused, no scratches or damage\n✅ All included accessories present\n\n**Return process**:\n1️⃣ Contact Tawk to request return\n2️⃣ Send product back to shop\n3️⃣ Shop inspects within 2-3 days\n4️⃣ Process return/refund\n\n💰 **Costs**:\n• Exchange: Free 1 time\n• Return: 30k shipping fee\n• Refund: 3-5 business days\n\nWhich product do you want to return? I'll guide you in detail! 🤝";
        }

        // Promotions
        if (
            msg.includes('khuyến mãi') ||
            msg.includes('giảm giá') ||
            msg.includes('voucher') ||
            msg.includes('sale') ||
            msg.includes('promotion')
        ) {
            return language === 'vi'
                ? '🎉 **Khuyến mãi hấp dẫn - Tawk cập nhật ngay!**\n\n**Ưu đãi hiện tại**:\n\n🔥 **Flash Sale**:\n• Giảm đến 50% sản phẩm công nghệ\n• Thời gian: 20:00 - 22:00 hàng ngày\n• Số lượng có hạn!\n\n💳 **Thanh toán online**:\n• Giảm thêm 5% đơn trên 1 triệu\n• Freeship đơn từ 500k\n• Tích điểm nhân đôi thành viên\n\n🎁 **Voucher đặc biệt**:\n• NEW100: Giảm 100k khách hàng mới\n• VIP50: Giảm 50k thành viên Bạc\n• LOYAL100: Giảm 100k thành viên Vàng\n\nBạn muốn biết chi tiết chương trình nào? 🎊'
                : '🎉 **Exciting Promotions - Tawk updates instantly!**\n\n**Current offers**:\n\n🔥 **Flash Sale**:\n• Up to 50% off tech products\n• Time: 20:00 - 22:00 daily\n• Limited quantity!\n\n💳 **Online Payment**:\n• Extra 5% off orders over 1 million\n• Freeship for orders over 500k\n• 2x points for members\n\n🎁 **Special Vouchers**:\n• NEW100: 100k off for new customers\n• VIP50: 50k off for Silver members\n• LOYAL100: 100k off for Gold members\n\nWhich program details do you want to know about? 🎊';
        }

        // Thanks
        if (
            msg.includes('cảm ơn') ||
            msg.includes('thank') ||
            msg.includes('good') ||
            msg.includes('hay')
        ) {
            return language === 'vi'
                ? '🥰 **Cảm ơn bạn rất nhiều!**\n\nTawk rất vui đã giúp được bạn!\n\n⭐ **Phản hồi của bạn rất quan trọng**:\n• Giúp Tawk cải thiện dịch vụ\n• Đóng góp phát triển shop\n• Làm khách hàng khác hài lòng hơn\n\n🎁 **Quà tặng cho bạn**:\n• Voucher 50k lần mua tiếp theo\n• 100 điểm thành viên\n• Freeship 1 lần\n\nCode: THANKYOU50\n\nTawk còn giúp gì thêm không? Tôi luôn sẵn sàng! 💖'
                : "🥰 **Thank you so much!**\n\nTawk is very happy to have helped you!\n\n⭐ **Your feedback is very important**:\n• Helps Tawk improve service\n• Contributes to shop development\n• Makes other customers more satisfied\n\n🎁 **Reward for you**:\n• 50k voucher for next purchase\n• 100 member points\n• Free shipping 1 time\n\nCode: THANKYOU50\n\nIs there anything else Tawk can help with? I'm always ready! 💖";
        }

        // Default smart response
        return language === 'vi'
            ? `💕 Tawk luôn vui vẻ giúp bạn!\n\nTôi có thể hỗ trợ:\n\n🛍️ **Tư vấn mua sắm**: Chọn sản phẩm phù hợp nhất\n📦 **Theo dõi đơn hàng**: Kiểm tra trạng thái nhanh\n🔄 **Đổi trả**: Hướng dẫn quy trình đơn giản\n💬 **Lắng nghe**: Giải quyết mọi thắc mắc\n🎁 **Khuyến mãi**: Cập nhật ưu đãi mới nhất\n\nHãy chia sẻ vấn đề của bạn, Tawk sẽ giải quyết! 🤗`
            : `💕 Tawk is always happy to help you!\n\nI can assist with:\n\n🛍️ **Shopping consultation**: Choose the most suitable products\n📦 **Order tracking**: Check status quickly\n🔄 **Returns**: Guide through simple process\n💬 **Listen**: Resolve all questions\n🎁 **Promotions**: Update latest offers\n\nPlease share your issue, Tawk will solve it! 🤗`;
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

            // Show recommendations if response contains product suggestions
            if (
                aiResponse.toLowerCase().includes('recommend') ||
                aiResponse.toLowerCase().includes('gợi ý') ||
                aiResponse.toLowerCase().includes('product')
            ) {
                setShowRecommendations(true);
            }

            setIsTyping(false);
        }, 600);
    };

    const getSampleProducts = () => {
        return language === 'vi'
            ? [
                  {
                      name: 'Tai nghe không dây Pro',
                      price: '2.999.000đ',
                      rating: '⭐ 4.5'
                  },
                  {
                      name: 'Đồng hồ thông minh Ultra',
                      price: '4.499.000đ',
                      rating: '⭐ 4.7'
                  },
                  {
                      name: 'Áo thun Cotton Organic',
                      price: '299.000đ',
                      rating: '⭐ 4.2'
                  }
              ]
            : [
                  {
                      name: 'Wireless Headphones Pro',
                      price: '$299.99',
                      rating: '⭐ 4.5'
                  },
                  {
                      name: 'Smart Watch Ultra',
                      price: '$449.99',
                      rating: '⭐ 4.7'
                  },
                  {
                      name: 'Organic Cotton T-Shirt',
                      price: '$29.99',
                      rating: '⭐ 4.2'
                  }
              ];
    };

    return (
        <div className={`tawk-chatbot ${isMinimized ? 'minimized' : ''}`}>
            {/* Header */}
            <div className='chat-header consultant'>
                <div className='header-info'>
                    <span className='ai-icon'>💝</span>
                    <div className='header-text'>
                        <h3>Tawk Shopping Assistant</h3>
                        <p>24/7 Customer service expert</p>
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
                            onClick={() => setLanguage('vi')}
                            className={language === 'vi' ? 'active' : ''}
                        >
                            VI
                        </button>
                        <button
                            onClick={() => setLanguage('en')}
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
                            className={`message ${message.isAI ? 'ai-message consultant' : 'user-message'}`}
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
                        <div className='message ai-message consultant typing'>
                            <div className='typing-indicator'>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}

                    {/* Product Recommendations */}
                    {showRecommendations && (
                        <div className='product-recommendations'>
                            <div className='recommendations-header'>
                                {language === 'vi'
                                    ? '🛍️ Gợi ý cho bạn:'
                                    : '🛍️ Recommended for you:'}
                            </div>
                            {getSampleProducts().map((product, index) => (
                                <div key={index} className='product-card'>
                                    <div className='product-info'>
                                        <div className='product-name'>
                                            {product.name}
                                        </div>
                                        <div className='product-price'>
                                            {product.price}
                                        </div>
                                        <div className='product-rating'>
                                            {product.rating}
                                        </div>
                                    </div>
                                    <button className='product-select-btn'>
                                        {language === 'vi' ? 'Chọn' : 'Select'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Input - Hidden when minimized */}
            {!isMinimized && (
                <div className='input-container'>
                    <div className='input-wrapper'>
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            placeholder={
                                language === 'vi'
                                    ? 'Hỏi tôi về sản phẩm hoặc yêu cầu gợi ý...'
                                    : 'Ask me about products or request recommendations...'
                            }
                            rows={1}
                            className='message-input'
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isTyping}
                            className='send-button'
                        >
                            💝
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .tawk-chatbot {
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

                .chat-header.consultant {
                    background: linear-gradient(135deg, #4caf50, #45a049);
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

                .ai-message.consultant {
                    background: #e8f5e8;
                    border-left: 3px solid #4caf50;
                    border-radius: 8px;
                    padding: 10px 12px;
                }

                .user-message .message-content {
                    background: #4caf50;
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
                    background: #4caf50;
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

                .product-recommendations {
                    margin: 15px 0;
                    padding: 12px;
                    background: white;
                    border-radius: 8px;
                    border: 1px solid #e1e5e9;
                }

                .recommendations-header {
                    font-weight: 600;
                    margin-bottom: 10px;
                    color: #4caf50;
                }

                .product-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                    border-bottom: 1px solid #f0f0f0;
                }

                .product-card:last-child {
                    border-bottom: none;
                }

                .product-info {
                    flex: 1;
                }

                .product-name {
                    font-weight: 500;
                    font-size: 13px;
                    color: #333;
                }

                .product-price {
                    color: #4caf50;
                    font-weight: 600;
                    font-size: 12px;
                }

                .product-rating {
                    font-size: 11px;
                    color: #666;
                }

                .product-select-btn {
                    padding: 4px 12px;
                    background: #4caf50;
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 11px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .product-select-btn:hover {
                    background: #45a049;
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
                    background: #e8f5e8;
                    border-color: #4caf50;
                    color: #4caf50;
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
                    border-color: #4caf50;
                }

                .send-button {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: none;
                    background: #4caf50;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    transition: all 0.2s;
                }

                .send-button:hover:not(:disabled) {
                    background: #45a049;
                }

                .send-button:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                }

                .tawk-chatbot.minimized {
                    height: auto;
                    width: 350px;
                }

                .tawk-chatbot.minimized .messages-container,
                .tawk-chatbot.minimized .input-container {
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

                @media (max-width: 480px) {
                    .tawk-chatbot {
                        width: 100%;
                        height: 100vh;
                        border-radius: 0;
                    }

                    .tawk-chatbot.minimized {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default TawkChatbot;
