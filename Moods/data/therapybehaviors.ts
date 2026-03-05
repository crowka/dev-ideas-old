xport const behaviors = {
  // Positive Behaviors for Positive Moods
  hopeful: [
    { id: 'goal_planning', name: 'Set a new goal or milestone', type: 'positive', category: 'planning' },
    { id: 'share_success', name: 'Share a recent success with someone', type: 'positive', category: 'social' },
    { id: 'celebrate_progress', name: 'Celebrate progress in a meaningful way', type: 'positive', category: 'self-care' },
    { id: 'inspire_others', name: 'Offer encouragement to others', type: 'positive', category: 'social' },
    { id: 'therapy_reflection', name: 'Reflect on therapy progress', type: 'positive', category: 'mental' },
  ],
  supported: [
    { id: 'accept_help', name: 'Accept support graciously', type: 'positive', category: 'social' },
    { id: 'express_gratitude', name: 'Express gratitude for support', type: 'positive', category: 'social' },
    { id: 'group_participation', name: 'Actively engage in a group activity', type: 'positive', category: 'social' },
    { id: 'ask_questions', name: 'Ask questions to deepen connection', type: 'positive', category: 'social' },
    { id: 'reciprocate_care', name: 'Offer care and support to others', type: 'positive', category: 'social' },
  ],
  grounded: [
    { id: 'focus_routine', name: 'Focus on a calming routine', type: 'positive', category: 'self-care' },
    { id: 'breathing_exercise', name: 'Practice deep breathing', type: 'positive', category: 'wellness' },
    { id: 'gratitude_list', name: 'Write a list of things I’m grateful for', type: 'positive', category: 'mental' },
    { id: 'mindful_walk', name: 'Take a mindful walk in nature', type: 'positive', category: 'wellness' },
    { id: 'hydration', name: 'Drink water and stay hydrated', type: 'positive', category: 'health' },
  ],

  // Neutral Behaviors for Reflective or Introspective Moods
  reflective: [
    { id: 'write_letter', name: 'Write a letter to my future self', type: 'positive', category: 'mental' },
    { id: 'review_goals', name: 'Review long-term goals', type: 'positive', category: 'planning' },
    { id: 'express_thanks', name: 'Thank someone for their support', type: 'positive', category: 'social' },
    { id: 'seek_feedback', name: 'Request feedback on personal growth', type: 'positive', category: 'social' },
    { id: 'analyze_patterns', name: 'Analyze recurring emotional patterns', type: 'positive', category: 'mental' },
  ],
  stable: [
    { id: 'routine_enhancement', name: 'Add a small improvement to my routine', type: 'positive', category: 'planning' },
    { id: 'pause_reflect', name: 'Pause and reflect on the present moment', type: 'positive', category: 'mental' },
    { id: 'connect_with_others', name: 'Reach out to a friend or family member', type: 'positive', category: 'social' },
    { id: 'enjoy_hobby', name: 'Engage in a favorite hobby', type: 'positive', category: 'self-care' },
    { id: 'review_day', name: 'Review my day’s successes', type: 'positive', category: 'mental' },
  ],

  // Challenging Behaviors for Negative Moods
  anxious: [
    { id: 'self_check_in', name: 'Check in with myself to identify triggers', type: 'positive', category: 'mental' },
    { id: 'progress_reminder', name: 'Remind myself of past achievements', type: 'positive', category: 'mental' },
    { id: 'breathing_exercise', name: 'Do a grounding breathing exercise', type: 'positive', category: 'wellness' },
    { id: 'reduce_stimulation', name: 'Limit sensory stimulation (e.g., noise)', type: 'positive', category: 'environment' },
    { id: 'reframe_thoughts', name: 'Reframe anxious thoughts', type: 'positive', category: 'mental' },
  ],
  triggered: [
    { id: 'safe_space', name: 'Move to a safe or calming environment', type: 'positive', category: 'environment' },
    { id: 'name_feelings', name: 'Name the emotions I’m feeling', type: 'positive', category: 'mental' },
    { id: 'reach_out_support', name: 'Contact a trusted person for support', type: 'positive', category: 'social' },
    { id: 'soothing_activity', name: 'Engage in a soothing activity', type: 'positive', category: 'self-care' },
    { id: 'remind_safety', name: 'Remind myself that I am safe now', type: 'positive', category: 'mental' },
  ],
  disconnected: [
    { id: 'grounding_exercise', name: 'Do a grounding exercise (e.g., 5-4-3-2-1)', type: 'positive', category: 'wellness' },
    { id: 'simple_task', name: 'Focus on completing a simple task', type: 'positive', category: 'productivity' },
    { id: 'connect_nature', name: 'Spend time outdoors to reconnect', type: 'positive', category: 'wellness' },
    { id: 'self_compassion', name: 'Practice self-compassion', type: 'positive', category: 'mental' },
    { id: 'gratitude_note', name: 'Write down one thing I’m grateful for', type: 'positive', category: 'mental' },
  ],
  enraged: [
    { id: 'remove_self_conflict', name: 'Step away from the conflict', type: 'positive', category: 'social' },
    { id: 'anger_channeling', name: 'Channel anger into physical activity', type: 'positive', category: 'health' },
    { id: 'cool_down', name: 'Take a cooling-off period', type: 'positive', category: 'self-care' },
    { id: 'identify_trigger', name: 'Identify what triggered my anger', type: 'positive', category: 'mental' },
    { id: 'assertive_communication', name: 'Practice assertive communication', type: 'positive', category: 'social' },
  ],

  // General Therapy-Related Behaviors
  therapy_related: [
    { id: 'prepare_session', name: 'Prepare for an upcoming therapy session', type: 'positive', category: 'mental' },
    { id: 'apply_technique', name: 'Apply a technique learned in therapy', type: 'positive', category: 'mental' },
    { id: 'track_progress', name: 'Track progress toward therapy goals', type: 'positive', category: 'planning' },
    { id: 'self_awareness', name: 'Write about new insights or awareness', type: 'positive', category: 'mental' },
    { id: 'celebrate_small_steps', name: 'Celebrate small steps of progress', type: 'positive', category: 'mental' },
  ],
};