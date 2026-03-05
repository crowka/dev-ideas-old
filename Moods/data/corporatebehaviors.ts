// src/data/corporate-behaviors.ts
export const corporateBehaviors = {
  // For positive moods (productive, motivated, collaborative, accomplished, confident, innovative)
  positive_response: {
    message: "We are so happy that you are happy! Thank you for your feedback and keep shining! 🌟",
    type: 'positive',
    allowFeedback: false
  },

  // For neutral moods (focused, professional, balanced)
  neutral_response: {
    message: "It seems you have a pretty good day! Is there something we could do to make it even better?",
    type: 'neutral',
    allowFeedback: true,
    feedbackPrompt: "Your suggestion for improvement:"
  },

  // For challenging moods - specific suggestions for each
  stressed: {
    message: "We notice you're feeling stressed. Let's help you manage this.",
    type: 'negative',
    allowFeedback: true,
    feedbackPrompt: "What can we do better to support you?",
    suggestions: [
      { id: 'break', name: 'Take a short break', category: 'wellness' },
      { id: 'walk', name: 'Go for a quick walk', category: 'physical' },
      { id: 'prioritize', name: 'Review priorities with your manager', category: 'work' },
      { id: 'delegate', name: 'Consider delegating some tasks', category: 'work' }
    ]
  },

  challenged: {
    message: "Facing challenges is normal. Let's work through this together.",
    type: 'negative',
    allowFeedback: true,
    feedbackPrompt: "How can we better support you with these challenges?",
    suggestions: [
      { id: 'support', name: 'Schedule a support meeting', category: 'work' },
      { id: 'resources', name: 'Review available resources', category: 'work' },
      { id: 'mentoring', name: 'Connect with a mentor', category: 'development' },
      { id: 'break_down', name: 'Break the challenge into smaller steps', category: 'strategy' }
    ]
  },

  concerned: {
    message: "We value your concerns and want to help address them.",
    type: 'negative',
    allowFeedback: true,
    feedbackPrompt: "What specific concerns would you like us to address?",
    suggestions: [
      { id: 'discuss', name: 'Discuss with your supervisor', category: 'work' },
      { id: 'plan', name: 'Create an action plan', category: 'strategy' },
      { id: 'support_resources', name: 'Review support resources', category: 'wellness' },
      { id: 'break_time', name: 'Take a coffee break', category: 'wellness' }
    ]
  },

  overwhelmed: {
    message: "It's okay to feel overwhelmed. Let's help you manage your workload.",
    type: 'negative',
    allowFeedback: true,
    feedbackPrompt: "How can we help reduce your workload?",
    suggestions: [
      { id: 'prioritize_tasks', name: 'Review priorities with manager', category: 'work' },
      { id: 'delegate_work', name: 'Identify tasks to delegate', category: 'work' },
      { id: 'take_break', name: 'Take a proper break', category: 'wellness' },
      { id: 'wellness_time', name: 'Use your wellness time', category: 'wellness' }
    ]
  },

  // Default response for any unlisted negative moods
  default_negative: {
    message: "We notice you're not feeling your best. Let's work on this together.",
    type: 'negative',
    allowFeedback: true,
    feedbackPrompt: "What can we do to help improve your experience?",
    suggestions: [
      { id: 'break', name: 'Take a break', category: 'wellness' },
      { id: 'talk', name: 'Talk to your supervisor', category: 'work' },
      { id: 'resources', name: 'Access support resources', category: 'support' },
      { id: 'wellness', name: 'Use wellness benefits', category: 'wellness' }
    ]
  }
};