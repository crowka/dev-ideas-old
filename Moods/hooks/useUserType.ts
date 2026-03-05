import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { UserType } from '../types/user-types';

export function useUserType(userId: string) {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserType() {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('user_type')
          .eq('user_id', userId)
          .single();

        if (error) throw error;
        setUserType(data?.user_type || null);
      } catch (error) {
        console.error('Error fetching user type:', error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUserType();
    }
  }, [userId]);

  return { userType, loading };
}