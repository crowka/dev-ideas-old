import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function AboutApp({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">About Mood Tracker</h2>
        
        <div className="prose">
          <p>
            Mood Tracker is a comprehensive emotional wellness tool designed to help you
            understand and manage your emotional well-being.
          </p>

          <h3>Features:</h3>
          <ul>
            <li>Track daily mood and emotions</li>
            <li>Identify patterns in your emotional responses</li>
            <li>Log activities and their impact on your mood</li>
            <li>Set reminders for mood check-ins</li>
            <li>View insights and progress over time</li>
          </ul>

          <h3>How to Use:</h3>
          <ol>
            <li>Record your mood regularly</li>
            <li>Add notes about your experiences</li>
            <li>Review your patterns</li>
            <li>Use insights to make positive changes</li>
          </ol>
        </div>
      </motion.div>
    </div>
  );
}