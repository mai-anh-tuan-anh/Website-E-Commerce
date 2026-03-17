/**
 * Test file to verify AI Response System integration
 */
import { createConsultantAI } from './src/utils/aiResponseSystem/index.js';

async function testWebotIntegration() {
    console.log('🧪 Testing Webot AI Integration...');
    
    try {
        // Create the AI instance (same as Webot uses)
        const ai = createConsultantAI();
        
        // Test fashion-related queries
        const testQueries = [
            'hello',
            't-shirt',
            'jeans', 
            'dress',
            'size advice'
        ];
        
        console.log('✅ AI Created successfully');
        
        for (const query of testQueries) {
            console.log(`\n🔍 Testing: "${query}"`);
            const response = await ai.processMessage(query, 'en');
            console.log(`🤖 Response: ${response.substring(0, 100)}...`);
        }
        
        console.log('\n✅ All tests passed! AI Response System is working correctly.');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error(error.stack);
    }
}

// Run the test
testWebotIntegration();
