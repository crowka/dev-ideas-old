import React, { useState, useEffect } from 'react';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { getMoodEntries } from '../lib/supabase';
import { BackButton } from './BackButton';
import type { UserType } from '../types/user-types';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Props {
  userId: string;
  userType: UserType;
  onBack?: () => void;
}

export function Analytics({ userId, userType, onBack }: Props) {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to determine mood type and color
  const getMoodColor = (moodId: string): string => {
    const positiveMoods = ['happy', 'excited', 'grateful', 'accomplished', 'content', 'peaceful'];
    const negativeMoods = ['sad', 'anxious', 'angry', 'overwhelmed', 'frustrated'];
    const neutralMoods = ['neutral', 'focused', 'relaxed'];

    if (positiveMoods.includes(moodId)) {
      return moodId === 'happy' ? 'rgb(74, 222, 128)' : // green-400
        moodId === 'excited' ? 'rgb(34, 197, 94)' : // green-500
        moodId === 'grateful' ? 'rgb(22, 163, 74)' : // green-600
        moodId === 'accomplished' ? 'rgb(16, 185, 129)' : // emerald-500
        moodId === 'content' ? 'rgb(52, 211, 153)' : // emerald-400
        'rgb(5, 150, 105)'; // emerald-600
    } else if (negativeMoods.includes(moodId)) {
      return moodId === 'sad' ? 'rgb(156, 163, 175)' : // gray-400
        moodId === 'anxious' ? 'rgb(107, 114, 128)' : // gray-500
        moodId === 'angry' ? 'rgb(75, 85, 99)' : // gray-600
        moodId === 'overwhelmed' ? 'rgb(55, 65, 81)' : // gray-700
        'rgb(31, 41, 55)'; // gray-800
    } else if (neutralMoods.includes(moodId)) {
      return moodId === 'neutral' ? 'rgb(96, 165, 250)' : // blue-400
        moodId === 'focused' ? 'rgb(59, 130, 246)' : // blue-500
        'rgb(37, 99, 235)'; // blue-600
    }
    
    return 'rgb(168, 85, 247)'; // purple-500 for custom moods
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const { data, error } = await getMoodEntries(userId);
        if (error) throw error;
        
        if (data) {
          // Remove duplicate entries based on created_at timestamp
          const uniqueEntries = data.reduce((acc: any[], current: any) => {
            const exists = acc.find(item => 
              format(new Date(item.created_at), 'yyyy-MM-dd HH:mm:ss') === 
              format(new Date(current.created_at), 'yyyy-MM-dd HH:mm:ss')
            );
            if (!exists) {
              acc.push(current);
            }
            return acc;
          }, []);
          
          setEntries(uniqueEntries);
        }
      } catch (error) {
        console.error('Error fetching mood entries:', error);
        toast.error('Failed to load mood entries');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchEntries();
    }
  }, [userId]);

  if (loading) {
    return <div className="p-6 text-center">Loading analytics...</div>;
  }

  if (entries.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">No mood entries yet. Start tracking your moods!</p>
      </div>
    );
  }

  // Prepare data for mood distribution chart
  const moodCounts = entries.reduce((acc: Record<string, number>, entry) => {
    acc[entry.mood_name] = (acc[entry.mood_name] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        data: Object.values(moodCounts),
        backgroundColor: Object.keys(moodCounts).map(moodName => {
          const entry = entries.find(e => e.mood_name === moodName);
          return getMoodColor(entry?.mood_id || 'custom');
        }),
      },
    ],
  };

  // Prepare data for mood trends
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), i);
    return format(date, 'yyyy-MM-dd');
  }).reverse();

  const lineData = {
    labels: last30Days,
    datasets: [
      {
        label: 'Mood Entries',
        data: last30Days.map(date => 
          entries.filter(entry => 
            entry.created_at.startsWith(date)
          ).length
        ),
        borderColor: 'rgb(59, 130, 246)', // blue-500
        tension: 0.4,
      },
    ],
  };

  // Prepare data for events chart
  const eventCounts = entries.reduce((acc: Record<string, number>, entry) => {
    acc[entry.event_name] = (acc[entry.event_name] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(eventCounts),
    datasets: [
      {
        label: 'Event Frequency',
        data: Object.values(eventCounts),
        backgroundColor: 'rgba(59, 130, 246, 0.5)', // blue-500 with opacity
        borderColor: 'rgb(59, 130, 246)', // blue-500
        borderWidth: 1,
      },
    ],
  };

  // Calculate milestones
  const thisMonth = entries.filter(entry => {
    const date = new Date(entry.created_at);
    return date >= startOfMonth(new Date()) && date <= endOfMonth(new Date());
  }).length;

  // HR-specific analytics
  const getHRAnalytics = () => {
    const teamMoodDistribution = {
      positive: entries.filter(e => ['happy', 'excited', 'grateful', 'accomplished'].includes(e.mood_id)).length,
      neutral: entries.filter(e => ['neutral', 'focused', 'relaxed'].includes(e.mood_id)).length,
      negative: entries.filter(e => ['sad', 'anxious', 'frustrated'].includes(e.mood_id)).length,
    };

    const total = teamMoodDistribution.positive + teamMoodDistribution.neutral + teamMoodDistribution.negative;
    
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">Team Wellbeing Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-green-600 font-medium">Positive</p>
            <p className="text-2xl font-bold">{Math.round((teamMoodDistribution.positive / total) * 100)}%</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-600 font-medium">Neutral</p>
            <p className="text-2xl font-bold">{Math.round((teamMoodDistribution.neutral / total) * 100)}%</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 font-medium">Needs Attention</p>
            <p className="text-2xl font-bold">{Math.round((teamMoodDistribution.negative / total) * 100)}%</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        {onBack && <BackButton onClick={onBack} />}
        <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
        <div className="w-6" />
      </div>

      {userType === 'hr' && getHRAnalytics()}

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Monthly Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Mood Distribution</h3>
            <div className="h-64">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">30-Day Trend</h3>
            <div className="h-64">
              <Line data={lineData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Event Analysis</h2>
        <div className="h-96">
          <Bar
            data={barData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1
                  }
                }
              }
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-600 font-medium">This Month</p>
            <p className="text-2xl font-bold">{thisMonth} entries</p>
            {thisMonth >= 10 && (
              <p className="text-blue-600 text-sm mt-1">
                🎉 Amazing! You've logged {thisMonth} entries this month!
              </p>
            )}
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-600 font-medium">Total Entries</p>
            <p className="text-2xl font-bold">{entries.length}</p>
            <p className="text-blue-600 text-sm mt-1">
              Keep going! Every entry helps you understand yourself better.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}