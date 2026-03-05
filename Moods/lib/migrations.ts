import { supabase } from './supabase';

export async function runMigrations() {
  const migrations = [
    {
      name: 'add_user_type',
      sql: `
        DO $$ 
        BEGIN 
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'user_profiles' 
            AND column_name = 'user_type'
          ) THEN
            ALTER TABLE public.user_profiles
            ADD COLUMN user_type text CHECK (user_type in ('individual', 'therapy', 'hr'));
          END IF;
        END $$;

        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'user_profiles' 
            AND column_name = 'has_completed_onboarding'
          ) THEN
            ALTER TABLE public.user_profiles
            ADD COLUMN has_completed_onboarding boolean DEFAULT false;
          END IF;
        END $$;
      `
    }
  ];

  for (const migration of migrations) {
    try {
      const { error } = await supabase.rpc('run_sql', {
        sql_query: migration.sql
      });

      if (error) throw error;
      console.log(`Migration ${migration.name} completed successfully`);
    } catch (error) {
      console.error(`Error running migration ${migration.name}:`, error);
    }
  }
}