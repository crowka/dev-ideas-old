import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Mood } from '../types';

interface SmartSuggestion {
  behaviorId: string;
  alternativeBehaviorId: string;
  successRate: number;
}

export function useSmartSuggestions(
  userId: string,
  mood: Mood,
  selectedBehaviors: string[]
) {
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        // Get behavior patterns for similar situations
        const { data: patterns, error: patternsError } = await supabase
          .from('behavior_patterns')
          .select('*')
          .eq('user_id', userId)
          .eq('mood_id', mood.id)
          .order('frequency', { ascending: false });

        if (patternsError) throw patternsError;

        // Get alternative suggestions with success rates
        const { data: alternatives, error: alternativesError } = await supabase
          .from('alternative_suggestions')
          .select('*')
          .eq('user_id', userId)
          .in('original_behavior_id', selectedBehaviors)
          .order('success_count', { ascending: false });

        if (alternativesError) throw alternativesError;

        // Combine and process suggestions
        const processedSuggestions = alternatives.map(alt => ({
          behaviorId: alt.original_behavior_id,
          alternativeBehaviorId: alt.alternative_behavior_id,
          successRate: alt.total_attempts > 0 
            ? (alt.success_count / alt.total_attempts) * 100 
            : 0
        }));

        setSuggestions(processedSuggestions);
      } catch (error) {
        console.error('Error fetching smart suggestions:', error);
      } finally {
        setLoading(false);
      }
    }

    if (userId && mood && selectedBehaviors.length > 0) {
      fetchSuggestions();
    }
  }, [userId, mood, selectedBehaviors]);

  return { suggestions, loading };
}