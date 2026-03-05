import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle2, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Props {
  userId: string;
}

export function UserProfile({ userId }: Props) {
  const [user, setUser] = React.useState<any>(null);
  const [showDropdown, setShowDropdown] = React.useState(false);

  React.useEffect(() => {
    async function fetchUserData() {
      // Get auth user data
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      // Get profile data
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (authUser && profile) {
        setUser({
          ...authUser,
          profile,
        });
      }
    }

    fetchUserData();
  }, [userId]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    }
  };

  if (!user) return null;

  const avatarUrl = user.user_metadata?.avatar || user.profile?.avatar;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User avatar"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white shadow-md">
            <UserCircle2 className="w-6 h-6 text-indigo-500" />
          </div>
        )}
      </motion.button>

      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
        >
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user.profile?.nationality || 'User'}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </motion.div>
      )}
    </div>
  );
}