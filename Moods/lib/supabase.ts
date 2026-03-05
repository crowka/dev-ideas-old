import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import type { UserProfile } from '../types';
import type { UserType } from '../types/user-types';

const supabaseUrl = 'https://kkewlvqqipabysfvhiwg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZXdsdnFxaXBhYnlzZnZoaXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyMzI3ODUsImV4cCI6MjA0NjgwODc4NX0.8ISDGC_zgrXUK6JlcKVYuQ7M7OYU4yWjmTCAyLKvgmY';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth functions
export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin
      }
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error in signUp:', error);
    return { data: null, error };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error in signIn:', error);
    return { data: null, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error in signOut:', error);
    return { error };
  }
}

// License functions
export async function validateLicense(userId: string, licenseCode: string, userType: UserType) {
  try {
    const { data, error } = await supabase
      .rpc('validate_and_assign_license', {
        p_user_id: userId,
        p_license_code: licenseCode,
        p_user_type: userType
      });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error validating license:', error);
    return { data: null, error };
  }
}

// Profile functions
export async function getProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error in getProfile:', error);
    return { data: null, error };
  }
}

export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error in updateProfile:', error);
    return { data: null, error };
  }
}

export async function updateUserType(userId: string, userType: UserType) {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({ 
        user_type: userType,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
    
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error in updateUserType:', error);
    return { error };
  }
}

// Mood entries functions
export async function getMoodEntries(userId: string) {
  try {
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error in getMoodEntries:', error);
    return { data: null, error };
  }
}

export async function saveMoodEntry(entry: any) {
  try {
    const { data, error } = await supabase
      .from('mood_entries')
      .insert([entry])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error in saveMoodEntry:', error);
    return { data: null, error };
  }
}