import React from 'react';
import { Menu } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { supabase } from '../lib/supabase';
import { useProfile } from '../hooks/useProfile';
import toast from 'react-hot-toast';

interface Props {
  userId: string;
  onResetUserType: () => void;
  onShowAboutApp: () => void;
}

export function Header({ userId, onResetUserType, onShowAboutApp }: Props) {
  const [showMenu, setShowMenu] = React.useState(false);
  const { profile } = useProfile(userId);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Mood Tracker</h1>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <UserAvatar avatarId={profile?.avatar || 'avatar1'} />
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onShowAboutApp();
                  }}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  About the App
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onResetUserType();
                  }}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  Change User Type
                </button>
                <button
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}