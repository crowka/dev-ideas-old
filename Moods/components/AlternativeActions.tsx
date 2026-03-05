import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, ThumbsUp } from 'lucide-react';
import { behaviors } from '../data/behaviors';
import type { Mood } from '../types';
import toast from 'react-hot-toast';

interface Props {
  mood: Mood;
  selectedBehaviors: string[];
  onBack: () => void;
  onComplete: (alternatives: string[]) => void;
}

const alternativeSuggestions = {
  'have_drink': [
    { id: 'exercise', name: 'Exercise or physical activity' },
    { id: 'meditation', name: 'Practice meditation or deep breathing' },
    { id: 'tea', name: 'Have a calming tea' },
    { id: 'walk', name: 'Go for a walk' },
  ],
  'isolate': [
    { id: 'call_friend', name: 'Call a supportive friend' },
    { id: 'group_activity', name: 'Join a group activity' },
    { id: 'therapy', name: 'Schedule a therapy session' },
    { id: 'social_event', name: 'Plan a social event' },
  ],
  'overthink': [
    { id: 'mindfulness', name: 'Practice mindfulness' },
    { id: 'journal', name: 'Write in a journal' },
    { id: 'grounding', name: 'Try grounding exercises' },
    { id: 'positive_activity', name: 'Engage in a positive activity' },
  ],
};

export function AlternativeActions({ mood, selectedBehaviors, onBack, onComplete }: Props) {
  const [selectedAlternatives, setSelectedAlternatives] = useState<string[]>([]);
  const [customAlternative, setCustomAlternative] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const moodBehaviors = behaviors[mood.id as keyof typeof behaviors];
  const negativeBehaviors = selectedBehaviors
    .map(id => moodBehaviors.find(b => b.id === id))
    .filter(b => b?.type === 'negative');

  const toggleAlternative = (alternativeId: string) => {
    setSelectedAlternatives(prev => {
      if (prev.includes(alternativeId)) {
        return prev.filter(id => id !== alternativeId);
      }
      return [...prev, alternativeId];
    });
  };

  const addCustomAlternative = () => {
    if (!customAlternative.trim()) return;
    
    const newAlternativeId = `custom-${Date.now()}`;
    setSelectedAlternatives(prev => [...prev, newAlternativeId]);
    setCustomAlternative('');
    setShowCustomInput(false);
    
    toast.success('Custom alternative added!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Healthier Alternatives</h2>
        <div className="w-6" />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          Consider these healthier alternatives to manage your feelings:
        </p>
      </div>

      <div className="space-y-6">
        {negativeBehaviors.map(behavior => (
          <div key={behavior?.id} className="space-y-3">
            <h3 className="text-lg font-medium text-gray-800">
              Instead of "{behavior?.name}", try:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {alternativeSuggestions[behavior?.id as keyof typeof alternativeSuggestions]?.map(alternative => (
                <motion.button
                  key={alternative.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleAlternative(alternative.id)}
                  className={`p-3 rounded-lg text-left flex items-center gap-2 ${
                    selectedAlternatives.includes(alternative.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                  } transition-colors`}
                >
                  {selectedAlternatives.includes(alternative.id) && (
                    <ThumbsUp className="w-5 h-5" />
                  )}
                  <span>{alternative.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showCustomInput ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={customAlternative}
            onChange={(e) => setCustomAlternative(e.target.value)}
            placeholder="Enter custom alternative..."
            className="flex-1 p-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <button
            onClick={addCustomAlternative}
            disabled={!customAlternative.trim()}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowCustomInput(true)}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Custom Alternative
        </button>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onComplete(selectedAlternatives)}
        className="w-full py-3 px-6 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
      >
        Save Alternatives
      </motion.button>
    </div>
  );
}