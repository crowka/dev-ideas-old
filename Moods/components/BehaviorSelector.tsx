import React from 'react';
import { motion } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import { behaviors } from '../data/behaviors';
import type { Mood } from '../types';
import toast from 'react-hot-toast';

interface Props {
  mood: Mood;
  event: { id: string; name: string };
  selectedFeelings: string[];
  onBack: () => void;
  onNext: (behaviors: string[]) => void;
  isPremium?: boolean;
}

export function BehaviorSelector({ mood, event, selectedFeelings, onBack, onNext, isPremium = false }: Props) {
  const [selectedBehaviors, setSelectedBehaviors] = React.useState<string[]>([]);

  const toggleBehavior = (behaviorId: string) => {
    setSelectedBehaviors(prev => {
      if (prev.includes(behaviorId)) {
        return prev.filter(id => id !== behaviorId);
      }
      if (prev.length >= 3 && !isPremium) {
        toast.error('Free users can only select up to 3 behaviors. Upgrade to premium for more!');
        return prev;
      }
      return [...prev, behaviorId];
    });
  };

  const moodBehaviors = behaviors[mood.id as keyof typeof behaviors];
  const positiveBehaviors = moodBehaviors.filter(b => b.type === 'positive');
  const negativeBehaviors = moodBehaviors.filter(b => b.type === 'negative');
  const neutralBehaviors = moodBehaviors.filter(b => b.type === 'neutral');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">What did you do?</h2>
        <div className="w-6" />
      </div>

      {!isPremium && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">Free users can select up to 3 behaviors. Upgrade to premium for unlimited selections!</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {positiveBehaviors.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-green-600 mb-3">Positive Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {positiveBehaviors.map((behavior) => (
                <motion.button
                  key={behavior.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleBehavior(behavior.id)}
                  className={`p-3 rounded-lg text-left ${
                    selectedBehaviors.includes(behavior.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                  } transition-colors`}
                >
                  {behavior.name}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {negativeBehaviors.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-red-600 mb-3">Actions to Avoid</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {negativeBehaviors.map((behavior) => (
                <motion.button
                  key={behavior.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleBehavior(behavior.id)}
                  className={`p-3 rounded-lg text-left ${
                    selectedBehaviors.includes(behavior.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                  } transition-colors`}
                >
                  {behavior.name}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {neutralBehaviors.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-600 mb-3">Neutral Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {neutralBehaviors.map((behavior) => (
                <motion.button
                  key={behavior.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleBehavior(behavior.id)}
                  className={`p-3 rounded-lg text-left ${
                    selectedBehaviors.includes(behavior.id)
                      ? 'bg-gray-500 text-white'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                  } transition-colors`}
                >
                  {behavior.name}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNext(selectedBehaviors)}
        disabled={selectedBehaviors.length === 0}
        className={`w-full py-3 px-6 rounded-lg mt-6 ${
          selectedBehaviors.length > 0
            ? `${mood.color} hover:opacity-90`
            : 'bg-gray-200 cursor-not-allowed'
        } text-white font-medium transition-colors`}
      >
        Continue
      </motion.button>
    </div>
  );
}