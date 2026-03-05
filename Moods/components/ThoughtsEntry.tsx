import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BackButton } from './BackButton';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import type { Mood } from '../types';

interface Props {
  mood: Mood;
  event: { id: string; name: string };
  selectedFeelings: string[];
  behaviors?: string[];
  alternativeBehaviors?: string[];
  onBack: () => void;
  onComplete: (thoughts: { current: string; alternative: string }) => void;
}

export function ThoughtsEntry({ 
  mood, 
  event, 
  selectedFeelings,
  behaviors,
  alternativeBehaviors,
  onBack, 
  onComplete 
}: Props) {
  const [currentThoughts, setCurrentThoughts] = useState('');
  const [alternativeThoughts, setAlternativeThoughts] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const isPositiveMood = ['happy', 'excited', 'grateful', 'accomplished', 'content', 'peaceful'].includes(mood.id);
  const isNeutralMood = ['neutral', 'focused', 'relaxed'].includes(mood.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const entry = {
        user_id: user.id,
        mood_id: mood.id,
        mood_name: mood.name,
        event_id: event.id,
        event_name: event.name,
        feelings: selectedFeelings,
        behaviors: behaviors || [],
        alternative_behaviors: alternativeBehaviors || [],
        thoughts: currentThoughts.trim(),
        alternative_thoughts: alternativeThoughts.trim(),
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('mood_entries')
        .insert([entry]);

      if (error) throw error;
      
      toast.success('Mood entry saved successfully!');
      onComplete({
        current: currentThoughts,
        alternative: alternativeThoughts,
      });
    } catch (error: any) {
      console.error('Error saving mood entry:', error);
      toast.error(error.message || 'Failed to save mood entry. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <BackButton onClick={onBack} />
        <h2 className="text-2xl font-bold text-gray-800">Your Thoughts</h2>
        <div className="w-6" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="current-thoughts" className="block text-sm font-medium text-gray-700 mb-2">
            {isPositiveMood ? (
              "What thoughts or reflections do you have about this positive experience?"
            ) : isNeutralMood ? (
              "What helped you maintain this balanced state today?"
            ) : (
              `What thoughts came up during ${event.name.toLowerCase()}?`
            )}
          </label>
          <textarea
            id="current-thoughts"
            value={currentThoughts}
            onChange={(e) => setCurrentThoughts(e.target.value)}
            className="w-full h-32 p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder={isPositiveMood ? "Share your thoughts..." : isNeutralMood ? "Describe what helped you stay balanced..." : "Write your thoughts here..."}
          />
        </div>

        {!isPositiveMood && (
          <div>
            <label htmlFor="alternative-thoughts" className="block text-sm font-medium text-gray-700 mb-2">
              {isNeutralMood ? (
                "What strategies or practices would you like to maintain or improve?"
              ) : (
                "Can you think about this situation differently?"
              )}
            </label>
            <textarea
              id="alternative-thoughts"
              value={alternativeThoughts}
              onChange={(e) => setAlternativeThoughts(e.target.value)}
              className="w-full h-32 p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder={isNeutralMood ? "List strategies you'd like to maintain or develop..." : "Write an alternative perspective..."}
            />
          </div>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSaving}
          className={`w-full py-3 px-6 rounded-lg ${
            isSaving
              ? 'bg-gray-400 cursor-not-allowed'
              : `${mood.color} hover:opacity-90`
          } text-white font-medium transition-colors`}
        >
          {isSaving ? 'Saving...' : 'Save Entry'}
        </motion.button>
      </form>
    </div>
  );
}