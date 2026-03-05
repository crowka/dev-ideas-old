export type UserType = 'individual' | 'therapy' | 'hr';

export interface UserTypeConfig {
  id: UserType;
  name: string;
  description: string;
  features: string[];
  icon: string;
}

export const USER_TYPES: UserTypeConfig[] = [
  {
    id: 'individual',
    name: 'Individual User',
    description: 'Track your personal mood and build mindfulness habits',
    features: [
      'Daily mood tracking',
      'Personal insights',
      'Mindfulness prompts',
      'Progress summaries'
    ],
    icon: 'user'
  },
  {
    id: 'therapy',
    name: 'Therapy Client',
    description: 'Enhance your therapy journey with structured tracking',
    features: [
      'Therapy session prep',
      'Resilience tracking',
      'Reflection prompts',
      'Progress reports'
    ],
    icon: 'heart'
  },
  {
    id: 'corporate',
    name: 'Corporate Client',
    description: 'Monitor and support team wellbeing',
    features: [
      'Team analytics',
      'Anonymous feedback',
      'Group insights',
      'Wellbeing trends'
    ],
    icon: 'users'
  }
];