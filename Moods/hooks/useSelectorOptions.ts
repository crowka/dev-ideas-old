import { CorporateMoodOptions } from '../components/selectors/corporate/CorporateMoodOptions';
import { MoodSelector } from '../components/MoodSelector'; // your existing MoodSelector
import type { UserType } from '../types/user-types';

export function useSelectorOptions(userType: UserType | null) {
  const getMoodSelector = () => {
    switch (userType) {
      case 'corporate':
        return CorporateMoodOptions;
      case 'therapy':
        return MoodSelector; // For now, using default - we'll create therapy version later
      case 'individual':
      default:
        return MoodSelector;
    }
  };

  return {
    MoodSelector: getMoodSelector(),
  };
}