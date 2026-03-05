import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { BackButton } from './BackButton';
import { events } from '../data/events';
import { saveCustomEvent, getCustomEvents } from '../lib/customEvents';
import type { Mood } from '../types';
import toast from 'react-hot-toast';

interface Props {
  mood: Mood;
  onBack: () => void;
  onNext: (event: { id: string; name: string }) => void;
  userId: string;
}

const customMoodEvents = {
  positive: [
    { id: 'custom-achievement', name: 'Personal Achievement' },
    { id: 'custom-connection', name: 'Meaningful Connection' },
    { id: 'custom-growth', name: 'Personal Growth' },
    { id: 'custom-creativity', name: 'Creative Expression' },
    { id: 'custom-health', name: 'Health & Wellness' },
    { id: 'custom-learning', name: 'Learning Experience' }
  ],
  neutral: [
    { id: 'custom-routine', name: 'Daily Routine' },
    { id: 'custom-reflection', name: 'Self-Reflection' },
    { id: 'custom-rest', name: 'Rest & Recovery' },
    { id: 'custom-maintenance', name: 'Maintenance & Organization' },
    { id: 'custom-planning', name: 'Planning & Preparation' },
    { id: 'custom-balance', name: 'Finding Balance' }
  ],
  negative: [
    { id: 'custom-challenge', name: 'Personal Challenge' },
    { id: 'custom-setback', name: 'Temporary Setback' },
    { id: 'custom-conflict', name: 'Relationship Conflict' },
    { id: 'custom-stress', name: 'Stress Management' },
    { id: 'custom-uncertainty', name: 'Dealing with Uncertainty' },
    { id: 'custom-pressure', name: 'Handling Pressure' }
  ],
  undecided: [
    { id: 'custom-general-1', name: 'Work or Study' },
    { id: 'custom-general-2', name: 'Relationships' },
    { id: 'custom-general-3', name: 'Personal Time' },
    { id: 'custom-general-4', name: 'Health & Wellness' },
    { id: 'custom-general-5', name: 'Social Activities' },
    { id: 'custom-general-6', name: 'Daily Activities' }
  ]
};

export function EventSelector({ mood, onBack, onNext, userId }: Props) {
  const [customEvent, setCustomEvent] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [currentEvents, setCurrentEvents] = useState<Array<{ id: string; name: string }>>([]);

  const getMoodType = (color: string) => {
    if (color.includes('green') || color.includes('emerald')) return 'positive';
    if (color.includes('gray')) return 'negative';
    if (color.includes('blue')) return 'neutral';
    if (color.includes('yellow')) return 'undecided';
    return 'undecided';
  };

  const moodType = getMoodType(mood.color);

  const getMoodEvents = () => {
    if (mood.id.startsWith('custom-')) {
      return customMoodEvents[moodType as keyof typeof customMoodEvents];
    }
    return events[mood.id as keyof typeof events] || events.default;
  };

  useEffect(() => {
    const loadEvents = async () => {
      const baseEvents = getMoodEvents();
      setCurrentEvents(baseEvents);
    };
  
    loadEvents();
  }, [userId, mood]);

  const handleCustomEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEvent.trim()) return;
  
    const newEvent = {
      name: customEvent.trim(),
      user_id: userId,
      category: moodType
    };
  
    try {
      const { data, error } = await saveCustomEvent(newEvent);
      
      if (error) {
        console.error('Error saving custom event:', error);
        toast.error('Failed to save custom event');
        return;
      }
  
      if (data) {
        setCurrentEvents(prev => [...prev, { id: data.id, name: data.name }]);
        setCustomEvent('');
        setIsAddingCustom(false);
        toast.success('Event added!');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Failed to save custom event');
    }
  };

  if (isAddingCustom) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <BackButton onClick={() => setIsAddingCustom(false)} />
          <h2 className="text-2xl font-bold text-gray-800">Add Custom Event</h2>
          <div className="w-6" />
        </div>

        <form onSubmit={handleCustomEventSubmit} className="space-y-4">
          <input
            type="text"
            value={customEvent}
            onChange={(e) => setCustomEvent(e.target.value)}
            placeholder="Describe what happened..."
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!customEvent.trim()}
            className={`w-full py-3 px-6 rounded-lg ${
              customEvent.trim()
                ? `${mood.color} hover:opacity-90`
                : 'bg-gray-200 cursor-not-allowed'
            } text-white font-medium transition-colors`}
          >
            Add Event
          </motion.button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <BackButton onClick={onBack} />
        <h2 className="text-2xl font-bold text-gray-800">What happened?</h2>
        <div className="w-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentEvents.map((event) => (
          <motion.button
            key={event.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext(event)}
            className={`p-4 text-left rounded-lg bg-white border-2 ${
              typeof event.id === 'string' && !event.id.startsWith('custom-')
                ? 'border-indigo-200 hover:border-indigo-300'
                : 'border-gray-200 hover:border-gray-300'
            } transition-colors shadow-sm`}
          >
            <span className="font-medium text-gray-800">{event.name}</span>
          </motion.button>
        ))}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingCustom(true)}
          className="p-4 rounded-lg bg-white border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center gap-2 text-gray-600"
        >
          <PlusCircle className="w-5 h-5" />
          <span className="font-medium">Add Custom Event</span>
        </motion.button>
      </div>
    </div>
  );
}