import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, AlertCircle, RefreshCw } from 'lucide-react';
import { signOut, resendVerificationEmail } from '../lib/supabase';
import toast from 'react-hot-toast';
import { signOut, resendVerificationEmail } from '../lib/supabase';

interface Props {
  email: string;
  onBack: () => void;
}

export function VerificationRequired({ email, onBack }: Props) {
  const [resending, setResending] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    onBack();
  };

  const handleResendVerification = async () => {
    setResending(true);
    try {
      const { error } = await resendVerificationEmail(email);
      if (error) throw error;
      toast.success('Verification email resent! Please check your inbox.');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl"
      >
        <div className="text-center">
          <Mail className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">Please verify your email address to continue</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            We sent a verification link to <strong>{email}</strong>. Please check your inbox and click the link to verify your account.
          </p>
          <div className="space-y-4">
            <button
              onClick={handleResendVerification}
              disabled={resending}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resending ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Resending...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  Resend Verification Email
                </>
              )}
            </button>
            <button
              onClick={handleSignOut}
              className="text-indigo-500 hover:text-indigo-600 font-medium"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}