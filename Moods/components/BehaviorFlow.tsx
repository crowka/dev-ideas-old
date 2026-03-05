import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { BackButton } from './BackButton';
import type { Mood } from '../types';
import toast from 'react-hot-toast';

interface Props {
  userId: string;
  mood: Mood;
  event: { id: string; name: string };
  selectedFeelings: string[];
  onBack: () => void;
  onNext: (behaviors: { selected: string[], alternatives: string[] }) => void;
  isPremium: boolean;
}

const alternativeBehaviors = {
  'avoid_responsibilities': [
    { id: 'break_tasks', name: 'Break tasks into smaller steps' },
    { id: 'schedule_time', name: 'Schedule dedicated time for tasks' },
    { id: 'ask_help', name: 'Ask for help or support' },
    { id: 'reward_system', name: 'Create a reward system for completion' }
  ],
  'isolate': [
    { id: 'reach_out', name: 'Reach out to a friend or family member' },
    { id: 'join_activity', name: 'Join a group activity or class' },
    { id: 'online_community', name: 'Connect with an online community' },
    { id: 'schedule_call', name: 'Schedule a video call with someone' }
  ],
  'overthink': [
    { id: 'mindfulness', name: 'Practice mindfulness meditation' },
    { id: 'journal', name: 'Write thoughts in a journal' },
    { id: 'grounding', name: 'Try grounding exercises' },
    { id: 'time_limit', name: 'Set a time limit for decision-making' }
  ],
  'procrastinate': [
    { id: 'pomodoro', name: 'Use the Pomodoro Technique' },
    { id: 'start_small', name: 'Start with a 5-minute task' },
    { id: 'eliminate_distractions', name: 'Remove distractions from environment' },
    { id: 'accountability', name: 'Find an accountability partner' }
  ],
  'criticize_self': [
    { id: 'self_compassion', name: 'Practice self-compassion exercises' },
    { id: 'positive_list', name: 'List personal achievements' },
    { id: 'reframe', name: 'Reframe negative self-talk' },
    { id: 'gratitude', name: 'Write down things you are grateful for' }
  ],
  'unhealthy_coping': [
    { id: 'exercise', name: 'Do some physical exercise' },
    { id: 'deep_breathing', name: 'Practice deep breathing' },
    { id: 'creative_outlet', name: 'Engage in a creative activity' },
    { id: 'healthy_snack', name: 'Choose a healthy snack instead' }
  ]
};

export function BehaviorFlow({ userId, mood, event, selectedFeelings, onBack, onNext, isPremium }: Props) {
  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>([]);
  const [selectedAlternatives, setSelectedAlternatives] = useState<string[]>([]);
  const [customBehavior, setCustomBehavior] = useState('');
  const [customAlternative, setCustomAlternative] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState<'behavior' | 'alternative' | null>(null);

  // Determine mood type based on color for custom moods
  const getMoodType = (color: string) => {
    if (color.includes('green') || color.includes('emerald')) return 'positive';
    if (color.includes('gray')) return 'negative';
    if (color.includes('blue')) return 'neutral';
    return 'neutral';
  };

  const moodType = mood.id.startsWith('custom-') 
    ? getMoodType(mood.color)
    : ['happy', 'excited', 'grateful', 'accomplished', 'content', 'peaceful'].includes(mood.id)
      ? 'positive'
      : ['sad', 'anxious', 'angry', 'overwhelmed', 'frustrated'].includes(mood.id)
        ? 'negative'
        : 'neutral';

  const behaviors = {
    positive: [
      { id: 'gratitude', name: 'Practiced gratitude' },
      { id: 'exercise', name: 'Exercised or moved body' },
      { id: 'meditate', name: 'Meditated or did breathing exercises' },
      { id: 'connect', name: 'Connected with loved ones' },
      { id: 'create', name: 'Created something' },
      { id: 'nature', name: 'Spent time in nature' }
    ],
    negative: [
      { id: 'avoid_responsibilities', name: 'Avoided responsibilities' },
      { id: 'isolate', name: 'Isolated from others' },
      { id: 'overthink', name: 'Overthought situations' },
      { id: 'procrastinate', name: 'Procrastinated on tasks' },
      { id: 'criticize_self', name: 'Criticized myself harshly' },
      { id: 'unhealthy_coping', name: 'Used unhealthy coping mechanisms' }
    ],
    neutral: [
      { id: 'routine', name: 'Followed daily routine' },
      { id: 'rest', name: 'Took time to rest' },
      { id: 'plan', name: 'Made plans or organized' },
      { id: 'learn', name: 'Learned something new' },
      { id: 'maintain', name: 'Maintained boundaries' },
      { id: 'reflect', name: 'Reflected on situation' }
    ]
  };

  const handleBehaviorSelect = (behaviorId: string) => {
    if (selectedBehaviors.includes(behaviorId)) {
      setSelectedBehaviors(prev => prev.filter(id => id !== behaviorId));
      // Clear alternatives related to this behavior
      setSelectedAlternatives(prev => prev.filter(alt => 
        !alternativeBehaviors[behaviorId as keyof typeof alternativeBehaviors]?.some(b => b.id === alt)
      ));
    } else {
      if (selectedBehaviors.length >= 3 && !isPremium) {
        toast.error('Free users can select up to 3 behaviors. Upgrade for unlimited selections!');
        return;
      }
      setSelectedBehaviors(prev => [...prev, behaviorId]);
    }
  };

  const handleAlternativeSelect = (alternativeId: string) => {
    if (selectedAlternatives.includes(alternativeId)) {
      setSelectedAlternatives(prev => prev.filter(id => id !== alternativeId));
    } else {
      if (selectedAlternatives.length >= 3 && !isPremium) {
        toast.error('Free users can select up to 3 alternatives. Upgrade for unlimited selections!');
        return;
      }
      setSelectedAlternatives(prev => [...prev, alternativeId]);
    }
  };

  const handleCustomAdd = (type: 'behavior' | 'alternative') => {
    const text = type === 'behavior' ? customBehavior : customAlternative;
    if (!text.trim()) return;

    const customId = `custom-${type}-${Date.now()}`;
    
    if (type === 'behavior') {
      if (selectedBehaviors.length >= 3 && !isPremium) {
        toast.error('Free users can select up to 3 behaviors. Upgrade for unlimited selections!');
        return;
      }
      setSelectedBehaviors(prev => [...prev, customId]);
      setCustomBehavior('');
    } else {
      if (selectedAlternatives.length >= 3 && !isPremium) {
        toast.error('Free users can select up to 3 alternatives. Upgrade for unlimited selections!');
        return;
      }
      setSelectedAlternatives(prev => [...prev, customId]);
      setCustomAlternative('');
    }
    
    setIsAddingCustom(null);
    toast.success(`Custom ${type} added!`);
  };

  if (isAddingCustom) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <BackButton onClick={() => setIsAddingCustom(null)} />
          <h2 className="text-2xl font-bold text-gray-800">
            Add Custom {isAddingCustom === 'behavior' ? 'Behavior' : 'Alternative'}
          </h2>
          <div className="w-6" />
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          handleCustomAdd(isAddingCustom);
        }} className="space-y-4">
          <input
            type="text"
            value={isAddingCustom === 'behavior' ? customBehavior : customAlternative}
            onChange={(e) => isAddingCustom === 'behavior' 
              ? setCustomBehavior(e.target.value)
              : setCustomAlternative(e.target.value)
            }
            placeholder={`Describe what you ${isAddingCustom === 'behavior' ? 'did' : 'could do instead'}...`}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-lg ${mood.color} text-white font-medium transition-colors`}
          >
            Add {isAddingCustom === 'behavior' ? 'Behavior' : 'Alternative'}
          </motion.button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <BackButton onClick={onBack} />
        <h2 className="text-2xl font-bold text-gray-800">
          {moodType === 'positive' 
            ? "What helped create this positive experience?"
            : moodType === 'negative'
              ? "What did you do & what could you do instead?"
              : "What actions did you take?"}
        </h2>
        <div className="w-6" />
      </div>

      {!isPremium && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">Free users can select up to 3 behaviors per section. Upgrade to premium for unlimited selections!</p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Current Behaviors */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Current Behaviors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {behaviors[moodType as keyof typeof behaviors].map((behavior) => (
              <motion.button
                key={behavior.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBehaviorSelect(behavior.id)}
                className={`p-4 rounded-lg text-left ${
                  selectedBehaviors.includes(behavior.id)
                    ? `${mood.color} text-white`
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                } transition-colors`}
              >
                {behavior.name}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAddingCustom('behavior')}
              className="p-4 rounded-lg bg-white border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center gap-2 text-gray-600"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add Custom Behavior</span>
            </motion.button>
          </div>
        </div>

        {/* Alternative Behaviors (only for negative moods) */}
        {moodType === 'negative' && selectedBehaviors.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Alternative Behaviors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedBehaviors.map(behaviorId => {
                const alternatives = alternativeBehaviors[behaviorId as keyof typeof alternativeBehaviors];
                if (!alternatives) return null;

                return alternatives.map(alt => (
                  <motion.button
                    key={alt.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAlternativeSelect(alt.id)}
                    className={`p-4 rounded-lg text-left ${
                      selectedAlternatives.includes(alt.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                    } transition-colors`}
                  >
                    {alt.name}
                  </motion.button>
                ));
              })}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsAddingCustom('alternative')}
                className="p-4 rounded-lg bg-white border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center gap-2 text-gray-600"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Custom Alternative</span>
              </motion.button>
            </div>
          </div>
        )}
      </div>

      <motion.button
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
onClick={() => onNext({ 
  selected: selectedBehaviors,
  alternatives: selectedAlternatives
})}
disabled={moodType === 'negative' && selectedBehaviors.length === 0}
className={`w-full py-3 px-6 rounded-lg mt-6 ${
  moodType === 'negative' 
    ? selectedBehaviors.length > 0
      ? `${mood.color} hover:opacity-90`
      : 'bg-gray-200 cursor-not-allowed'
    : `${mood.color} hover:opacity-90`
} text-white font-medium transition-colors`}
>
Continue
</motion.button>
    </div>
  );
}