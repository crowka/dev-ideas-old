import React, { useState } from 'react';
import { MoodSelector } from '../MoodSelector';
import { EventSelector } from '../EventSelector';
import { FeelingsSelector } from '../FeelingsSelector';
import { BehaviorFlow } from '../BehaviorFlow';
import { ThoughtsEntry } from '../ThoughtsEntry';
import { Analytics } from '../Analytics';
import type { Mood } from '../../types';
import type { UserType } from '../../types/user-types';

interface Props {
  userId: string;
  userType: UserType;
}

export function Dashboard({ userId, userType }: Props) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<{ id: string; name: string } | null>(null);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [selectedBehaviors, setSelectedBehaviors] = useState<{ selected: string[], alternatives: string[] }>({ selected: [], alternatives: [] });
  const [step, setStep] = useState<'mood' | 'event' | 'feelings' | 'behavior' | 'thoughts' | 'analytics'>('mood');

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setStep('event');
  };

  const handleEventSelect = (event: { id: string; name: string }) => {
    setSelectedEvent(event);
    setStep('feelings');
  };

  const handleFeelingsSelect = (feelings: string[]) => {
    setSelectedFeelings(feelings);
    setStep('behavior');
  };

  const handleBehaviorSelect = (behaviors: { selected: string[], alternatives: string[] }) => {
    setSelectedBehaviors(behaviors);
    setStep('thoughts');
  };

  const handleThoughtsComplete = async (thoughts: { current: string; alternative: string }) => {
    setStep('analytics');
  };

  const handleNewEntry = () => {
    setSelectedMood(null);
    setSelectedEvent(null);
    setSelectedFeelings([]);
    setSelectedBehaviors({ selected: [], alternatives: [] });
    setStep('mood');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {step === 'mood' && (
        <MoodSelector onMoodSelect={handleMoodSelect} userType={userType} />
      )}
      {step === 'event' && selectedMood && (
        <EventSelector
          mood={selectedMood}
          onBack={() => setStep('mood')}
          onNext={handleEventSelect}
          userId={userId}
        />
      )}
      {step === 'feelings' && selectedMood && selectedEvent && (
        <FeelingsSelector
          mood={selectedMood}
          event={selectedEvent}
          onBack={() => setStep('event')}
          onNext={handleFeelingsSelect}
        />
      )}
      {step === 'behavior' && selectedMood && selectedEvent && (
        <BehaviorFlow
          userId={userId}
          mood={selectedMood}
          event={selectedEvent}
          selectedFeelings={selectedFeelings}
          onBack={() => setStep('feelings')}
          onNext={handleBehaviorSelect}
          isPremium={false}
        />
      )}
      {step === 'thoughts' && selectedMood && selectedEvent && (
        <ThoughtsEntry
          mood={selectedMood}
          event={selectedEvent}
          selectedFeelings={selectedFeelings}
          onBack={() => setStep('behavior')}
          onComplete={handleThoughtsComplete}
        />
      )}
      {step === 'analytics' && (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleNewEntry}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              New Entry
            </button>
          </div>
          <Analytics userId={userId} userType={userType} />
        </>
      )}
    </main>
  );
}