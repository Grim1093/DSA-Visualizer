"use client";

import React, { useState } from 'react';
import TheoryPanel from '@/components/visualizer/TheoryPanel';
import ComparisonPanel from '@/components/visualizer/ComparisonPanel';

export default function InfoTabs() {
  const [activeTab, setActiveTab] = useState<'theory' | 'comparison'>('theory');

  return (
    <div className="w-full flex flex-col mt-6 bg-gray-900 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
      
      {/* Tab Headers */}
      <div className="flex border-b border-gray-700 bg-gray-800">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex-1 py-4 text-sm sm:text-base font-bold tracking-wide transition-colors duration-200 
            ${activeTab === 'theory' 
              ? 'text-blue-400 border-b-2 border-blue-500 bg-gray-900' 
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
            }`}
        >
          Theory & Mechanics
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={`flex-1 py-4 text-sm sm:text-base font-bold tracking-wide transition-colors duration-200 
            ${activeTab === 'comparison' 
              ? 'text-blue-400 border-b-2 border-blue-500 bg-gray-900' 
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
            }`}
        >
          Comparisons & Use Cases
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-0 sm:p-2 bg-gray-900">
        {activeTab === 'theory' ? (
          <div className="animate-in fade-in duration-300">
             <TheoryPanel />
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
             <ComparisonPanel />
          </div>
        )}
      </div>

    </div>
  );
}
