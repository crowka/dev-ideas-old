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
export interface UserProfile {
  user_id: string;
  email: string;
  user_name?: string;
  avatar?: string;
  nationality?: string;
  location?: string;
  gender?: string;
  age?: number;
  is_premium: boolean;
  has_completed_onboarding: boolean;
  // ... other fields
}