/**
 * Context & Memory Management System
 * Manages conversation state, user preferences, and AI memory
 */
export class ContextManager {
    constructor() {
        this.context = {
            sessionId: this.generateSessionId(),
            messages: [],
            userPreferences: {
                priceRange: null,
                categories: [],
                brandPreferences: [],
                lastViewedProducts: [],
                purchaseHistory: [],
                language: 'en' // Default to English for English website
            },
            detectedIntents: [],
            sentiment: 'neutral',
            conversationStage: 'greeting', // greeting, exploring, recommending, purchasing, support
            lastResponses: [], // Track to avoid repetition
            userContext: {
                isNewUser: true,
                hasPurchasedBefore: false,
                cartItems: [],
                currentOrder: null
            }
        };
        this.maxContextSize = 20; // Keep last 20 messages
    }

    generateSessionId() {
        return (
            'session_' +
            Date.now() +
            '_' +
            Math.random().toString(36).substr(2, 9)
        );
    }

    addMessage(message, isUser = false) {
        const messageObj = {
            id: Date.now(),
            content: message,
            isUser,
            timestamp: new Date().toISOString(),
            intent: null,
            sentiment: null
        };

        this.context.messages.push(messageObj);

        // Keep only recent messages
        if (this.context.messages.length > this.maxContextSize) {
            this.context.messages = this.context.messages.slice(
                -this.maxContextSize
            );
        }

        // Update user context
        if (isUser) {
            this.updateUserContext(message);
        }

        return messageObj;
    }

    updateUserContext(message) {
        // Mark as returning user
        if (this.context.messages.length > 3) {
            this.context.userContext.isNewUser = false;
        }

        // Detect if user has purchased before (simplified)
        const purchaseKeywords = [
            'buy',
            'bought',
            'purchase',
            'ordered',
            'đã mua',
            'mua'
        ];
        if (
            purchaseKeywords.some((keyword) =>
                message.toLowerCase().includes(keyword.toLowerCase())
            )
        ) {
            this.context.userContext.hasPurchasedBefore = true;
        }
    }

    updatePreferences(preferences) {
        this.context.userPreferences = {
            ...this.context.userPreferences,
            ...preferences
        };
    }

    setLanguage(lang) {
        this.context.userPreferences.language = lang;
    }

    updateSentiment(sentiment) {
        this.context.sentiment = sentiment;
    }

    updateConversationStage(stage) {
        this.context.conversationStage = stage;
    }

    addDetectedIntent(intent) {
        this.context.detectedIntents.push({
            ...intent,
            timestamp: new Date().toISOString()
        });

        // Keep only recent intents
        if (this.context.detectedIntents.length > 10) {
            this.context.detectedIntents =
                this.context.detectedIntents.slice(-10);
        }
    }

    addLastResponse(response) {
        this.context.lastResponses.push({
            content: response,
            timestamp: new Date().toISOString()
        });

        // Keep only last 5 responses to avoid repetition
        if (this.context.lastResponses.length > 5) {
            this.context.lastResponses = this.context.lastResponses.slice(-5);
        }
    }

    isResponseRepeated(response) {
        return this.context.lastResponses.some(
            (last) => last.content.toLowerCase() === response.toLowerCase()
        );
    }

    getRecentContext(limit = 5) {
        return this.context.messages.slice(-limit);
    }

    getContext() {
        return { ...this.context };
    }

    resetContext() {
        this.context = {
            sessionId: this.generateSessionId(),
            messages: [],
            userPreferences: {
                priceRange: null,
                categories: [],
                brandPreferences: [],
                lastViewedProducts: [],
                purchaseHistory: [],
                language: 'en' // Default to English for English website
            },
            detectedIntents: [],
            sentiment: 'neutral',
            conversationStage: 'greeting',
            lastResponses: [],
            userContext: {
                isNewUser: true,
                hasPurchasedBefore: false,
                cartItems: [],
                currentOrder: null
            }
        };
    }
}
