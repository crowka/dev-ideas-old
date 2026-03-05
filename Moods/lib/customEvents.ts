import { supabase } from './supabase';

export async function saveCustomEvent(event: { name: string; user_id: string; category: string }) {
  try {
    const { data, error } = await supabase
      .from('custom_events')
      .insert([{
        name: event.name,
        user_id: event.user_id,
        category: event.category,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error in saveCustomEvent:', error);
    return { data: null, error };
  }
}

export async function getCustomEvents(userId: string) {
  try {
    const { data, error } = await supabase
      .from('custom_events')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error in getCustomEvents:', error);
    return { data: null, error };
  }
}