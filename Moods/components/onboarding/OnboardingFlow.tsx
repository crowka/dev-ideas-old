import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserTypeSelector } from './UserTypeSelector';
import { OnboardingScreen } from '../OnboardingScreen';
import { LicenseInput } from '../LicenseInput';
import { UserType } from '../../types/user-types';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface Props {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: Props) {
  const [step, setStep] = useState<'type' | 'license' | 'features'>('type');
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  
  const handleUserTypeSelect = async (type: UserType) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('user_profiles')
        .update({ 
          user_type: type,
          has_completed_onboarding: false
        })
        .eq('user_id', user.id);

      if (error) throw error;
      setStep('features');
    } catch (error) {
      console.error('Error saving user type:', error);
      toast.error('Failed to save your selection. Please try again.');
    }
  };

  const handleLicenseRequired = (type: UserType) => {
    setSelectedType(type);
    setStep('license');
  };

  if (step === 'type') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 w-full max-w-4xl shadow-xl"
        >
          <UserTypeSelector 
            onSelect={handleUserTypeSelect}
            onLicenseRequired={handleLicenseRequired}
          />
        </motion.div>
      </div>
    );
  }

  if (step === 'license' && selectedType) {
    return (
      <LicenseInput
        selectedType={selectedType}
        onValidated={() => setStep('features')}
        onBack={() => setStep('type')}
      />
    );
  }

  return (
    <OnboardingScreen
      onComplete={onComplete}
      onSkip={onComplete}
    />
  );
}