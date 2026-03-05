import React from 'react';
import { motion } from 'framer-motion';
import { User, Heart, Users, Check } from 'lucide-react';
import { UserType, USER_TYPES } from '../../types/user-types';

interface Props {
  onSelect: (type: UserType) => void;
  onLicenseRequired: (type: UserType) => void;
}

export function UserTypeSelector({ onSelect, onLicenseRequired }: Props) {
  const [selected, setSelected] = React.useState<UserType | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'user': return <User className="w-8 h-8" />;
      case 'heart': return <Heart className="w-8 h-8" />;
      case 'users': return <Users className="w-8 h-8" />;
      default: return null;
    }
  };

  const handleContinue = async () => {
    if (!selected || isProcessing) return;
    
    setIsProcessing(true);
    try {
      if (selected === 'individual') {
        await onSelect(selected);
      } else {
        onLicenseRequired(selected);
      }
    } catch (error) {
      console.error('Error in handleContinue:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to map display names to internal types
  const getDisplayName = (typeId: string) => {
    switch (typeId) {
      case 'corporate':
        return 'Corporate Client';
      case 'therapy':
        return 'Therapy Client';
      case 'individual':
        return 'Individual User';
      default:
        return typeId;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        How would you like to use MoodTracker?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {USER_TYPES.map((type) => (
          <motion.button
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(type.id)}
            disabled={isProcessing}
            className={`p-6 rounded-xl text-left relative ${
              selected === type.id
                ? 'bg-indigo-500 text-white ring-2 ring-offset-2 ring-indigo-500'
                : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className={`${
              selected === type.id ? 'text-white' : 'text-indigo-500'
            } mb-4`}>
              {getIcon(type.icon)}
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{getDisplayName(type.id)}</h3>
            <p className={`text-sm mb-4 ${
              selected === type.id ? 'text-indigo-100' : 'text-gray-600'
            }`}>
              {type.description}
            </p>
            
            <ul className="space-y-2">
              {type.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className={`w-4 h-4 mr-2 ${
                    selected === type.id ? 'text-indigo-200' : 'text-indigo-500'
                  }`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {selected === type.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-indigo-500" />
                </div>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleContinue}
        disabled={!selected || isProcessing}
        className={`w-full py-3 px-6 rounded-lg ${
          selected && !isProcessing
            ? 'bg-indigo-500 hover:bg-indigo-600'
            : 'bg-gray-200 cursor-not-allowed'
        } text-white font-medium transition-colors`}
      >
        {isProcessing ? 'Processing...' : 'Continue'}
      </motion.button>
    </div>
  );
}