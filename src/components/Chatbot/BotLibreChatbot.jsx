import { useState, useEffect, useRef } from 'react';
import './styles.css';

const BotLibreChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: "Hello! I'm the store's AI assistant. I can help you find products, provide shopping consultation, assist with payments, and answer your questions. What do you need help with today?",
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getBotResponse = async (userMessage) => {
        const message = userMessage.toLowerCase().trim();

        // Website Information Intents
        if (
            message.includes('website này là gì') ||
            message.includes('bạn là ai') ||
            message.includes('đây là trang gì') ||
            message.includes('shop bán gì')
        ) {
            return '🛍️ This is a professional e-commerce website!\n\nWe sell:\n📱 Electronics (iPhone, Samsung, Laptop)\n👕 Fashion (men/women/unisex)\n💄 Authentic cosmetics\n🏠 Smart home appliances\n📚 Books and office supplies\n⚽ Sports equipment\n\n✨ Commitments:\n• 100% authentic products\n• Best market prices\n• Nationwide delivery\n• 30-day returns\n\nWhich product are you looking for? 😊';
        }

        if (
            message.includes('website bán gì') ||
            message.includes('bán sản phẩm gì') ||
            message.includes('có mặt hàng gì')
        ) {
            return '🏪 We have full product categories:\n\n📱 **Electronics**: iPhone, Samsung, Laptop, Tablet, Accessories\n👕 **Fashion**: Shirts, pants, dresses, shoes, bags\n💄 **Cosmetics**: Skincare, makeup, lipstick, sunscreen\n🏠 **Home appliances**: Induction cookers, robot vacuums, air purifiers\n📚 **Books**: Literature, skills, business, education\n⚽ **Sports**: Gym equipment, yoga, football, badminton\n\nWhich category would you like to see? 🤔';
        }

        // Product Intents
        if (
            message.includes('có sản phẩm nào') ||
            message.includes('có gì hot') ||
            message.includes('sản phẩm bán chạy')
        ) {
            return '🔥 Best selling products this week:\n\n📱 iPhone 15 Pro Max - 15% off\n👕 Men\'s Polo Shirt - Only 299k\n💄 MAC Ruby Woo Lipstick - 650k\n🏠 Philips Air Fryer - 1.2M\n📚 "The Alchemist" Book - 120k\n⚽ Nike Air Force Shoes - 1.8M\n\nWhich product details would you like to see? ✨';
        }

        if (
            message.includes('giá bao nhiêu') ||
            message.includes('giá cả') ||
            message.includes('bao nhiêu tiền')
        ) {
            return '💰 Product prices are very diverse:\n\n📱 Phones: 3M - 25M\n💻 Laptops: 8M - 45M\n👕 Clothing: 150k - 1.5M\n💄 Cosmetics: 100k - 2M\n🏠 Home appliances: 500k - 10M\n📚 Books: 50k - 500k\n⚽ Sports: 200k - 3M\n\nWhich product are you interested in for exact pricing? 🎯';
        }

        if (
            message.includes('còn hàng không') ||
            message.includes('tồn kho') ||
            message.includes('có sẵn không')
        ) {
            return '📦 Stock status:\n\n✅ **In stock (90% of products)**:\n• iPhone 15 series: All colors, all storage\n• Samsung Galaxy: Full international box\n• Clothing: Sizes S-XL fully available\n• Cosmetics: Expires 2025+\n\n⚠️ **Almost out of stock**:\n• MacBook Air M2 (5 left)\n• Nike Air Jordan (10 pairs left)\n\nWhich specific product would you like to check? 🔍';
        }

        // Shipping Intents
        if (
            message.includes('giao hàng mất bao lâu') ||
            message.includes('thời gian giao') ||
            message.includes('bao lâu nhận hàng')
        ) {
            return "⏰ Delivery time:\n\n🚀 **Fastest**:\n• Hanoi & Ho Chi Minh City: 1-2 days\n• Nearby provinces: 2-3 days\n\n📦 **Standard**:\n• Northern region: 3-4 days\n• Central region: 3-4 days\n• Southern region: 2-3 days\n\n🏝️ **Remote islands**: 5-7 days\n\nWhich area are you in? I'll check exactly! 📍";
        }

        if (
            message.includes('có ship toàn quốc không') ||
            message.includes('giao hàng toàn quốc') ||
            message.includes('giao mọi nơi')
        ) {
            return '🇻🇳 Yes, we deliver nationwide to all 63 provinces!\n\n✅ **Areas covered**:\n• Major cities: Hanoi, Ho Chi Minh City, Da Nang\n• Provincial cities: Can Tho, Hai Phong, Buon Ma Thuot...\n• Island districts: Phu Quoc, Con Dao, Ly Son\n\n🚚 **Shipping partners**:\n• GHN, GHTK, Viettel Post, VNPost\n\nWhere would you like delivery to? 🗺️';
        }

        if (
            message.includes('phí ship bao nhiêu') ||
            message.includes('chi phí vận chuyển') ||
            message.includes('phí giao hàng')
        ) {
            return '💸 Shipping fee table:\n\n🆓 **Free shipping**:\n• Orders from 500,000đ\n• VIP customers (Silver tier and above)\n\n💰 **Standard fee**:\n• Under 500k: 30,000đ\n• Inner city Hanoi/HCMC: 20,000đ\n\n⚡ **Special services**:\n• Express delivery: +50,000đ\n• Same day delivery: +80,000đ\n\nWhich method would you like to choose? 🚚';
        }

        // Payment Intents
        if (
            message.includes('có thanh toán online không') ||
            message.includes('chuyển khoản') ||
            message.includes('thẻ tín dụng')
        ) {
            return '💳 Yes, we accept online payments:\n\n🔐 **Absolutely secure**:\n• Credit/debit cards (Visa, Mastercard, JCB)\n• E-wallets (MoMo, ZaloPay, ShopeePay)\n• 24/7 bank transfers\n\n🎁 **Online payment benefits**:\n• 5% off orders over 1M\n• 2x member points\n• 100k voucher for first time\n\nWhich payment method would you like to use? 💰';
        }

        if (
            message.includes('có cod không') ||
            message.includes('thanh toán khi nhận hàng') ||
            message.includes('nhận hàng mới trả tiền')
        ) {
            return '📦 Yes, we support COD (Cash on Delivery):\n\n✅ **COD process**:\n• Receive → Check → Pay\n• Can scan QR or pay cash\n• Delivery staff have POS machines\n\n🎯 **Notes**:\n• COD only for orders under 5M\n• COD fee: 20,000đ\n• Free COD for orders over 1M\n\nWould you prefer COD or online payment? 🤔';
        }

        // Support Intents
        if (
            message.includes('liên hệ shop') ||
            message.includes('liên hệ') ||
            message.includes('tư vấn')
        ) {
            return '📞 Our contact channels:\n\n🆘 **24/7 Support**:\n• Hotline: 1900-1234 (Toll free)\n• Live chat: On website\n• Zalo: 0987-654-321\n\n📧 **Email**:\n• Support: support@shop.com\n• Complaints: complaint@shop.com\n\n🏢 **Office**:\n• 123 Nguyen Trai, District 1, HCMC\n• Business hours: 8:00 - 20:00\n\nDo you need urgent assistance? 🚀';
        }

        if (
            message.includes('email là gì') ||
            message.includes('địa chỉ email') ||
            message.includes('mail')
        ) {
            return '📧 Our email addresses:\n\n💌 **Main emails**:\n• support@shop.com (General support)\n• order@shop.com (Orders)\n• feedback@shop.com (Feedback)\n\n⏰ **Response time**:\n• Regular email: 2-4 hours\n• Urgent email: 30 minutes\n• Complaint email: 1 hour\n\nYou can send an email right now! 📮';
        }

        if (
            message.includes('số điện thoại') ||
            message.includes('hotline') ||
            message.includes('điện thoại')
        ) {
            return '📱 Contact phone numbers:\n\n🆘 **Main hotline**:\n• 1900-1234 (24/7 support - Toll free)\n• 0987-654-321 (Zalo/WhatsApp)\n\n🏢 **Departments**:\n• Sales: 1900-1234 (press 1)\n• Technical: 1900-1234 (press 2)\n• Complaints: 1900-1234 (press 3)\n\n📞 **Zalo Business**:\n• 0987-654-321 (Direct chat)\n\nYou can call right now! 📞';
        }

        // Fallback for unknown intents
        return '🤔 Sorry, I don\'t understand your question.\n\nYou can ask me about:\n\n💰 **Product prices**: "How much is iPhone?"\n📦 **Delivery**: "How long does shipping take?"\n🔄 **Returns**: "What\'s the return policy?"\n📞 **Contact**: "What\'s the shop phone number?"\n🛍️ **Products**: "What products are hot?"\n💳 **Payment**: "Do you have COD?"\n📍 **Address**: "Where is the shop located?"\n⏰ **Hours**: "What time do you close?"\n\nWhat would you like to know about? 😊';
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            const userMsg = {
                text: inputMessage,
                isBot: false,
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, userMsg]);
            setInputMessage('');
            setIsTyping(true);

            // Smart delay based on message length - AI thinking time
            const thinkingTime = Math.min(
                Math.max(800, inputMessage.length * 15),
                2000
            );

            setTimeout(() => {
                const botResponse = getBotResponse(inputMessage);
                const botMsg = {
                    text: botResponse,
                    isBot: true,
                    timestamp: new Date()
                };

                setMessages((prev) => [...prev, botMsg]);
                setIsTyping(false);
            }, thinkingTime);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className='botlibre-chatbot'>
            <button
                className='chat-button'
                onClick={() => setIsOpen(!isOpen)}
                aria-label='Chat with us'
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {isOpen && (
                <div className='chat-window'>
                    <div className='chat-header'>
                        <h3>🤖 Smart AI Assistant</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className='close-btn'
                        >
                            ✕
                        </button>
                    </div>
                    <div className='chat-messages'>
                        {messages.map((message, index) => (
                            <div key={index}>
                                <div
                                    className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}
                                >
                                    <div className='message-text'>
                                        {message.text}
                                    </div>
                                    <div className='message-time'>
                                        {formatTime(message.timestamp)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className='message bot-message typing'>
                                <div className='typing-message'>
                                    Typing response...
                                </div>
                                <div className='typing-indicator'>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className='chat-input'>
                        <input
                            type='text'
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder='Enter message...'
                            disabled={isTyping}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isTyping || !inputMessage.trim()}
                        >
                            {isTyping ? '...' : 'Send'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BotLibreChatbot;
