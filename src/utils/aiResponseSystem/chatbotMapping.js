/**
 * Chatbot Mapping Configuration
 * Maps your existing chatbot components to AI personas
 */
import {
    createTechnicalAI,
    createConsultantAI,
    createMarketingAI,
    AIPersonas
} from './index.js';

// Chatbot to AI Persona Mapping
export const CHATBOT_MAPPING = {
    // Webot -> Fashion Consultant AI
    webot: {
        aiType: 'consultant',
        name: 'Webot Fashion Expert',
        icon: '�',
        description:
            'Professional fashion consultant for style advice, outfit coordination, and product recommendations',
        persona: {
            tone: 'friendly, fashionable, helpful',
            expertise: [
                'fashion',
                'style consultation',
                'outfit coordination',
                'color advice',
                'size selection'
            ],
            behavior: [
                'ask about style preferences',
                'provide fashion recommendations',
                'coordinate outfits',
                'advise on sizing and materials'
            ]
        }
    },

    // Tawk.to -> Product Consultant AI
    tawk: {
        aiType: 'consultant',
        name: 'Tawk Shopping Assistant',
        icon: '🛍️',
        description:
            'Friendly product consultant for personalized recommendations',
        persona: {
            tone: 'friendly, helpful, personalized',
            expertise: ['products', 'recommendations', 'comparisons', 'advice'],
            behavior: ['ask preferences', 'suggest products', 'compare options']
        }
    },

    // BotLibre -> General Purpose AI (Marketing + Support)
    botlibre: {
        aiType: 'marketing', // Default to marketing, can switch dynamically
        name: 'BotLibre Assistant',
        icon: '🤖',
        description:
            'Versatile assistant for technical support and shopping help',
        persona: {
            tone: 'flexible, friendly, versatile',
            expertise: ['promotions', 'products', 'general support', 'orders'],
            behavior: [
                'multi-tasking',
                'context switching',
                'comprehensive support'
            ]
        },
        // BotLibre can switch between marketing and technical based on context
        dynamicMode: true,
        fallbackAI: 'consultant' // If unsure, use consultant
    }
};

// AI Creation Functions for Each Chatbot
export const createWebotAI = (productData = null) => {
    const mapping = CHATBOT_MAPPING.webot;
    return {
        ...createConsultantAI(productData),
        chatbotName: mapping.name,
        icon: mapping.icon,
        mapping: mapping
    };
};

export const createTawkAI = (productData = null) => {
    const mapping = CHATBOT_MAPPING.tawk;
    return {
        ...createConsultantAI(productData),
        chatbotName: mapping.name,
        icon: mapping.icon,
        mapping: mapping
    };
};

export const createBotlibreAI = (productData = null) => {
    const mapping = CHATBOT_MAPPING.botlibre;

    // Create base AI (marketing by default)
    const baseAI = createMarketingAI(productData);

    // Add dynamic switching capability for BotLibre
    return {
        ...baseAI,
        chatbotName: mapping.name,
        icon: mapping.icon,
        mapping: mapping,

        // Override processMessage to add dynamic AI switching
        async processMessage(message, language = 'en') {
            // Detect if this is a technical issue
            const technicalKeywords = [
                'lỗi',
                'vấn đề',
                'hỏng',
                'không hoạt động',
                'đơn hàng',
                'thanh toán',
                'hoàn tiền'
            ];
            const isTechnicalIssue = technicalKeywords.some((keyword) =>
                message.toLowerCase().includes(keyword)
            );

            // Switch to technical AI for technical issues
            if (isTechnicalIssue && this.currentAIType !== 'technical') {
                this.switchToTechnical();
            }
            // Switch back to marketing for general/shopping queries
            else if (!isTechnicalIssue && this.currentAIType === 'technical') {
                this.switchToMarketing();
            }

            return await super.processMessage(message, language);
        },

        switchToTechnical() {
            this.aiType = 'technical';
            this.persona = AIPersonas.technical;
            this.currentAIType = 'technical';
        },

        switchToMarketing() {
            this.aiType = 'marketing';
            this.persona = AIPersonas.marketing;
            this.currentAIType = 'marketing';
        },

        currentAIType: 'marketing'
    };
};

// Vietnamese Language Support for Each Chatbot
export const VIETNAMESE_RESPONSES = {
    webot: {
        greeting:
            "👋 Hello! I'm Webot - the shop's fashion consultant expert.\n\nI specialize in:\n👕 Style consultation and outfit coordination\n👗 Outfit suggestions based on body type\n🎨 Color and trend consultation\n📦 Assistance with size and material selection\n\nWhat fashion advice do you need today?",
        fashion_advice:
            "I'd love to help you find the perfect outfit! Can you tell me about your style preferences and the occasion?",
        product_recommendation:
            'Based on your preferences, I recommend these fashion items that would look great on you!',
        styling:
            'Let me help you coordinate the perfect outfit! What items are you considering?',
        closing: 'Is there anything else I can help you with? Happy styling!'
    },

    tawk: {
        greeting:
            "Hi there! I'm Tawk shopping assistant. I'd love to help you find the perfect products!",
        recommendation:
            "I'll help you find the best options. Can you tell me about your preferences and budget?",
        product_info:
            'This is a great product! What would you like to know more about it?',
        closing: 'Is there anything else I can help you with? Happy shopping!'
    },

    botlibre: {
        greeting:
            "Hello! I'm BotLibre assistant. I can help you with both products and technical issues!",
        marketing: '🔥 SPECIAL OFFER! We have amazing promotions just for you!',
        technical:
            'I understand your technical issue. Let me help you right away.',
        general:
            'I can help with many things. What do you need assistance with today?'
    }
};

// Integration Helper Functions
export const getChatbotConfig = (chatbotName) => {
    const normalized = chatbotName.toLowerCase().replace(/[^a-z]/g, '');
    return CHATBOT_MAPPING[normalized] || CHATBOT_MAPPING.botlibre;
};

export const createChatbotAI = (chatbotName, productData = null) => {
    const config = getChatbotConfig(chatbotName);

    switch (config.aiType) {
        case 'technical':
            return createWebotAI(productData);
        case 'consultant':
            return createTawkAI(productData);
        case 'marketing':
            return createBotlibreAI(productData);
        default:
            return createBotlibreAI(productData);
    }
};

// Quick Setup for Each Chatbot
export const setupWebotChatbot = () => {
    const ai = createWebotAI();
    return {
        ai,
        config: CHATBOT_MAPPING.webot,
        vietnameseResponses: VIETNAMESE_RESPONSES.webot
    };
};

export const setupTawkChatbot = () => {
    const ai = createTawkAI();
    return {
        ai,
        config: CHATBOT_MAPPING.tawk,
        vietnameseResponses: VIETNAMESE_RESPONSES.tawk
    };
};

export const setupBotlibreChatbot = () => {
    const ai = createBotlibreAI();
    return {
        ai,
        config: CHATBOT_MAPPING.botlibre,
        vietnameseResponses: VIETNAMESE_RESPONSES.botlibre
    };
};

// Export all functions
export { createWebotAI, createTawkAI, createBotlibreAI };
