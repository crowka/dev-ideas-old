import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { BackButton } from './BackButton';
import { feelings } from '../data/feelings';
import type { Mood } from '../types';
import toast from 'react-hot-toast';

interface Props {
  mood: Mood;
  event: { id: string; name: string };
  onBack: () => void;
  onNext: (selectedFeelings: string[]) => void;
}

export function FeelingsSelector({ mood, event, onBack, onNext }: Props) {
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [customFeeling, setCustomFeeling] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  // For custom moods, determine the category based on the color
  const getMoodCategory = (color: string) => {
    if (color.includes('green') || color.includes('emerald')) return 'happy';
    if (color.includes('gray')) return 'sad';
    if (color.includes('blue')) return 'neutral';
    return 'neutral'; // default fallback
  };

  const moodId = mood.id.startsWith('custom-') ? getMoodCategory(mood.color) : mood.id;
  const moodFeelings = feelings[moodId as keyof typeof feelings] || feelings.neutral;

  const toggleFeeling = (feelingId: string) => {
    setSelectedFeelings(prev => {
      if (prev.includes(feelingId)) {
        return prev.filter(id => id !== feelingId);
      }
      if (prev.length >= 3) {
        toast.error('You can select up to 3 feelings');
        return prev;
      }
      return [...prev, feelingId];
    });
  };

  const handleCustomFeelingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFeeling.trim()) return;

    if (selectedFeelings.length >= 3) {
      toast.error('You can select up to 3 feelings');
      return;
    }

    const newFeeling = {
      id: `custom-${Date.now()}`,
      name: customFeeling.trim()
    };

    setSelectedFeelings(prev => [...prev, newFeeling.id]);
    moodFeelings.push(newFeeling);
    setCustomFeeling('');
    setIsAddingCustom(false);
    toast.success('Custom feeling added!');
  };

  if (isAddingCustom) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <BackButton onClick={() => setIsAddingCustom(false)} />
          <h2 className="text-2xl font-bold text-gray-800">Add Custom Feeling</h2>
          <div className="w-6" />
        </div>

        <form onSubmit={handleCustomFeelingSubmit} className="space-y-4">
          <input
            type="text"
            value={customFeeling}
            onChange={(e) => setCustomFeeling(e.target.value)}
            placeholder="Describe your feeling..."
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!customFeeling.trim()}
            className={`w-full py-3 px-6 rounded-lg ${
              customFeeling.trim()
                ? `${mood.color} hover:opacity-90`
                : 'bg-gray-200 cursor-not-allowed'
            } text-white font-medium transition-colors`}
          >
            Add Feeling
          </motion.button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <BackButton onClick={onBack} />
        <h2 className="text-2xl font-bold text-gray-800">How did this make you feel?</h2>
        <div className="w-6" />
      </div>

      <p className="text-gray-600 mb-6">
        How did <span className="font-medium text-gray-800">"{event.name}"</span> make you feel?
        Select up to 3 emotions that best describe your experience.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {moodFeelings.map((feeling) => (
          <motion.button
            key={feeling.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleFeeling(feeling.id)}
            disabled={selectedFeelings.length >= 3 && !selectedFeelings.includes(feeling.id)}
            className={`p-4 rounded-lg ${
              selectedFeelings.includes(feeling.id)
                ? `${mood.color} text-white`
                : selectedFeelings.length >= 3
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
            } transition-colors shadow-sm`}
          >
            {feeling.name}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingCustom(true)}
          disabled={selectedFeelings.length >= 3}
          className={`p-4 rounded-lg bg-white border-2 border-dashed ${
            selectedFeelings.length >= 3
              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-gray-300 text-gray-600 hover:border-gray-400'
          } transition-colors flex items-center justify-center gap-2`}
        >
          <PlusCircle className="w-5 h-5" />
          <span className="font-medium">Add Custom Feeling</span>
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNext(selectedFeelings)}
        disabled={selectedFeelings.length === 0}
        className={`w-full py-3 px-6 rounded-lg ${
          selectedFeelings.length > 0
            ? `${mood.color} hover:opacity-90`
            : 'bg-gray-200 cursor-not-allowed'
        } text-white font-medium transition-colors`}
      >
        Continue
      </motion.button>
    </div>
  );
}