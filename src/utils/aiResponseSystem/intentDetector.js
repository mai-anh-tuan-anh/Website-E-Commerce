/**
 * Intent Detection System
 * Simulates NLP to detect user intent, entities, and sentiment
 */
export class IntentDetector {
  constructor() {
    this.intentPatterns = {
      // English patterns
      en: {
        refund_request: {
          keywords: ['refund', 'return', 'money back', 'get money back', 'cancel order'],
          entities: ['order', 'payment', 'product'],
          sentiment: 'negative'
        },
        product_inquiry: {
          keywords: ['what is', 'tell me about', 'information', 'details', 'specifications'],
          entities: ['product', 'feature', 'specification'],
          sentiment: 'neutral'
        },
        purchase_intent: {
          keywords: ['buy', 'purchase', 'order', 'want to buy', 'get', 'add to cart'],
          entities: ['product', 'price', 'quantity'],
          sentiment: 'positive'
        },
        price_inquiry: {
          keywords: ['price', 'cost', 'how much', 'cheap', 'expensive', 'discount'],
          entities: ['price', 'discount', 'promotion'],
          sentiment: 'neutral'
        },
        complaint: {
          keywords: ['problem', 'issue', 'wrong', 'broken', 'not working', 'bad', 'terrible'],
          entities: ['problem', 'error', 'defect'],
          sentiment: 'negative'
        },
        recommendation_request: {
          keywords: ['recommend', 'suggest', 'what should', 'best', 'top', 'popular'],
          entities: ['category', 'preference', 'budget'],
          sentiment: 'neutral'
        },
        greeting: {
          keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
          entities: [],
          sentiment: 'neutral'
        },
        thanks: {
          keywords: ['thank', 'thanks', 'appreciate', 'helpful'],
          entities: [],
          sentiment: 'positive'
        },
        goodbye: {
          keywords: ['bye', 'goodbye', 'see you', 'exit', 'leave'],
          entities: [],
          sentiment: 'neutral'
        }
      },
      // Vietnamese patterns
      vi: {
        refund_request: {
          keywords: ['hoàn tiền', 'trả lại', 'lấy lại tiền', 'hủy đơn'],
          entities: ['đơn hàng', 'thanh toán', 'sản phẩm'],
          sentiment: 'negative'
        },
        product_inquiry: {
          keywords: ['là gì', 'cho tôi biết', 'thông tin', 'chi tiết', 'đặc điểm'],
          entities: ['sản phẩm', 'tính năng', 'specification'],
          sentiment: 'neutral'
        },
        purchase_intent: {
          keywords: ['mua', 'đặt mua', 'đặt hàng', 'muốn mua', 'lấy', 'thêm vào giỏ'],
          entities: ['sản phẩm', 'giá', 'số lượng'],
          sentiment: 'positive'
        },
        price_inquiry: {
          keywords: ['giá', 'giá bao nhiêu', 'bao tiền', 'rẻ', 'đắt', 'giảm giá'],
          entities: ['giá', 'giảm giá', 'khuyến mãi'],
          sentiment: 'neutral'
        },
        complaint: {
          keywords: ['vấn đề', 'lỗi', 'sai', 'hỏng', 'không hoạt động', 'tệ'],
          entities: ['vấn đề', 'lỗi', 'lỗi sản phẩm'],
          sentiment: 'negative'
        },
        recommendation_request: {
          keywords: ['gợi ý', 'đề xuất', 'nên mua', 'tốt nhất', 'phổ biến'],
          entities: ['danh mục', 'sở thích', 'ngân sách'],
          sentiment: 'neutral'
        },
        greeting: {
          keywords: ['xin chào', 'chào', 'hello', 'chào buổi sáng', 'chào buổi chiều'],
          entities: [],
          sentiment: 'neutral'
        },
        thanks: {
          keywords: ['cảm ơn', 'thank', 'hay', 'giúp đỡ'],
          entities: [],
          sentiment: 'positive'
        },
        goodbye: {
          keywords: ['tạm biệt', 'chào nhé', 'ra đi', 'thoát'],
          entities: [],
          sentiment: 'neutral'
        }
      }
    };

    this.sentimentPatterns = {
      positive: {
        en: ['good', 'great', 'excellent', 'amazing', 'love', 'perfect', 'happy', 'satisfied'],
        vi: ['tốt', 'tuyệt', 'tuyệt vời', 'tuyệt hay', 'yêu', 'hoàn hảo', 'vui', 'hài lòng']
      },
      negative: {
        en: ['bad', 'terrible', 'awful', 'hate', 'worst', 'disappointed', 'angry', 'frustrated'],
        vi: ['tệ', 'khó chịu', 'ghét', 'tệ nhất', 'thất vọng', 'tức giận', 'bực mình']
      },
      neutral: {
        en: ['okay', 'fine', 'normal', 'standard', 'regular'],
        vi: ['được', 'bình thường', 'chuẩn', 'thông thường']
      }
    };
  }

  detectIntent(message, language = 'en') {
    const messageLower = message.toLowerCase();
    const patterns = this.intentPatterns[language] || this.intentPatterns.en;
    
    let detectedIntent = {
      intent: 'unknown',
      entities: [],
      sentiment: this.detectSentiment(message, language),
      confidence: 0
    };

    // Find matching intent
    for (const [intentName, intentData] of Object.entries(patterns)) {
      const matchCount = intentData.keywords.filter(keyword => 
        messageLower.includes(keyword)
      ).length;

      if (matchCount > 0) {
        const confidence = matchCount / intentData.keywords.length;
        if (confidence > detectedIntent.confidence) {
          detectedIntent = {
            intent: intentName,
            entities: this.extractEntities(message, intentData.entities),
            sentiment: intentData.sentiment || this.detectSentiment(message, language),
            confidence
          };
        }
      }
    }

    return detectedIntent;
  }

  extractEntities(message, entityTypes) {
    const entities = [];
    const messageLower = message.toLowerCase();

    // Extract price entities
    if (entityTypes.includes('price') || entityTypes.includes('discount')) {
      const pricePattern = /\$?\d+\.?\d*/g;
      const prices = message.match(pricePattern);
      if (prices) {
        entities.push({ type: 'price', value: prices[0] });
      }
    }

    // Extract product names (simplified - would use product catalog in real implementation)
    if (entityTypes.includes('product')) {
      const productKeywords = ['phone', 'laptop', 'shirt', 'shoes', 'book', 'điện thoại', 'máy tính', 'áo', 'giày'];
      const foundProducts = productKeywords.filter(product => 
        messageLower.includes(product)
      );
      foundProducts.forEach(product => {
        entities.push({ type: 'product', value: product });
      });
    }

    return entities;
  }

  detectSentiment(message, language = 'en') {
    const messageLower = message.toLowerCase();
    const patterns = this.sentimentPatterns;

    for (const [sentiment, words] of Object.entries(patterns)) {
      const languageWords = words[language] || words.en;
      const matchCount = languageWords.filter(word => 
        messageLower.includes(word)
      ).length;

      if (matchCount > 0) {
        return sentiment;
      }
    }

    return 'neutral';
  }

  // Detect conversation stage based on intent history
  detectConversationStage(recentIntents, userContext) {
    if (recentIntents.length === 0) return 'greeting';

    const lastIntents = recentIntents.slice(-3);
    const lastIntent = lastIntents[lastIntents.length - 1];

    // Stage transitions
    if (lastIntent.intent === 'greeting') {
      return 'exploring';
    } else if (lastIntent.intent === 'recommendation_request' || lastIntent.intent === 'product_inquiry') {
      return 'recommending';
    } else if (lastIntent.intent === 'purchase_intent') {
      return 'purchasing';
    } else if (lastIntent.intent === 'refund_request' || lastIntent.intent === 'complaint') {
      return 'support';
    } else if (lastIntent.sentiment === 'negative') {
      return 'support';
    }

    return 'exploring';
  }
}
