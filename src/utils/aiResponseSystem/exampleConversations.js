/**
 * Example Conversations
 * Demonstrates diverse, natural responses from each AI type
 */
import { AIChatbotEngine } from './aiChatbotEngine.js';
import { ProductDataIntegration } from './productDataIntegration.js';

export class ExampleConversations {
  constructor() {
    this.productData = ProductDataIntegration.getSampleDataset();
  }

  // Example 1: Purchase Flow with Consultant AI
  async demonstrateConsultantAI() {
    console.log('=== CONSULTANT AI DEMONSTRATION ===\n');
    
    const consultant = new AIChatbotEngine('consultant', this.productData);
    
    const conversation = [
      'Hi, I need help finding a good gift',
      'I\'m looking for something under $300',
      'Something for my husband who loves technology',
      'The headphones look interesting, tell me more',
      'That sounds perfect! I\'ll take them'
    ];

    console.log('Starting conversation with Consultant AI...\n');
    
    for (const message of conversation) {
      console.log(`👤 User: ${message}`);
      const response = await consultant.processMessage(message, 'en');
      console.log(`🛍️ Consultant: ${response}\n`);
    }

    return consultant.getContext();
  }

  // Example 2: Support Flow with Technical AI
  async demonstrateTechnicalAI() {
    console.log('=== TECHNICAL AI DEMONSTRATION ===\n');
    
    const technical = new AIChatbotEngine('technical', this.productData);
    
    const conversation = [
      'Hello, I have a problem with my order',
      'I ordered headphones last week but haven\'t received them',
      'My order number is ORD-12345',
      'Yes, the tracking shows it was delivered but I don\'t have it',
      'Can you help me get a refund?'
    ];

    console.log('Starting conversation with Technical AI...\n');
    
    for (const message of conversation) {
      console.log(`👤 User: ${message}`);
      const response = await technical.processMessage(message, 'en');
      console.log(`🔧 Technical: ${response}\n`);
    }

    return technical.getContext();
  }

  // Example 3: Marketing Flow with Marketing AI
  async demonstrateMarketingAI() {
    console.log('=== MARKETING AI DEMONSTRATION ===\n');
    
    const marketing = new AIChatbotEngine('marketing', this.productData);
    
    const conversation = [
      'Hi, just browsing',
      'I\'m looking at electronics',
      'The smart watch looks nice',
      'Hmm, I\'m not sure about the price',
      'Maybe I\'ll just get the headphones'
    ];

    console.log('Starting conversation with Marketing AI...\n');
    
    for (const message of conversation) {
      console.log(`👤 User: ${message}`);
      const response = await marketing.processMessage(message, 'en');
      console.log(`🎯 Marketing: ${response}\n`);
    }

    return marketing.getContext();
  }

  // Example 4: Vietnamese Language Support
  async demonstrateVietnameseSupport() {
    console.log('=== VIETNAMESE LANGUAGE DEMONSTRATION ===\n');
    
    const consultant = new AIChatbotEngine('consultant', this.productData);
    
    const conversation = [
      'Xin chào, tôi cần giúp đỡ',
      'Tôi muốn tìm một món quà',
      'Ngân sách của tôi khoảng 5 triệu',
      'Tôi thấy tai nghe nghe hay, cho tôi biết thêm',
      'Tuyệt vời, tôi sẽ mua nó'
    ];

    console.log('Starting Vietnamese conversation...\n');
    
    for (const message of conversation) {
      console.log(`👤 User: ${message}`);
      const response = await consultant.processMessage(message, 'vi');
      console.log(`🛍️ Consultant: ${response}\n`);
    }

    return consultant.getContext();
  }

  // Example 5: Sentiment-Aware Responses
  async demonstrateSentimentAwareness() {
    console.log('=== SENTIMENT AWARENESS DEMONSTRATION ===\n');
    
    const technical = new AIChatbotEngine('technical', this.productData);
    
    const conversations = [
      {
        scenario: 'Positive Sentiment',
        messages: [
          'Hi! Your service is amazing, I love the fast delivery!',
          'Everything was perfect, thank you so much!'
        ]
      },
      {
        scenario: 'Negative Sentiment', 
        messages: [
          'I\'m very frustrated with your service',
          'This is terrible, my order is completely wrong and I\'m angry'
        ]
      }
    ];

    for (const scenario of conversations) {
      console.log(`--- ${scenario.scenario} ---\n`);
      
      for (const message of scenario.messages) {
        console.log(`👤 User: ${message}`);
        const response = await technical.processMessage(message, 'en');
        console.log(`🔧 Technical: ${response}\n`);
      }
    }

    return technical.getContext();
  }

  // Example 6: Anti-Repetition Demonstration
  async demonstrateAntiRepetition() {
    console.log('=== ANTI-REPETITION DEMONSTRATION ===\n');
    
    const consultant = new AIChatbotEngine('consultant', this.productData);
    
    // Ask the same question multiple times
    const repeatedMessage = 'What can you help me with?';
    
    console.log('Testing anti-repetition with repeated messages...\n');
    
    for (let i = 1; i <= 4; i++) {
      console.log(`👤 User (${i}): ${repeatedMessage}`);
      const response = await consultant.processMessage(repeatedMessage, 'en');
      console.log(`🛍️ Consultant (${i}): ${response}\n`);
    }

    return consultant.getContext();
  }

  // Example 7: Product Data Integration
  async demonstrateProductIntegration() {
    console.log('=== PRODUCT DATA INTEGRATION DEMONSTRATION ===\n');
    
    const consultant = new AIChatbotEngine('consultant', this.productData);
    
    const conversation = [
      'Show me your best electronics',
      'I need something with good reviews',
      'What\'s the difference between the headphones and smart watch?',
      'Can you recommend something under $200?'
    ];

    console.log('Demonstrating product data integration...\n');
    
    for (const message of conversation) {
      console.log(`👤 User: ${message}`);
      const response = await consultant.processMessage(message, 'en');
      console.log(`🛍️ Consultant: ${response}\n`);
    }

    return consultant.getContext();
  }

  // Example 8: Multi-AI Comparison
  async demonstrateMultiAIComparison() {
    console.log('=== MULTI-AI COMPARISON DEMONSTRATION ===\n');
    
    const testMessage = 'I want to buy headphones';
    const ais = [
      { type: 'consultant', name: 'Consultant AI', icon: '🛍️' },
      { type: 'technical', name: 'Technical AI', icon: '🔧' },
      { type: 'marketing', name: 'Marketing AI', icon: '🎯' }
    ];

    console.log(`User: "${testMessage}"\n`);
    console.log('Comparing responses from all AI types...\n');

    const responses = [];

    for (const ai of ais) {
      const engine = new AIChatbotEngine(ai.type, this.productData);
      const response = await engine.processMessage(testMessage, 'en');
      
      console.log(`${ai.icon} ${ai.name}:`);
      console.log(response);
      console.log('');
      
      responses.push({
        type: ai.type,
        name: ai.name,
        response: response
      });
    }

    return responses;
  }

  // Run all demonstrations
  async runAllDemonstrations() {
    console.log('🚀 STARTING AI CHATBOT DEMONSTRATIONS\n');
    console.log('=' .repeat(50));

    const results = {};

    try {
      results.consultant = await this.demonstrateConsultantAI();
      console.log('\n' + '='.repeat(50) + '\n');

      results.technical = await this.demonstrateTechnicalAI();
      console.log('\n' + '='.repeat(50) + '\n');

      results.marketing = await this.demonstrateMarketingAI();
      console.log('\n' + '='.repeat(50) + '\n');

      results.vietnamese = await this.demonstrateVietnameseSupport();
      console.log('\n' + '='.repeat(50) + '\n');

      results.sentiment = await this.demonstrateSentimentAwareness();
      console.log('\n' + '='.repeat(50) + '\n');

      results.antiRepetition = await this.demonstrateAntiRepetition();
      console.log('\n' + '='.repeat(50) + '\n');

      results.productIntegration = await this.demonstrateProductIntegration();
      console.log('\n' + '='.repeat(50) + '\n');

      results.comparison = await this.demonstrateMultiAIComparison();
      console.log('\n' + '='.repeat(50) + '\n');

      console.log('✅ ALL DEMONSTRATIONS COMPLETED SUCCESSFULLY!');
      return results;

    } catch (error) {
      console.error('❌ Error in demonstrations:', error);
      return results;
    }
  }

  // Quick test for development
  async quickTest() {
    console.log('🧪 QUICK TEST - Single AI Interaction\n');
    
    const consultant = new AIChatbotEngine('consultant', this.productData);
    
    const testMessages = [
      'Hello, I need help finding a gift',
      'What do you recommend for someone who loves technology?',
      'Thanks for your help!'
    ];

    for (const message of testMessages) {
      console.log(`User: ${message}`);
      const response = await consultant.processMessage(message, 'en');
      console.log(`Consultant: ${response}\n`);
    }

    return consultant.getContext();
  }
}

// Export for easy testing
export const runDemonstration = async () => {
  const demos = new ExampleConversations();
  return await demos.quickTest();
};

// Uncomment to run full demonstration when this file is executed directly
// runDemonstration();
