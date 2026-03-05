import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signUp, createProfile } from '../lib/supabase';
import { LocationInput } from './LocationInput';
import { AvatarSelector } from './AvatarSelector';
import toast from 'react-hot-toast';

interface Props {
  email: string;
  onComplete: () => void;
}

export function RegistrationForm({ email, onComplete }: Props) {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('avatar1');
  const [location, setLocation] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      toast.error('Please enter a username');
      return;
    }
    if (!password) {
      toast.error('Please enter a password');
      return;
    }
  
    setLoading(true);
    try {
      const { data: signUpData, error: signUpError } = await signUp(email, password);
      if (signUpError) throw signUpError;
  
      const { user } = signUpData;
      if (!user) throw new Error('No user found');
  
      const profile = {
        user_id: user.id,
        email: email,
        user_name: userName.trim(),
        nationality: nationality.trim() || null,
        gender: gender || null,
        age: age === 'prefer_not_to_say' ? null : age ? parseInt(age) : null,
        avatar: selectedAvatar,
        location: location.trim() || null
      };
  
      const { error: profileError } = await createProfile(user.id, profile);
      if (profileError) throw profileError;
  
      toast.success('Profile created successfully!');
      onComplete();
    } catch (error: any) {
      console.error('Error during registration:', error);
      toast.error(error.message || 'An error occurred during registration');
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
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Avatar
            </label>
            <AvatarSelector selected={selectedAvatar} onSelect={setSelectedAvatar} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
              <span className="text-sm text-gray-500 ml-2">(Only you will see this)</span>
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <LocationInput 
              onLocationChange={setLocation}
              onCountryChange={(country) => {
                if (!nationality) setNationality(country);
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nationality (or choose manually)
            </label>
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender (Optional)
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non_binary">Non-binary</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age (Optional)
            </label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select age</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
              {Array.from({ length: 83 }, (_, i) => i + 18).map((age) => (
                <option key={age} value={age.toString()}>
                  {age}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || !userName.trim() || !password}
            className={`w-full py-3 px-6 rounded-lg bg-indigo-500 text-white font-medium ${
              loading || !userName.trim() || !password ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'
            } transition-colors`}
          >
            {loading ? 'Creating Profile...' : 'Complete Registration'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}