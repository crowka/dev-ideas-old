import React from 'react';
import { motion } from 'framer-motion';
import { Heart, LineChart, Sparkles } from 'lucide-react';
import { OnboardingStep } from '../types';

const steps: OnboardingStep[] = [
  {
    title: 'Track Your Moods',
    description: 'Log and monitor your emotional journey with our intuitive mood tracking system.',
    icon: 'heart',
  },
  {
    title: 'Gain Insights',
    description: 'Discover patterns in your emotional well-being through detailed analytics.',
    icon: 'lineChart',
  },
  {
    title: 'Reflect & Grow',
    description: 'Transform negative thoughts into positive perspectives with guided reflection.',
    icon: 'sparkles',
  },
];

interface Props {
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingScreen({ onComplete, onSkip }: Props) {
  const [currentStep, setCurrentStep] = React.useState(0);

  const nextStep = () => {
    if (currentStep === steps.length - 1) {
      onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const IconComponent = () => {
    switch (steps[currentStep].icon) {
      case 'heart':
        return <Heart className="w-16 h-16 mx-auto mb-6 text-indigo-500" />;
      case 'lineChart':
        return <LineChart className="w-16 h-16 mx-auto mb-6 text-indigo-500" />;
      case 'sparkles':
        return <Sparkles className="w-16 h-16 mx-auto mb-6 text-indigo-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl"
      >
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-center"
        >
          <IconComponent />
          <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
          <p className="text-gray-600 mb-8">{steps[currentStep].description}</p>
        </motion.div>

        <div className="flex justify-between items-center">
          <button
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
          >
            Skip
          </button>
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-indigo-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextStep}
            className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}