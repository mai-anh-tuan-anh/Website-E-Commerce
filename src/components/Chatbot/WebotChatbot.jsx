import { useState, useEffect, useRef } from 'react';
import './styles.css';

const WebotChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: '👋 Xin chào! Tôi là Webot - trợ lý kỹ thuật của shop.\n\nTôi chuyên về:\n💻 Điện thoại, laptop, tablet\n🔧 Phụ kiện công nghệ\n⚡ Tư vấn kỹ thuật chuyên sâu\n📊 So sánh thông số sản phẩm\n\nBạn cần hỗ trợ kỹ thuật gì hôm nay?',
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

        // Tech-focused responses
        if (
            message.includes('iphone') ||
            message.includes('apple') ||
            message.includes('ios')
        ) {
            return '📱 **iPhone Series - Chuyên gia Apple tại đây!**\n\n**iPhone 15 Pro Max**:\n• Chip A17 Pro (3nm)\n• RAM 8GB\n• Camera 48MP + 12MP + 12MP\n• Pin 4422mAh\n• Giá: 28.990.000đ\n\n**iPhone 15 Pro**:\n• Chip A17 Pro\n• RAM 6GB\n• Camera 48MP + 12MP + 12MP\n• Pin 3274mAh\n• Giá: 24.990.000đ\n\n**iPhone 15**:\n• Chip A16 Bionic\n• RAM 6GB\n• Camera 48MP + 12MP\n• Pin 3349mAh\n• Giá: 19.990.000đ\n\nBạn muốn biết chi tiết về dòng nào? 🍎';
        }

        if (
            message.includes('samsung') ||
            message.includes('galaxy') ||
            message.includes('android')
        ) {
            return '📱 **Samsung Galaxy - Dẫn đầu công nghệ Android!**\n\n**Galaxy S24 Ultra**:\n• Chip Snapdragon 8 Gen 3\n• RAM 12GB\n• Camera 200MP + 50MP + 12MP + 10MP\n• Pin 5000mAh\n• S Pen tích hợp\n• Giá: 26.990.000đ\n\n**Galaxy S24+**:\n• Chip Snapdragon 8 Gen 3\n• RAM 8GB\n• Camera 50MP + 10MP + 12MP\n• Pin 4900mAh\n• Giá: 18.990.000đ\n\n**Galaxy A55**:\n• Chip Exynos 1480\n• RAM 8GB\n• Camera 50MP + 12MP + 5MP\n• Pin 5000mAh\n• Giá: 8.990.000đ\n\nCần tư vấn thêm về thông số kỹ thuật? 🔧';
        }

        if (
            message.includes('laptop') ||
            message.includes('macbook') ||
            message.includes('dell') ||
            message.includes('hp') ||
            message.includes('asus')
        ) {
            return '💻 **Laptop - Hiệu năng đỉnh cao!**\n\n**MacBook Air M2**:\n• Chip Apple M2 (8-core CPU + 10-core GPU)\n• RAM 8GB/16GB\n• SSD 256GB-1TB\n• Màn hình 13.6" Liquid Retina\n• Pin 18 giờ\n• Giá: 28.990.000đ\n\n**Dell XPS 15**:\n• Intel Core i7-13700H\n• RAM 16GB DDR5\n• RTX 4060 6GB\n• SSD 512GB NVMe\n• Màn hình 15.6" FHD+ 500nit\n• Giá: 32.990.000đ\n\n**ASUS ROG Strix G15**:\n• AMD Ryzen 7 6800H\n• RAM 16GB DDR5\n• RTX 3060 6GB\n• SSD 1TB NVMe\n• Màn hình 15.6" FHD 144Hz\n• Giá: 24.990.000đ\n\nBạn dùng để làm gì? Gaming, công việc hay học tập? 🎮';
        }

        if (
            message.includes('so sánh') ||
            message.includes('compare') ||
            message.includes('tốt hơn')
        ) {
            return '⚖️ **So sánh chuyên sâu - Webot phân tích!**\n\n**iPhone 15 Pro Max vs Galaxy S24 Ultra**:\n\n🔥 **Hiệu năng**:\n• A17 Pro vs Snapdragon 8 Gen 3\n• Cả hai đều đỉnh cao\n• iPhone: tối ưu iOS\n• Samsung: tùy biến Android\n\n📸 **Camera**:\n• iPhone: 48MP (chủ) + 12MP\n• Samsung: 200MP (chủ) + 50MP\n• Samsung zoom tốt hơn (10x optical)\n• iPhone màu sắc tự nhiên hơn\n\n🔋 **Pin**:\n• iPhone: 4422mAh\n• Samsung: 5000mAh\n• Samsung sạc nhanh 45W\n• iPhone sạc nhanh 27W\n\n💰 **Giá**:\n• iPhone: 28.990.000đ\n• Samsung: 26.990.000đ\n\nBạn ưu tiên yếu tố nào nhất? 🎯';
        }

        if (
            message.includes('ram') ||
            message.includes('bộ nhớ') ||
            message.includes('storage')
        ) {
            return '🧠 **Hướng dẫn chọn RAM & Storage!**\n\n**RAM - Bộ nhớ đệm**:\n• 4GB: Cơ bản, web, văn phòng\n• 8GB: Đa số người dùng, gaming nhẹ\n• 16GB: Gaming, thiết kế, lập trình\n• 32GB+: Chuyên nghiệp, render 4K\n\n**Storage - Lưu trữ**:\n• 128GB: Cơ bản, ít lưu trữ\n• 256GB: Phổ thông, đủ dùng\n• 512GB: Nhiều dữ liệu, game\n• 1TB+: Chuyên nghiệp, media lớn\n\n**SSD vs HDD**:\n• SSD: Nhanh 10x, bền, đắt\n• HDD: Rẻ, dung lượng lớn, chậm\n\nBạn cần tư vấn cho thiết bị nào? 💾';
        }

        if (
            message.includes('phụ kiện') ||
            message.includes('sạc') ||
            message.includes('tai nghe') ||
            message.includes('case')
        ) {
            return '🎧 **Phụ kiện công nghệ - Cần gì có đó!**\n\n**Sạc & Cable**:\n• Sạc nhanh 65W GaN: 450k\n• Cable USB-C 2m: 150k\n• Sạc không dây 15W: 350k\n• Power bank 20000mAh: 650k\n\n**Tai nghe**:\n• AirPods Pro 2: 5.990.000đ\n• Sony WH-1000XM5: 7.990.000đ• Galaxy Buds 2 Pro: 4.990.000đ\n\n**Bảo vệ**:\n• Case iPhone 15: 250k\n• Tem cường lực: 100k\n• Sạc dự phòng MagSafe: 850k\n\nBạn cần phụ kiện cho thiết bị nào? 🔌';
        }

        if (
            message.includes('bảo hành') ||
            message.includes('sửa chữa') ||
            message.includes('hỗ trợ kỹ thuật')
        ) {
            return '🔧 **Dịch vụ kỹ thuật chuyên nghiệp!**\n\n**Bảo hành chính hãng**:\n• iPhone: 12 tháng tại FPT/CellphoneS\n• Samsung: 12 tháng tại TGDD\n• Laptop: 24 tháng tại nhà sản xuất\n\n**Dịch vụ sửa chữa**:\n• Thay màn hình iPhone: 1.5tr - 3tr\n• Thay pin iPhone: 800k - 1.2tr\n• Cài đặt phần mềm: Miễn phí\n• Vệ sinh laptop: 200k\n\n**Hỗ trợ từ xa**:\n• TeamViewer/AnyDesk: Miễn phí\n• Hướng dẫn cài đặt: 24/7\n• Backup dữ liệu: 300k\n\nBạn cần hỗ trợ kỹ thuật gì ngay? 🛠️';
        }

        // Fallback with tech focus
        return '🤖 Webot không hiểu rõ yêu cầu của bạn.\n\nTôi có thể giúp bạn về:\n\n📱 **Điện thoại**: iPhone, Samsung, Xiaomi, OPPO\n💻 **Laptop**: MacBook, Dell, HP, ASUS, Lenovo\n🎮 **Gaming**: PC, console, accessories\n🔧 **Kỹ thuật**: So sánh, thông số, bảo hành\n⚡ **Phụ kiện**: Sạc, tai nghe, case, cable\n\nHãy hỏi về thông số kỹ thuật cụ thể! 🚀';
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

            const thinkingTime = Math.min(
                Math.max(600, inputMessage.length * 12),
                1800
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
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className='webot-chatbot'>
            <button
                className='chat-button tech-style'
                onClick={() => setIsOpen(!isOpen)}
                aria-label='Chat with Webot'
            >
                {isOpen ? '✕' : '🔧'}
            </button>

            {isOpen && (
                <div className='chat-window tech-theme'>
                    <div className='chat-header tech-header'>
                        <h3>🔧 Webot - Chuyên gia kỹ thuật</h3>
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
                                    className={`message ${message.isBot ? 'bot-message tech-bot' : 'user-message'}`}
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
                            <div className='message bot-message tech-bot typing'>
                                <div className='typing-message'>
                                    Đang phân tích kỹ thuật...
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
                            placeholder='Nhập câu hỏi kỹ thuật...'
                            disabled={isTyping}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isTyping || !inputMessage.trim()}
                            className='tech-send-btn'
                        >
                            {isTyping ? '...' : '🚀'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebotChatbot;
