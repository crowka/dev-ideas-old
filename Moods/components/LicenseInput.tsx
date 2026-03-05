import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, Loader } from 'lucide-react';
import { validateLicense, supabase } from '../lib/supabase';
import type { UserType } from '../types/user-types';
import toast from 'react-hot-toast';

interface LicenseInputProps {
  selectedType: UserType;
  onValidated: () => void;
  onBack: () => void;
}

export function LicenseInput({ selectedType, onValidated, onBack }: Props) {
  const [licenseCode, setLicenseCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function getUserId() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    }
    getUserId();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseCode.trim() || !userId) {
      toast.error('Please enter a license code');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await validateLicense(userId, licenseCode.trim(), selectedType);
      
      if (error) {
        console.error('License validation error:', error);
        toast.error('Failed to validate license. Please try again.');
        return;
      }
      
      if (data?.success) {
        toast.success('License validated successfully!');
        onValidated();
      } else {
        toast.error(data?.error || 'Invalid license code');
      }
    } catch (error: any) {
      console.error('License validation error:', error);
      toast.error('Failed to validate license. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Enter License Code</h2>
        
        <p className="text-gray-600 mb-6 text-center">
          Please enter your {selectedType.toLowerCase()} license code to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Code
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={licenseCode}
                onChange={(e) => setLicenseCode(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your license code"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              disabled={loading}
              className="flex-1 py-2 px-4 border-2 border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Back
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading || !licenseCode.trim() || !userId}
              className="flex-1 py-2 px-4 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Validating...
                </>
              ) : (
                'Validate License'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}