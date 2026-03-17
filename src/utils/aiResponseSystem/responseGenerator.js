/**
 * Response Generation System
 * Generates diverse, context-aware responses for each AI type
 */
export class ResponseGenerator {
    constructor() {
        this.responseTemplates = this.initializeTemplates();
        this.usedResponses = new Set(); // Track used responses to avoid repetition
    }

    initializeTemplates() {
        return {
            // Technical Support AI Templates
            technical: {
                en: {
                    greeting: [
                        "Hello! I'm here to help you with any technical issues. What can I assist you with today?",
                        "Hi! I'm your technical support assistant. How can I help resolve any issues you're experiencing?",
                        "Welcome! I'm here to provide technical support. What problem would you like me to help you solve?"
                    ],
                    refund_request: [
                        "I understand you'd like to request a refund. Let me help you with that process. Could you please provide your order number?",
                        "I can assist you with a refund request. To proceed, I'll need some information about your order. What's your order ID?",
                        'I see you want to process a refund. Let me guide you through this. First, could you share your order details?'
                    ],
                    complaint: [
                        "I'm sorry to hear you're experiencing issues. Let me help resolve this step by step. Could you describe the problem in detail?",
                        "I understand your frustration. Let's work together to solve this issue. What specific problem are you facing?",
                        'I apologize for the inconvenience. To better assist you, could you provide more details about what went wrong?'
                    ],
                    product_inquiry: [
                        'I can help you with technical specifications. What specific product information do you need?',
                        'Let me provide you with detailed technical information. What product would you like to know more about?',
                        'I can assist with product specifications and technical details. Which product are you interested in?'
                    ],
                    problem_solving: [
                        'Let me help you troubleshoot this issue. First, could you tell me when this problem started?',
                        "I'll help you resolve this systematically. What steps have you already tried to fix this?",
                        "Let's work through this problem together. Can you reproduce the issue and describe what happens?"
                    ]
                },
                vi: {
                    greeting: [
                        'Xin chào! Tôi ở đây để giúp bạn giải quyết các vấn đề kỹ thuật. Tôi có thể hỗ trợ gì cho bạn hôm nay?',
                        'Chào bạn! Tôi là trợ lý hỗ trợ kỹ thuật. Làm thế nào tôi có thể giúp giải quyết các vấn đề bạn đang gặp phải?',
                        'Chào mừng! Tôi ở đây để cung cấp hỗ trợ kỹ thuật. Bạn muốn tôi giúp giải quyết vấn đề gì?'
                    ],
                    refund_request: [
                        'Tôi hiểu bạn muốn yêu cầu hoàn tiền. Để tôi giúp bạn xử lý quy trình này. Bạn có thể cung cấp số đơn hàng không?',
                        'Tôi có thể hỗ trợ yêu cầu hoàn tiền của bạn. Để tiếp tục, tôi cần thông tin về đơn hàng. ID đơn hàng của bạn là gì?',
                        'Tôi thấy bạn muốn xử lý hoàn tiền. Để tôi hướng dẫn bạn. Đầu tiên, bạn có thể chia sẻ chi tiết đơn hàng không?'
                    ],
                    complaint: [
                        'Tôi rất tiếc khi biết bạn đang gặp vấn đề. Để tôi giúp giải quyết từng bước. Bạn có thể mô tả chi tiết vấn đề không?',
                        'Tôi hiểu sự thất vọng của bạn. Hãy cùng nhau giải quyết vấn đề này. Bạn đang gặp vấn đề cụ thể gì?',
                        'Tôi xin lỗi vì sự bất tiện này. Để hỗ trợ tốt hơn, bạn có thể cung cấp thêm chi tiết về những gì đã xảy ra không?'
                    ]
                }
            },

            // Product Consultant AI Templates
            consultant: {
                en: {
                    greeting: [
                        "👋 Hello! I'm Webot - the shop's fashion consultant expert.\n\nI specialize in:\n👕 Style consultation and outfit coordination\n👗 Outfit suggestions based on body type\n🎨 Color and trend consultation\n📦 Assistance with size and material selection\n\nWhat fashion advice do you need today?",
                        "Hi there! I'm your personal fashion consultant. I'd love to help you find the perfect outfit! What are you looking for today?",
                        "Welcome! I'm here to help you discover amazing fashion that matches your style. What can I help you find?"
                    ],
                    recommendation_request: [
                        "I'd be happy to help you find the perfect fashion pieces! To give you the best recommendations, could you tell me about your style preferences and the occasion?",
                        "Great question! Let me find some excellent fashion options for you. What's most important to you - comfort, style, or specific trends?",
                        'I love helping people find their perfect style! To give you personalized fashion recommendations, what do you usually look for when shopping?'
                    ],
                    product_inquiry: [
                        "That's a great fashion choice! Let me tell you all about this piece. What specific aspects are you most interested in - material, fit, or styling?",
                        'Excellent question! This fashion item has some amazing features. What would you like to know most about it?',
                        "I'd be happy to share details about this fashion piece! Is there something specific you'd like to know, or would you like styling tips?"
                    ],
                    purchase_intent: [
                        'Wonderful fashion choice! This piece would be perfect for your wardrobe. Would you like me to help you complete your purchase?',
                        "Great decision! I think you'll love this fashion item. Shall I help you add it to your cart?",
                        'Perfect! This is one of our most popular fashion items. Would you like me to guide you through the checkout process?'
                    ],
                    follow_up: [
                        'How does that fashion piece sound to you? Would you like to see similar styles or learn more about how to style it?',
                        'What do you think? Should I show you some alternative fashion options or would you like more details about this one?',
                        'Is this what you had in mind? I can also show you related fashion items that might complete your look.'
                    ],
                    fashion_specific: {
                        tshirts: [
                            '👕 **T-Shirts - Basic but never out of style!**\n\n**Premium Cotton T-Shirt**:\n• Material: 100% Cotton\n• Fit: Regular fit\n• Colors: White, Black, Gray, Beige\n• Size: S - XL\n• Price: $19.99\n\n**Oversize T-Shirt**:\n• Material: Stretch cotton\n• Fit: Loose oversize\n• Colors: Pastel tones\n• Size: Free size\n• Price: $24.99\n\nWhich style do you prefer? 😊'
                        ],
                        jeans: [
                            '👖 **Jeans - The essential accessory!**\n\n**Slim Fit Jeans**:\n• Material: Stretch denim\n• Fit: Slim fit lightly fitted\n• Colors: Blue, Black, Grey\n• Size: 28 - 36\n• Price: $49.99\n\n**Baggy Jeans**:\n• Material: Heavy weight denim\n• Fit: Loose baggy\n• Colors: Light wash, Dark wash\n• Size: 28 - 36\n• Price: $54.99\n\nWhich style do you want? 😊'
                        ],
                        dresses: [
                            '👗 **Dresses - Elegant charm for ladies!**\n\n**Floral Mini Dress**:\n• Material: Soft chiffon\n• Style: A-line flared\n• Pattern: Pastel flowers\n• Size: S - L\n• Price: $69.99\n\n**Bodycon Dress**:\n• Material: Stretch knit\n• Style: Body-hugging fit\n• Colors: Black, Red, Navy blue\n• Size: XS - M\n• Price: $59.99\n\nWhich dress style do you like? 💃'
                        ],
                        shirts: [
                            '👔 **Shirts - Elegant and sophisticated!**\n\n**Cotton Shirt**:\n• Material: 100% Cotton\n• Fit: Regular fit\n• Colors: White, Blue, Pink\n• Size: S - XL\n• Price: $39.99\n\n**Oxford Shirt**:\n• Material: Premium Oxford\n• Fit: Slim fit\n• Colors: White, Navy blue\n• Size: S - XL\n• Price: $59.99\n\nDo you need it for work or casual wear? 💼'
                        ],
                        size_advice: [
                            '📏 **Perfect size selection guide!**\n\n**T-Shirt Sizes**:\n• S: Chest 92cm, Length 68cm\n• M: Chest 96cm, Length 70cm\n• L: Chest 100cm, Length 72cm\n• XL: Chest 104cm, Length 74cm\n\n**Jean Sizes**:\n• 28: Waist 72cm, Length 96cm\n• 29: Waist 74cm, Length 98cm\n• 30: Waist 76cm, Length 100cm\n\nWhich product do you need size advice for? 😊'
                        ],
                        accessories: [
                            '👜 **Fashion Accessories - Complete your style!**\n\n**Bags**:\n• Canvas tote bag: $29.99\n• Leather crossbody: $59.99\n• Backpack: $79.99\n• Mini clutch: $39.99\n\n**Shoes**:\n• White sneakers: $89.99\n• Strap sandals: $44.99\n• High boots: $129.99\n\nWhich accessories do you need for your outfit? 🎩'
                        ]
                    }
                },
                vi: {
                    greeting: [
                        'Xin chào! Tôi là chuyên gia mua sắm cá nhân của bạn. Tôi rất muốn giúp bạn tìm sản phẩm hoàn hảo! Hôm nay bạn đang tìm gì?',
                        'Chào bạn! Tôi ở đây để giúp bạn khám phá những sản phẩm tuyệt vời phù hợp với nhu cầu của bạn. Tôi có thể giúp bạn tìm gì?',
                        'Chào mừng! Tôi là chuyên gia sản phẩm của bạn. Để tôi giúp bạn tìm đúng thứ bạn cần. Hôm nay bạn muốn mua gì?'
                    ],
                    recommendation_request: [
                        'Tôi rất vui được giúp bạn tìm sản phẩm hoàn hảo! Để đưa ra gợi ý tốt nhất, bạn có thể cho tôi biết sở thích và ngân sách của bạn không?',
                        'Câu hỏi tuyệt vời! Để tôi tìm một số lựa chọn tuyệt vời cho bạn. Điều gì quan trọng nhất với bạn - giá cả, chất lượng, hay tính năng cụ thể?'
                    ]
                }
            },

            // Marketing AI Templates
            marketing: {
                en: {
                    greeting: [
                        "🎉 Welcome! I'm excited to show you our amazing deals and exclusive offers! What brings you in today?",
                        "🌟 Hi there! You've come at the perfect time - we have incredible promotions running! What can I help you discover?",
                        "🚀 Welcome! I'm here to help you find the best deals and maximize your savings! Ready to explore some amazing offers?"
                    ],
                    promotion_announcement: [
                        "🔥 HOT DEAL ALERT! We have an exclusive promotion just for you! Would you like to see what's on special today?",
                        '💰 AMAZING NEWS! Our limited-time offers are waiting for you! Want to see how much you can save today?',
                        "⭐ EXCLUSIVE OFFER! I have some fantastic deals that won't last long! Interested in seeing our best promotions?"
                    ],
                    urgency_creation: [
                        "⏰ Don't miss out! This offer ends soon and quantities are limited! Would you like to secure this deal now?",
                        "🚨 LAST CHANCE! This promotion is ending today! Grab it before it's gone - shall I help you checkout?",
                        '⚡ ACT FAST! Other customers are buying this item right now! Want to lock in this special price?'
                    ],
                    upsell: [
                        "🎯 PERFECT MATCH! Since you're interested in this, you'll LOVE our bundle deal that saves you even more! Want to see it?",
                        '💎 UPGRADE ALERT! For just a little more, you can get the premium version with amazing extras! Should I show you the comparison?',
                        '🎁 BONUS OFFER! Add one more item and unlock an exclusive discount! Interested in seeing what pairs well with your selection?'
                    ],
                    purchase_intent: [
                        '🛒 Excellent choice! This is one of our best-selling items! Ready to checkout and claim your discount?',
                        "✨ Smart decision! You're getting an amazing deal! Shall I help you complete your purchase and apply your savings?",
                        '🎊 Great pick! This item is flying off the shelves! Ready to secure yours before they sell out?'
                    ]
                },
                vi: {
                    greeting: [
                        '🎉 Chào mừng! Tôi rất hào hứng cho bạn thấy những ưu đãi tuyệt vời và độc quyền của chúng tôi! Hôm nay bạn đến để tìm gì?',
                        '🌟 Chào bạn! Bạn đến đúng lúc - chúng tôi đang có khuyến mãi increíble! Tôi có thể giúp bạn khám phá gì?',
                        '🚀 Chào mừng! Tôi ở đây để giúp bạn tìm những ưu đãi tốt nhất và tối đa hóa tiền tiết kiệm của bạn! Sẵn sàng khám phá ưu đãi tuyệt vời?'
                    ],
                    promotion_announcement: [
                        '🔥 CẢNH BÁO ƯU ĐÃI NÓNG! Chúng tôi có khuyến mãi độc quyền dành riêng cho bạn! Bạn có muốn xem những gì đang giảm giá hôm nay không?',
                        '💰 TIN TUYỆT VỜI! Ưu đãi có thời hạn của chúng tôi đang chờ bạn! Muốn xem bạn có thể tiết kiệm bao nhiêu hôm nay không?'
                    ]
                }
            }
        };
    }

    generateResponse(aiType, intent, context, language = 'en') {
        const templates =
            this.responseTemplates[aiType]?.[language] ||
            this.responseTemplates[aiType]?.en;

        if (!templates) {
            return this.getFallbackResponse(language);
        }

        // Get available templates for this intent
        const intentTemplates =
            templates[intent] || templates[this.getFallbackIntent(intent)];

        if (!intentTemplates || intentTemplates.length === 0) {
            return this.getFallbackResponse(language);
        }

        // Filter out recently used responses
        const availableTemplates = intentTemplates.filter(
            (template) => !this.isRecentlyUsed(template, context)
        );

        // If all templates were recently used, reset and use all
        const finalTemplates =
            availableTemplates.length > 0
                ? availableTemplates
                : intentTemplates;

        // Select random template
        const selectedTemplate = this.selectRandomTemplate(finalTemplates);

        // Add context injection
        const contextualizedResponse = this.injectContext(
            selectedTemplate,
            intent,
            context,
            aiType
        );

        // Track this response
        this.trackResponse(selectedTemplate);

        return contextualizedResponse;
    }

    selectRandomTemplate(templates) {
        return templates[Math.floor(Math.random() * templates.length)];
    }

    isRecentlyUsed(template, context) {
        if (!context.lastResponses) return false;

        return context.lastResponses.some(
            (lastResponse) =>
                this.calculateSimilarity(template, lastResponse.content) > 0.8
        );
    }

    calculateSimilarity(str1, str2) {
        // Simple similarity calculation (could be enhanced)
        const words1 = str1.toLowerCase().split(' ');
        const words2 = str2.toLowerCase().split(' ');
        const commonWords = words1.filter((word) => words2.includes(word));
        return commonWords.length / Math.max(words1.length, words2.length);
    }

    injectContext(template, intent, context, aiType) {
        let response = template;

        // Inject user name if available
        if (context.userPreferences?.name) {
            response = response.replace(
                /\b(you|your)\b/gi,
                context.userPreferences.name
            );
        }

        // Inject product references for consultant
        if (
            aiType === 'consultant' &&
            context.userPreferences?.lastViewedProducts?.length > 0
        ) {
            const lastProduct = context.userPreferences.lastViewedProducts[0];
            response = response.replace(
                /\bthis product\b/gi,
                `"${lastProduct}"`
            );
        }

        // Inject price range context
        if (context.userPreferences?.priceRange) {
            response += ` I see you're looking in the ${context.userPreferences.priceRange} price range.`;
        }

        // Inject language-specific context
        if (context.sentiment === 'negative') {
            response = this.addEmpathy(response, language);
        }

        return response;
    }

    addEmpathy(response, language) {
        const empathyPrefixes = {
            en: [
                'I understand how you feel. ',
                'I hear your concern. ',
                'I completely understand. '
            ],
            vi: [
                'Tôi hiểu cảm giác của bạn. ',
                'Tôi nghe được mối quan tâm của bạn. ',
                'Tôi hoàn toàn hiểu. '
            ]
        };

        const prefix = empathyPrefixes[language]?.[0] || empathyPrefixes.en[0];
        return prefix + response;
    }

    getFallbackIntent(intent) {
        const fallbackMap = {
            unknown: 'greeting',
            complaint: 'problem_solving',
            price_inquiry: 'product_inquiry'
        };
        return fallbackMap[intent] || 'greeting';
    }

    getFallbackResponse(language) {
        const fallbacks = {
            en: "I'm here to help! Could you please tell me more about what you need?",
            vi: 'Tôi ở đây để giúp! Bạn có thể cho tôi biết thêm về những gì bạn cần không?'
        };
        return fallbacks[language] || fallbacks.en;
    }

    trackResponse(response) {
        this.usedResponses.add(response);

        // Clean up old responses periodically
        if (this.usedResponses.size > 50) {
            this.usedResponses.clear();
        }
    }

    // Reset tracking for new conversation
    resetTracking() {
        this.usedResponses.clear();
    }
}
