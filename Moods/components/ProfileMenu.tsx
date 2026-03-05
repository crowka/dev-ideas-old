import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Settings, User } from 'lucide-react';
import { signOut } from '../lib/supabase';

interface Props {
  user: {
    email: string;
    user_metadata: {
      avatar?: string;
    };
  };
}

export function ProfileMenu({ user }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) console.error('Error signing out:', error);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {user.user_metadata.avatar ? (
            <img
              src={user.user_metadata.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
              <User className="w-6 h-6 text-indigo-500" />
            </div>
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
          >
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.email}
              </p>
            </div>
            <button
              onClick={() => {}}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}