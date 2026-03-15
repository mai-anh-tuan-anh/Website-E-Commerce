import { useState, useEffect, useRef } from 'react';
import './styles.css';

const TawkChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: '💝 Xin chào! Tôi là Tawk - trợ lý dịch vụ khách hàng 24/7!\n\nTôi luôn sẵn sàng giúp bạn:\n🛒 Tư vấn mua sắm nhiệt tình\n📦 Theo dõi đơn hàng nhanh chóng\n🔄 Hỗ trợ đổi trả linh hoạt\n💬 Lắng nghe và giải đáp thắc mắc\n\nBạn cần hỗ trợ gì hôm nay? Tôi luôn ở đây! 😊',
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

        // Customer service focused responses
        if (
            message.includes('chào') ||
            message.includes('hello') ||
            message.includes('xin chào')
        ) {
            return '💖 Rất vui được phục vụ bạn!\n\nTôi là Tawk - trợ lý chăm sóc khách hàng của shop.\n\n🌟 **Cam kết của tôi**:\n• Luôn lắng nghe chân thành\n• Giải quyết vấn đề nhanh chóng\n• Đưa ra giải pháp tốt nhất\n• Luôn có mặt khi bạn cần\n\nBạn đang tìm kiếm sản phẩm hay cần hỗ trợ gì ạ? 🤗';
        }

        if (
            message.includes('tư vấn') ||
            message.includes('giúp chọn') ||
            message.includes('nên mua')
        ) {
            return '🎯 **Tư vấn tận tâm - Tawk chọn giúp bạn!**\n\nĐể tư vấn tốt nhất, tôi cần biết:\n\n💰 **Ngân sách**: Bạn dự định bao nhiêu?\n🎁 **Mục đích**: Mua cho ai? Dùng làm gì?\n🎨 **Sở thích**: Thích màu sắc, kiểu dáng nào?\n📱 **Thương hiệu**: Có ưu tiên hãng nào không?\n\n💡 **Ví dụ**:\n• "Tư vấn laptop 15tr cho sinh viên IT"\n• "Giúp chọn điện thoại 10tr cho mẹ"\n• "Tìm tai nghe 500k để nghe nhạc"\n\nHãy chia sẻ thêm để tôi tư vấn chính xác nhé! ✨';
        }

        if (
            message.includes('đơn hàng') ||
            message.includes('theo dõi') ||
            message.includes('shipping') ||
            message.includes('giao hàng')
        ) {
            return '📦 **Theo dõi đơn hàng - Cùng Tawk kiểm tra nhé!**\n\n**Cách kiểm tra đơn hàng**:\n\n🔍 **Theo mã đơn**:\n• Nhập mã đơn hàng: #XXXXX\n• Kiểm tra ngay trên website\n• Hoặc gọi hotline: 1900-1234\n\n📱 **Theo dõi tự động**:\n• SMS thông báo khi có cập nhật\n• Email xác nhận từng bước\n• Zalo gửi tin nhắn trạng thái\n\n⏰ **Thời gian xử lý**:\n• Xác nhận đơn: 1-2 giờ\n• Đóng gói: 4-6 giờ\n• Giao hàng: 1-3 ngày\n\nBạn có mã đơn hàng để tôi kiểm tra giúp không? 🕵️‍♀️';
        }

        if (
            message.includes('đổi trả') ||
            message.includes('hoàn tiền') ||
            message.includes('refund') ||
            message.includes('return')
        ) {
            return '🔄 **Chính sách đổi trả - Tawk hỗ trợ bạn!**\n\n**Điều kiện đổi trả**:\n✅ Trong vòng 30 ngày kể từ ngày nhận hàng\n✅ Sản phẩm còn nguyên tem, hộp, tag\n✅ Chưa qua sử dụng, không trầy xước\n✅ Còn đầy đủ phụ kiện đi kèm\n\n**Quy trình đổi trả**:\n1️⃣ Liên hệ Tawk để báo yêu cầu\n2️⃣ Gửi sản phẩm về shop\n3️⃣ Shop kiểm tra trong 2-3 ngày\n4️⃣ Xử lý đổi trả/hoàn tiền\n\n💰 **Chi phí**:\n• Đổi hàng: Miễn phí 1 lần\n• Trả hàng: Phí ship 30k\n• Hoàn tiền: 3-5 ngày làm việc\n\nBạn muốn đổi trả sản phẩm nào? Tôi sẽ hướng dẫn chi tiết! 🤝';
        }

        if (
            message.includes('không hài lòng') ||
            message.includes('phàn nàn') ||
            message.includes('khiếu nại') ||
            message.includes('complaint')
        ) {
            return '💝 **Tawk rất tiếc khi bạn không hài lòng!**\n\nTôi cam kết sẽ giải quyết vấn đề này ngay:\n\n🎯 **Các bước xử lý**:\n1️⃣ Lắng nghe vấn đề của bạn\n2️⃣ Ghi nhận và xác minh thông tin\n3️⃣ Đề xuất giải pháp hợp lý\n4️⃣ Xử lý trong thời gian sớm nhất\n\n📞 **Kênh hỗ trợ ưu tiên**:\n• Hotline: 1900-1234 (nhấn 3)\n• Email: complaint@shop.com\n• Zalo: 0987-654-321\n\n🎁 **Đền bù (nếu có lỗi từ shop)**:\n• Giảm 10% cho lần mua tiếp theo\n• Tặng voucher 200k\n• Miễn phí vận chuyển 3 lần\n\nBạn có thể chia sẻ cụ thể về vấn đề không? Tôi luôn ở đây lắng nghe! 🤗';
        }

        if (
            message.includes('khuyến mãi') ||
            message.includes('giảm giá') ||
            message.includes('voucher') ||
            message.includes('sale')
        ) {
            return '🎉 **Khuyến mãi hấp dẫn - Tawk cập nhật ngay!**\n\n**Ưu đãi đang diễn ra**:\n\n🔥 **Flash Sale**:\n• Giảm đến 50% các sản phẩm công nghệ\n• Thời gian: 20:00 - 22:00 hàng ngày\n• Số lượng có hạn!\n\n💳 **Thanh toán online**:\n• Giảm thêm 5% cho đơn từ 1tr\n• Freeship cho đơn từ 500k\n• Tích điểm 2x thành viên\n\n🎁 **Voucher đặc biệt**:\n• NEW100: Giảm 100k cho khách mới\n• VIP50: Giảm 50k cho thành viên Bạc\n• LOYAL100: Giảm 100k cho thành viên Vàng\n\nBạn muốn biết chi tiết về chương trình nào? 🎊';
        }

        if (
            message.includes('cảm ơn') ||
            message.includes('thank') ||
            message.includes('good') ||
            message.includes('hay')
        ) {
            return '🥰 **Cảm ơn bạn rất nhiều!**\n\nTawk rất vui vì đã giúp được bạn!\n\n⭐ **Đánh giá của bạn rất quan trọng**:\n• Giúp Tawk cải thiện dịch vụ\n• Góp ý cho shop phát triển\n• Làm cho khách hàng khác hài lòng hơn\n\n🎁 **Thưởng cho bạn**:\n• Voucher 50k cho lần mua tiếp theo\n• Tích điểm thành viên 100 điểm\n• Miễn phí vận chuyển 1 lần\n\nMã: THANKYOU50\n\nCòn cần Tawk giúp gì không? Tôi luôn sẵn sàng! 💖';
        }

        if (
            message.includes('tạm biệt') ||
            message.includes('bye') ||
            message.includes('chào tạm biệt')
        ) {
            return '👋 **Tạm biệt và hẹn gặp lại!**\n\nCảm ơn bạn đã tin tưởng shop!\n\n📞 **Khi cần hỗ trợ**:\n• Tawk luôn có mặt 24/7\n• Hotline: 1900-1234\n• Email: support@shop.com\n\n🎁 **Ưu đãi lần sau**:\n• Giảm 5% cho lần mua tiếp theo\n• Miễn phí vận chuyển\n• Tích điểm thành viên\n\nChúc bạn một ngày tuyệt vời! 🌈\n\nMã quay lại: COMEBACK5';
        }

        // Fallback with customer service focus
        return '💕 Tawk luôn sẵn lòng giúp bạn!\n\nTôi có thể hỗ trợ:\n\n🛍️ **Tư vấn mua sắm**: Chọn sản phẩm phù hợp nhất\n📦 **Theo dõi đơn hàng**: Kiểm tra trạng thái nhanh chóng\n🔄 **Đổi trả**: Hướng dẫn quy trình đơn giản\n💬 **Lắng nghe**: Giải quyết mọi thắc mắc\n🎁 **Khuyến mãi**: Cập nhật ưu đãi mới nhất\n\nHãy chia sẻ vấn đề của bạn, Tawk sẽ giải quyết! 🤗';
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
                Math.max(500, inputMessage.length * 10),
                1500
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
        <div className='tawk-chatbot'>
            <button
                className='chat-button friendly-style'
                onClick={() => setIsOpen(!isOpen)}
                aria-label='Chat with Tawk'
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {isOpen && (
                <div className='chat-window friendly-theme'>
                    <div className='chat-header friendly-header'>
                        <h3>💝 Tawk - Trợ lý khách hàng</h3>
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
                                    className={`message ${message.isBot ? 'bot-message friendly-bot' : 'user-message'}`}
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
                            <div className='message bot-message friendly-bot typing'>
                                <div className='typing-message'>
                                    Đang trả lời ngay...
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
                            placeholder='Nhập tin nhắn cho Tawk...'
                            disabled={isTyping}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isTyping || !inputMessage.trim()}
                            className='friendly-send-btn'
                        >
                            {isTyping ? '...' : '💕'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TawkChatbot;
