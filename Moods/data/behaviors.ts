export const behaviors = {
  // ... (keep all positive and neutral mood behaviors)

  overwhelmed: [
    { id: 'avoidance', name: 'Avoiding tasks or responsibilities', type: 'negative', category: 'coping' },
    { id: 'venting', name: 'Venting without seeking solutions', type: 'negative', category: 'social' },
    { id: 'procrastination', name: 'Putting off important tasks', type: 'negative', category: 'productivity' },
    { id: 'isolation', name: 'Withdrawing from others', type: 'negative', category: 'social' },
    { id: 'impulsive_spending', name: 'Making impulsive purchases', type: 'negative', category: 'financial' },
    { id: 'overworking', name: 'Working excessive hours', type: 'negative', category: 'work' }
  ],

  overwhelmed_alternatives: [
    { id: 'break_tasks', name: 'Break tasks into smaller steps', type: 'positive', category: 'productivity' },
    { id: 'seek_support', name: 'Reach out to friends or family', type: 'positive', category: 'social' },
    { id: 'relaxation', name: 'Practice relaxation techniques', type: 'positive', category: 'wellness' },
    { id: 'budget_review', name: 'Review and adjust budget', type: 'positive', category: 'financial' },
    { id: 'organize_space', name: 'Declutter and organize space', type: 'positive', category: 'environment' },
    { id: 'small_goals', name: 'Set smaller, achievable goals', type: 'positive', category: 'planning' }
  ],

  frustrated: [
    { id: 'give_up', name: 'Giving up on tasks', type: 'negative', category: 'coping' },
    { id: 'lash_out', name: 'Lashing out at others', type: 'negative', category: 'social' },
    { id: 'ruminate', name: 'Dwelling on problems', type: 'negative', category: 'mental' },
    { id: 'blame', name: 'Blaming self or others', type: 'negative', category: 'social' },
    { id: 'avoid_help', name: 'Refusing to ask for help', type: 'negative', category: 'social' },
    { id: 'negative_self_talk', name: 'Engaging in negative self-talk', type: 'negative', category: 'mental' }
  ],

  frustrated_alternatives: [
    { id: 'take_break', name: 'Take a short break', type: 'positive', category: 'self-care' },
    { id: 'communicate', name: 'Express needs clearly', type: 'positive', category: 'social' },
    { id: 'problem_solve', name: 'Break down the problem', type: 'positive', category: 'productivity' },
    { id: 'seek_help', name: 'Ask for help or guidance', type: 'positive', category: 'social' },
    { id: 'physical_activity', name: 'Do some physical activity', type: 'positive', category: 'health' },
    { id: 'reframe', name: 'Look for alternative solutions', type: 'positive', category: 'mental' }
  ],
  // ... (keep rest of the behaviors)
};