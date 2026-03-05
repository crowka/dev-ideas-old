import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, PenTool, Activity, Eye, Moon, Heart, Calendar, ArrowRight } from 'lucide-react';

const EmotionDiscoveryApp = () => {
  const [activeTab, setActiveTab] = useState('journey');
  const [journeyStage, setJourneyStage] = useState(0);
  
  // Journey content - progressive journaling prompts
  const journeyStages = [
    {
      title: "Welcome to Inner Compass",
      content: "Your guided journey to emotional self-discovery begins here. We'll help you explore your inner landscape through thoughtful prompts, pattern recognition, and gentle guidance."
    },
    {
      title: "Emotional Check-In",
      content: "What emotions have you felt most strongly recently? Where in your body do you notice these feelings?",
      placeholder: "Tap to reflect on recent emotions..."
    },
    {
      title: "Sources of Joy",
      content: "When you felt positive emotions recently, what were you doing? What made these experiences meaningful?",
      placeholder: "Describe moments that brought you joy..."
    },
    {
      title: "Understanding Emptiness",
      content: "If the emptiness you sometimes feel could speak, what might it be trying to tell you that you need?",
      placeholder: "Listen to what your emptiness might be saying..."
    },
    {
      title: "Anxiety Patterns",
      content: "When anxiety arises, what thoughts typically accompany it? Is there a pattern to what triggers this feeling?",
      placeholder: "Explore your anxiety triggers and patterns..."
    },
    {
      title: "Relationship Reflections",
      content: "Think of an important relationship in your life. How has this connection shaped who you are?",
      placeholder: "Reflect on a significant relationship..."
    },
    {
      title: "Emotional Processing",
      content: "How do you typically handle difficult emotions? Do you notice any patterns in how you respond?",
      placeholder: "Observe your emotional responses..."
    },
    {
      title: "Body Awareness",
      content: "When you feel strong emotions, what happens in your body right before you reach that point?",
      placeholder: "Note physical sensations linked to emotions..."
    },
    {
      title: "Core Values",
      content: "What issues or concerns in the world resonate most deeply with you? What makes your heart hurt?",
      placeholder: "Identify what matters most to you..."
    },
    {
      title: "Connected Threads",
      content: "Looking at everything you've explored, what patterns connect these elements of your emotional life?",
      placeholder: "Look for connecting threads in your responses..."
    }
  ];
  
  const nextStage = () => {
    if (journeyStage < journeyStages.length - 1) {
      setJourneyStage(journeyStage + 1);
    }
  };
  
  const prevStage = () => {
    if (journeyStage > 0) {
      setJourneyStage(journeyStage - 1);
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
      {/* App Header */}
      <div className="bg-indigo-600 p-4 shadow-md">
        <h1 className="text-xl font-bold text-white">Inner Compass</h1>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow overflow-auto p-4">
        {activeTab === 'journey' && (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
            <div className="mb-4 text-sm text-gray-500">
              Stage {journeyStage + 1} of {journeyStages.length}
            </div>
            
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">
              {journeyStages[journeyStage].title}
            </h2>
            
            <p className="mb-6 text-gray-700">
              {journeyStages[journeyStage].content}
            </p>
            
            {journeyStage > 0 && (
              <div className="mb-8 mt-4">
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-32" 
                  placeholder={journeyStages[journeyStage].placeholder || "Write your thoughts here..."}
                />
              </div>
            )}
            
            <div className="flex justify-between">
              <button 
                onClick={prevStage} 
                className={`flex items-center px-4 py-2 rounded-md ${journeyStage > 0 ? 'text-indigo-600 hover:bg-indigo-50' : 'text-gray-400'}`}
                disabled={journeyStage === 0}
              >
                <ChevronLeft size={18} />
                <span className="ml-1">Previous</span>
              </button>
              
              <button 
                onClick={nextStage} 
                className={`flex items-center px-4 py-2 rounded-md ${journeyStage < journeyStages.length - 1 ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-600'}`}
                disabled={journeyStage === journeyStages.length - 1}
              >
                <span className="mr-1">{journeyStage === 0 ? 'Begin' : 'Next'}</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'insights' && (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">Your Emotional Insights</h2>
            <p className="text-gray-700 mb-4">
              Based on your journal entries, we've identified these patterns in your emotional landscape:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-indigo-50 rounded-md">
                <h3 className="font-medium text-indigo-800">Core Values</h3>
                <p className="text-gray-700">You consistently express concern for animal welfare and environmental issues.</p>
              </div>
              
              <div className="p-4 bg-indigo-50 rounded-md">
                <h3 className="font-medium text-indigo-800">Emotional Patterns</h3>
                <p className="text-gray-700">You often process difficult emotions through anger or withdrawal before recognizing underlying fears.</p>
              </div>
              
              <div className="p-4 bg-indigo-50 rounded-md">
                <h3 className="font-medium text-indigo-800">Relationship Insights</h3>
                <p className="text-gray-700">You value authenticity and depth in connections, and fear of abandonment influences your approaches to relationships.</p>
              </div>
            </div>
            
            <button className="w-full flex justify-center items-center p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              <span className="mr-2">Explore Deeper</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
        
        {activeTab === 'practices' && (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">Recommended Practices</h2>
            <p className="text-gray-700 mb-4">
              Based on your emotional patterns, these practices may help you connect with your feelings:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 border border-gray-200 rounded-md hover:border-indigo-300 hover:bg-indigo-50 transition duration-200">
                <h3 className="font-medium text-indigo-700 flex items-center">
                  <PenTool size={18} className="mr-2" />
                  Unsent Letter
                </h3>
                <p className="text-gray-700 mt-2">Write a letter to your former friend expressing everything you've felt and wished you could say.</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-md hover:border-indigo-300 hover:bg-indigo-50 transition duration-200">
                <h3 className="font-medium text-indigo-700 flex items-center">
                  <Activity size={18} className="mr-2" />
                  Body Scan Meditation
                </h3>
                <p className="text-gray-700 mt-2">A 10-minute guided practice to help you notice physical sensations connected to emotions.</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-md hover:border-indigo-300 hover:bg-indigo-50 transition duration-200">
                <h3 className="font-medium text-indigo-700 flex items-center">
                  <Moon size={18} className="mr-2" />
                  Dream Journal
                </h3>
                <p className="text-gray-700 mt-2">Track changes in your dreams to understand how your subconscious is processing emotions.</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 flex justify-around p-3">
        <button 
          onClick={() => setActiveTab('journey')} 
          className={`flex flex-col items-center ${activeTab === 'journey' ? 'text-indigo-600' : 'text-gray-500'}`}
        >
          <BookOpen size={20} />
          <span className="text-xs mt-1">Journey</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('insights')}
          className={`flex flex-col items-center ${activeTab === 'insights' ? 'text-indigo-600' : 'text-gray-500'}`}
        >
          <Eye size={20} />
          <span className="text-xs mt-1">Insights</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('practices')}
          className={`flex flex-col items-center ${activeTab === 'practices' ? 'text-indigo-600' : 'text-gray-500'}`}
        >
          <Heart size={20} />
          <span className="text-xs mt-1">Practices</span>
        </button>
        
        <button 
          className="flex flex-col items-center text-gray-500"
        >
          <Calendar size={20} />
          <span className="text-xs mt-1">Progress</span>
        </button>
      </div>
    </div>
  );
};

export default EmotionDiscoveryApp;