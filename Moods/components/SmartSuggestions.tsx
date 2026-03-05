import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, History } from 'lucide-react';
import { useSmartSuggestions } from '../hooks/useSmartSuggestions';
import type { Mood } from '../types';

interface Props {
  userId: string;
  mood: Mood;
  selectedBehaviors: string[];
  onSuggestionSelect: (behaviorId: string) => void;
}

export function SmartSuggestions({ userId, mood, selectedBehaviors, onSuggestionSelect }: Props) {
  const { suggestions, loading } = useSmartSuggestions(userId, mood, selectedBehaviors);

  if (loading || suggestions.length === 0) return null;

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-2 text-indigo-600">
        <Lightbulb className="w-5 h-5" />
        <h3 className="font-medium">Smart Suggestions</h3>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <motion.button
            key={suggestion.alternativeBehaviorId}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSuggestionSelect(suggestion.alternativeBehaviorId)}
            className="w-full p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {suggestion.successRate >= 70 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <History className="w-4 h-4 text-indigo-500" />
                  )}
                  <span className="text-sm font-medium text-gray-900">
                    This alternative has helped you before
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Success rate: {suggestion.successRate.toFixed(0)}%
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}