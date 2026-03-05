/ src/components/selectors/individual/IndividualMoodOptions.tsx
import { moods } from '../../../data/moods';  // Import your existing moods

export const IndividualMoodOptions = {
  positive: moods.filter(mood => 
    ['happy', 'excited', 'grateful', 'accomplished', 'content', 'peaceful'].includes(mood.id)
  ),
  negative: moods.filter(mood => 
    ['sad', 'anxious', 'angry', 'overwhelmed', 'frustrated'].includes(mood.id)
  ),
  neutral: moods.filter(mood => 
    ['neutral', 'focused', 'relaxed'].includes(mood.id)
  )
};