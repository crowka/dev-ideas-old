import { useState, useEffect } from 'react';
import { getProfile, supabase } from '../lib/supabase';

export function useProfile(userId: string) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data, error } = await getProfile(userId);
        if (error) throw error;
        setProfile(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchProfile();

      // Subscribe to profile changes
      const subscription = supabase
        .channel('profile_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'user_profiles',
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            setProfile(payload.new);
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [userId]);

  return { profile, loading, error };
}