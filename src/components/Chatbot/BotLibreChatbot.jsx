import { useState, useEffect, useRef } from 'react';
import './styles.css';

const BotLibreChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: 'Xin chào! Tôi là trợ lý AI của cửa hàng. Tôi có thể giúp bạn tìm sản phẩm, tư vấn mua sắm, hỗ trợ thanh toán và giải đáp các thắc mắc của bạn. Bạn cần giúp gì hôm nay?',
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
            return '🛍️ Đây là website thương mại điện tử chuyên nghiệp!\n\nChúng tôi bán:\n📱 Đồ công nghệ (iPhone, Samsung, Laptop)\n👕 Thời trang nam/nữ/unisex\n💄 Mỹ phẩm chính hãng\n🏠 Gia dụng thông minh\n📚 Sách và văn phòng phẩm\n⚽ Dụng cụ thể thao\n\n✨ Cam kết:\n• Hàng chính hãng 100%\n• Giá tốt nhất thị trường\n• Giao hàng toàn quốc\n• Đổi trả 30 ngày\n\nBạn cần tìm sản phẩm nào? 😊';
        }

        if (
            message.includes('website bán gì') ||
            message.includes('bán sản phẩm gì') ||
            message.includes('có mặt hàng gì')
        ) {
            return '🏪 Chúng tôi có đầy đủ các danh mục sản phẩm:\n\n📱 **Đồ công nghệ**: iPhone, Samsung, Laptop, Tablet, Phụ kiện\n👕 **Thời trang**: Áo, quần, váy, giày, túi xách\n💄 **Mỹ phẩm**: Skincare, makeup, son, kem chống nắng\n🏠 **Gia dụng**: Bếp từ, robot hút bụi, máy lọc không khí\n📚 **Sách**: Văn học, kỹ năng, kinh doanh, giáo dục\n⚽ **Thể thao**: Dụng cụ gym, yoga, bóng đá, cầu lông\n\nBạn muốn xem danh mục nào? 🤔';
        }

        // Product Intents
        if (
            message.includes('có sản phẩm nào') ||
            message.includes('có gì hot') ||
            message.includes('sản phẩm bán chạy')
        ) {
            return '🔥 Sản phẩm bán chạy nhất tuần này:\n\n📱 iPhone 15 Pro Max - Giảm 15%\n👕 Áo Polo Nam - Chỉ 299k\n💄 Son MAC Ruby Woo - 650k\n🏠 Nồi chiên không dầu Philips - 1.2tr\n📚 Sách "Nhà Giả Kim" - 120k\n⚽ Giày Nike Air Force - 1.8tr\n\nBạn muốn xem chi tiết sản phẩm nào? ✨';
        }

        if (
            message.includes('giá bao nhiêu') ||
            message.includes('giá cả') ||
            message.includes('bao nhiêu tiền')
        ) {
            return '💰 Giá sản phẩm rất đa dạng:\n\n📱 Điện thoại: 3tr - 25tr\n💻 Laptop: 8tr - 45tr\n👕 Quần áo: 150k - 1.5tr\n💄 Mỹ phẩm: 100k - 2tr\n🏠 Gia dụng: 500k - 10tr\n📚 Sách: 50k - 500k\n⚽ Thể thao: 200k - 3tr\n\nBạn quan tâm sản phẩm nào để tôi báo giá chính xác? 🎯';
        }

        if (
            message.includes('còn hàng không') ||
            message.includes('tồn kho') ||
            message.includes('có sẵn không')
        ) {
            return '📦 Tình trạng tồn kho:\n\n✅ **Còn hàng (90% sản phẩm)**:\n• iPhone 15 series: Đủ màu, đủ dung lượng\n• Samsung Galaxy: Full box quốc tế\n• Quần áo: Size S-XL đầy đủ\n• Mỹ phẩm: Hết hạn 2025+\n\n⚠️ **Sắp hết hàng**:\n• MacBook Air M2 (còn 5 cái)\n• Nike Air Jordan (còn 10 đôi)\n\nBạn muốn kiểm tra sản phẩm cụ thể nào? 🔍';
        }

        // Shipping Intents
        if (
            message.includes('giao hàng mất bao lâu') ||
            message.includes('thời gian giao') ||
            message.includes('bao lâu nhận hàng')
        ) {
            return '⏰ Thời gian giao hàng:\n\n🚀 **Nhanh nhất**:\n• Hà Nội & TP.HCM: 1-2 ngày\n• Các tỉnh lân cận: 2-3 ngày\n\n📦 **Tiêu chuẩn**:\n• Miền Bắc: 3-4 ngày\n• Miền Trung: 3-4 ngày\n• Miền Nam: 2-3 ngày\n\n🏝️ **Đảo xa**: 5-7 ngày\n\nBạn ở khu vực nào? Tôi sẽ kiểm tra chính xác! 📍';
        }

        if (
            message.includes('có ship toàn quốc không') ||
            message.includes('giao hàng toàn quốc') ||
            message.includes('giao mọi nơi')
        ) {
            return '🇻🇳 Có, chúng tôi giao hàng toàn quốc 63 tỉnh thành!\n\n✅ **Các khu vực**:\n• Thành phố lớn: Hà Nội, TP.HCM, Đà Nẵng\n• Tỉnh thành: Cần Thơ, Hải Phòng, Buôn Ma Thuột...\n• Huyện đảo: Phú Quốc, Côn Đảo, Lý Sơn\n\n🚚 **Đơn vị vận chuyển**:\n• GHN, GHTK, Viettel Post, VNPost\n\nBạn muốn giao đến đâu? 🗺️';
        }

        if (
            message.includes('phí ship bao nhiêu') ||
            message.includes('chi phí vận chuyển') ||
            message.includes('phí giao hàng')
        ) {
            return '💸 Bảng giá vận chuyển:\n\n🆓 **Miễn phí**:\n• Đơn hàng từ 500.000đ\n• Khách hàng VIP (hạng Bạc trở lên)\n\n💰 **Phí tiêu chuẩn**:\n• Dưới 500k: 30.000đ\n• Nội thành Hà Nội/TP.HCM: 20.000đ\n\n⚡ **Dịch vụ đặc biệt**:\n• Giao hỏa tốc: +50.000đ\n• Giao trong ngày: +80.000đ\n\nBạn muốn chọn phương thức nào? 🚚';
        }

        // Payment Intents
        if (
            message.includes('có thanh toán online không') ||
            message.includes('chuyển khoản') ||
            message.includes('thẻ tín dụng')
        ) {
            return '💳 Có, chúng tôi chấp nhận thanh toán online:\n\n🔐 **An toàn tuyệt đối**:\n• Thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB)\n• Ví điện tử (MoMo, ZaloPay, ShopeePay)\n• Chuyển khoản ngân hàng 24/7\n\n🎁 **Ưu đãi khi thanh toán online**:\n• Giảm 5% cho đơn hàng từ 1tr\n• Tích điểm thành viên 2x\n• Voucher 100k cho lần đầu\n\nBạn muốn dùng phương thức nào? 💰';
        }

        if (
            message.includes('có cod không') ||
            message.includes('thanh toán khi nhận hàng') ||
            message.includes('nhận hàng mới trả tiền')
        ) {
            return '📦 Có, chúng tôi hỗ trợ COD (Thanh toán khi nhận hàng):\n\n✅ **Quy trình COD**:\n• Nhận hàng → Kiểm tra → Thanh toán\n• Có thể quét mã QR hoặc trả tiền mặt\n• Nhân viên giao hàng có máy POS\n\n🎯 **Lưu ý**:\n• COD chỉ áp dụng cho đơn dưới 5tr\n• Phí COD: 20.000đ\n• Miễn phí COD cho đơn từ 1tr\n\nBạn muốn thanh toán COD hay online? 🤔';
        }

        // Support Intents
        if (
            message.includes('liên hệ shop') ||
            message.includes('liên hệ') ||
            message.includes('tư vấn')
        ) {
            return '📞 Kênh liên hệ của chúng tôi:\n\n🆘 **Hỗ trợ 24/7**:\n• Hotline: 1900-1234 (Miễn phí)\n• Live chat: Trên website\n• Zalo: 0987-654-321\n\n📧 **Email**:\n• Hỗ trợ: support@shop.com\n• Khiếu nại: complaint@shop.com\n\n🏢 **Văn phòng**:\n• 123 Nguyễn Trãi, Q.1, TP.HCM\n• Giờ làm việc: 8:00 - 20:00\n\nBạn cần hỗ trợ gấp không? 🚀';
        }

        if (
            message.includes('email là gì') ||
            message.includes('địa chỉ email') ||
            message.includes('mail')
        ) {
            return '📧 Địa chỉ email của chúng tôi:\n\n💌 **Email chính**:\n• support@shop.com (Hỗ trợ chung)\n• order@shop.com (Đơn hàng)\n• feedback@shop.com (Góp ý)\n\n⏰ **Thời gian phản hồi**:\n• Email thông thường: 2-4 giờ\n• Email khẩn cấp: 30 phút\n• Email khiếu nại: 1 giờ\n\nBạn có thể gửi email ngay bây giờ! 📮';
        }

        if (
            message.includes('số điện thoại') ||
            message.includes('hotline') ||
            message.includes('điện thoại')
        ) {
            return '📱 Số điện thoại liên hệ:\n\n🆘 **Hotline chính**:\n• 1900-1234 (Hỗ trợ 24/7 - Miễn phí)\n• 0987-654-321 (Zalo/WhatsApp)\n\n🏢 **Các bộ phận**:\n• Bán hàng: 1900-1234 (nhấn 1)\n• Kỹ thuật: 1900-1234 (nhấn 2)\n• Khiếu nại: 1900-1234 (nhấn 3)\n\n📞 **Zalo Business**:\n• 0987-654-321 (Chat trực tiếp)\n\nBạn có thể gọi ngay! 📞';
        }

        // Fallback for unknown intents
        return '🤔 Xin lỗi, tôi chưa hiểu câu hỏi của bạn.\n\nBạn có thể hỏi tôi về:\n\n💰 **Giá sản phẩm**: "iPhone bao nhiêu tiền?"\n📦 **Giao hàng**: "Giao hàng mất bao lâu?"\n🔄 **Đổi trả**: "Chính sách đổi trả thế nào?"\n📞 **Liên hệ**: "Số điện thoại shop?"\n🛍️ **Sản phẩm**: "Có sản phẩm nào hot?"\n💳 **Thanh toán**: "Có COD không?"\n📍 **Địa chỉ**: "Shop ở đâu?"\n⏰ **Giờ mở**: "Mấy giờ đóng cửa?"\n\nBạn muốn hỏi về vấn đề nào? 😊';
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
        return date.toLocaleTimeString('vi-VN', {
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
                        <h3>🤖 Trợ lý AI thông minh</h3>
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
                                    Đang soạn phản hồi...
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
                            placeholder='Nhập tin nhắn...'
                            disabled={isTyping}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isTyping || !inputMessage.trim()}
                        >
                            {isTyping ? '...' : 'Gửi'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BotLibreChatbot;
