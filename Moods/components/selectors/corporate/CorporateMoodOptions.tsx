import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Check, 
  Star, 
  Battery, 
  Focus, 
  AlertCircle,
  PlusCircle 
} from 'lucide-react';

interface Props {
  onSelect: (mood: any) => void;
  filteredMoods: any[];
  isProcessing: boolean;
  selected: string | null;
}

const corporateMoods = {
  positive: [
    { id: 'motivated', name: 'Motivated', icon: 'target', color: 'bg-green-500' },
    { id: 'productive', name: 'Productive', icon: 'zap', color: 'bg-green-500' },
    { id: 'energized', name: 'Energized', icon: 'battery', color: 'bg-green-500' },
    { id: 'accomplished', name: 'Accomplished', icon: 'check', color: 'bg-green-500' },
    { id: 'satisfied', name: 'Satisfied', icon: 'star', color: 'bg-green-500' },
  ],
  neutral: [
    { id: 'steady', name: 'Steady', icon: 'target', color: 'bg-blue-500' },
    { id: 'focused', name: 'Focused', icon: 'focus', color: 'bg-blue-500' },
    { id: 'relaxed', name: 'Relaxed', icon: 'battery', color: 'bg-blue-500' },
  ],
  negative: [
    { id: 'stressed', name: 'Stressed', icon: 'alert-circle', color: 'bg-gray-500' },
    { id: 'overwhelmed', name: 'Overwhelmed', icon: 'alert-circle', color: 'bg-gray-500' },
    { id: 'disengaged', name: 'Disengaged', icon: 'alert-circle', color: 'bg-gray-500' },
    { id: 'frustrated', name: 'Frustrated', icon: 'alert-circle', color: 'bg-gray-500' },
  ]
};

const MoodIcon = ({ icon }: { icon: string }) => {
  const props = { className: "w-12 h-12" };
  switch (icon) {
    case 'target': return <Target {...props} />;
    case 'zap': return <Zap {...props} />;
    case 'battery': return <Battery {...props} />;
    case 'check': return <Check {...props} />;
    case 'star': return <Star {...props} />;
    case 'focus': return <Focus {...props} />;
    case 'alert-circle': return <AlertCircle {...props} />;
    default: return null;
  }
};

export function CorporateMoodOptions({ onSelect, isProcessing, selected }: Props) {
  return (
    <div className="space-y-8">
      {/* Positive States */}
      <div>
        <h3 className="text-lg font-medium text-green-600 mb-4">Positive States</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {corporateMoods.positive.map((mood) => (
            <motion.button
              key={mood.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(mood)}
              disabled={isProcessing}
              className={`${mood.color} p-6 rounded-xl flex flex-col items-center justify-center gap-3 text-white shadow-lg hover:shadow-xl transition-shadow ${
                selected === mood.id ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
              }`}
            >
              <MoodIcon icon={mood.icon} />
              <span className="font-medium text-lg">{mood.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Neutral States */}
      <div>
        <h3 className="text-lg font-medium text-blue-600 mb-4">Neutral States</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {corporateMoods.neutral.map((mood) => (
            <motion.button
              key={mood.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(mood)}
              disabled={isProcessing}
              className={`${mood.color} p-6 rounded-xl flex flex-col items-center justify-center gap-3 text-white shadow-lg hover:shadow-xl transition-shadow ${
                selected === mood.id ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
              }`}
            >
              <MoodIcon icon={mood.icon} />
              <span className="font-medium text-lg">{mood.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Work Challenges */}
      <div>
        <h3 className="text-lg font-medium text-gray-600 mb-4">Work Challenges</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {corporateMoods.negative.map((mood) => (
            <motion.button
              key={mood.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(mood)}
              disabled={isProcessing}
              className={`${mood.color} p-6 rounded-xl flex flex-col items-center justify-center gap-3 text-white shadow-lg hover:shadow-xl transition-shadow ${
                selected === mood.id ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
              }`}
            >
              <MoodIcon icon={mood.icon} />
              <span className="font-medium text-lg">{mood.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}