/**
 * Main AI Chatbot Engine
 * Orchestrates all components to provide intelligent, diverse responses
 */
import { ContextManager } from './contextManager.js';
import { IntentDetector } from './intentDetector.js';
import { ResponseGenerator } from './responseGenerator.js';
import { AIPersonas, PersonaHelpers } from './aiPersonas.js';
import { ProductDataIntegration } from './productDataIntegration.js';
import { ConversationFlow } from './conversationFlow.js';

export class AIChatbotEngine {
    constructor(aiType, productDataset = null) {
        this.aiType = aiType;
        this.persona = AIPersonas[aiType];

        // Initialize core components
        this.contextManager = new ContextManager();
        this.intentDetector = new IntentDetector();
        this.responseGenerator = new ResponseGenerator();
        this.conversationFlow = new ConversationFlow();

        // Initialize product data (with sample data if none provided)
        this.productData = new ProductDataIntegration(
            productDataset || ProductDataIntegration.getSampleDataset()
        );

        // Engine state
        this.isActive = false;
        this.currentFlow = null;
        this.currentStage = null;
    }

    // Start conversation
    startConversation(userPreferences = {}) {
        this.contextManager.resetContext();
        this.contextManager.updatePreferences(userPreferences);
        this.responseGenerator.resetTracking();
        this.isActive = true;

        return this.generateInitialGreeting();
    }

    // Process user message and generate response
    async processMessage(userMessage, language = 'en') {
        if (!this.isActive) {
            this.startConversation();
        }

        // Add user message to context
        this.contextManager.addMessage(userMessage, true);

        // Detect intent and entities
        const intent = this.intentDetector.detectIntent(userMessage, language);
        this.contextManager.addDetectedIntent(intent);
        this.contextManager.updateSentiment(intent.sentiment);

        // Update conversation stage
        this.updateConversationStage(intent);

        // Generate response based on AI type and context
        const response = await this.generateResponse(intent, language);

        // Add AI response to context
        this.contextManager.addMessage(response, false);
        this.contextManager.addLastResponse(response);

        return response;
    }

    async generateResponse(intent, language) {
        const context = this.contextManager.getContext();

        // Check for fashion-specific keywords for consultant AI
        if (this.aiType === 'consultant') {
            const fashionResponse = this.generateFashionResponse(
                intent,
                language
            );
            if (fashionResponse) return fashionResponse;
        }

        // Use conversation flow if applicable
        if (this.currentFlow) {
            const flowResponse = this.generateFlowBasedResponse(
                intent,
                context,
                language
            );
            if (flowResponse) return flowResponse;
        }

        // Generate standard response
        let response = this.responseGenerator.generateResponse(
            this.aiType,
            intent.intent,
            context,
            language
        );

        // Enhance response based on AI type and context
        response = this.enhanceResponse(response, intent, context, language);

        return response;
    }

    generateFashionResponse(intent, language) {
        const message =
            this.contextManager.getRecentContext(1)[0]?.content || '';
        const messageLower = message.toLowerCase();

        // Check for specific fashion keywords
        if (
            messageLower.includes('t-shirt') ||
            messageLower.includes('áo thun') ||
            messageLower.includes('cotton')
        ) {
            return (
                this.responseGenerator.responseTemplates.consultant[language]
                    ?.fashion_specific?.tshirts?.[0] ||
                this.responseGenerator.responseTemplates.consultant.en
                    .fashion_specific.tshirts[0]
            );
        }

        if (
            messageLower.includes('jean') ||
            messageLower.includes('quần jean') ||
            messageLower.includes('denim')
        ) {
            return (
                this.responseGenerator.responseTemplates.consultant[language]
                    ?.fashion_specific?.jeans?.[0] ||
                this.responseGenerator.responseTemplates.consultant.en
                    .fashion_specific.jeans[0]
            );
        }

        if (
            messageLower.includes('dress') ||
            messageLower.includes('váy') ||
            messageLower.includes('đầm')
        ) {
            return (
                this.responseGenerator.responseTemplates.consultant[language]
                    ?.fashion_specific?.dresses?.[0] ||
                this.responseGenerator.responseTemplates.consultant.en
                    .fashion_specific.dresses[0]
            );
        }

        if (
            messageLower.includes('shirt') ||
            messageLower.includes('sơ mi') ||
            messageLower.includes('áo sơ mi')
        ) {
            return (
                this.responseGenerator.responseTemplates.consultant[language]
                    ?.fashion_specific?.shirts?.[0] ||
                this.responseGenerator.responseTemplates.consultant.en
                    .fashion_specific.shirts[0]
            );
        }

        if (
            messageLower.includes('size') ||
            messageLower.includes('kích thước') ||
            messageLower.includes('đo')
        ) {
            return (
                this.responseGenerator.responseTemplates.consultant[language]
                    ?.fashion_specific?.size_advice?.[0] ||
                this.responseGenerator.responseTemplates.consultant.en
                    .fashion_specific.size_advice[0]
            );
        }

        if (
            messageLower.includes('accessor') ||
            messageLower.includes('túi') ||
            messageLower.includes('giày') ||
            messageLower.includes('mũ')
        ) {
            return (
                this.responseGenerator.responseTemplates.consultant[language]
                    ?.fashion_specific?.accessories?.[0] ||
                this.responseGenerator.responseTemplates.consultant.en
                    .fashion_specific.accessories[0]
            );
        }

        return null;
    }

    generateFlowBasedResponse(intent, context, language) {
        if (!this.currentFlow) return null;

        this.currentStage = this.conversationFlow.getCurrentStage(
            this.currentFlow,
            context
        );

        // Check if we should transition stages
        if (
            this.conversationFlow.shouldTransition(
                this.currentStage,
                intent,
                context
            )
        ) {
            const nextStage = this.conversationFlow.getNextStage(
                this.currentFlow,
                this.currentStage,
                intent
            );
            if (nextStage) {
                this.contextManager.updateConversationStage(nextStage.name);
                this.currentStage = nextStage;
            }
        }

        // Generate flow-specific response
        const flowResponse = this.conversationFlow.generateFlowResponse(
            this.currentFlow,
            this.currentStage,
            intent,
            context,
            this.aiType
        );

        // Convert flow response to actual text
        return this.convertFlowResponse(flowResponse, context, language);
    }

    convertFlowResponse(flowResponse, context, language) {
        const { stage, actions, responseStrategy, aiType } = flowResponse;

        // Generate base response
        let response = this.responseGenerator.generateResponse(
            aiType,
            stage,
            context,
            language
        );

        // Add action-specific enhancements
        response = this.addActionSpecificContent(
            response,
            actions,
            context,
            language
        );

        return response;
    }

    addActionSpecificContent(response, actions, context, language) {
        let enhancedResponse = response;

        actions.forEach((action) => {
            switch (action) {
                case 'show_relevant_products':
                    enhancedResponse +=
                        this.generateProductRecommendations(context);
                    break;
                case 'create_urgency':
                    enhancedResponse += this.generateUrgencyMessage(language);
                    break;
                case 'ask_budget_range':
                    enhancedResponse += this.generateBudgetQuestion(language);
                    break;
                case 'provide_step_by_step_solution':
                    enhancedResponse +=
                        this.generateTroubleshootingSteps(context);
                    break;
            }
        });

        return enhancedResponse;
    }

    enhanceResponse(response, intent, context, language) {
        let enhancedResponse = response;

        // Add persona-specific modifications
        enhancedResponse = this.addPersonaTouch(enhancedResponse, language);

        // Add product data integration
        enhancedResponse = this.addProductContext(
            enhancedResponse,
            intent,
            context
        );

        // Add emotional intelligence
        enhancedResponse = this.addEmotionalIntelligence(
            enhancedResponse,
            intent,
            context,
            language
        );

        // Add call-to-action if appropriate
        enhancedResponse = this.addCallToAction(
            enhancedResponse,
            intent,
            context,
            language
        );

        return enhancedResponse;
    }

    addPersonaTouch(response, language) {
        const modifiers = PersonaModifiers[this.aiType];
        if (!modifiers) return response;

        // Add prefix
        const prefixes =
            modifiers.prefixPhrases?.[language] || modifiers.prefixPhrases?.en;
        if (prefixes && Math.random() > 0.7) {
            const prefix =
                prefixes[Math.floor(Math.random() * prefixes.length)];
            response = prefix + ' ' + response;
        }

        // Add suffix
        const suffixes =
            modifiers.suffixPhrases?.[language] || modifiers.suffixPhrases?.en;
        if (suffixes && Math.random() > 0.8) {
            const suffix =
                suffixes[Math.floor(Math.random() * suffixes.length)];
            response = response + ' ' + suffix;
        }

        // Add emojis for marketing and consultant AIs
        if (
            PersonaHelpers.getEmojiUsage(this.aiType).length > 0 &&
            Math.random() > 0.6
        ) {
            const emojis = PersonaHelpers.getEmojiUsage(this.aiType);
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            response = emoji + ' ' + response;
        }

        return response;
    }

    addProductContext(response, intent, context) {
        if (this.aiType === 'consultant') {
            // Add product recommendations
            if (intent.intent === 'recommendation_request') {
                const recommendations =
                    this.productData.generateRecommendations(
                        context.userPreferences,
                        2
                    );
                if (recommendations.length > 0) {
                    response += '\n\nBased on your preferences, I recommend:\n';
                    recommendations.forEach((product, index) => {
                        response += `\n${index + 1}. ${product.name} - $${product.price} ⭐ ${product.rating}`;
                    });
                }
            }
        }

        if (this.aiType === 'marketing') {
            // Add promotional content
            if (intent.intent === 'purchase_intent') {
                const bundles = this.productData.generateBundles(intent, 1);
                if (bundles.length > 0) {
                    const bundle = bundles[0];
                    response += `\n\n🔥 BUNDLE DEAL: Save ${bundle.discount}% with our ${bundle.name}! Only ${bundle.savings} savings!`;
                }
            }
        }

        if (this.aiType === 'technical') {
            // Add technical specifications
            if (
                intent.intent === 'product_inquiry' &&
                intent.entities.length > 0
            ) {
                // Would extract product ID from entities and show specs
                response +=
                    '\n\nWould you like me to provide the technical specifications for this product?';
            }
        }

        return response;
    }

    addEmotionalIntelligence(response, intent, context, language) {
        // Add empathy for negative sentiment
        if (intent.sentiment === 'negative') {
            const empathyPhrases = {
                en: [
                    'I understand how frustrating that must be.',
                    'I hear your concern.',
                    'I completely understand.'
                ]
            };

            const phrases = empathyPhrases[language] || empathyPhrases.en;
            const phrase = phrases[Math.floor(Math.random() * phrases.length)];
            response = phrase + ' ' + response;
        }

        // Add excitement for positive sentiment
        if (
            intent.sentiment === 'positive' &&
            (this.aiType === 'marketing' || this.aiType === 'consultant')
        ) {
            const excitementPhrases = {
                en: [
                    "That's fantastic!",
                    "I'm so glad to hear that!",
                    'Wonderful!'
                ]
            };

            const phrases = excitementPhrases[language] || excitementPhrases.en;
            const phrase = phrases[Math.floor(Math.random() * phrases.length)];
            response = phrase + ' ' + response;
        }

        const ctas = {
            consultant: {
                en: 'Would you like me to help you with anything else?'
            },
            marketing: {
                en: 'Ready to grab this amazing deal?'
            },
            technical: {
                en: 'Is there anything else I can assist you with?'
            }
        };

        // Add CTA for purchase intents
        if (intent.intent === 'purchase_intent' && Math.random() > 0.5) {
            const ctaList = ctas[this.aiType]?.en;
            if (ctaList) {
                response += '\n\n' + ctaList;
            }
        }

        return response;
    }

    generateProductRecommendations(context) {
        const recommendations = this.productData.generateRecommendations(
            context.userPreferences,
            3
        );
        if (recommendations.length === 0) return '';

        let text = '\n\nHere are some recommendations for you:\n';
        recommendations.forEach((product, index) => {
            text += `\n• ${product.name} - $${product.price} (⭐ ${product.rating}/5)`;
        });
        return text;
    }

    generateBudgetQuestion(language) {
        const questions = {
            en: [
                "What's your budget range?",
                'How much are you looking to spend?',
                'What price range works best for you?'
            ]
        };

        const questionList = questions[language] || questions.en;
        return (
            '\n\n' +
            questionList[Math.floor(Math.random() * questionList.length)]
        );
    }

    generateTroubleshootingSteps(context) {
        return (
            "\n\nLet's resolve this step by step:\n" +
            '1. First, could you check if...?\n' +
            '2. Then, try to...\n' +
            "3. If that doesn't work, let's...\n\n" +
            'Let me know what happens at each step!'
        );
    }

    updateConversationStage(intent) {
        // Determine appropriate flow
        this.currentFlow = this.conversationFlow.determineFlow(
            this.contextManager.getContext(),
            intent
        );

        // Update stage based on flow
        if (this.currentFlow) {
            const newStage = this.conversationFlow.determineFlow(
                this.contextManager.getContext(),
                intent
            );
            this.contextManager.updateConversationStage(
                this.conversationFlow.getCurrentStage(
                    newFlow,
                    this.contextManager.getContext()
                ).name
            );
        }
    }

    generateInitialGreeting(language = 'en') {
        const greetings = {
            en: {
                technical:
                    "Hello! I'm your technical support assistant. How can I help you today?",
                consultant:
                    "Hi there! I'm your personal shopping consultant. What can I help you find?",
                marketing:
                    "🎉 Welcome! I'm excited to show you our amazing deals! What brings you in today?"
            }
        };

        return greetings[language]?.[this.aiType] || greetings.en[this.aiType];
    }

    // Get conversation context for debugging/analytics
    getContext() {
        return {
            aiType: this.aiType,
            persona: this.persona,
            context: this.contextManager.getContext(),
            currentFlow: this.currentFlow?.name || 'none',
            currentStage: this.currentStage?.name || 'none'
        };
    }

    // Reset conversation
    reset() {
        this.contextManager.resetContext();
        this.responseGenerator.resetTracking();
        this.currentFlow = null;
        this.currentStage = null;
        this.isActive = false;
    }
}
