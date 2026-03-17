/**
 * AI Response System - Main Export File
 * Centralized exports for easy integration with chatbot components
 */

// Core Engine
export { AIChatbotEngine } from './aiChatbotEngine.js';

// Core Components
export { ContextManager } from './contextManager.js';
export { IntentDetector } from './intentDetector.js';
export { ResponseGenerator } from './responseGenerator.js';

// Configuration and Mapping
export { AIPersonas, PersonaHelpers, LanguageConfig } from './aiPersonas.js';
export {
    CHATBOT_MAPPING,
    createWebotAI,
    createTawkAI,
    createBotlibreAI,
    setupWebotChatbot,
    setupTawkChatbot,
    setupBotlibreChatbot
} from './chatbotMapping.js';

// Data Integration
export { ProductDataIntegration } from './productDataIntegration.js';

// Flow Management
export { ConversationFlow } from './conversationFlow.js';

// Examples and Testing
export {
    ExampleConversations,
    runDemonstration
} from './exampleConversations.js';

// Quick Setup Functions
export const createTechnicalAI = (productData = null) => {
    return new AIChatbotEngine('technical', productData);
};

export const createConsultantAI = (productData = null) => {
    return new AIChatbotEngine('consultant', productData);
};

export const createMarketingAI = (productData = null) => {
    return new AIChatbotEngine('marketing', productData);
};

// Factory function for easy AI creation
export const createAI = (aiType, productData = null) => {
    const validTypes = ['technical', 'consultant', 'marketing'];
    if (!validTypes.includes(aiType)) {
        throw new Error(
            `Invalid AI type: ${aiType}. Must be one of: ${validTypes.join(', ')}`
        );
    }
    return new AIChatbotEngine(aiType, productData);
};

// Pre-configured AI instances with sample data
export const preconfiguredAIs = {
    technical: () =>
        createTechnicalAI(ProductDataIntegration.getSampleDataset()),
    consultant: () =>
        createConsultantAI(ProductDataIntegration.getSampleDataset()),
    marketing: () =>
        createMarketingAI(ProductDataIntegration.getSampleDataset())
};

// Utility functions
export const getAIInfo = (aiType) => {
    const personas = {
        technical: {
            name: 'TechSupport Pro',
            description:
                'Professional technical support for orders, payments, and troubleshooting',
            icon: '🔧',
            bestFor: ['Customer support', 'Technical issues', 'Order problems']
        },
        consultant: {
            name: 'Shopping Assistant',
            description:
                'Friendly product consultant for personalized recommendations',
            icon: '🛍️',
            bestFor: [
                'Product discovery',
                'Shopping assistance',
                'Recommendations'
            ]
        },
        marketing: {
            name: 'Deal Hunter',
            description:
                'Energetic marketing AI for promotions and conversions',
            icon: '🎯',
            bestFor: ['Sales', 'Promotions', 'Upselling']
        }
    };

    return personas[aiType] || null;
};

export const getAllAIInfo = () => {
    return ['technical', 'consultant', 'marketing'].map((type) =>
        getAIInfo(type)
    );
};

// Quick demo function
export const quickDemo = async () => {
    const examples = new ExampleConversations();
    return await examples.quickTest();
};

// Default export for convenience
export default {
    AIChatbotEngine,
    createTechnicalAI,
    createConsultantAI,
    createMarketingAI,
    createAI,
    preconfiguredAIs,
    getAIInfo,
    getAllAIInfo,
    quickDemo,
    // Core components
    ContextManager,
    IntentDetector,
    ResponseGenerator,
    // Configuration
    AIPersonas,
    PersonaHelpers,
    LanguageConfig,
    // Data and flow
    ProductDataIntegration,
    ConversationFlow,
    // Examples
    ExampleConversations,
    runDemonstration
};
