import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smile, 
  Frown, 
  AlertCircle, 
  Angry, 
  Cloud, 
  PlusCircle, 
  Sparkles,
  Heart,
  Target,
  Coffee,
  Sun,
  Star,
  Loader,
  Zap
} from 'lucide-react';
import { useSelectorOptions } from '../hooks/useSelectorOptions';
import { BackButton } from './BackButton';
import { moods } from '../data/moods';
import type { Mood } from '../types';
import type { UserType } from '../types/user-types';
import toast from 'react-hot-toast';
import { IndividualMoodOptions } from './selectors/individual/IndividualMoodOptions';
import { CorporateMoodOptions } from './selectors/corporate/CorporateMoodOptions';
import { TherapyMoodOptions } from './selectors/therapy/TherapyMoodOptions';


interface Props {
  onMoodSelect: (mood: Mood) => void;
  onBack?: () => void;
  userType: UserType | null;
  isPremium?: boolean;
}

export function MoodSelector({ onMoodSelect, onBack, userType, isPremium }: Props) {
  const { MoodSelector: SelectedMoodSelector } = useSelectorOptions(userType);

  return (
    <div className="bg-white rounded-2xl p-8 w-full max-w-4xl shadow-xl">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Back
        </button>
      )}
      
      <SelectedMoodSelector
        onMoodSelect={onMoodSelect}
        isPremium={isPremium}
      />
    </div>
  );
}

const MoodIcon = ({ icon }: { icon: string }) => {
  const props = { className: "w-12 h-12" };
  switch (icon) {
    case 'smile': return <Smile {...props} />;
    case 'frown': return <Frown {...props} />;
    case 'alert-circle': return <AlertCircle {...props} />;
    case 'angry': return <Angry {...props} />;
    case 'cloud': return <Cloud {...props} />;
    case 'sparkles': return <Sparkles {...props} />;
    case 'heart': return <Heart {...props} />;
    case 'target': return <Target {...props} />;
    case 'coffee': return <Coffee {...props} />;
    case 'sun': return <Sun {...props} />;
    case 'star': return <Star {...props} />;
    case 'loader': return <Loader {...props} />;
    case 'zap': return <Zap {...props} />;
    default: return null;
  }
};

export function MoodSelector({ onMoodSelect, onBack, userType }: Props) {
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customMood, setCustomMood] = useState({ name: '', color: 'bg-yellow-500' });

  const colors = [
    { name: 'Positive', value: 'bg-green-500' },
    { name: 'Negative', value: 'bg-gray-500' },
    { name: 'Neutral', value: 'bg-blue-500' },
    { name: 'Undecided', value: 'bg-yellow-500' },
  ];

  const handleCustomMoodSubmit = () => {
    if (!customMood.name.trim()) {
      toast.error('Please enter a mood name');
      return;
    }

    const newMood: Mood = {
      id: `custom-${Date.now()}`,
      name: customMood.name,
      icon: 'cloud',
      color: customMood.color,
    };

    onMoodSelect(newMood);
    setIsAddingCustom(false);
    setCustomMood({ name: '', color: 'bg-yellow-500' });
  };

  // Filter moods based on user type
  const filteredMoods = moods.filter(mood => {
    if (userType === 'therapy') {
      // Include all moods for therapy clients
      return true;
    } else if (userType === 'hr') {
      // Exclude extreme negative moods for HR users
      return !['angry', 'overwhelmed'].includes(mood.id);
    }
    // Individual users get all moods
    return true;
  });

  const positiveMoods = filteredMoods.filter(mood => 
    ['happy', 'excited', 'grateful', 'accomplished', 'content', 'peaceful'].includes(mood.id)
  );
  const negativeMoods = filteredMoods.filter(mood => 
    ['sad', 'anxious', 'angry', 'overwhelmed', 'frustrated'].includes(mood.id)
  );
  const neutralMoods = filteredMoods.filter(mood => 
    ['neutral', 'focused', 'relaxed'].includes(mood.id)
  );

  if (isAddingCustom) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <BackButton onClick={() => setIsAddingCustom(false)} />
          <h2 className="text-2xl font-bold text-gray-800">Add Custom Mood</h2>
          <div className="w-6" />
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mood Name
            </label>
            <input
              type="text"
              value={customMood.name}
              onChange={(e) => setCustomMood(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter mood name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Mood Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setCustomMood(prev => ({ ...prev, color: color.value }))}
                  className={`h-12 rounded-lg ${color.value} ${
                    customMood.color === color.value ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
                  } flex items-center justify-center text-white font-medium`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCustomMoodSubmit}
            className="w-full py-3 px-6 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
          >
            Add Mood
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        {onBack && <BackButton onClick={onBack} />}
        <h2 className="text-2xl font-bold text-gray-800">How are you feeling?</h2>
        <div className="w-6" />
      </div>

      <div className="space-y-8">
        {positiveMoods.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-green-600 mb-4">Positive Moods</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {positiveMoods.map((mood) => (
                <motion.button
                  key={mood.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onMoodSelect(mood)}
                  className={`${mood.color} p-6 rounded-xl flex flex-col items-center justify-center gap-3 text-white shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <MoodIcon icon={mood.icon} />
                  <span className="font-medium text-lg">{mood.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {negativeMoods.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-600 mb-4">Challenging Moods</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {negativeMoods.map((mood) => (
                <motion.button
                  key={mood.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onMoodSelect(mood)}
                  className={`${mood.color} p-6 rounded-xl flex flex-col items-center justify-center gap-3 text-white shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <MoodIcon icon={mood.icon} />
                  <span className="font-medium text-lg">{mood.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {neutralMoods.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-blue-600 mb-4">Neutral Moods</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {neutralMoods.map((mood) => (
                <motion.button
                  key={mood.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onMoodSelect(mood)}
                  className={`${mood.color} p-6 rounded-xl flex flex-col items-center justify-center gap-3 text-white shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <MoodIcon icon={mood.icon} />
                  <span className="font-medium text-lg">{mood.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {userType !== 'hr' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddingCustom(true)}
              className="bg-gray-100 p-6 rounded-xl flex flex-col items-center justify-center gap-3 text-gray-600 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
            >
              <PlusCircle className="w-12 h-12" />
              <span className="font-medium text-lg">Custom Mood</span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}