export interface UserProfile {
  user_id: string;
  email?: string;
  user_name?: string;
  avatar: string;
  nationality?: string;
  location?: string;
  gender?: string;
  age?: number;
  is_premium: boolean;
  reminder_frequency: 'daily' | 'weekly' | 'none';
  reminder_time?: string;
  user_type?: 'individual' | 'therapy' | 'hr';
  has_completed_onboarding: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  mood_id: string;
  mood_name: string;
  event_id: string;
  event_name: string;
  feelings: string[];
  behaviors: string[];
  alternative_behaviors: string[];
  thoughts?: string;
  alternative_thoughts?: string;
  effectiveness_rating?: number;
  created_at: Date;
  updated_at: Date;
}

export interface CustomEvent {
  id: string;
  user_id: string;
  name: string;
  category: string;
  created_at: Date;
}

export interface Mood {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
}