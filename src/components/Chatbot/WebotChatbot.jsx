import { useState, useEffect, useRef } from 'react';
import './styles.css';

const WebotChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: '� Xin chào! Tôi là Webot - chuyên gia tư vấn thời trang của shop.\n\nTôi chuyên về:\n👕 Tư vấn phong cách và phối đồ\n� Gợi ý trang phục theo dáng người\n🎨 Tư vấn màu sắc và xu hướng\n📦 Hỗ trợ chọn size và chất liệu\n\nBạn cần tư vấn thời trang gì hôm nay?',
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

        // Fashion-focused responses
        if (
            message.includes('áo thun') ||
            message.includes('t-shirt') ||
            message.includes('cotton')
        ) {
            return '� **Áo Thun - Cơ bản nhưng không bao giờ lỗi mốt!**\n\n**Áo Thun Cotton Premium**:\n• Chất liệu: Cotton 100%\n• Form: Regular fit\n• Màu: Trắng, Đen, Xám, Be\n• Size: S - XL\n• Giá: 199.000đ\n\n**Áo Thun Oversize**:\n• Chất liệu: Cotton co giãn\n• Form: Oversize rộng rãi\n• Màu: Pastel tones\n• Size: Free size\n• Giá: 249.000đ\n\n**Áo Thun Graphic**:\n• Chất liệu: Cotton poly\n• Form: Slim fit\n• Thiết kế: In hình nghệ thuật\n• Size: S - L\n• Giá: 299.000đ\n\nBạn thích phong cách nào? �';
        }

        if (
            message.includes('quần jean') ||
            message.includes('jeans') ||
            message.includes('denim')
        ) {
            return '� **Quần Jean - Phụ kiện không thể thiếu!**\n\n**Jean Slim Fit**:\n• Chất liệu: Denim co giãn\n• Form: Slim fit ôm nhẹ\n• Màu: Blue, Black, Grey\n• Size: 28 - 36\n• Giá: 499.000đ\n\n**Jean Baggy**:\n• Chất liệu: Denim heavy weight\n• Form: Baggy rộng rãi\n• Màu: Light wash, Dark wash\n• Size: 28 - 36\n• Giá: 549.000đ\n\n**Jean Mom Fit**:\n• Chất liệu: Denim mềm mại\n• Form: Mom fit retro\n• Màu: Vintage blue\n• Size: 27 - 34\n• Giá: 529.000đ\n\nBạn muốn phong cách nào? �️';
        }

        if (
            message.includes('váy') ||
            message.includes('đầm') ||
            message.includes('dress')
        ) {
            return '👗 **Váy Đầm - Nét duyên dáng cho phái đẹp!**\n\n**Váy Hoa Nhí**:\n• Chất liệu: Chiffon mềm\n• Dáng: A-line xòe\n• Họa tiết: Hoa pastel\n• Size: S - L\n• Giá: 699.000đ\n\n**Đầm Bodycon**:\n• Chất liệu: Thun co giãn\n• Dáng: Bodycon ôm sát\n• Màu: Đen, Đỏ, Xanh navy\n• Size: XS - M\n• Giá: 599.000đ\n\n**Váy Maxi**:\n• Chất liệu: Lanh thun\n• Dáng: Maxi dài\n• Thiết kế: Tay lỡ, thắt eo\n• Size: S - L\n• Giá: 799.000đ\n\nBạn thích dáng váy nào? 💃';
        }

        if (
            message.includes('áo sơ mi') ||
            message.includes('sơ mi') ||
            message.includes('shirt')
        ) {
            return '� **Áo Sơ Mi - Sang trọng và lịch lãm!**\n\n**Sơ Mi Cotton**:\n• Chất liệu: Cotton 100%\n• Dáng: Regular fit\n• Màu: Trắng, Xanh, Hồng\n• Size: S - XL\n• Giá: 399.000đ\n\n**Sơ Mi Oxford**:\n• Chất liệu: Oxford cao cấp\n• Dáng: Slim fit\n• Màu: Trắng, Xanh navy\n• Size: S - XL\n• Giá: 599.000đ\n\n**Sơ Mi Voan**:\n• Chất liệu: Voan mềm\n• Dáng: Loose fit\n• Thiết kế: Cổ bẻ tay phồng\n• Size: S - L\n• Giá: 449.000đ\n\nBạn cần cho công việc hay dạo phố? 💼';
        }

        if (
            message.includes('so sánh') ||
            message.includes('compare') ||
            message.includes('tốt hơn')
        ) {
            return '⚖️ **So sánh thời trang - Webot tư vấn!**\n\n**Jean Slim Fit vs Jean Baggy**:\n\n� **Phong cách**:\n• Slim fit: Ôm sát, hiện đại\n• Baggy: Rộng rãi, retro\n• Slim fit: Công sở, lịch lãm\n• Baggy: Streetwear, cá tính\n\n✨ **Sự thoải mái**:\n• Slim fit: Co giãn vừa phải\n• Baggy: Rộng rãi, thoải mái\n• Slim fit: Năng động\n• Baggy: Thoải mái tối đa\n\n🎯 **Dáng người phù hợp**:\n• Slim fit: Người gầy, trung bình\n• Baggy: Mọi dáng người\n• Slim fit: Tôn dáng\n• Baggy: Che khuyết điểm\n\n💰 **Giá**:\n• Slim fit: 499.000đ\n• Baggy: 549.000đ\n\nBạn ưu tiên phong cách nào? �';
        }

        if (
            message.includes('size') ||
            message.includes('kích thước') ||
            message.includes('đo')
        ) {
            return '📏 **Hướng dẫn chọn size hoàn hảo!**\n\n**Size Áo Thun**:\n• S: Ngực 92cm, Dài 68cm\n• M: Ngực 96cm, Dài 70cm\n• L: Ngực 100cm, Dài 72cm\n• XL: Ngực 104cm, Dài 74cm\n\n**Size Quần Jean**:\n• 28: Eo 72cm, Dài 96cm\n• 29: Eo 74cm, Dài 98cm\n• 30: Eo 76cm, Dài 100cm\n• 31: Eo 78cm, Dài 102cm\n• 32: Eo 80cm, Dài 104cm\n\n**Cách đo**:\n1. Vòng ngực: Đo quanh ngực rộng nhất\n2. Vòng eo: Đo quanh eo tự nhiên\n3. Vòng hông: Đo quanh hông rộng nhất\n4. Chiều cao: Đo từ đỉnh đầu xuống đất\n\nBạn cần tư vấn size cho sản phẩm nào? �';
        }

        if (
            message.includes('phụ kiện') ||
            message.includes('mũ') ||
            message.includes('túi') ||
            message.includes('giày')
        ) {
            return '👜 **Phụ kiện thời trang - Hoàn thiện phong cách!**\n\n**Túi Xách**:\n• Túi tote canvas: 299.000đ\n• Túi crossbody da: 599.000đ\n• Túi backpack: 799.000đ\n• Clutch mini: 399.000đ\n\n**Giày**:\n• Sneakers trắng: 899.000đ\n• Sandal quai ngang: 449.000đ\n• Boots cao cổ: 1.299.000đ\n• Slip-on: 599.000đ\n\n**Mũ & Khác**:\n• Bucket hat: 199.000đ\n• Beanie: 149.000đ\n• Kính mát: 399.000đ\n• Thắt lưng: 299.000đ\n\nBạn cần phụ kiện cho outfit nào? 🎩';
        }

        if (
            message.includes('bảo hành') ||
            message.includes('đổi trả') ||
            message.includes('hỗ trợ')
        ) {
            return '�️ **Chính sách khách hàng thân thiết!**\n\n**Đổi trả sản phẩm**:\n• Trong vòng 7 ngày kể từ ngày mua\n• Sản phẩm còn nguyên tem, tag\n• Chưa qua sử dụng, giặt ủi\n• Được đổi 1 lần duy nhất\n\n**Bảo hành chất lượng**:\n• Bảo hành form: 30 ngày\n• Bảo hành lỗi sản xuất: 6 tháng\n• Hỗ trợ sửa chữa: Miễn phí\n\n**Dịch vụ khách hàng**:\n• Hotline: 1900-xxxx\n• Email: support@shop.vn\n• Zalo tư vấn 24/7\n• Giao hàng toàn quốc\n\nBạn cần hỗ trợ gì ngay? 🎁';
        }

        // Fallback with fashion focus
        return '🤖 Webot không hiểu rõ yêu cầu của bạn.\n\nTôi có thể giúp bạn về:\n\n� **Áo thun**: Cotton, oversize, graphic\n👖 **Quần**: Jean, kaki, short\n� **Váy đầm**: Hoa nhí, bodycon, maxi\n👔 **Sơ mi**: Công sở, casual, voan\n� **Phụ kiện**: Túi xách, giày, mũ, thắt lưng\n📏 **Size**: Tư vấn đo size, chọn size\n🎨 **Phong cách**: Tư vấn phối đồ, màu sắc\n🛍️ **Dịch vụ**: Đổi trả, bảo hành, giao hàng\n\nHãy hỏi về thời trang nhé! �';
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
                className='chat-button fashion-style'
                onClick={() => setIsOpen(!isOpen)}
                aria-label='Chat with Webot'
            >
                {isOpen ? '✕' : '�'}
            </button>

            {isOpen && (
                <div className='chat-window fashion-theme'>
                    <div className='chat-header fashion-header'>
                        <h3>� Webot - Chuyên gia thời trang</h3>
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
                                    className={`message ${message.isBot ? 'bot-message fashion-bot' : 'user-message'}`}
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
                            <div className='message bot-message fashion-bot typing'>
                                <div className='typing-message'>
                                    Đang tư vấn thời trang...
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
                            placeholder='Nhập câu hỏi về thời trang...'
                            disabled={isTyping}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isTyping || !inputMessage.trim()}
                            className='fashion-send-btn'
                        >
                            {isTyping ? '...' : '�️'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebotChatbot;
