import React from 'react';
import { User, UserCircle2, CircleUser, UserCog, UserCheck } from 'lucide-react';

const avatarIcons = {
  avatar1: User,
  avatar2: UserCircle2,
  avatar3: CircleUser,
  avatar4: UserCog,
  avatar5: UserCheck,
};

interface Props {
  avatarId: string;
  size?: 'sm' | 'md' | 'lg';
}

export function UserAvatar({ avatarId, size = 'md' }: Props) {
  const Icon = avatarIcons[avatarId as keyof typeof avatarIcons] || User;
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`rounded-full bg-indigo-100 p-1 text-indigo-500`}>
      <Icon className={sizeClasses[size]} />
    </div>
  );
}