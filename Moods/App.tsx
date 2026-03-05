import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthScreen } from './components/AuthScreen';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { Dashboard } from './components/dashboard/Dashboard';
import { Header } from './components/Header';
import { useUserType } from './hooks/useUserType';
import { useProfile } from './hooks/useProfile';
import { supabase } from './lib/supabase';
import { AboutApp } from './components/AboutApp';
import type { UserType } from './types/user-types';

export function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [resetUserType, setResetUserType] = useState(false);
  const [showAboutApp, setShowAboutApp] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { profile, loading: loadingProfile } = useProfile(session?.user?.id || '');
  const { userType, loading: loadingUserType } = useUserType(session?.user?.id || '');

  useEffect(() => {
    if (profile && !profile.has_completed_onboarding) {
      setShowOnboarding(true);
    }
  }, [profile]);

  const handleResetUserType = async () => {
    if (session?.user?.id) {
      await supabase
        .from('user_profiles')
        .update({ 
          user_type: null,
          has_completed_onboarding: false 
        })
        .eq('user_id', session.user.id);
      setResetUserType(true);
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <>
        <AuthScreen onComplete={() => {}} />
        <Toaster position="top-center" />
      </>
    );
  }

  if (loadingProfile || loadingUserType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading profile...</div>
      </div>
    );
  }

  if (showOnboarding || !userType || resetUserType) {
    return (
      <OnboardingFlow
        onComplete={async () => {
          const { error } = await supabase
            .from('user_profiles')
            .update({ has_completed_onboarding: true })
            .eq('user_id', session.user.id);
          
          if (error) {
            console.error('Error updating onboarding status:', error);
          }
          
          setShowOnboarding(false);
          window.location.reload();
        }}
      />
    );
  }

  // Show main app
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userId={session.user.id} 
        onResetUserType={handleResetUserType}
        onShowAboutApp={() => setShowAboutApp(true)}
      />
      <Dashboard userId={session.user.id} userType={userType} />
      <Toaster position="top-center" />
      
      {showAboutApp && (
        <AboutApp onClose={() => setShowAboutApp(false)} />
      )}
    </div>
  );
}