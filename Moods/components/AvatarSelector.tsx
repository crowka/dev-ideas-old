import React from 'react';
import { motion } from 'framer-motion';
import { User, UserCircle2, CircleUser, UserCog, UserCheck } from 'lucide-react';

const avatarOptions = [
  { id: 'avatar1', icon: User, label: 'Default' },
  { id: 'avatar2', icon: UserCircle2, label: 'Circle' },
  { id: 'avatar3', icon: CircleUser, label: 'Filled' },
  { id: 'avatar4', icon: UserCog, label: 'Settings' },
  { id: 'avatar5', icon: UserCheck, label: 'Check' },
];

interface Props {
  selected: string;
  onSelect: (avatarId: string) => void;
}

export function AvatarSelector({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {avatarOptions.map((avatar) => {
        const Icon = avatar.icon;
        return (
          <motion.button
            key={avatar.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(avatar.id)}
            className={`p-3 rounded-lg flex flex-col items-center gap-2 ${
              selected === avatar.id
                ? 'bg-indigo-100 border-2 border-indigo-500'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            <Icon className="w-8 h-8 text-indigo-500" />
            <span className="text-xs text-gray-600">{avatar.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}