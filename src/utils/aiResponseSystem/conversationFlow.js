/**
 * Conversation Flow Management
 * Designs natural conversation flows for different scenarios
 */
export class ConversationFlow {
  constructor() {
    this.flows = {
      purchaseFlow: this.createPurchaseFlow(),
      supportFlow: this.createSupportFlow(),
      browsingFlow: this.createBrowsingFlow(),
      complaintFlow: this.createComplaintFlow()
    };
  }

  // PURCHASE FLOW: Greeting → Ask → Recommend → Follow-up
  createPurchaseFlow() {
    return {
      stages: [
        {
          name: 'greeting',
          triggers: ['greeting', 'first_message'],
          actions: [
            'welcome_user',
            'identify_shopping_needs',
            'ask_preferences'
          ],
          nextStage: 'exploring',
          aiTypes: ['consultant', 'marketing']
        },
        {
          name: 'exploring',
          triggers: ['product_inquiry', 'recommendation_request'],
          actions: [
            'clarify_needs',
            'ask_budget_range',
            'suggest_categories'
          ],
          nextStage: 'recommending',
          aiTypes: ['consultant']
        },
        {
          name: 'recommending',
          triggers: ['recommendation_request', 'category_interest'],
          actions: [
            'show_relevant_products',
            'highlight_key_features',
            'compare_options'
          ],
          nextStage: 'considering',
          aiTypes: ['consultant']
        },
        {
          name: 'considering',
          triggers: ['product_inquiry', 'comparison_request'],
          actions: [
            'provide_detailed_info',
            'show_reviews',
            'answer_questions'
          ],
          nextStage: 'purchasing',
          aiTypes: ['consultant', 'marketing']
        },
        {
          name: 'purchasing',
          triggers: ['purchase_intent', 'add_to_cart'],
          actions: [
            'confirm_selection',
            'create_urgency_marketing',
            'assist_checkout'
          ],
          nextStage: 'closing',
          aiTypes: ['marketing']
        },
        {
          name: 'closing',
          triggers: ['purchase_complete', 'thanks'],
          actions: [
            'confirm_purchase',
            'offer_related_products',
            'provide_support_info'
          ],
          nextStage: 'complete',
          aiTypes: ['consultant', 'marketing']
        }
      ],
      transitions: {
        'greeting': 'exploring',
        'exploring': 'recommending', 
        'recommending': 'considering',
        'considering': 'purchasing',
        'purchasing': 'closing',
        'closing': 'complete'
      }
    };
  }

  // SUPPORT FLOW: Complaint → Clarify → Solve → Confirm
  createSupportFlow() {
    return {
      stages: [
        {
          name: 'greeting',
          triggers: ['greeting', 'help_request'],
          actions: [
            'identify_as_support',
            'ask_about_issue',
            'reassure_assistance'
          ],
          nextStage: 'identifying',
          aiTypes: ['technical']
        },
        {
          name: 'identifying',
          triggers: ['complaint', 'problem_description'],
          actions: [
            'acknowledge_issue',
            'ask_specific_details',
            'request_order_info'
          ],
          nextStage: 'diagnosing',
          aiTypes: ['technical']
        },
        {
          name: 'diagnosing',
          triggers: ['refund_request', 'technical_issue'],
          actions: [
            'analyze_problem',
            'identify_root_cause',
            'determine_solution_type'
          ],
          nextStage: 'solving',
          aiTypes: ['technical']
        },
        {
          name: 'solving',
          triggers: ['problem_identified', 'details_provided'],
          actions: [
            'provide_step_by_step_solution',
            'offer_multiple_options',
            'set_expectations'
          ],
          nextStage: 'confirming',
          aiTypes: ['technical']
        },
        {
          name: 'confirming',
          triggers: ['solution_provided', 'steps_given'],
          actions: [
            'verify_resolution',
            'offer_follow_up',
            'document_solution'
          ],
          nextStage: 'closing',
          aiTypes: ['technical']
        },
        {
          name: 'closing',
          triggers: ['issue_resolved', 'thanks'],
          actions: [
            'confirm_satisfaction',
            'provide_future_support',
            'summarize_resolution'
          ],
          nextStage: 'complete',
          aiTypes: ['technical']
        }
      ]
    };
  }

  // BROWSING FLOW: Browsing → Suggest → Upsell
  createBrowsingFlow() {
    return {
      stages: [
        {
          name: 'greeting',
          triggers: ['greeting', 'browsing'],
          actions: [
            'welcome_enthusiastically',
            'highlight_current_deals',
            'ask_interest_area'
          ],
          nextStage: 'discovery',
          aiTypes: ['marketing']
        },
        {
          name: 'discovery',
          triggers: ['category_interest', 'general_browsing'],
          actions: [
            'show_trending_items',
            'promote_flash_deals',
            'suggest_popular_categories'
          ],
          nextStage: 'engaging',
          aiTypes: ['marketing']
        },
        {
          name: 'engaging',
          triggers: ['product_interest', 'deal_inquiry'],
          actions: [
            'promote_bundle_deals',
            'create_urgency',
            'show_social_proof'
          ],
          nextStage: 'upselling',
          aiTypes: ['marketing']
        },
        {
          name: 'upselling',
          triggers: ['purchase_intent', 'cart_addition'],
          actions: [
            'suggest_upgrades',
            'offer_bundles',
            'promote_accessories'
          ],
          nextStage: 'closing',
          aiTypes: ['marketing']
        },
        {
          name: 'closing',
          triggers: ['checkout_intent', 'purchase_complete'],
          actions: [
            'emphasize_savings',
            'create_fomo',
            'encourage_immediate_action'
          ],
          nextStage: 'complete',
          aiTypes: ['marketing']
        }
      ]
    };
  }

  // COMPLAINT FLOW: Problem → Empathize → Resolve → Recover
  createComplaintFlow() {
    return {
      stages: [
        {
          name: 'acknowledgment',
          triggers: ['complaint', 'negative_sentiment'],
          actions: [
            'express_empathy',
            'validate_frustration',
            'take_ownership'
          ],
          nextStage: 'investigation',
          aiTypes: ['technical']
        },
        {
          name: 'investigation',
          triggers: ['problem_details', 'complaint_explained'],
          actions: [
            'ask_clarifying_questions',
            'gather_evidence',
            'identify_affected_areas'
          ],
          nextStage: 'resolution',
          aiTypes: ['technical']
        },
        {
          name: 'resolution',
          triggers: ['issue_identified', 'cause_found'],
          actions: [
            'offer_solution',
            'provide_compensation',
            'set_timeline'
          ],
          nextStage: 'recovery',
          aiTypes: ['technical']
        },
        {
          name: 'recovery',
          triggers: ['solution_accepted', 'compensation_offered'],
          actions: [
            'restore_confidence',
            'offer_goodwill',
            'prevent_recurrence'
          ],
          nextStage: 'closing',
          aiTypes: ['technical']
        },
        {
          name: 'closing',
          triggers: ['issue_resolved', 'satisfaction_confirmed'],
          actions: [
            'confirm_resolution',
            'thank_patience',
            'offer_ongoing_support'
          ],
          nextStage: 'complete',
          aiTypes: ['technical']
        }
      ]
    };
  }

  // Determine which flow to use based on context
  determineFlow(context, lastIntent) {
    if (lastIntent.sentiment === 'negative' || 
        ['complaint', 'refund_request', 'problem'].includes(lastIntent.intent)) {
      return this.flows.complaintFlow;
    }

    if (['purchase_intent', 'recommendation_request', 'product_inquiry'].includes(lastIntent.intent)) {
      return this.flows.purchaseFlow;
    }

    if (context.userContext.hasPurchasedBefore && lastIntent.intent === 'greeting') {
      return this.flows.browsingFlow;
    }

    if (lastIntent.intent === 'refund_request' || lastIntent.intent === 'complaint') {
      return this.flows.supportFlow;
    }

    return this.flows.purchaseFlow; // Default flow
  }

  // Get current stage in flow
  getCurrentStage(flow, context) {
    const stageName = context.conversationStage || 'greeting';
    return flow.stages.find(stage => stage.name === stageName) || flow.stages[0];
  }

  // Get next stage
  getNextStage(flow, currentStage, intent) {
    // Check for explicit transitions
    if (flow.transitions && flow.transitions[currentStage.name]) {
      return flow.stages.find(stage => 
        stage.name === flow.transitions[currentStage.name]
      );
    }

    // Use nextStage property
    if (currentStage.nextStage) {
      return flow.stages.find(stage => stage.name === currentStage.nextStage);
    }

    // Find next stage by triggers
    const currentIndex = flow.stages.indexOf(currentStage);
    if (currentIndex < flow.stows.length - 1) {
      return flow.stages[currentIndex + 1];
    }

    return null;
  }

  // Check if stage transition should happen
  shouldTransition(currentStage, intent, context) {
    // Check if intent matches stage triggers
    if (currentStage.triggers.includes(intent.intent)) {
      return true;
    }

    // Check for special conditions
    if (intent.sentiment === 'negative' && currentStage.name !== 'acknowledgment') {
      return true; // Jump to complaint handling
    }

    if (intent.intent === 'purchase_intent' && currentStage.name === 'considering') {
      return true; // Move to purchase
    }

    return false;
  }

  // Generate flow-appropriate response
  generateFlowResponse(flow, currentStage, intent, context, aiType) {
    const actions = currentStage.actions;
    const responseStrategy = this.getResponseStrategy(actions, aiType, intent);
    
    return {
      stage: currentStage.name,
      actions: actions,
      responseStrategy: responseStrategy,
      nextStageHint: this.getNextStage(flow, currentStage, intent)?.name,
      aiType: aiType
    };
  }

  getResponseStrategy(actions, aiType, intent) {
    const strategies = {
      consultant: {
        'welcome_user': 'friendly_greeting',
        'ask_preferences': 'discovery_questions',
        'show_relevant_products': 'personalized_recommendations',
        'provide_detailed_info': 'comprehensive_explanation',
        'confirm_purchase': 'reassurance_and_support'
      },
      marketing: {
        'welcome_enthusiastically': 'energetic_greeting',
        'highlight_current_deals': 'promotion_focus',
        'create_urgency': 'scarcity_tactics',
        'promote_bundle_deals': 'value_proposition',
        'encourage_immediate_action': 'call_to_action'
      },
      technical: {
        'identify_as_support': 'professional_introduction',
        'acknowledge_issue': 'empathetic_acknowledgment',
        'provide_step_by_step_solution': 'structured_troubleshooting',
        'verify_resolution': 'confirmation_check',
        'document_solution': 'follow_up_support'
      }
    };

    const primaryAction = actions[0]; // Use first action as primary
    return strategies[aiType]?.[primaryAction] || 'default_response';
  }
}
